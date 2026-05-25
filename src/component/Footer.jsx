import React from 'react'
import FooterCard from './FooterCard';
import FooterBottom from './FooterBottom';
import { Link } from 'react-router-dom';
import logoWhite from '../assets/ep_logo_white.png'
import FacebookIcon from '@mui/icons-material/Facebook';
import YouTubeIcon from '@mui/icons-material/YouTube';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';

export default function Footer() {
    const brandName = process.env.REACT_APP_COMPANY_N
    // const brandLogo = process.env.REACT_APP_LOGO
    return (
        <>
            <div className='footer-section-bottom text-white pt-5' style={{ background: '#000' }}>
                <div className='container'>
                    <div className='row mt-4 pb-5 footer'>
                        <div className='col-lg-4'>
                            <Link to='/'><img src={logoWhite} alt={brandName} /></Link>
                            <p className='text-white mt-3'>
                                SUBURBAN FINANCE AND INVESTMENT PRIVATE LIMITED is a Non-Banking Financial Company (NBFC) registered with the Reserve Bank of India (RBI). EmergencyPaisa is the brand name under which the company conducts its lending operations and specializes in meeting customers’ instant financial needs.
                            </p>

                            <Link to='https://www.facebook.com/emergencypaisa' target='_blank' color='#fff' aria-label="facebook" >
                                <FacebookIcon size={50} className='socilthum' />
                            </Link>
                            <Link to='https://www.youtube.com/@EmergencyPaisa' target='_blank' aria-label="Youtube" ><YouTubeIcon size={50} className='socilthum' /></Link>
                            <Link to='https://www.linkedin.com/company/emergencypaisa' target='_blank' aria-label="LinkedIn"><LinkedInIcon size={50} className='socilthum' /></Link>
                            <Link to='https://www.instagram.com/emergency_paisa' target='_blank' aria-label="Instagram"><InstagramIcon size={50} className='socilthum' /></Link>
                        </div>
                        <div className='col-lg-3'>
                            <h4 >Our Services</h4>
                            <ul className='link-text'>
                                <li> <Link to='/short-term-loan'>  <KeyboardArrowLeftIcon />Short Term Loan  </Link></li>
                                <li><Link to='/instant-personal-loan'> <KeyboardArrowLeftIcon />Instant Personal Loan  </Link></li>
                                <li><Link to='/emergency-loan'> <KeyboardArrowLeftIcon />Emergency Loan   </Link></li>

                            </ul>
                        </div>
                        <div className='col-lg-2'>
                            <h4>Quick Link</h4>
                            <ul className='link-text'>
                                <li>
                                    <Link to='/about'> <KeyboardArrowLeftIcon />About</Link>
                                </li>
                                <li>
                                    <Link to='/contact'> <KeyboardArrowLeftIcon />Contact Us</Link>
                                </li>

                                <li>
                                    <Link to='/repay-loan'><KeyboardArrowLeftIcon />Pay Now </Link>
                                </li>
                                <li>
                                    <Link to='/apply-now'>  <KeyboardArrowLeftIcon />Apply Now </Link>
                                </li>
                                <li>
                                    <Link to='/rate-and-terms'> <KeyboardArrowLeftIcon />Rate and Terms </Link>
                                </li>
                                <li>
                                    <Link to='/grievance'> <KeyboardArrowLeftIcon />Grievances</Link>
                                </li>
                                <li>
                                    <Link to='/deletion-policy'> <KeyboardArrowLeftIcon />Deletion Policy</Link>
                                </li>
                                 <li>
                                    <Link to='/fair-practice'> <KeyboardArrowLeftIcon />Fair Practices Code</Link>
                                </li>
                                <li>
                                    <Link to='/code-of-conduct'> <KeyboardArrowLeftIcon />Code of Conduct</Link>
                                </li>
                            </ul>
                        </div>
                        <div className='col-lg-3'>
                            <h4>Contact Us</h4>
                            <FooterCard 
                                static="Our Registered Office" 
                                val={`Floor No.: Seventh Floor
                                Building No./Flat No.: Bearing No. 752
                                Name Of Premises/Building: Netaji Subhash Place
                                Road/Street: Aggarwal Metro Heights
                                Locality/Sub Locality: Pitampura
                                City/Town/Village: New Delhi
                                District: North West Delhi
                                State: Delhi
                                PIN Code: 110034`} 
                            />


                            <p>+91 9821388824</p>


                            <a href="mailto: info@emergencypaisa.com" style={{ color: '#fff', textDecoration: 'none' }}>
                                <p>info@emergencypaisa.com</p></a>



                        </div>
                    </div>
                </div>
            </div>
            <FooterBottom />
            
        </>
    )
}
