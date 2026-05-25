import React, { useState } from 'react'
import '../css/cal.css'
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
export default function LoanCal() {
    const [principal, setPrincipal] = useState(10000);
    const [rate, setRate] = useState(1);
    const [time, setTime] = useState(7);
    const interest = (principal * rate * time) / 100;

    return (
        <>
            <div className='rounded-3'>
                <div className='cal-input-wrap' style={{ borderRadius:'10px 10px 0 0', boxShadow: '0 0 100px #000' }}>
                    <div className='amt-wrap'>
                        <div className='d-flex justify-content-between mt-2'>
                            <h5 className='ms-text-black'>Loan Amount</h5>
                            <h5 className='val-item'> <CurrencyRupeeIcon /> {principal}</h5>
                        </div>
                        <div style={{ marginTop: '-30px' }}>
                            <input
                                type="range"
                                min="10000"
                                max="100000"
                                step="500"                               
                                value={principal}
                                onChange={(e) => setPrincipal(e.target.value)}
                                className="w-full cal-slider"
                            />
                        </div>
                        <div className='d-flex justify-content-between'>
                            <span style={{ fontSize: '13px', color: '#0000004a' }}> <CurrencyRupeeIcon />10000</span>
                            <span style={{ fontSize: '13px', color: '#0000004a' }}> <CurrencyRupeeIcon />1,00,000</span>
                        </div>
                    </div>

                    <div className='term-wrap'>
                        <div className='d-flex justify-content-between mt-3'>
                            <h5 className='ms-text-black'>Period (Days)</h5>
                            <h5 className='val-item '>{time}</h5>
                        </div>
                        <div style={{marginTop:'-30px'}}>
                        <input
                            type="range"
                            min="7"
                            max="40"
                            value={time}
                            onChange={(e) => setTime(e.target.value)}
                            className="w-full cal-slider"
                        />
                        {/* <input type="range" id="mySlider" min="7" max="100" value="7"></input> */}
                        </div>
                        <div className='d-flex justify-content-between'>
                            <span style={{ fontSize: '13px', color: '#0000004a' }}> 7 Day</span>
                            <span style={{ fontSize: '13px', color: '#0000004a' }}> 40 Day</span>
                        </div>
                    </div>

                    <div className='rate-wrap'>
                        <div className='d-flex justify-content-between mt-3'>
                            <h5 className='ms-text-black'>Interest Rates</h5>
                            <h5 className='val-item '>{rate}%</h5>
                        </div>
                        <div style={{ marginTop: '-30px' }}>
                            <input
                                type="range"
                                min="0.25"
                                max="1"
                                step="0.25"
                                value={rate}
                                onChange={(e) => setRate(e.target.value)}
                                className="w-full cal-slider"
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="text-xl font-semibold text-white ms-bg-secondary p-2" style={{ borderRadius: '0 0 10px 10px' }}>
                <div className='d-flex justify-content-between align-items-center'>
                    <h5 className='bold'>You have to pay</h5>
                    <h3 style={{ fontSize: '35px', fontWeight: '600' }}><CurrencyRupeeIcon className='fs-1'/> {interest + parseInt(principal)}</h3>
                </div>
            </div>
            <p style={{ fontSize: '14px', marginTop: '10px', fontWeight: '400' }}> <strong>*Personal loan calculator </strong> is only for illustration purposes For actual calculations refer to your Repayment Schedule  & Loan Agreement *T&C Apply</p>

        </>


    )
}
