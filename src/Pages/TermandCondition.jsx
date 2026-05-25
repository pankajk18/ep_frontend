import React from 'react'

import MailIcon from '@mui/icons-material/Mail';
import CallIcon from '@mui/icons-material/Call';
// import privacyImg from '../assets/privacyImg.png'
// import termImg from '../assets/termandcondition.png'
import termImg from '../assets/termandcondition.png'
import { Link } from 'react-router-dom';
function TermandCondition() {
    return (
        <>
            <div className='ms-hero-banner-sec' style={{ paddingTop: '80px' }}>
                <div className="container">
                    <div className='row  align-items-center'>
                        <div className='col-lg-6'>
                            <div className='ms-banner-heading'>
                                <span className='ms-takeaways'> Well Defined Conditions</span>
                                <h1 className='fs-1 pt-3 fw-semibold'>Transparent Terms and Conditions</h1>
                                <p className='fw-lighter' style={{ fontSize: '20px' }}>By choosing us, you agree to our terms and conditions. Read below to gain insights into them.</p>
                            </div>
                        </div>
                        <div className='col-lg-6'>
                            <img src={termImg} alt='' className='img-fluid' />
                        </div>
                    </div>
                </div>
            </div>


            <div className='container pt-5 term-wrap'>
                <h2>Terms and Conditions</h2>
                <p className='fw-medium'>
                    Welcome to the Emergency Paisa website, operated by SUBURBAN FINANCE AND INVESTMENT PRIVATE LIMITED("we", "us", "our"). By accessing or using our website ("Site") and services ("Services"), you agree to be bound by the following terms and conditions ("Terms"). Please read them carefully.</p>


                <h4 className='mt-4'> <span className=' fw-medium'> 01.</span> Acceptance of Terms</h4>
                <p>By accessing or using the Site and Services, you agree to comply with these Terms. If you do not agree with any part of these Terms, you may not use the Site and Services.</p>

                <h4 className='mt-4'> <span className=' fw-medium'> 02.</span> Eligibility</h4>
                <p>You must be at least 18 years old and a resident of India to use the Site and Services. You must have a valid bank account in India.</p>

                <h4 className='mt-4'>  <span className=' fw-medium'> 03.</span> Loan Application</h4>
                <p>You may apply for loans ranging from ₹5,000 to ₹1,00,000 through the Site. The repayment period for the loan can be up to 40 days. The monthly interest rate for loans is up to 30%. All applications are subject to approval based on our assessment criteria.</p>

                <h4 className='mt-4'> <span className=' fw-medium'> 04.</span> Loan Approval and Disbursement</h4>
                <p>Once your loan application is approved, the loan amount will be credited to your designated bank account. Approval and disbursement times may vary based on the completeness and accuracy of your application and documents.</p>

                <h4 className='mt-4'> <span className=' fw-medium'> 05.</span>Repayment Terms</h4>
                <p>You agree to repay the loan amount along with applicable interest in accordance with the repayment schedule provided in your loan agreement. Failure to repay on time may result in additional charges, legal actions, and may affect your credit score.</p>

                <h4 className='mt-4'> <span className=' fw-medium'> 06.</span> Interest and Fees</h4>
                <p>The interest rate for the loan will be up to 30% per month. The Annual Percentage Rate (APR) will be calculated as the monthly interest rate annualized. No hidden fees will be charged; all applicable fees and charges will be clearly disclosed during the application process.</p>

                <h4 className='mt-4'> <span className=' fw-medium'> 07.</span> User Obligations</h4>
                <p>You agree to provide accurate and completgitre information during the registration and loan application process. You are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account.</p>

                <h4 className='mt-4'> <span className=' fw-medium'> 08.</span> Prohibited Activities</h4>
                <p>You agree not to engage in any fraudulent activities or provide false information. You agree not to use the Site and Services for any illegal or unauthorized purpose.</p>

                <h4 className='mt-4'> <span className=' fw-medium'> 09.</span> Privacy Policy</h4>
                <p>Our Privacy Policy outlines how we collect, use, and protect your personal information. By using the Site and Services, you agree to our Privacy Policy.</p>

                <h4 className='mt-4'> <span className=' fw-medium'> 10.</span> Intellectual Property</h4>
                <p> All content on the Site, including text, graphics, logos, and images, is the property of SUBURBAN FINANCE AND INVESTMENT PRIVATE LIMITED or its content suppliers and is protected by intellectual property laws. You may not use, reproduce, or distribute any content from the Site without our prior written permission.</p>

                <h4 className='mt-4'> <span className=' fw-medium'> 11.</span> Modification of Terms</h4>
                <p>We reserve the right to modify these Terms at any time. Any changes will be effective immediately upon posting on the Site. Your continued use of the Site and Services after the changes constitutes your acceptance of the revised Terms.</p>


                <h4 className='mt-4'> <span className=' fw-medium'> 12.</span> Termination</h4>
                <p>We may terminate or suspend your access to the Site and Services at any time, without prior notice or liability, for any reason, including if you breach these Terms.</p>

                <h4 className='mt-4'> <span className=' fw-medium'> 13.</span> Limitation of Liability</h4>
                <p>To the maximum extent permitted by law, SUBURBAN FINANCE AND INVESTMENT PRIVATE LIMITED shall not be liable for any indirect, incidental, special, or consequential damages arising out of or in connection with your use of the Site and Services.</p>

                <h4 className='mt-4'> <span className=' fw-medium'> 14.</span> Governing Law</h4>
                <p>These Terms shall be governed by and construed in accordance with the laws of India. Any disputes arising under these Terms shall be subject to the exclusive jurisdiction of the courts located in New Delhi, India.</p>
                <hr style={{ marginTop: '40px', paddingBottom: '20px' }} />
                <h2>Data Deletion Policy</h2>
                <p>At Emergency Paisa, we value your privacy and are committed to ensuring your personal data is handled securely and responsibly. If you wish to delete your account and personal data, please follow the steps below:</p>

                <h5 className='pt-3 pb-2'>How to Delete Your Data</h5>
                <div className='ben_wrapper'>
                    <ul>
                        <li>Open the Emergency Paisa App: Launch the app on your mobile device and log in to your account.</li>
                        <li>Go to Account Settings: Navigate to the "Settings" or "Account" section from the main menu.</li>
                        <li>Request Data Deletion: Find the option labeled "Delete Account" or "Request Data Deletion." Tap on it and follow the on-screen instructions.</li>
                        <li>Confirm Deletion: You will be asked to confirm your decision. Please note that this action is irreversible. Once confirmed, your account and all associated data will be permanently deleted from our servers.</li>
                    </ul>
                </div>


                <h4>What Happens Next?</h4>
                <p className='pt-3'> <strong>Processing Time:</strong> Your data deletion request will be processed within [specific time frame, e.g., 7-14 days].
                    <br />
                    <strong>Email Confirmation:</strong> You will receive an email confirmation once your data has been successfully deleted.
                </p>

                <h5 className='pt-3 pb-2'>Important Considerations</h5>
                <div className='ben_wrapper'>
                    <ul>
                        <li>Open the Emergency Paisa App: Launch the app on your mobile device and log in to your account.</li>
                        <li>Go to Account Settings: Navigate to the "Settings" or "Account" section from the main menu.</li>
                        <li>Request Data Deletion: Find the option labeled "Delete Account" or "Request Data Deletion." Tap on it and follow the on-screen instructions.</li>
                        <li>Confirm Deletion: You will be asked to confirm your decision. Please note that this action is irreversible. Once confirmed, your account and all associated data will be permanently deleted from our servers.</li>
                    </ul>
                </div>


                <hr style={{ marginTop: '0px', paddingBottom: '20px' }} />
                <h2>Contact Us</h2>
                <p className='fw-medium'>If you have any questions or concerns about these Terms, please contact us at:</p>

                <h4>Suburban Finance and Investment Private Limited</h4>
                <p className='pt-3' style={{ fontSize: '20px', lineHeight: '40px' }}><MailIcon className='ms-text-primary'/> <Link className='text-decoration-none' to='mailTo:info@emergencypaisa.com'>info@emergencypaisa.com</Link>
                    <br></br>
                    <CallIcon className='ms-text-primary' /> <Link className='text-decoration-none' to='tel:9821388824'>  +91: 9821388824</Link>
                </p>

                <p className='pb-4'>By using our services, you acknowledge that you have read, understood, and agree to be bound by these Terms & Conditions. If you do not agree to these Terms, please do not use our services.</p>


            </div>
        </>
    )
}

export default TermandCondition
