import React from 'react'
import loanterm from '../API/Benifit.json'
import { PiCurrencyInrBold } from "react-icons/pi";

export default function DocumentReq() {
    return (
        <div className='requirement-area'>
            <div className='row'>
                <div className='col-lg-7 doc-req'>
                </div>
                <div className='col-lg-5 doc-req-right'>
                    <h2 className='pb-2'>Documents Required <span style={{ color: 'red' }}>*</span></h2>
                    <p>Applying for a personal loan requires specific documents to verify your identity, income, and repayment capacity. Having these documents ready can help speed up the approval process. Below is a list of essential documents needed for loan application.</p>

                    <ul className='doc-list'>
                        {
                            loanterm.docList.map((doc, ind) => {
                                return (
                                    <li key={doc.id}>{doc.name}</li>
                                )
                            })
                        }
                    </ul>
                </div>
            </div>
            <div className='container'>
                <div className='mx-auto term-wrap'>
                    <h2>Terms and Conditions</h2>
                    <p style={{ fontSize: '18px', lineHeight: '25px', fontWeight: 'normal', marginTop: '25px', color: '#0000008a' }}>
                        Welcome to the EmergencyPaisa website, operated by Suburban Finance and Investment Pvt Ltd ("we", "us", "our"). By accessing or using our website ("Site") and services ("Services"), you agree to be bound by the following terms and conditions.</p>
                </div>
                <div className='row pt-5'>
                    {
                        loanterm.termList.map((termdata) => {
                            return (
                                <div className='col-lg-3' key={termdata.id}>
                                    <div className='rate-inner-box text-center border'>
                                        <span className='font-weight-bold'><PiCurrencyInrBold size={25} /></span>
                                        <span className='font-weight-bold'>{termdata.val}</span>
                                        <h5 className='pt-3'>{termdata.title}</h5>
                                    </div>
                                </div>
                            )
                        })
                    }


                </div>
                <div className='row'>
                    <div className="table-wrapper table-responsive">
                        <table className='table table-bordered'>
                            <thead className='thead-light'>
                                <tr>
                                    <th className='bg-dark text-white'>Loan Amount</th>
                                    <th className='bg-dark text-white'>APR</th>
                                    <th className='bg-dark text-white'>Tenure</th>
                                    <th className='bg-dark text-white'>Processing Fee</th>
                                    <th className='bg-dark text-white'>GST on Processing Fee</th>
                                    <th className='bg-dark text-white'>Amount Disbursed</th>
                                    <th className='bg-dark text-white'>EMI</th>
                                    <th className='bg-dark text-white'>Total Repayment Amount</th>
                                    <th className='bg-dark text-white'>Total Interest</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>₹50,000</td>
                                    <td>35%</td>
                                    <td>12 Months</td>
                                    <td>₹1,000</td>
                                    <td>₹180</td>
                                    <td>₹48,820</td>
                                    <td>₹4,998</td>
                                    <td>₹59,978</td>
                                    <td>₹9,978</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div >
    )
}
