import React from 'react'
import privacyImg from '../assets/privacyImg.png'
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import CallIcon from '@mui/icons-material/Call';
import MailIcon from '@mui/icons-material/Mail';
import LocationPinIcon from '@mui/icons-material/LocationPin';
export default function PrivacyPolicy() {
    return (
        <>
            
            <div className='ms-hero-banner-sec' style={{ paddingTop: '80px' }}>
                <div className="container">
                    <div className='row  align-items-center'>
                        <div className='col-lg-6'>
                             <div className='ms-banner-heading'>  
                                 <span className='ms-takeaways'> Information Kept Confidential</span>                             
                                <h1 className='fs-1 pt-3 fw-semibold'>Secure Borrowing</h1>
                                <p className='fw-lighter' style={{ fontSize: '20px' }}>We’re committed to keeping your personal information highly secure with our cutting-edge technology.</p>
                            </div>
                        </div>
                        <div className='col-lg-6'>
                            <img src={privacyImg} alt='' className='img-fluid' />
                        </div>
                    </div>
                </div>
            </div>
            <div className='container pt-5 term-wrap'>
                <h2>Privacy Policy</h2>
                {/* <p><strong>Last Updated:</strong> 09 March 2026</p> */}

                <p>
                    This Privacy Policy describes how EmergencyPaisa (“Platform”, “we”, “our”, or “us”) collects, uses,
                    processes, stores, and discloses information obtained from users (“User”, “you”, or “your”) who access
                    or use our website, mobile application, or related services.
                </p>

                <p>
                    EmergencyPaisa is a digital platform that facilitates short-term credit services in partnership with
                    Suburban Finance and Investment Private Limited, a Non-Banking Financial Company (“NBFC”) registered
                    under the applicable laws of India.
                </p>

                <p>
                    By accessing, registering, or using our services, you consent to the collection, storage, and use of your
                    information as described in this Privacy Policy.
                </p>

                <h3 className='pt-4'>1. Scope of this Policy</h3>
                <p>This Privacy Policy applies to all users who:</p>

                <ul>
                    <li>Access the EmergencyPaisa website</li>
                    <li>Use the EmergencyPaisa mobile application</li>
                    <li>Apply for loan services through the platform</li>
                    <li>Interact with customer support or marketing communications</li>
                </ul>

                <p>This policy governs the handling of personal information collected through:</p>

                <ul>
                    <li>Website</li>
                    <li>Mobile application</li>
                    <li>Customer service interactions</li>
                    <li>Third-party integrations</li>
                    <li>Marketing and analytics platforms</li>
                </ul>

                <h3 className='pt-4'>2. Information We Collect</h3>
                <p>
                    To provide our services, we collect different categories of information depending on your interaction
                    with the platform.
                </p>

                <h4>2.1 Personal Identification Information</h4>
                <p>We may collect the following personal details:</p>

                <ul>
                    <li>Full name</li>
                    <li>Date of birth</li>
                    <li>Gender</li>
                    <li>Mobile number</li>
                    <li>Email address</li>
                    <li>Residential and permanent address</li>
                    <li>PAN number</li>
                    <li>Aadhaar number (where permitted by law)</li>
                    <li>Photograph or selfie for identity verification</li>
                </ul>

                <p>These details are collected during user registration and loan application.</p>

                <h4>2.2 KYC Information</h4>
                <p>To comply with regulatory requirements, we collect Know Your Customer (KYC) information including:</p>

                <ul>
                    <li>PAN card</li>
                    <li>Aadhaar card</li>
                    <li>Government-issued identity proof</li>
                    <li>Address proof</li>
                    <li>Live selfie verification</li>
                    <li>Video KYC where applicable</li>
                </ul>

                <p>This information may be verified using authorized KYC verification partners.</p>

                <h4>2.3 Financial Information</h4>
                <p>To evaluate your loan application and process disbursement, we may collect:</p>

                <ul>
                    <li>Bank account number</li>
                    <li>IFSC code</li>
                    <li>Bank statements</li>
                    <li>Income proof</li>
                    <li>Employment details</li>
                    <li>Salary slips</li>
                    <li>Transaction information</li>
                    <li>Credit bureau data</li>
                </ul>

                <h4>2.4 Device and Technical Information</h4>
                <p>When you access our website or mobile application, we may automatically collect technical information such as:</p>

                <ul>
                    <li>Device model</li>
                    <li>Device operating system</li>
                    <li>IP address</li>
                    <li>Browser type</li>
                    <li>Mobile network information</li>
                    <li>Device identifiers</li>
                    <li>App usage behavior</li>
                    <li>Crash logs and diagnostic data</li>
                </ul>
                <p>This helps us maintain platform security and improve services.</p>

                <h4>2.5 Location Information</h4>

                <p>With your permission, we may collect location data to:</p>

                <ul>
                    <li>Detect fraudulent activity</li>
                    <li>Verify user identity</li>
                    <li>Improve risk assessment</li>
                    <li>Enhance security</li>
                </ul>

                <p>Location access may include:</p>

                <ul>
                    <li>GPS location</li>
                    <li>Approximate location based on IP address</li>
                </ul>

                <h4>2.6 Communication Information</h4>
                <p>If you contact us via email, chat, phone, or other communication channels, we may collect:</p>

                <ul>
                    <li>Communication records</li>
                    <li>Support queries</li>
                    <li>Feedback and complaints</li>
                    <li>Call recordings for quality monitoring</li>
                </ul>

                <h3>3. How We Use Your Information</h3>

                <p>The information we collect is used for the following purposes:</p>

                <ul>
                    <li><strong>Identity Verification</strong> – To verify your identity and complete KYC requirements.</li>
                    <li><strong>Loan Processing</strong> – To evaluate loan applications and determine eligibility.</li>
                    <li><strong>Loan Disbursement and Repayment</strong> – For loan processing and repayment tracking.</li>
                    <li><strong>Fraud Prevention</strong> – To detect and prevent fraudulent activities.</li>
                    <li><strong>Compliance with Regulations</strong> – To comply with legal obligations.</li>
                    <li><strong>Customer Support</strong> – To respond to user queries and complaints.</li>
                    <li><strong>Platform Improvement</strong> – To analyze user behavior and improve services.</li>
                    <li><strong>Marketing and Communication</strong></li>
                </ul>

                <p>Notifications may include:</p>

                <ul>
                    <li>Loan status updates</li>
                    <li>Payment reminders</li>
                    <li>Promotional offers</li>
                    <li>Product updates</li>
                </ul>

                <p>You may opt out of marketing communications at any time.</p>

                <h3>4. Legal Basis for Processing</h3>
                <p>We process personal information based on:</p>

                <ul>
                    <li>Your consent when registering</li>
                    <li>Performance of contractual obligations</li>
                    <li>Compliance with legal requirements</li>
                    <li>Legitimate business interests</li>
                </ul>

                <h3 >5. Sharing and Disclosure of Information</h3>
                <p>We may share your information with the following parties:</p>

                <h4>NBFC Partner</h4>

                <p>
                    Your loan application and personal data may be shared with Suburban Finance and Investment Private
                    Limited for:
                    <ul>
                        <li>Credit underwriting</li>
                        <li>Loan approval</li>
                        <li>Disbursement</li>
                        <li>Servicing</li>
                        <li>Collections</li>
                    </ul>
                </p>

                <h4>Service Providers</h4>
                <p>We may share data with trusted third-party vendors who assist us in operating our platform including:</p>

                <ul>
                    <li>KYC verification partners</li>
                    <li>Payment gateway providers</li>
                    <li>Technology service providers</li>
                    <li>Cloud hosting providers</li>
                    <li>Analytics platforms</li>
                    <li>Communication service providers</li>
                    <li>Customer support vendors</li>
                </ul>

                <p>These entities are contractually obligated to protect your data.</p>

                <h4>Credit Bureaus</h4>

                <p>We may share loan and repayment information with credit bureaus and financial institutions as required under applicable laws.</p>

                <h4>Regulatory Authorities</h4>

                <p>
                    Information may be disclosed to government:
                    <ul>
                        <li>Authorities</li>
                        <li>Regulators</li>
                        <li>Law enforcement agencies</li>
                        <li>Courts</li>
                        <li>Tribunals</li>
                    </ul>
                    if required by law.
                </p>

                <h3 className='pt-4'>6. Cookies and Tracking Technologies</h3>

                <p>EmergencyPaisa uses cookies and similar technologies to enhance user experience.

Cookies help us:</p>

                <ul>
                    <li>Maintain secure login sessions</li>
                    <li>Understand website traffic</li>
                    <li>Analyze user behavior</li>
                    <li>Personalize content</li>
                </ul>
                <p>Users may modify browser settings to disable cookies; however, some platform features may not function properly.</p>

                <h3 className='pt-4'>7. Data Security</h3>

                <p>We implement industry-standard security measures to protect personal information.

Security safeguards include:</p>

                <ul>
                    <li>Secure socket layer (SSL) encryption</li>
                    <li>Access control mechanisms</li>
                    <li>Data encryption</li>
                    <li>Firewall protection</li>
                    <li>Security audits</li>
                </ul>
                <p>Despite these measures, no digital platform can guarantee absolute security.</p>

                <h3 className='pt-4'>8. Data Retention</h3>

                <p>
                    We retain personal information as long as required to:
                    <ul>
                        <li>Provide our services</li>
                        <li>Fulfill contractual obligations</li>
                        <li>Comply with regulatory requirements</li>
                        <li>Resolve disputes and enforce agreements</li>
                    </ul>
                </p>
                <p>Even after account closure, certain information may be retained as required under financial regulations.</p>

                <h3 className='pt-4'>9. User Rights</h3>
                <p>Subject to applicable laws, users may have the right to:</p>

                <ul>
                    <li>Access personal information</li>
                    <li>Request correction of inaccurate data</li>
                    <li>Withdraw consent</li>
                    <li>Request deletion of personal data</li>
                    <li>Opt out of marketing communications</li>
                </ul>
                <p>Requests may be submitted through our support channels.</p>

                <h3 className='pt-4'>10. Third-Party Links</h3>

                <p>
                    Our platform may contain links to external websites. EmergencyPaisa is not responsible for the privacy practices or policies of such third-party websites.

Users are advised to review the privacy policies of those websites independently.
                </p>

                <h3 className='pt-4'>11. Children's Privacy</h3>

                <p>
                    EmergencyPaisa services are intended for individuals aged 18 years and above. We do not knowingly
                    collect personal information from minors.
                </p>

                <h3 className='pt-4'>12. Changes to Privacy Policy</h3>

                <p>
                    EmergencyPaisa reserves the right to modify this Privacy Policy at any time. Updated versions will
                    be posted on this page.
                </p>

                <h3 className='pt-4'>13. Grievance Officer</h3>

                <p>
                   In accordance with applicable laws, users may contact our grievance officer for any privacy concerns.
                </p>

                <p>
                    <strong>Email:</strong> info@emergencypaisa.com <br />
                    <strong>Website:</strong> https://emergencypaisa.com <br />
                    Response Time: Within 30 working days.
                </p>

                <h3 className='pt-4'>14. Contact Information</h3>

                <p>If you have questions regarding this Privacy Policy, please contact:</p>

                <p>
                    EmergencyPaisa In association with Suburban Finance and Investment Private Limited <br/>
                    Website: https://emergencypaisa.com <br/>
                    Email: info@emergencypaisa.com
                </p>

                <h3 className='pt-4'>Annexure a.</h3>

                <h4 >APP PERMISSIONS AND DATA COLLECTION</h4>

                <p>
                Our mobile application requires certain permissions to function effectively and provide you with our services. Below are the specific permissions we request and how the collected data is used:
                </p>

                <p>
                The key data collected from each permission granted in the device and how this data is used is further detailed below:
                </p>

                <h4 >SMS Permissions:</h4>

                <p>
                We may read the headers of all SMS to check the type of sender. We only read the indicative SMS content from 6-digit alpha numerical number for verification purposes. Pertinent information such as sender names, SMS content, received timestamps are periodically collected for the purpose of provision of financial and allied services and the data is transmitted to third parties. This information may be securely transmitted to our Partner NBFCs and authorized service providers, only for the purposes described below.
                </p>

                <p>
                It is important to note that we do not read or analyse personal or OTP messages, except OTP messages sent by us, which are linked to our purpose of use during lifetime of the app installed. This data may be used to verify financial statistics such as income, spending patterns which help us in the credit evaluation and may help us in facilitating higher limits, faster approval rates and for fraud detection & prevention.
                </p>

                <h4>Installed Apps Permissions:</h4>

                <p>
                With your explicit consent, our app may collect metadata about installed and system applications on your device. This information is securely processed through our trusted technology partner, Credeau (www.credeau.com), which provides device-intelligence services to our Partner NBFCs.
                </p>

                <p>This data is used strictly for:</p>

                <ul>
                    <li>Detecting potential fraud (e.g., presence of VPNs, gambling, or other high-risk apps)</li>
                    <li>Supporting identity verification and credit risk assessment</li>
                    <li>Helping the NBFC offer faster credit approvals and more suitable credit limits</li>
                </ul>

                <p>Important safeguards:</p>

                <ul>
                    <li>Only app metadata (name, package, version, install/update time, installer source) is collected.</li>
                    <li>No personal app usage data, messages, files, or content are accessed.</li>
                    <li>The data is not shared or sold for advert</li>
                    <li>
                        Data is stored and processed only in India, in compliance with RBI Digital Lending Directions 2025
                        and the Digital Personal Data Protection Act, 2023.
                    </li>
                </ul>

                <h4>Location Permissions:</h4>

                <p>
                With your explicit consent, our app may request one-time access to your device location. This is used strictly to:
                </p>

                <ul>
                    <li>Determine serviceability of your loan application</li>
                    <li>Reduce risk associated with loan processing</li>
                    <li>Provide pre-approved or customized loan offers</li>
                    <li>Support address verification, better credit risk assessment, and Know Your Customer (KYC) compliance</li>
                </ul>

                <p>
                We do not continuously track your location. Location access is temporary and limited to the purposes stated above.
                </p>

                <h4>Device Permissions:</h4>

                <p>
                With your consent, our app may collect limited device-related information to enhance security and prevent fraud. This may include:
                </p>

                <ul>
                    <li>Device model</li>
                    <li>Operating system version</li>
                    <li>Available RAM and storage</li>
                </ul>

                <p>
                We do not collect permanently identifiable device identifiers (such as IMEI, serial number, or MAC address),
                in full compliance with Google Play policies, RBI Digital Lending Directions 2025, and the Digital Personal
                Data Protection Act, 2023.
                </p>

                <h4>Phone State Permissions:</h4>

                <p>
                Our app may request Phone State permission only with your explicit consent. This is strictly for:
                </p>

                <ul>
                    <li>Verifying that the device has an active SIM and valid network connection at the time of onboarding and disbursement</li>
                    <li>Ensuring the transaction is carried out by the rightful customer and preventing spoofing/fraud</li>
                </ul>

                <p>
                We do not use this permission for call logs, contacts, or any unrelated purposes. All access is carried out
                in line with RBI Digital Lending Framework and applicable Indian privacy laws.
                </p>

                <h4>Camera Permissions:</h4>

                <ul>
                    <li>
                        <strong>What is collected:</strong> Camera access is required for completing eKYC. This allows you to scan or
                        capture identification details and documents digitally, making the process faster and reducing manual errors.
                    </li>
                    <li>
                        <strong>How it is used:</strong> The captured data is used to complete your eKYC verification, validate your
                        identity, and confirm loan eligibility as per regulatory standards.
                    </li>
                </ul>

                <p>We do not collect or store biometric data.</p>

                <p>
                Emergency Paisa App is hosted in India and we ensure that every data or information that we collect from you is
                stored in servers located in India and the same is compliance with all the statutory/regulatory obligations.
                </p>

                <p>
                We display just-in-time consent screens for permissions like SMS, location, phone state, and app list in
                accordance with Google Play policy.
                </p>

            </div>
          
        </>
    )
}
