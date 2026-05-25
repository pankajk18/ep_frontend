import React from 'react'
import ctaThum from '../assets/reserve.png'
import { Link } from 'react-router-dom'

export default function CTAApplyNow() {
  return (
    <div className='py-5 mb-5'>
      <div className='container'>
        <div className='p-5 rounded-4 shadow-lg pb-0 ' style={{maxWidth:'1000px', margin:'0 auto', background:"#e0ebf4"}}>
          <div className='row align-items-center'>
            <div className='col-lg-6'>
              <h3 className='fw-bold fs-3' style={{ lineHeight: '40px' }}>Instant Personal Loans When You Need Them Most</h3>
              <Link to='/apply-now' target='_blank'>
              <button className='btn-paynow ms-bg-secondary px-4 py-2 mt-4 mb-5'>
                Loan in 10 minutes
              </button>
              </Link>
            </div>
            <div className='col-lg-6 text-center'>
              <img className='bottom-0 ' style={{right:'0'}}
              src={ctaThum} alt=' Loan in 10 minutes' />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
