import React from 'react'
import privacyImg from '../assets/privacyImg.png'
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import StorefrontIcon from '@mui/icons-material/Storefront';
import SpeedIcon from '@mui/icons-material/Speed';
import { Helmet } from 'react-helmet';


export default function RateandTerm() {

    const styles = {
        container: {
            display: 'flex',
            justifyContent: 'space-around',
            flexWrap: 'wrap',
            padding: '30px',
            backgroundColor: '#f5f9fb',
        },
        card: {
            backgroundColor: '#fff',
            border: '1px solid #ccc',
            borderRadius: '10px',
            width: '30%',
            minWidth: '280px',
            margin: '10px',
            padding: '20px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        },
        heading: {
            color: '#007b8f',
            marginBottom: '15px',
        },
        paragraph: {
            margin: '10px 0',
            lineHeight: '1.5',
        },
        list: {
            paddingLeft: '20px',
        },
        listItem: {
            marginBottom: '8px',
        },
    };
    return (
        <>

        <Helmet>
            <title>EmergencyPaisa Loan Rates & Terms</title>
            <meta name="description" content="See EmergencyPaisa’s rate & terms for instant personal loans: interest, charges, repayment plans and conditions to help you borrow with confidence." />
            <link rel="canonical" href="https://emergencypaisa.com/rate-and-terms" />
        </Helmet>

           <div className='ms-hero-banner-sec' style={{ paddingTop: '80px' }}>
                <div className="container">
                    <div className='row  align-items-center'>
                        <div className='col-lg-6'>
                             <div className='ms-banner-heading'>  
                                 <span className='ms-takeaways ms-bg-secondary'> Information Kept Confidential</span>                             
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
            <div className='container pt-5'>
                <h1>How is the annual percentage rate (APR) determined?</h1>
                <p className='mb-4 fw-medium'>The Annual Percentage Rate (APR) for loans is determined by several factors, including:</p>
                <div className='row'>
                    <div className='col-lg-4 mb-4 '>
                        <div className='box p-4'>
                            <div className='d-flex justify-content-start align-items-center'>
                                <div className='icons-data d-flex align-items-center justify-content-center'>
                                    <CurrencyRupeeIcon color='#fff' />
                                </div>
                                <h5 className='p-2 text-uppercase'>Interest Rate</h5>
                            </div>
                            <p>The base interest rate charged by the lender on the loan amount.</p>
                        </div>
                    </div>

                    <div className='col-lg-4 mb-4 '>
                        <div className='box p-4'>
                            <div className='d-flex justify-content-start align-items-center'>
                                <div className='icons-data d-flex align-items-center justify-content-center'>
                                    <AccessTimeIcon color='#fff' />
                                </div>
                                <h5 className='p-2 text-uppercase'>Loan Term</h5>
                            </div>
                            <p>The length of time over which the loan will be repaid. Longer terms may have different rates.</p>
                        </div>
                    </div>
                    <div className='col-lg-4 mb-4 '>
                        <div className='box p-4'>
                            <div className='d-flex justify-content-start align-items-center'>
                                <div className='icons-data d-flex align-items-center justify-content-center'>
                                    <CurrencyRupeeIcon color='#fff' />
                                </div>
                                <h5 className='p-2 text-uppercase'>Fees and Charges</h5>
                            </div>
                            <p>Any additional fees, such as origination fees, or other charges that may apply to the loan.</p>
                        </div>
                    </div>
                    <div className='col-lg-4 mb-4'>
                        <div className='box p-4'>
                            <div className='d-flex justify-content-start align-items-center'>
                                <div className='icons-data d-flex align-items-center justify-content-center'>
                                    <SpeedIcon color='#fff' />
                                </div>
                                <h5 className='p-2 text-uppercase'>Credit Score</h5>
                            </div>
                            <p>The borrower's credit score & history, which can influence the interest rate offered by the lender.</p>
                        </div>
                    </div>
                    <div className='col-lg-4 mb-4'>
                        <div className='box p-4'>
                            <div className='d-flex justify-content-start align-items-center'>
                                <div className='icons-data d-flex align-items-center justify-content-center'>
                                    <CurrencyRupeeIcon color='#fff' />
                                </div>
                                <h5 className='p-2 text-uppercase'>Loan Amount</h5>
                            </div>
                            <p>The total amount of the loan, as higher loan amounts might have different rate structures.</p>
                        </div>
                    </div>
                    <div className='col-lg-4 mb-4'>
                        <div className='box p-4'>
                            <div className='d-flex justify-content-start align-items-center'>
                                <div className='icons-data d-flex align-items-center justify-content-center'>
                                    <StorefrontIcon color='#fff' />
                                </div>
                                <h5 className='p-2 text-uppercase'>Market Conditions</h5>
                            </div>
                            <p>Prevailing economic and market conditions can impact the interest rates offered by lenders.</p>
                        </div>
                    </div>
                </div>

                <div className='ben_wrapper pt-5'>
                    <h3 className='pb-1'>How Do Our Rates and Fees Work?</h3>
                    <p className='fw-medium'>At EmergencyPaisa, we strive to offer transparent and competitive rates and fees to our customers. Here's how our rates and fees structure works</p>
                    <ul>
                        <li> <strong>Interest Rate:</strong> Our loans come with a competitive interest rate that is determined based on several factors, including the loan amount, loan term, and your creditworthiness.</li>
                        <li><strong> Annual Percentage Rate (APR):</strong> The APR includes the interest rate as well as any additional fees or charges associated with the loan. It provides a comprehensive view of the total cost of the loan on an annual basis, making it easier for you to compare different loan offers.</li>
                        <li> <strong>Origination Fees:</strong> In some cases, we may charge an origination fee for processing your loan application. This fee is typically a percentage of the loan amount and is deducted from the loan disbursement.</li>
                        <li> <strong>Late Payment Fees:</strong> If you miss a payment or fail to make a payment by the due date, a late payment fee may be charged. We encourage timely payments to avoid these additional charges.</li>
                        <li> <strong>Prepayment Penalties:</strong> At EmergencyPaisa, we do not charge any prepayment penalties. You can repay your loan early without any extra charges, allowing you to save on interest costs.</li>
                        <li> <strong>Processing Fees:</strong> Depending on the type of loan and the specific terms, there may be a one-time processing fee to cover administrative costs.</li>
                    </ul>
                </div>
            </div>
            <div className='benifit-data'>
                <div className='container'>
                    <h3 className='mb-4'>Why Choose EmergencyPaisa</h3>
                    <div className='row'>
                        <div className='col-lg-4 d-flex align-items-center'>
                            {/* <div className='step-data'>01</div> */}
                            <div className='step-info'>
                                <h3>Transparent Pricing</h3>
                                <p>No hidden charges or unexpected fees.</p>
                            </div>
                        </div>
                        <div className='col-lg-4 d-flex align-items-center'>
                            {/* <div className='step-data'>02</div> */}
                            <div className='step-info'>
                                <h3>Competitive Rates</h3>
                                <p>We offer some of the best rates in the industry.</p>
                            </div>
                        </div>
                        <div className='col-lg-4 d-flex align-items-center'>
                            {/* <div className='step-data'>03</div> */}
                            <div className='step-info'>
                                <h3>Flexible Terms</h3>
                                <p>Tailored loan terms to suit your financial needs.</p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            {/* <div className='container'>
                <div className='term-wrap'>
                    <h4>Representative Example</h4>
                    <p className='fw-semibold'>Here’s an example to help you understand how our rates and fees work:</p>
                    <p> <strong> Loan Amount:</strong> ₹1,00,000</p>
                    <p> <strong>Loan Term: </strong> 12 months Annual Interest</p>
                    <p> <strong>Rate:</strong> 12% Origination </p>
                    <p> <strong>Fee: </strong> 2% of the loan amount Monthly{" "}</p>
                    <p> <strong>EMI: </strong> ₹8,885 Total Interest </p>
                    <p> <strong> Payable: </strong> ₹6,000 Total Amount</p>
                    <p><strong>Repayable: </strong> ₹1,06,000</p>
                    <p> <strong>APR: </strong>14.25%</p>

                    <div className='row mt-5'>
                        <div className="table-wrapper table-responsive">
                            <table className='table table-bordered'>
                                <thead className='thead-light'>
                                    <tr>
                                        <th className='bg-dark text-white'>Principal Loan Amount:</th>
                                        <th className='bg-dark text-white'>Origination Fee</th>
                                        <th className='bg-dark text-white'>Disbursed Amount</th>
                                        <th className='bg-dark text-white'>Monthly EMI</th>
                                        <th className='bg-dark text-white'>Total Interest Payable</th>
                                        <th className='bg-dark text-white'>Total Amount Repayable</th>
                                        <th className='bg-dark text-white'>APR</th>

                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>₹1,00,000</td>
                                        <td>₹2,000 (2% of ₹1,00,000)</td>
                                        <td>₹98,000 (₹1,00,000 - ₹2,000)</td>
                                        <td>₹8,885</td>
                                        <td>₹6,000</td>
                                        <td>₹1,06,000 (Principal + Interest)</td>
                                        <td> 14.25%</td>

                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div> */}

            <div style={styles.container}>
                <div style={styles.card}>
                    <h2 style={styles.heading}>Amount</h2>
                    <p style={styles.paragraph}>
                        Minimum Amount : 5000/-<br />
                        (Five Thousand Rupees)
                    </p>
                    <p style={styles.paragraph}>
                        Maximum Amount : 100000/-<br />
                        (One Lakh Rupees)
                    </p>
                </div>

                <div style={styles.card}>
                    <h2 style={styles.heading}>Charges</h2>
                    <p style={styles.paragraph}>Rate Of Interest (0.25 - 1) % Per Day<br />Processing Fee 10% <br/>Maximum APR 35% Per Annum</p>
                    <p style={styles.paragraph}>No Partial Payment Charges</p>
                    <p style={styles.paragraph}>No Preclosure Charges</p>
                    {/* <p style={styles.paragraph}>
                        In case of non-repayment of EMI on due date, there would be late payment penal charge 10% + applicable taxes on the overdue principal. <br />
                        Example - In case of Delay: Loan amount of Rs 10000 would have Penal Charge levied on System Generated Date every month on overdue principal of EMI.
                    </p> */}
                </div>

                <div style={styles.card}>
                    <h2 style={styles.heading}>Document</h2>
                    <ul style={styles.list}>
                        <li style={styles.listItem}>Last Three Month's Salary Account Statement</li>
                        <li style={styles.listItem}>Pan Card</li>
                        <li style={styles.listItem}>Last 1 Month's Electricity Bill/Phone Bill</li>
                        <li style={styles.listItem}>Latest Three Month's Salary Slip</li>
                        <li style={styles.listItem}>For Address Proof:
                            <ul style={styles.list}>
                                <li style={styles.listItem}>Aadhaar Card</li>
                                <li style={styles.listItem}>Passport</li>
                                <li style={styles.listItem}>Voter Id Card</li>
                                <li style={styles.listItem}>Rent Agreement</li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>


        </>
    )
}
