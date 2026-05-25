import React from 'react'
// import Loanbtn from './Loanbtn'
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
// import CoPresentIcon from '@mui/icons-material/CoPresent';
import { Link } from 'react-router-dom';

export default function HomeServices() {
    return (
        <div className='serviceWrap '>
            <div className='container pt-4 pb-4'>
                <div className='row p-3'>
                    <div className='col-lg-4 pt-4 pb-4'>
                        {/* <div className='tag text-white '>Our Services</div> */}
                        <h3 className='text-white p-2 fw-bold'> Our Loan Options</h3>
                        <p className='text-white pb-3 mt-2' style={{ lineHeight: '30px' }}>

We offer a range of emergency loan choices designed to fit your needs:</p>
                        <Link to='/apply-now' className='btn-paynow ms-bg-secondary'>Apply Now</Link>
                    </div>
                    <div className='col-lg-8 pt-4 pb-4'>
                        <div className='col-lg-12'>
                            <div className='border rounded-3 p-3'>
                                <div className='d-flex justify-content-between'>
                                    <h4 className='text-white'>Flexible Repayment Loan</h4>
                                    <Link to='/emergency-loan'>
                                        <div className='arrow-box rounded-2 ms-bg-secondary'><ArrowOutwardIcon /></div>
                                    </Link>
                                </div>
                                <p className='text-white pt-2'>Repay weekly or monthly - tailored to your financial comfort zone.</p>
                            </div>
                        </div>

                        <div className='row'>
                            <div className='col-lg-6 pt-3 '>
                                <div className='rounded-3 p-4 border'>
                                    <div className='d-flex justify-content-between'>
                                        <h4 className='text-white'>Instant Personal Loan</h4>
                                        <Link to='/instant-personal-loan'>
                                            <div className='arrow-box rounded-2 ms-bg-secondary'><ArrowOutwardIcon /></div>
                                        </Link>
                                    </div>
                                    <p className='text-white pt-2 mb-0'>Flexible unsecured loans for everyday needs - from medical bills to travel emergencies.</p>
                                </div>
                            </div>
                            <div className='col-lg-6 pt-3'>
                                <div className='rounded-3 p-4 border'>
                                    <div className='d-flex justify-content-between'>
                                        <h4 className='text-white'>Short-Term Loan</h4>
                                        <Link to='/short-term-loan'>
                                            <div className='arrow-box rounded-2 ms-bg-secondary'><ArrowOutwardIcon /></div>
                                        </Link>
                                    </div>
                                    <p className='text-white pt-2 mb-0'>Quick access to funds with short repayment cycles for urgent cash needs.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
