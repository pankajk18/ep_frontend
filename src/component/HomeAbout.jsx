import React, { useEffect } from 'react'
import arrowIcon from '../assets/arrow-theme.png'
import about from '../assets/ep_about_img.webp'

import { a } from '../ss'
// import MoveEle from './MoveEle'



export default function HomeAbout() {
    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.13.0/gsap.min.js';
        script.async = true; // or script.defer = true; for deferred loading

        const script1 = document.createElement('script');
        script1.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.13.0/ScrollTrigger.min.js';
        script1.async = true;


        script.onload = () => {
            a()


        };
        document.body.appendChild(script);
        document.body.appendChild(script1);
        return () => {
            // Clean up: remove the script when the component unmounts
            document.body.removeChild(script);
            document.body.removeChild(script1);
        };
    }, [])
    return (
        <>
            <div className='about-wrap container pt-5 mb-4'>
                {/* <MoveEle/>                */}
                <div className='row pt-5 pb-5 d-flex align-content-center'>
                    <div className='col-lg-5 me-auto mb-lg-0 thum-about-order'>
                        <div className='thumb-style-four'>
                            <img src={about} alt='Emergency Loan Partner' className='img-fluid' />
                        </div>
                    </div>

                    <div className='col-lg-7 align-content-center'>
                        <div className='d-flex '>
                            <div className='ms-arrow-icon'>
                                <img src={arrowIcon} alt="EmergencyPaisa" className='img-fluid' />
                            </div>
                            <div className='m-4'>
                                <p className='tag'>About EmergencyPaisa</p>
                                <h2 className='main-heading'>Your Emergency Loan Partner</h2>
                            </div>
                        </div>
                        <p style={{ lineHeight: '30px' }}> 
                           EmergencyPaisa was created with one goal - to provide people with fast, reliable financial support during urgent, unexpected financial situations. We understand that emergencies don’t wait, and neither should your access to funds. <br/>We are a digital lending platform committed to offering a smooth, 100% online loan process with complete transparency and customer care.
                        </p>

                    </div>

                </div>
            </div>

        </>
    )
}