import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom';

export default function OtpScreen() {
    const [otp, setOtp] = useState(['', '', '', '']);
    const [generatedOtp, setGeneratedOtp] = useState('');
    const [message, setMessage] = useState('');
    const [resendVisible, setResendVisible] = useState(false);
    // const [otpdata, setOtpData] = useState(genOtp)
    //const [timer, setTimer] = ('0')
    const [timer, setTimer] = useState(0);
    //const [canResend, setCanResend] = useState(true);
    const getmob = localStorage.getItem('Mobile Data')
    const navigate = useNavigate();


    const hideNo = '*'.repeat(getmob.length - 4) + getmob.slice(-4)

    const inputsRef = useRef([]);
    useEffect(() => {
        inputsRef.current[0].focus();
    }, [])

    const handleChange = (value, index) => {
        if (!/^\d?$/.test(value)) return; // Allow only digits or empty
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        // Move to next input if value entered
        if (value && index < 3) {
            inputsRef.current[index + 1].focus();
        }
    };

    const handleKeyDown = (e, index) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            // Move to previous input on backspace
            inputsRef.current[index - 1].focus();
        }
    };

    // const handleResend = () => {
    //     if (canResend) {
    //         generateOTP();
    //     }
    // };

    const handleOtpverify = () => {
        if (otp.join('') == generatedOtp) {
            navigate('/journey')
        }
        else {
            alert('sorry')
        }
    }


    useEffect(() => {
        generateOTP();
        //
    }, []);


    useEffect(() => {
        let interval;
        if (timer > 0) {
            setResendVisible(false);
            interval = setInterval(() => {
                setTimer((prev) => prev - 1);
            }, 1000);
        } else {
            setResendVisible(true);
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [timer]);




    const generateOTP = () => {
        const newOtp =  
        setGeneratedOtp(newOtp)
        setTimer(30); // 30 s


    }


    return (
        <>
            <div className='col-lg-6 col-md-12 leftbox' style={{ paddingTop: '150px' }}>
                <p className='error'></p>
                <h1 className='text-white' data-aos="fade-right" data-aos-easing="ease-in-sine" data-aos-duration="600">Apply for a Personal Loan</h1>
                <p className='text-white' data-aos="fade-right" data-aos-easing="ease-in-sine" data-aos-duration="800">
                    Mobile number : {hideNo}</p>
                <p>Please enter the OTP to unlock your next step {generatedOtp}</p>
                <div style={{ display: 'flex', gap: '10px' }}>
                    {otp.map((digit, idx) => (
                        <input
                            key={idx}
                            type="text"
                            maxLength="1"
                            value={digit}
                            onChange={(e) => handleChange(e.target.value, idx)}
                            onKeyDown={(e) => handleKeyDown(e, idx)}
                            ref={(el) => (inputsRef.current[idx] = el)}
                            style={{
                                width: '40px',
                                height: '40px',
                                fontSize: '20px',
                                textAlign: 'center',
                            }}
                        />
                    ))}
                </div>

                <Button
                    variant='contained'
                    size='large'
                    className='mt-4'
                    style={{ background: '#1EBDDA', borderRadius: '30px', padding: '15px 30px', border: '3px solid #fff' }}
                    onClick={handleOtpverify}
                >Verify OTP
                </Button>
                <br />
                <div style={{ marginTop: '10px' }}>
                    {timer > 0 && <p>Resend OTP in {timer} seconds...</p>}
                    {`Your ${setMessage}`}

                    {resendVisible && (
                        <button onClick={generateOTP}>Resend OTP</button>
                    )}


                </div>


            </div>
        </>
    )
}
