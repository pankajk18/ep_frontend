import React, { useEffect, useRef, useState } from 'react';
import '../css/apply.css'
import LibraryAddCheckIcon from '@mui/icons-material/LibraryAddCheck';
import { Link, useNavigate } from 'react-router-dom';
// import LaunchOutlinedIcon from '@mui/icons-material/LaunchOutlined';
import appStoreIcon from '../assets/appstore.png'
import OtpBox from '../component/OtpBox'
import playStoreIcon from '../assets/playstore-icon.png'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { login } from '../Utils/api';
import { useDispatch, useSelector } from 'react-redux';
import { updateCustomerDetails } from '../CustomerJourneyDetails/CustomerJourneyDetails';
import Benifit from '../component/Benifit'
import Eligibility from '../component/Eligibility'
import DocumentReq from '../component/DocumentReq';
import { updateAutoCustomerDetails } from '../CustomerJourneyDetails/AutoCustomerJourneyDetails';


export default function ApplyNow() {
    const brandName = process.env.REACT_APP_COMPANY_N
    const brandLogo = process.env.REACT_APP_LOGO

    const [ischk, setIschk] = useState(true)
    const [otpInput, setOtpInput] = useState(false);
    const [loader, setLoader] = useState(false)
    const [digits, setDigits] = useState(new Array(10).fill(""));
    const [phone, setPhone] = useState('');
    const inputsRef = useRef([]);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const customerDetails = useSelector((state) => state.customerJourneyDetails.customerDetails);
    const checklogin = customerDetails?.token;
    const { loan_quote, personal_details, upload_documents } = useSelector((state) => state?.customerJourneyDetails?.journeySteps);

    // Extract UTM parameters from the URL
  const getUtmParams = () => {
    const params = new URLSearchParams(window.location.search);
    return {
      utm_source: params.get("utm_source") || "",
      utm_medium: params.get("utm_medium") || "",
      utm_campaign: params.get("utm_campaign") || "",
      utm_term: params.get("utm_term") || "",
      utm_content: params.get("utm_content") || "",
      click_id:params.get("click_id") || ""
    };
  };

    useEffect(() => {
        if (
            loan_quote === 1 &&
            personal_details === 1 &&
            upload_documents === 1
        ) {
            navigate('/journey/dashboard');
            return
        }

        if ((checklogin)) {
            navigate('/journey');
        }
    }, [checklogin])


    useEffect(() => {
        if (!otpInput && inputsRef.current[0]) {
            inputsRef.current[0].focus();
        }
    }, [otpInput]);



    const handleChange = (index, event) => {
        let value = event.target.value;
        if (!/^\d?$/.test(value)) return;

        if (index === 0 && !/^[6-9]$/.test(value)) {
            return;
        }

        const newDigits = [...digits];
        newDigits[index] = value;
        setDigits(newDigits);
        

        // ✅ Move to the next input box if a digit is entered
        if (value !== "" && index < 9) {
            inputsRef.current[index + 1].focus();
        }
    };

    const handleKeyDown = (index, event) => {

        if (event.key === "Enter") {
            event.preventDefault();
            handlelogin();
        }
        if (event.key === "Backspace") {
            const newDigits = [...digits];

            if (digits[index]) {
                newDigits[index] = "";
                setDigits(newDigits);
            } else if (index > 0) {
                inputsRef.current[index - 1].focus();
                newDigits[index - 1] = "";
                setDigits(newDigits);
            }
        }
    };




    const handleTerm = (e) => {
        setIschk(e.target.checked)
    }

    const handlelogin = async () => {
        const mobileNumber = digits.join('');

        // 🔴 Validate 10-digit mobile number before proceeding
        if (mobileNumber.length < 10) {
            toast.error("Please enter a valid 10-digit mobile number.");
            return;
        }

        const { utm_source, utm_medium, utm_campaign, utm_term, utm_content } = getUtmParams();

        const param = {
            utmSource: utm_source,
            utmMedium: utm_medium,
            utmCampaign: utm_campaign,
            utmTerm: utm_term,
            utm_content,
            mobile: mobileNumber,
            sourceId: 1
        };

        try {
            setLoader(true);
            const response = await login(param);
            if (response?.data?.apiStatus === 1) {
                toast.success(response?.data?.message);
                dispatch(updateCustomerDetails({
                    profileId: response?.data?.data?.profileId,
                    mobile: mobileNumber
                }));

                dispatch(updateAutoCustomerDetails({
                    profileId: response?.data?.data?.profileId,
                    mobile: mobileNumber
                }));
                setOtpInput(true);
            } else {
                toast.error(response?.data?.message || "Login Failed, Check your number again");
            }
        } catch (error) {
            console.error("Login Failed:", error);
            toast.error("Login Failed, Check your number again");
        } finally {
            setLoader(false);
        }
    };




    return (
        <>
            <ToastContainer position="top-right" autoClose={1000} />
            <div className='ms-applyWrap  fluid-container' style={{ overflow: 'hidden' }}>
                <div className='row'>
                    <div className='col-lg-6 ms-left-wrap' >

                        {/* <img src={AppScreenImg} alt='Emergency Paisa' style={{ width: '50%' }} /> */}
                        <div className='p-4'>
                            <h5 className='fw-semibold pt-2' style={{ lineHeight: '30px' }}>Instant Loans for Your Urgent Needs</h5>
                               <p>EmergencyPaisa helps you get quick financial support whenever life throws unexpected expenses your way. With a fully digital process, you can apply in minutes and receive fast approval without heavy paperwork or collateral. Once approved, the amount is transferred directly to your bank account for immediate use. We focus on speed, simplicity, and secure processing to make your borrowing experience smooth and worry-free.</p>
                                <h5>Why EmergencyPaisa?</h5>
                            <ul className='pt-3'>
                                <li> <LibraryAddCheckIcon className='ms-text-secondary' />  Quick online application</li>
                                <li> <LibraryAddCheckIcon className='ms-text-secondary' />  Instant approval </li>
                                <li> <LibraryAddCheckIcon className='ms-text-secondary' />  No collateral required</li>
                                <li> <LibraryAddCheckIcon className='ms-text-secondary' />  Direct bank transfer</li>
                                <li> <LibraryAddCheckIcon className='ms-text-secondary' />  Safe & transparent process</li>
                                <li> <LibraryAddCheckIcon className='ms-text-secondary' />  Apply now and get funds when you need them most</li>
                            </ul>
                            <div className='btn-wrap pt-3 d-flex '>
                                <div className='app-store  d-flex'>
                                    <Link to='https://play.google.com/store/apps/details?id=com.suburban.emergency_paisa' target='_blank'><img src={playStoreIcon} alt='EP' width="192" height="67" /></Link>
                                </div>
                                {/* <div className='app-store  d-flex'>
                                    <Link to='/'><img src={appStoreIcon} alt='EP' width="192" height="67" /></Link>
                                </div> */}
                            </div>
                        </div>
                    </div>
                    <div className='col-lg-6 ms-right-wrap p-5'>
                        <Link className="navbar-brand" to="/" style={{ margin: '0 auto' }}>
                            <img src={`/${brandLogo}`} alt={brandName} />
                        </Link>
                        <div className='ms-login-wrap pt-5'>
                            <h1 className='text-uppercase fw-bold fs-2'>Welcome <span className='ms-text-secondary'>EmergencyPaisa</span></h1>
                            {phone}
                            {!otpInput ?
                                <>
                                    <h5 className='pt-4'>Enter your mobile number</h5>
                                    <div className='num-wrap d-flex pt-3'>
                                        {digits.map((digit, index) => (
                                            <input
                                                key={index}
                                                ref={(el) => (inputsRef.current[index] = el)}
                                                type="text"
                                                value={digit}
                                                onChange={(e) => handleChange(index, e)}
                                                onKeyDown={(e) => handleKeyDown(index, e)}
                                                maxLength={1}
                                                className="border border-gray-400 text-center rounded input-box"
                                                inputMode="numeric"
                                            />
                                        ))}
                                    </div>

                                    <div className='pt-3'>
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" checked={ischk} onChange={handleTerm} />
                                            {/* <input className="form-check-input" type="checkbox" value="" /> */}
                                            <span className="form-check-label fs-6" htmlFor="flexCheckIndeterminate">
                                                By selecting this checkbox, I authorize EmergencyPaisa to contact me via phone calls, SMS, WhatsApp messages, emails, and through the app provided by EmergencyPaisa, using the phone number and email address I have provided.
                                            </span>
                                        </div>
                                    </div>
                                    <button
                                        onClick={!loader ? handlelogin : null}
                                        disabled={!ischk || loader}
                                        style={{ width: '100%' }}
                                        className={`btn p-2 mt-5 fw-bold fs-5 ${ischk && !loader ? 'ms-bg-secondary text-white' : 'disablebtn'}`}
                                    >
                                        {loader ? (
                                            <>
                                                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                                Sending OTP...
                                            </>
                                        ) : (
                                            'Get OTP'
                                        )}
                                    </button>


                                    <div className='pt-5 '>
                                        Furthermore, I acknowledge that I have reviewed and accept the<Link to='/terms-and-conditions' className='text-decoration-none fw-semibold ms-text-primary'> TC</Link>  and
                                        <Link to='/privacy-policy' className='text-decoration-none fw-semibold ms-text-primary'>&nbsp; Privacy Policy</Link> .
                                    </div>
                                </>

                                :
                                <OtpBox />
                            }



                        </div>
                    </div>
                </div>

            </div>

            <br/> <br/>

             <div className='container'>
        <Benifit />
        <div className='pt-5 pb-5'>
          <Eligibility />
        </div>
      </div>
      <DocumentReq />
        </>
    )
}
