import React, { useState, useRef, useEffect } from 'react';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Button } from '@mui/material';
import LibraryAddCheckIcon from '@mui/icons-material/LibraryAddCheck';
import IncomeDetails from '../component/IncomeDetails';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import { getPanVerify } from '../../Utils/api';
import { useDispatch, useSelector } from 'react-redux';
import { updateCustomerDetails } from '../../CustomerJourneyDetails/CustomerJourneyDetails';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import bg1 from '../assets-crm/bg-1.png'


export default function PanDetails() {
    const inputLength = 10;
    const dispatch = useDispatch();
    const customerDetails = useSelector((state) => state.customerJourneyDetails.customerDetails);

    // Initialize userpan from Redux if pancard exists, else empty
    let initialPan = customerDetails?.pancard
        ? customerDetails.pancard.toUpperCase().split('')
        : Array(inputLength).fill();
    const [userpan, setuserPan] = useState(initialPan);

    // Initialize salary if you want from Redux, else empty
    const [salary, setSalary] = useState();
    const inputRefs = useRef([]);
    const [loader, setLoader] = useState(false);
    const [verifyBtn, setVerifyBtn] = useState(true);
    const [isInvalidPan, setIsInvalidPan] = useState(false);
    const [isInvalidSalary, setIsInvalidSalary] = useState(false);


    useEffect(() => {
        // If pancard updates in Redux, update userpan state
        if (customerDetails?.pancard) {
            setuserPan(customerDetails.pancard.split(''));
            setVerifyBtn(false);
        }
        if (customerDetails?.monthly_income) {
            setSalary(customerDetails?.monthly_income);
        }
    }, [customerDetails?.pancard]);

    const handleChange = (e, index) => {
        const value = e.target.value.toUpperCase();
        let isValidChar = false;
        if (index >= 0 && index <= 4) {
            isValidChar = /^[A-Z]{1}$/.test(value);
        } else if (index >= 5 && index <= 8) {
            isValidChar = /^[0-9]{1}$/.test(value);
        } else if (index === 9) {
            isValidChar = /^[A-Z]{1}$/.test(value);
        }

        if (isValidChar || value === '') {
            const updatedPan = [...userpan];
            updatedPan[index] = value;
            setuserPan(updatedPan);
            if (value && index < inputLength - 1) {
                inputRefs.current[index + 1].focus();
            }
        }
    };

    const handleKeyDown = (e, index) => {
        if (e.key === 'Backspace' && !userpan[index] && index > 0) {
            const updatedPan = [...userpan];
            updatedPan[index - 1] = '';
            setuserPan(updatedPan);
            inputRefs.current[index - 1].focus();
        }
    };

    const fullPan = userpan.join('');
    const isValidPan = /^[A-Z]{5}[0-9]{4}[A-Z]$/.test(fullPan);

    const handleVerify = async () => {
        if (loader) return; // Prevent multiple clicks

        const fullPan = userpan.join('');
        const panValid = /^[A-Z]{5}[0-9]{4}[A-Z]$/.test(fullPan);
        const salaryValid = salary && /^\d+$/.test(salary) && parseInt(salary) > 0;

        setIsInvalidPan(!panValid);
        setIsInvalidSalary(!salaryValid);

        if (!panValid) {
            toast.error("Please enter a valid 10-character PAN number.");
            return;
        }

        if (!salaryValid) {
            toast.error("Please enter a valid Monthly Income.");
            return;
        }

        const param = {
            profileId: customerDetails?.profileId,
            pancard: fullPan,
            monthlyIncome: salary
        };

        try {
            setLoader(true);
            const response = await getPanVerify(param);
            if (response?.data?.apiStatus == 1) {
                toast.success(response?.data?.message);
                dispatch(updateCustomerDetails({
                    full_name: response?.data?.data?.name,
                    dob: response?.data?.data?.dob,
                    pancard: response?.data?.data?.panNumber,
                    monthly_income: salary,
                    gender: response?.data?.data?.gender
                }));
                window.clevertap?.event.push("lje_Pancard_Verfication", {
                    "message": "PanCard Verified"
                });

                window.clevertap?.event.push("lje_income_details", {
                    "message": `Income: ${salary}`
                });
                setVerifyBtn(false);
            } else {
                const failureMessage = response?.data?.message || "Unknown error";

                toast.error(response?.data?.message);
                window.clevertap?.event.push("lje_Pancard_Failed", {
                    message: `PanCard Verification Failed: ${failureMessage}`
                });


            }
        } catch (error) {
            console.error("PAN verification error:", error);
            toast.error("Error verifying PAN. Please check your connection or try later.");
        } finally {
            setLoader(false);
        }
    };


    // userpan logic is here @todo call api to fetch mobile to t





    return (
        // style={{ backgroundImage: `url(${bg1})`, width: '100%', height: '100vh', backgroundSize: 'cover', paddingBottom: '75px' }}
        <div className='bg-home' style={{ height: '900px' }}>
            <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
            <div className='container pt-5'>
                <div className='d-flex align-items-center gap-2 mt-5'>
                    <div className='bor rounded-circle'>
                        <ArrowForwardIosIcon style={{ fontSize: '30px', color: '#9a141a' }} />
                    </div>
                    <h3 className='pl-5 fontstyle'>PAN Authentication</h3>
                </div>

                <div className='pl-45'>
                    {/* <p className='fw-normal'>Please be sure to verify the accuracy of the below information before making any transfer. </p> */}

                    <p className='mb-0 pb-1 fw-medium fs-6 fontstyle '>Enter your PAN No. <span className='text-danger'>*</span></p>
                    <div className='d-flex'>
                        <div className='d-flex' style={{ flexWrap: 'wrap' }}>
                            {userpan.map((char, i) => (
                                <input
                                    key={i}
                                    ref={(el) => (inputRefs.current[i] = el)}
                                    value={char}
                                    maxLength={1}
                                    placeholder='*'
                                    onChange={(e) => handleChange(e, i)}
                                    onKeyDown={(e) => handleKeyDown(e, i)}
                                    className='input-box'
                                    disabled={!verifyBtn} // Disable input after PAN is verified
                                />
                            ))}

                        </div>
                        {/* <div>
                            {fullPan.length === 10 && (
                                <p className='mb-0' style={{ color: isValidPan ? 'green' : 'red', marginTop: 10 }}>
                                    {isValidPan ? '✅ Valid PAN Format' : '❌ Invalid PAN Format'}
                                </p>
                            )}
                        </div> */}
                    </div>

                    <div className='row' style={{ maxWidth: '600px' }}>
                        {/* Salary Field */}
                        <p className='mb-0 pb-1 fw-medium fs-6 fontstyle pt-3'>Salary <span className='text-danger'>*</span></p>
                        <div className='row d-flex align-items-center'>
                            <div className="input-group me-3">
                                <span className="input-group-text solid-border">
                                    <CurrencyRupeeIcon style={{ color: '#9a141a' }} />
                                </span>
                                <input
                                    type="text"
                                    placeholder='salary'
                                    value={salary}
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        if (/^\d{0,7}$/.test(value)) {
                                            setSalary(value);
                                        }
                                    }}
                                    className="form-control solid-border"
                                    style={{ maxWidth: '100px', height: '45px' }}
                                    disabled={!verifyBtn}
                                />



                                {verifyBtn && (
                                    <Button
                                        variant='contained'
                                        size='large'
                                        onClick={handleVerify}
                                        className='ms-bg-secondary'
                                        // style={{ background: '#9a141a', marginLeft: '15px' }}
                                        disabled={loader} // Disable button while loading
                                    >
                                        <LibraryAddCheckIcon /> &nbsp;
                                        {loader ? <span>Verifying...</span> : <span>Verify</span>}
                                    </Button>

                                )}

                            </div>
                            {isInvalidSalary && (
                                <span style={{ color: 'red', fontSize: '14px', marginTop: '4px' }}>
                                    Please enter a valid Monthly Income.
                                </span>
                            )}
                            {customerDetails?.full_name && customerDetails.full_name !== "null" && (
                                <div className='col-lg-7 pt-3'>
                                    <div className="input-group mb-3">
                                        <span className="input-group-text solid-border" style={{ background: '#dee2e6' }}>
                                            <PersonOutlineIcon style={{ color: '#9a141a' }} />
                                        </span>
                                        <input
                                            type="text"
                                            value={customerDetails.full_name}
                                            className="form-control solid-border"
                                            style={{ height: '45px', background: "#dee2e6" }}
                                            readOnly
                                        />
                                    </div>
                                </div>
                            )}

                        </div>


                    </div>
                </div>
                {!verifyBtn && (
                    <IncomeDetails />
                )}
            </div>
        </div>
    );
}
