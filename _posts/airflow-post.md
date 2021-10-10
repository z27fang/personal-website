---
title: "Python threads, Snowflake and Airflow"
excerpt: "This blog is about some of my practices in optimizing snowflake query performance by utilizing snowflake connector's get_results_from_sfqid and python's parallel programming feature."
category: "Python Dev"
coverImage: "/assets/python.svg.png"
date: "2021-10-10"
author:
  name: Zihao
  picture: "/assets/blog/authors/tim.jpeg"
tags: "python,python-airflow,python-parallelprogramming"
---

## A Practice of Optimizing Snowflake Queries in Airflow

This is a blog for reporting some of my practices in optimizing snowflake query performance by utilizing snowflake connector's get_results_from_sfqid and python's parallel programming feature.

### 1. The scenerio

Recently, we had a task for running multiple queries on snowflake, store their results in csv, package the result and finally send them via sftp to a destination server. The task will be ran monthly.

After doing some research, I found the combination of `ThreadPoolExecutor` in python and `get_results_from_sfqid` in `snowflake-connector-python` can address the solution clearly and efficiently. Below is my solution.

### 2. Break up the task

It is easy to split the process into several executable task, which are:

1. 1.Send query to snowflake
2. 2.Write the response locally to csv
3. 3.(can be skipped) Compress the csv into gzip or whatever compressing format we like
4. 4.Send each csv to the destination server

Actually, the above process can be applied to each query equally. In terms of pesudo code, we want something like:

```python
queries = [q1, q2, q3]
def process_query(q):
    send_to_snowflake(q)     #1
    get_result(q)            #2
    package_result(q)        #3
    send_result_to_server(q) #4
map(process_query, queries)
```

However, it's a bit dangerous to perform tasks like this in airflow. Given the methodology of running tasks like a waterfall in airflow, we may want to split the above process into some testable tasks. My solution is to put 1 and 2 into the same task, the rest into the other.

The optimization happens at the `map(...)` call, where we can make use of python parallel programming to shorten the total time.

Okay, now we have the idea of the whole picture, let start implementation!

### 3. Implementation

For the implementation part, I will focus on the core implementation where the prallel programming part happens, where other parts will be skipped.

#### 1. Snowflake Scripts

- For the python part, we have can implement each task as a python callable, where I believe it's the best way of calling python tasks in airflow
- **CsvDownload.py**

```python
# system import
from datetime import timedelta, date, datetime
from enum import Enum
import logging
import threading
import concurrent.futures
import copy
import os

"""
    - purpose:
        load queries from snowflake and write result to local as csv
"""

'''
The actual class that runs queries
'''
class CsvDownloadCallable:
    def __init__(self, csv_path: str = ".",  execution_date: str = ""):
        self.cur = mySnowflakeCursor # here we create a cursor for selecting queries, where you are supposed to build your own cursor

        self.finished_queries = 0
        self.write_path = csv_path
        
        # this is a vital part for parallel programming, the _lock object prevents
        #     different thread trying to modify the same data source at same time, and
        #     make sure the only one thread with the lock can modify the data.
        # In this class, the self.finished_queries will be midified once a query is done.
        self._lock = threading.Lock()

        # logging
        format = "%(asctime)s: %(message)s"
        logging.basicConfig(format=format, level=logging.WARNING,
                        datefmt="%H:%M:%S")
        
    # This is the implementation of call function for a callable class
    def __call__(self, **kwargs):
        # here, I defined my queries as a enum class in practice,
        #   where the name is the key and the value is the query.
        self.queries = myQueryGetter()
        if len(self.queries) > 0:
            # initialize our query status object
            self.query_status = dict({
                query.name : dict({'id': '', 'status': 'Init'}) for query in self.queries })
				
            self._submit_queries_async()
            self._retrieve_query_result()
        else:
            self._my_logging('No queries to run.')

    '''
    thread function for using lock to update status
    '''
    def _commit_status(self, q_name, new_status):
        with self._lock:
            # We make a deep copy as best practice.
            new_dict = copy.deepcopy(self.query_status)
            new_dict[q_name]['status'] = new_status
            
            self.query_status = new_dict

            new_finished_queries = self.finished_queries
            new_finished_queries += 1
            self.finished_queries = new_finished_queries

            self._my_logging(f"{q_name} finished,  ({str(self.finished_queries)} / {len(self.query_status)}).")

    '''
    In practice, this should be logging function like the logging module.
    '''
    def _my_logging(self, content):
        print("AuditingQueries: " + content)

    
    '''
    this function will submit all queries in async
    '''
    def _submit_queries_async(self):
        for query in self.queries:
            self._my_logging(f'Running query {query}: ')

            q_name, q_value = query.name, query.value
            self.cur.execute_async(q_value)
            self.query_status[q_name]['id']= self.cur.sfqid

            self._my_logging(f"""    Query has been submitted with queryid: {self.query_status[q_name].get('id')}.""")

    '''
    fecth data from snowflake
    '''
    def _retrieve_query_result(self):
        keys = list(self.query_status.keys())
        
        '''
        Function to be passed into each thread, we will need individual connector to avoid racing issue
        '''
        def load_query_results(q_name):
            q_id = self.query_status[q_name].get('id')

            local_cursor = utils.getSnowflakeConnector()
            try:
                local_cursor = local_cursor.cursor()
                local_cursor.execute("use warehouse my_awesome_warehouse")
                local_cursor.get_results_from_sfqid(q_id)
                # here I name csvfiles by the execution date
                local_csv_path = f"{self.write_path}/{q_name}_{self.execution_date}.csv"
                results = local_cursor.fetch_pandas_all().to_csv(local_csv_path) #hangs until the query actually returns something

                # os check for size
                self._my_logging(f" {local_csv_path} : {os.stat(local_csv_path).st_size}")

            except snowflake.connector.errors.ProgrammingError as e:
                # default error message
                self._my_logging(e)
                # custom error message
                self._my_logging(f"""Error {e.error} ({e.sqlstate}): {e.msg} ({e.sfqid}) while fetching {q_name}""")
                
            finally:
                # always remember to close the cursor
                local_cursor.close()
                self._commit_status(q_name, 'Finished')

        with concurrent.futures.ThreadPoolExecutor(max_workers = len(keys)) as executor:
            executor.map(load_query_results, keys)
        
```

- **CsvLoader.py**

  ```python
  #system import
  import pysftp
  import os
  import concurrent.futures
  import logging
  from typing import List
  import json
  import threading
  
  
  # local import
  from .Queries import get_queries
  from common.constants import ENV, Env, Config
  
  
  '''
      - purpose:
          examine the csv downloaded from snowflake by CsvDownload, compress them and sftp
          to auditing server
  '''
  class CsvLoader:
      def __init__(self, csv_path: str = ".",  execution_date: str = ''):
          '''
          Here I skipped many initial settings like snowflake configs, csv path.
          '''
          self._lock = threading.Lock()
  
          # logging
          format = "%(asctime)s: %(message)s"
          logging.basicConfig(format=format, level=logging.INFO,
                          datefmt="%H:%M:%S")
  	'''
  	Implement the callable, where kwargs are for airflow to pass in templated variables
  	'''
      def __call__(self, **kwargs) -> None:
          self.execution_date = kwargs['templates_dict']['execution_date'] # set execution date for creating remote folder
          self.queries = get_queries(self.execution_date) # My cusomized function definition for getting queries
          if len(self.queries) > 0:
              csv_names = self._check_local_csv()
              self._sftp_csv(csv_names)
              os.system(f"rm {self.csv_path}/*.gz") #clean downloaded files
          else:
              print(f"AuditingQueries: No queries should run today({self.execution_date}).")
  
      '''
      compare local csv file with query source, check is files missing
      returns : a list of string name of gzip files to be uploaded.
      '''
      def _check_local_csv(self) -> List[str]:
  
          files = [ f"{q.name}_{self.execution_date}.csv" for q in self.queries \
              if os.path.isfile(f"{self.csv_path}/{q.name}_{self.execution_date}.csv")]
  
          if len(files) != len(self.queries):
              raise Exception(f"Current files: {files}, \
                  {str(len(self.queries) - len(files))} files missing.")
  
          return files
  
      '''
      We need an independent sftp connection for each thread
      '''
      def _get_sftp_client(self):
          # use cnopts to avoid man-in-middle attack, this is vital if you implement a sftp client
          cnopts = pysftp.CnOpts(knownhosts = '/known_hosts')
  
          _sftpclient = pysftp.Connection(self.host, username = self.uname, password = self.upwd, cnopts = cnopts)
          return _sftpclient
  
      '''
      upload csv to ftp server
      '''
      def _sftp_csv(self, csv_names: List[str]) -> None:
          sftp = self._get_sftp_client()
          remote_wd = "./my-awesome-wd/"
          if not sftp.exists(remote_wd):
              sftp.mkdir(remote_wd)
  
          def thread_upload(csv_name: str) -> None:
              try:
                  # gzip local csv and append .gz suffix
                  local_csv_path = f"{self.csv_path}/{csv_name}"
                  os.system(f"gzip {local_csv_path}")
                  local_gz_path = local_csv_path + ".gz"
                  # establish sftp connection and put the file
                  sftp = self._get_sftp_client()
                  sftp.cwd(remote_wd)
                  sftp.put(local_gz_path)
                  # get size for both local and remote for checking
                  local_size = os.stat(local_gz_path).st_size
                  remote_size = sftp.stat(csv_name + ".gz").st_size
                  with self._lock:
                      # increment finished count
                      self.n_uploaded += 1
                      print(f"Upload {local_gz_path} ({local_size} bytes) completed({self.n_uploaded} / {len(csv_names)}).")
                  if local_size != remote_size:
                      raise Exception(f"    {local_gz_path} upload failed with different file size as remote.")
  
              except Exception as e:
                  print(e)
                  print(f"  Error while uploading {new_name}, skipped.")
  
          with concurrent.futures.ThreadPoolExecutor(max_workers = len(csv_names)) as executor:
              executor.map(thread_upload, csv_names)
          print("Upload complete")
  
  ```

Okay, now we have 2 callables ready to be called by our dag. Let's start implement the dag.

#### 2. Airflow Dag

```python
"""
Created on Tue Sep 14 2021
@author: Me
"""

# system imports
import sys
from datetime import datetime, timedelta

#airflow imports
from airflow.operators.bash_operator import BashOperator
from airflow.operators.python_operator import PythonOperator
from airflow import DAG

# local imports
# This line is optional, I add it for notifying the task failure to our slack channel
from SlackNotification import task_fail_slack_alert 

# Import our callables. If you don't have your snowflake scripts 
#   as a environment variable in python please add 
#   it otherwise this import will not work.
from MyJob.CsvDownload import CsvDownloadCallable
from MyJob.CsvLoader import CsvLoadCallable

args = {
    'owner': 'Me',
    'email': ['Me@myemail.com'],
    'depends_on_past': False,
    'start_date': datetime(2021,9,1),
    'on_failure_callback': task_fail_slack_alert,
    'retries': 1,
    'retry_delay': timedelta(minutes=1),
}

dag = DAG(
    dag_id='My_Awesome_Dag', default_args=args,schedule_interval='0 3 * * *')

'''
functions:
  - download_auditing_queries_from_snowflake
  - upload_csv_to_remote
workflow:
  1. load queries from snowflake and write result to local as csv
  2. examine the csv downloaded from snowflake by CsvDownload, compress them and sftp 
        to the server
'''
# defince path where csv is stored
csv_path = "my/local/csv/path" 

# get callables from each class
cdc = CsvDownloadCallable(csv_path=csv_path)
clc = CsvLoadCallable(csv_path=csv_path)

# We pass execution date to our tasks through provide_context, where it will pass a 
#   parameter named templates_dict to our call function. From there we can access
#   all templated fields provided by airflow.
download_queries_from_snowflake = PythonOperator(
    task_id = 'Download_Csv',
    dag = dag,
    python_callable = cdc,
    provide_context = True,
    templates_dict = {
      'execution_date': '{{ ds }}'
    }
)

upload_csv_to_remote = PythonOperator(
  task_id = 'Upload_Csv_To_Remote',
  dag = dag,
  python_callable = clc,
  provide_context = True,
  templates_dict = {
    'execution_date': '{{ ds }}'
  }
)

download_queries_from_snowflake >> upload_csv_to_remote
```



The implementation of airflow dag is quite straight forward.  By using the `template_dict` api, it allows you to [templated fields(or macros)](https://airflow.apache.org/docs/apache-airflow/stable/macros-ref.html#default-variables)  defined by airflow.

Additionally, we need to pay extra attention to how schedule is defined by airflow. For example, if you set your schedule by cron like I did, `0 3 * * *`, which means on the 3 a.m. for each month, and with `start_date: datetime(2021, 9, 1)`, the job will not run until the 1st of Oct. And at the runtime, you will get the execution date as `2021-09-01` . Samely, the job triggered on 1st of Nov will have execution date `2021-10-01`, this is something we should keep in mind.

