import React from 'react'
import DownloadDoneIcon from '@mui/icons-material/DownloadDone';

export default function WhyChoose() {
    const tag = 'Why Choose Us'
    const title = 'We Deal With the Aspects of Financial Solutions'
    const shortDis = 'Emergency Paisa empowers millennials to achieve their desired lifestyle through innovative loan solutions. We stand out in the crowded personal loan market by offering the fastest loans with customer-friendly terms. As an RBI-registered NBFC, we take pride in delighting our customers with the best loan products available. Our experienced leadership and highly skilled team have established us as one of the fastest-growing and most trusted fintech companies in the industry.'
    const whyList = [
        { id: '1', key: 'Emergency Loans' },
        { id: '2', key: 'High Quality Security' },
        { id: '3', key: 'Instant Loans' },
        { id: '4', key: 'Online Loans' },
        { id: '5', key: '24/7 Support' },
        { id: '6', key: 'Short Term Loans' }
    ]
    return (
        <div className='whyChoose-wrap pt-5 pb-5'>
            <div className='container'>
                <div className='row'>
                    <p className='tag' style={{ maxWidth: '155px' }}>{tag}</p>
                    <h4 className='main-heading pb-3'>{title}</h4>
                    <div className='col-lg-12'>

                        <p className='fw-light' style={{ lineHeight: '30px', borderLeft: '8px solid #ddd', paddingLeft: '20px' }}>{shortDis}</p>

                    </div>
                    <div className='col-lg-6 mt-4'>
                        <ul>
                            {
                                whyList.map((topic) => {
                                    return (
                                        <li className='d-flex' key={topic.id}>
                                            <div style={{ backgroundColor: '#126ebc', color: '#fff', padding: '10px', width: '45px', height: '45px', borderRadius: '50%', }}>
                                                <DownloadDoneIcon />
                                            </div>
                                            <h5 className='m-2'>{topic.key}</h5>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </div>
                </div>
            </div>

        </div>
    )
}
