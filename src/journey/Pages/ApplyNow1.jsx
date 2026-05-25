import React, { useState, useRef } from 'react';
// import DocumentReq from '../component/DocumentReq';
// import Benifit from '../component/Benifit'
// import Eligibility from '../component/Eligibility'
import { Helmet } from 'react-helmet';

import OtpScreen from '../component/OtpScreen';

// import { sendotpForLogin } from "../Utils/api";

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



export default function ApplyNow() {
  const [ischk, setIschk] = useState(true)
  const [mobile, setMobile] = useState("")
  const [error, setError] = useState("")
  const [digits, setDigits] = useState(new Array(10).fill(""));
  const inputsRef = useRef([]);
  const [showotp, setShowotp] = useState(false)


  // const handleValidation = (e) => {
  //   const val = e.target.value;
  //   const mobileRegex = /^[6-9]\d{9}$/;
  //   setMobile(val)

  //   if (!mobileRegex.test(val)) {
  //     setError("Invalid value")

  //   }
  //   else {
  //     setError("")
  //   }

  // }
  const handleChange = (index, event) => {
    let value = event.target.value;

    // ✅ Allow only numbers
    if (!/^\d?$/.test(value)) return;

    // ✅ Ensure the first digit starts with 6-9
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
    if (event.key === "Backspace" && !digits[index] && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };
  const handleTerm = (e) => {
    setIschk(e.target.checked)
  }

  const validateMobile = (number) => {
    if (!number.trim()) {
      return "Mobile number is required.";
    }
    if (!/^[6-9]\d{9}$/.test(number)) {
      return "Please enter a valid 10-digit mobile number.";
    }
    return '';
  };




  // const getdata=async ()=>{
  //   let requestData = {
  //      "event_name": "login",
  //       "mobile": (digits.join(""))
  //   };

  //   const res = await sendotpForLogin(requestData);
  //    if(res.data.Status==1){
  //     setShowotp(true)
  //    }
  //    else{
  //     alert("please enter mobile no")
  //    }

  //    localStorage.setItem('Mobile Data', (digits.join('')))

  // }

  return (
    <>

      <Helmet>
        <title>Apply for Personal loan | SalaryOnTime</title>
        <meta name="description" content="Apply Personal Loan and get instant credit in your account with Salary on time. Check Eligibility easily without impacting your cibil score and get instant funds." />
      </Helmet>
      <div className='bg' style={{ background: 'url(../banner/apply-now.webp)', backgroundSize: 'cover' }}>
        <div className='container text-white position-relative'>
          <div className='row'>
            {(showotp == false) ?
              <div className='col-lg-6 col-md-12 leftbox' style={{ paddingTop: '150px' }}>
                <p className='error'></p>
                <h1 className='text-white' data-aos="fade-right" data-aos-easing="ease-in-sine" data-aos-duration="600">Apply for a Personal Loan</h1>
                <p className='text-white' data-aos="fade-right" data-aos-easing="ease-in-sine" data-aos-duration="800">Enter your 10 digit mobile number to get starte</p>
                <div className=" space-x-2 justify-center">
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
                    />
                  ))}
                </div>
                <div className="form-check pt-3">
                  <input className="form-check-input" type="checkbox" checked={ischk} onChange={handleTerm} />
                  <label className="form-check-label" for="flexCheckDefault">
                    By selecting this checkbox, I authorize the receipt of digital communications
                  </label>
                </div>
                <button disabled={!ischk} className={ischk ? 'apply-now-btn' : 'disablebtn'} >Get OTP</button>
              </div>
              :
              <OtpScreen />
            }
          </div>
          {/* <input
            type="text"
            maxLength={10}
            value={mob}
            onChange={(e) => sebtMob(e.target.value)}
            placeholder="Enter mobile number"
          /> */}
        </div>
        <ToastContainer position="top-right" autoClose={3000} />
      </div>
      <div className='container'>
        {/* <Benifit /> */}
        <div className='pt-5 pb-5'>
          {/* <Eligibility /> */}
        </div>
      </div>
      {/* <DocumentReq /> */}

    </>
  )
}