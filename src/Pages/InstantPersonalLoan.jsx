import React from 'react'
import bannerInst from '../assets/about-pages/ep_instance_loan_banner.webp'
import serImg from '../assets/about-pages/ep_instantloan_img.webp'
import Faq from '../component/Faq'
import DocumentandEgibility from '../component/DocumentandEgibility'
import Process from '../component/Process'
import BannerBottom from '../component/BannerBottom'
import { Helmet } from 'react-helmet'
export default function InstantPersonalLoan() {
  const tag = 'Service'
  const title = 'Instant Loan'
  return (
    <>
    <Helmet>
      <title>Apply for Instant Paperless Personal Loan</title>
      <meta name="description" content="Apply for an instant paperless personal loan online with EmergencyPaisa — quick approval, minimal paperwork, and fast disbursement to help you meet urgent financial needs" />
      <link rel="canonical" href="https://emergencypaisa.com/instant-personal-loan" />
    </Helmet>
      <div className='ms-hero-banner-sec' style={{ paddingTop: '80px' }}>
        <div className="container">
          <div className='row  align-items-center'>
            <div className='col-lg-6'>
              <div className='ms-banner-heading'>
                <span className='ms-takeaways ms-bg-secondary'> Bright Future Ahead</span>
                <h1 className='fs-1 pt-3 fw-semibold'>Empowering Salaried Individuals</h1>
                <p className='fw-lighter fs-5 pt-3'>Let’s take care of your finances. You'd better pave the way for a bright future by focusing on what matters.</p>
              </div>

            </div>
            <div className='col-lg-6'>
              <img src={bannerInst} alt='Bright Future Ahead' className='img-fluid' />
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
            <p style={{ lineHeight: '30px' }}>At times, you may need extra funds, or you may run short of funds right before a necessary expense. For instance, an urgent credit card settlement, piling up utility bills, looming EMIs, due rent, or a last-minute trip with friends or family—all require immediate access to funds. That’s when our ‘Instant Loan’ comes in handy, offering super fast approvals and disbursements, often in just 10 minutes, so that you can confidently cover your expenses on time. At EmergencyPaisa, we aim to streamline the process of borrowing online instant loans by requiring our valued borrowers to apply using only their PAN, Aadhaar, and bank statement details.</p>
            <p style={{ lineHeight: '30px' }}>With minimal documentation, not only the application process but also the evaluation and final disbursement process become easier, quicker, and more user-friendly overall. Secondly, our Instant Loans are unsecured, eliminating the headache of pledging any collateral, such as a car, a bike, a scooty, jewellery, FD papers, etc. The absence of collateral requirements in Instant Loans further strengthens our claim that we are your reliable loan partner for urgent financial needs. Apply for an urgent loan and let us help you overcome your financial hardships by standing shoulder to shoulder with you and building your bright future brick by brick. </p>

          </div>
          <div className='col-lg-5'>
            <img className='img-fluid' src={serImg} alt='Instant Loan' style={{ width: '100%' }} />
          </div>
        </div>
      </div>
      <div className='fluid-container pt-5' style={{ backgroundColor: '#f2f2f2' }}>
        <div className='container'>
          <Process/>
        </div>
      </div>
      <div className='container p-5'>
        <DocumentandEgibility />
      </div>

      <div className='container pt-5'>
        <Faq />
      </div>
    </>
  )
}