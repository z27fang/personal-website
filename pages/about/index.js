import Header from '../../components/header';
import Image from 'next/image';
import WorkContainer from '../../components/about/work-container';
import {bgWrap} from '../pages.module.css';

export default function About() {
    const menuLinks = [
        { href: "/blog/", name: "Blog" },
        { href: "/about/", name: "About" }
    ];

    const jobs = [
        {
            companyName: 'COMPANY 1',
            jobTitle: 'job1',
            jobTime: '1111-11-11 ~ 1111-22-22',
            jobDescription: ['duty1 abcde', 'duty2 defgasdf', 'duty3 fanwekfjnasd']
        },

        {
            companyName: 'Company 2 Long Name',
            jobTitle: 'job2',
            jobTime: '1111-33-33 ~ 1111-44-44',
            jobDescription: ['fff  123321', '111 asdfasdf', '5555 asdfasfsadf']
        },

        {
            companyName: 'Company 2 Long Name',
            jobTitle: 'job2',
            jobTime: '1111-33-33 ~ 1111-44-44',
            jobDescription: ['fff  123321', '111 asdfasdf', '5555 asdfasfsadf']
        },
        {
            companyName: 'Company 2 Long Name',
            jobTitle: 'job2',
            jobTime: '1111-33-33 ~ 1111-44-44',
            jobDescription: ['fff  123321', '111 asdfasdf', '5555 asdfasfsadf']
        },

        {
            companyName: 'Company 2 Long Name',
            jobTitle: 'job2',
            jobTime: '1111-33-33 ~ 1111-44-44',
            jobDescription: ['fff  123321', '111 asdfasdf', '5555 asdfasfsadf']
        },

        {
            companyName: 'Company 2 Long Name',
            jobTitle: 'job2',
            jobTime: '1111-33-33 ~ 1111-44-44',
            jobDescription: ['fff  123321', '111 asdfasdf', '5555 asdfasfsadf']
        },

        {
            companyName: 'Company 2 Long Name',
            jobTitle: 'job2',
            jobTime: '1111-33-33 ~ 1111-44-44',
            jobDescription: ['fff  123321', '111 asdfasdf', '5555 asdfasfsadf']
        },

        {
            companyName: 'Company 2 Long Name',
            jobTitle: 'job2',
            jobTime: '1111-33-33 ~ 1111-44-44',
            jobDescription: ['fff  123321', '111 asdfasdf', '5555 asdfasfsadf']
        },

        {
            companyName: 'Company 2 Long Name',
            jobTitle: 'job2',
            jobTime: '1111-33-33 ~ 1111-44-44',
            jobDescription: ['fff  123321', '111 asdfasdf', '5555 asdfasfsadf']
        }
    ]


    return (
        <div>
            <div className={bgWrap}>
                <Image src="/assets/bg3.jpg"
                    layout="fill"
                    objectFit="cover" />
            </div>

            <Header menuLinks={menuLinks} selectedTab="/about/" />
            <div className="mb-24 mt-28">
                <div className="flex flex-col items-center max-w-6xl mx-auto">
                    {
                        jobs.map(job => 
                            <WorkContainer jobInfo={job}/>)
                    }
                </div>
            </div>
        </div>
    )
}