import React from 'react'
import serImg from '../assets/about-pages/ep-shortterm-img.webp'
import shortImg from '../assets/about-pages/shortterm-banner.webp'
import DocumentandEgibility from '../component/DocumentandEgibility'
import Faq from '../component/Faq'
import Process from '../component/Process'
import BannerBottom from '../component/BannerBottom'
import { Helmet } from 'react-helmet'

export default function ShortTermLoan() {
    const tag = 'Services'
    const title = 'Short Term Loans'
    return (
        <>
        <Helmet>
            <title>Short-Term Personal Loan Online – Instant Cash Loans</title>
            <meta name="description" content="Get quick, hassle-free short-term loans online with EmergencyPaisa — instant approval, transparent terms and fast disbursal to help you manage urgent financial needs efficiently." />
            <link rel="canonical" href="https://emergencypaisa.com/short-term-loan" />
        </Helmet>
            <div className='ms-hero-banner-sec' style={{ paddingTop: '80px' }}>
                <div className="container">
                    <div className='row  align-items-center'>
                        <div className='col-lg-6'>
                            <div className='ms-banner-heading'>
                                <span className='ms-takeaways ms-bg-secondary'> Financial Safety Net</span>
                                <h1 className='fs-1 pt-3 fw-semibold'>Strengthening economic stability</h1>
                                <p className='fw-lighter pt-3 fs-5'>We create a financial safety net so that you can withstand financial challenges or shocks with confidence.</p>
                            </div>
                        </div>
                        <div className='col-lg-6'>
                            <img src={shortImg} alt='' className='img-fluid' />
                        </div>
                    </div>
                </div>
            </div>
             <BannerBottom/>

            <div className='container pt-5 pb-5'>
                <div className="row d-flex align-items-center">
                    <div className='col-lg-7 pb-3'>
                        <p className='tag' style={{ maxWidth: '175px' }}>{tag}</p>
                        <h4 className='main-heading pb-3'>{title}</h4>
                        <p style={{ lineHeight: '30px' }}>Our Short-term Personal Loans are specifically designed to cover small to medium-sized expenses with ease. Whether an unexpected or planned expense, such as a sudden car/bike breakdown, a due rent, monthly utility bills, a home decor/renovation, a vital gadget purchase, festive/wedding shopping, financing a quick getaway, your kid’s school/tuition fee, collage admission costs, or month-end expenses, you can leverage our quick personal loans to navigate budget constraints with ease. </p>
                        <p style={{ lineHeight: '30px' }}>The purpose of such loans is to ensure your personal life is smooth sailing. Even if there are financial hiccups, you can always stay on top of your budget with complete control, rising above even the tightest financial situations. At EmergencyPaisa, we strive to provide you with monetary aid as quickly as possible, with an easy application process that can be completed right from the comfort of your own living room. So what are you waiting for? Take your phone, apply for a loan digitally and bring your life back on track.</p>

                    </div>
                    <div className='col-lg-5'>
                        <img className='img-fluid' src={serImg} alt='' style={{ width: '100%' }} />
                    </div>
                </div>
            </div>

            <div className='fluid-container pt-5' style={{ backgroundColor: '#f2f2f2' }}>
                <div className='container'>
                    <Process/>
                </div>
            </div>
            <div className='container pt-5'>
                <DocumentandEgibility />
            </div>
            <div className='container pt-5'>
                <Faq />
            </div>




        </>
    )
}