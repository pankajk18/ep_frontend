import React from 'react'
import LoanCal from './LoanCal'
import Loanbtn from './Loanbtn'
import BannerBottom from './BannerBottom'
import { Link } from 'react-router-dom'

const LoanBtnData = [
    {
        icon: '',
        url: 'abc.com',
        text: 'Apply Now '
    }
]

export default function HeroBanner() {
    return (
        <>
            <div className='ms-hero-banner-sec'>
                <div className="container">
                    <div className='row  align-items-center'>
                        <div className='col-lg-6'>
                            <div className='ms-banner-heading'>
                                <span className='ms-takeaways ms-bg-secondary' style={{fontSize:'24px'}}> Need Urgent Funds?</span>
                                <h1 className='fs-1 pt-3 fw-semibold'>Get up to 1,00,000 Instant Loan in 10 Minutes</h1>
                            </div>
                            <ul className='ms-key-feature'>
                                <li>Quick 10-minute disbursal</li>
                                <li>Lightning-fast approval</li>
                                <li>No CIBIL score required</li>
                                <li>Collateral-free loans</li>
                                <li>Apply from anywhere, anytime</li>
                            </ul>

                            {
                                LoanBtnData.map((item) => {
                                    return (
                                        <Link to='/apply-now'>
                                            <Loanbtn className='btn-apply ms-bg-secondary' title={item.text} />
                                        </Link>
                                    )
                                })
                            }
                        </div>
                        <div className='col-lg-6 mt-sm-5 ms-mobile-mt'>
                            <LoanCal />
                        </div>
                    </div>

                </div>
            </div>
            <BannerBottom />
           
        </>
    )
}
