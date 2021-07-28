import Header from '../../components/header'
import WorkContainer from '../../components/about/work-container'
import { bgWrap, bgImage } from '../pages.module.css'

export default function About () {
  const menuLinks = [
    { href: '/blog/', name: 'Blog' },
    { href: '/about', name: 'About' }
  ]

  const jobs = [
    {
      companyName: 'Evertz Microsystems',
      jobTitle: 'Data Developer',
      jobTime: 'Jan, 2018 ~ Aug, 2018',
      jobDescription: ['Implemented a internet security scanner on SSL and X-509.',
        'Hooked Logstash with server using its own protocol.',
        'Implemented over 15 independent UI components in Vue.js.']
    },

    {
      companyName: 'CIBC',
      jobTitle: 'Developer',
      jobTime: 'Jan, 2019 ~ Apr, 2019',
      jobDescription: ['Participated in re-factoring a react-native application.',
        'Integrated user activity tracker (Adobe analytics) with the application.',
        'Automated daily excel sheet feeding process to SQL server.']
    },

    {
      companyName: 'The Globe and Mail',
      jobTitle: 'Full-stack Developer',
      jobTime: 'May, 2020 ~ Aug, 2020',
      jobDescription: ['Implemented a JWT authtication system for an internal application.',
        'Implemented the UI for user center function for the application above.',
        'Implemented a Look-a-like model for the above application.']
    },
    {
      companyName: 'The Globe and Mail',
      jobTitle: 'Data Engineer',
      jobTime: 'Sep, 2019 ~ Dec, 2019',
      jobDescription: ['Enahnced data pipeline in airflow and databrick.',
        'Integrated 2 data-models within snowflake.',
        'Conducted EDA on an auto-clustering machine learning model on user behavior.']
    }
  ]

  return (
        <div>
            <div className={bgWrap}>
                <img className={bgImage} src="/assets/bg3.jpg" alt="bg3"/>
            </div>

            <Header menuLinks={menuLinks} selectedTab="/about" />
            <div className="mb-24 mt-28">
                <div className="flex flex-col items-center max-w-full mx-auto">
                    {
                        jobs.map(job =>
                            <WorkContainer jobInfo={job}/>)
                    }
                </div>
            </div>
        </div>
  )
}
