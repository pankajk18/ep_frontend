import React from 'react'
import stepImg from '../assets/about-pages/ep_step.webp'

export default function Process() {
    return (
        <div className='text-center pt-5' style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 className='fw-bold text-uppercase fs-4' style={{lineHeight:'35px'}}>How do we make disbursements possible in <span className='ms-text-secondary fw-light'>just 10 minutes ? </span></h2>
            <p>We make approvals and disbursements easy, flexible and most importantly, super fast by using 3 simple steps below.</p>
            <img src={stepImg} alt='3 simple steps Emergency Paisa' style={{width:'100%'}}/>
        </div>
    )
}
