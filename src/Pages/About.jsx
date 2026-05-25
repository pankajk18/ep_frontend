import React from 'react'
import HomeAbout from '../component/HomeAbout'
import BannerBottom from '../component/BannerBottom'
import aboutTop from '../assets/about-pages/ep_about_banner.webp'
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import RadarOutlinedIcon from '@mui/icons-material/RadarOutlined';
import { Helmet } from 'react-helmet';


export default function About() {
    return (
        <>
        <Helmet>
            <title>EmergencyPaisa – Fast & Simple Personal Loan Solutions</title>
            <meta name="description" content="EmergencyPaisa — Apply for fast, paperless personal loans online with quick approval and transparent terms. Get emergency funds instantly with a simple digital application." />
            <link rel="canonical" href="https://emergencypaisa.com/about" />
        </Helmet>
            <div className='ms-hero-banner-sec' style={{ paddingTop: '80px' }}>
                <div className="container">
                    <div className='row  align-items-center'>
                        <div className='col-lg-6'>
                            <div className='ms-banner-heading'>
                                <span className='ms-takeaways ms-bg-secondary'> 24/7 Support</span>
                                {/* <h1>Wallet Loaded Instantly1</h1> */}
                                <h1 className='fs-1 pt-3 fw-semibold'>Wallet Loaded Instantly </h1>
                                <p className='fw-lighter fs-5 pt-3'>From a few clicks to fast cash, we’re on our toes 24*7*365 to help you with instant funds in just 10 minutes.</p>
                            </div>
                        </div>
                        <div className='col-lg-6'>
                            <img src={aboutTop} alt='Wallet Loaded Instantly' className='img-fluid' style={{marginTop:'30'}}/>
                        </div>
                    </div>
                </div>
            </div>
             <BannerBottom />
            <HomeAbout />
            <div className='ms-vision-mission ms-bg-primary'>
                <div className='fluid-container'>
                    <div className='col-lg-12'>
                        <div className="row d-flex" style={{borderBottom:'1px solid rgb(255 255 255 / 27%)'}}>
                        <div className='col-lg-6 align-content-center p-5'>
                            {/* <h3 className='text-white text-uppercase fw-normal'> 
                                <RemoveRedEyeOutlinedIcon style={{fontSize:'60px'}}/> Our Vision</h3> */}
                            <p className='text-white' style={{lineHeight:'30px'}}>Speed & Efficiency: We prioritize quick responses when it matters most.

Trust & Transparency: Clear terms without surprise fees.
Customer-First Service: Support that cares and listens.
Security & Privacy: Robust data protection for your peace of mind. </p>
                        </div>
                        <div className='col-lg-6 order-last' style={{borderLeft:'1px solid rgb(255 255 255 / 27%)'}}>
                        <div className='text-center text-white p-5 '>
                             <RemoveRedEyeOutlinedIcon style={{fontSize:'160px'}}/> <br/>
                                 <h4 className='text-uppercase font-style1'> Our Values</h4>
                        </div>
                           
                       
                            {/* <img className='d-block' src={visionImg} alt='' style={{width:'60%', margin:'0 auto'}}/> */}
                        </div>
                        
                    </div>
                     <div className="row d-flex">
                         <div className='col-lg-6' style={{borderRight:'1px solid rgb(255 255 255 / 27%)'}}>
                         <div className='text-center text-white p-5'>
                             <RadarOutlinedIcon style={{fontSize:'160px'}}/> <br/>
                                 <div className='text-uppercase font-style1'> Our Mission</div>
                        </div>
                             {/* <img className='d-block' src={visionImg} alt='' style={{width:'60%', margin:'0 auto'}}/> */}
                        </div>
                        <div className='col-lg-6 align-content-center p-5'>
                           
                            <p className='text-white' style={{lineHeight:'30px'}}>To empower individuals and families by making emergency financial support accessible, fast, and stress-free - without hidden charges, long wait times, or complicated procedures.</p>
                        </div>
                       
                        
                    </div>
                    </div>
                    
                </div>
            </div>
            
            <div className='row  align-items-center'>
                {/* <div className='col-lg-6'> */}
                    <div className='ms-banner-heading' style={{padding:"30px"}}>
                        {/* <span className='ms-takeaways'> 24/7 Support</span> */}
                        {/* <h1>Wallet Loaded Instantly1</h1> */}
                        <h1 className='fs-1 pt-3 fw-semibold'>What We Stand For </h1>
                        <p className='fw-lighter fs-5 pt-3'>EmergencyPaisa believes that quick access to credit should be simple, trusted, and available to everyone - especially during times of real need. We’re here to help you regain control, reduce financial stress, and move forward with confidence.</p>
                    </div>
                {/* </div> */}
                
            </div>
            
            {/* <WhyChoose /> */}
           
            {/* <div style={{background:(`url(${bgWave})`), backgroundSize:'100%', padding:'100px 0'}}>dsdasdasd</div> */}
            {/* <div className='ms-hero-banner-sec' style={{ height:'10px'}}></div> */}
            {/* <img src={bgWave} alt='' className='' style={{marginTop:'-10px', transform:'rotate(180deg)', height:'200px', width:'100%'}}/> */}





        </>
    )
}