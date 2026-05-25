import React from 'react'
// import '../journey/comman-style.css'
// import '../css/comman-style.css'
import { Link } from 'react-router-dom'

export default function FooterWithLogin() {
    return (
        <>
          
            <div className='bg_primary mob-none ' style={{ display: 'none' }}>
                <div className='container'>
                    <div className='row pt-2 pb-2 d-flex align-items-center'>
                        <div className='col-lg-8 col-md-12'>
                            <p className='text-white mb-0 m-p13 '> Copyright RBI Registered NBFC SUBURBAN FINANCE AND INVESTMENT PRIVATE LIMITED</p>
                        </div>
                        <div className='col-lg-4 col-md-12 mob-none'>
                            <ul className='footer d-flex justify-content-end'>
                                <li>
                                    <Link to='/privacy-policy'>Privacy Policy</Link>
                                </li>

                                <li>
                                    <Link to='/terms-and-conditions'>Terms and Conditions</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}
