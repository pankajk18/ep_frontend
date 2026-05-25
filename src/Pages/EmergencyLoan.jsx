import React from 'react'
import Faq from '../component/Faq'
import aa from '../assets/about-pages/emergency-loan-banner.webp'
import serImg from '../assets/about-pages/emergency-loan-img.webp'
import DocumentandEgibility from '../component/DocumentandEgibility'
import Process from '../component/Process'
import BannerBottom from '../component/BannerBottom'
import { Helmet } from 'react-helmet'

export default function EmergencyLoan() { 
  const tag = 'Services'
  const title = 'Emergency Loan'
  return (

    <>
    <Helmet>
      <title>Instant Emergency Loan Online — Quick Approval & Fast Disbursal</title>
      <meta name="description" content="Apply for an emergency loan online with EmergencyPaisa — get quick approval, minimal paperwork, and fast disbursal of funds to cover urgent needs." />
      <link rel="canonical" href="https://emergencypaisa.com/emergency-loan" />
    </Helmet>
      <div className='ms-hero-banner-sec' style={{ paddingTop: '80px' }}>
        <div className="container">
          <div className='row  align-items-center'>
            <div className='col-lg-6'>
              <div className='ms-banner-heading'>
                <span className='ms-takeaways ms-bg-secondary'> Financial Happiness</span>
                <h1 className='fs-1 pt-3 fw-semibold'>Let go of Overthinking </h1>
                <p className='fw-lighter fs-5 pt-3' >Welcome to the world of financial happiness, because we strive to eliminate the financial stress from your life. </p>
              </div>

            </div>
            <div className='col-lg-6'>
              <img src={aa} alt='Financial Happiness' className='img-fluid' />
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
            <p style={{ lineHeight: '30px' }}>Life is highly unpredictable, marked by both ups and downs. A challenging time, such as a sudden medical emergency, tests you from all sides. Strength of character, emotional resilience, grit, endurance, etc, life tests you for everything. However, access to funds in such a precarious time is a real game-changer that boosts your morale and helps you keep going with confidence. At EmergencyPaisa, we truly believe that instant funds are like oxygen to the body and fuel to a vehicle. Therefore, we provide Emergency loans to salaried individuals in just 10 minutes.</p>
            <p style={{ lineHeight: '30px' }}>Our Emergency loans are entirely free from collateral and any hidden charges, so you can confidently choose us in times of financial urgency. Understanding the gravity of an emergency, we’ve designed our Emergency loans to be super fast, highly flexible, and available at your doorstep directly. A 100% digital, paperless process, backed by the integration of cutting-edge technology and the vital experience of lending specialists, remarkably accelerates approvals and disbursements, allowing you to access funds almost instantly.</p>

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
      <div className='container p-5'>
        <DocumentandEgibility />
      </div>
      <div className='container pt-5'>
        <Faq />
      </div>
    </>
  )
}