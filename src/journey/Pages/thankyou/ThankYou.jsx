import React, { useEffect, useState } from 'react';
// import congratulations from "../../../assets/thanks.jpg";
import congratulationsMobile from "../../assets-crm/thank-mob.jpg";
// import congratulations from '../../assets-crm/thanks.jpg';
import { Helmet } from "react-helmet";



import LibraryAddCheckIcon from '@mui/icons-material/LibraryAddCheck';
import { Button } from 'antd';
import { Link } from 'react-router-dom';
import MailOutlineOutlinedIcon from '@mui/icons-material/MailOutlineOutlined';
import CallOutlinedIcon from '@mui/icons-material/CallOutlined';
import { useSelector, useDispatch } from 'react-redux';
import { updateCustomerDetails, updateJourneyEvents, customerDetailsApiCall } from '../../../CustomerJourneyDetails/CustomerJourneyDetails';
import MobileNav from '../../component/MobileNav';


function ThankYou() {

  // const [bgImage, setBgImage] = useState(congratulations);
  const customerStep = useSelector((state) => state?.customerJourneyDetails?.journeySteps);
  const customerDetails = useSelector((state) => state?.customerJourneyDetails?.customerDetails);
  const dispatch = useDispatch();

  const params = {
    profileId: customerDetails?.profileId,
  };



  async function fetchCustomerDetails() {
    if (params.profileId) {
      let { payload } = await dispatch(customerDetailsApiCall(params));
      if (payload?.data?.apiStatus == 1) {
        dispatch(updateCustomerDetails(payload?.data?.data?.customer_details));
        dispatch(updateJourneyEvents(payload?.data?.data?.screen_details));

      }
    }
  }



  useEffect(() => {
     const script = document.createElement("script");
      script.type = "text/javascript";
      script.innerHTML = `
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '910056785411046');
          fbq('track', 'SubmitApplication');

      `;
      document.head.appendChild(script);

      const imgLead = new Image();
      imgLead.src = "https://www.facebook.com/tr?id=910056785411046&ev=SubmitApplication";
      
    fetchCustomerDetails();

  }, [customerStep?.check_eligibility]);


  // useEffect(() => {

  //   const handleResize = () => {
  //     if (window.innerWidth <= 768) {
  //       setBgImage(congratulationsMobile);
  //     } else {
  //       setBgImage(congratulations);
  //     }
  //   };

  //   handleResize(); 
  //   window.addEventListener('resize', handleResize);

  //   return () => window.removeEventListener('resize', handleResize);
  // }, []);

  let applicationMode = localStorage.getItem("applicationMode") ?? '';
  return (
    <>
    <Helmet>
        <script>
          {`
          gtag('event', 'conversion', {
            'send_to': 'AW-17763107664/a8tyCJLMpcgbENCGjpZC',
            'value': 1.0,
            'currency': 'INR'
          });
        `}
        </script>
      </Helmet>
    <div>
      {/* <BoxWrapper className="w100 gray"> */}
      <div
        className="bg-thanks">
         { applicationMode != "auto" && (
        <div className="thanks-left text-center">
          <div className='thanksmobile'>
            <img src={congratulationsMobile} alt='Thank you for showing interest' />
          </div>
          <h1 className='fw-bold fs-2'>Thank you for showing interest in <span style={{ color: '#1973be' }}>EmergencyPaisa</span></h1>
          <h6 className='pt-4'>We have received your loan application.
            <br /> <br />
            If your have any query feel free to connect with us. 
            <div className='pt-4 fw-semibold fs-5 text-center'>
              <div><MailOutlineOutlinedIcon style={{ color: '#9a141a' }} /> info@emergencypaisa.com  &nbsp; </div>
              <div className='pt-3'> <CallOutlinedIcon style={{ color: '#9a141a' }} />
                <Link to='https://wa.me/9821388824' target='_blank' style={{ textDecoration: 'none', color: '#000' }}> +91: 83681-74368</Link>
              </div>
            </div>
          </h6>
          {customerDetails?.show_ekyc_btn_flag === 0 && (
          <button variant="outlined" className='icon-color-primary mt-4 fs-5 py-4 px-3 ms-bg-secondary' style={{borderRadius:'10px', border:'0'}} startIcon={<LibraryAddCheckIcon />}>
            <Link to='/journey/dashboard' className='text-decoration-none icon-color-primary  text-white ms-bg-secondary py-4 px-3 '  > Go to Dashboard </Link>
          </button>
          )}
          {customerDetails?.show_ekyc_btn_flag === 1 && (
            <button variant="outlined" className='icon-color-primary mt-4 fs-5 py-4 px-3 ms-bg-secondary' style={{borderRadius:'10px', border:'0'}}  startIcon={<LibraryAddCheckIcon /> }>
              <Link to={customerDetails?.ekyc_url} className='text-decoration-none icon-color-primary text-white ms-bg-secondary py-4 px-3 '  > {customerDetails?.show_ekyc_btn_text} </Link>
            </button>
          )}

          

          
        </div>
         )}

         { applicationMode == "auto" && (
       <div className="thanks-left text-center">
          <h1 className="fw-bold fs-2">
            Thank you for choosing <span style={{ color: "#1973be" }}>EmergencyPaisa</span>!
          </h1>

          <h6 className="pt-4">
            Your loan disbursal is currently in process and should be credited within{" "}
            <span className="fw-bold">15 minutes</span>.
            <br /> <br />
            If there is any delay, please contact us at:
            <div className="pt-4 fw-semibold fs-5 text-center">
              <div>
                <MailOutlineOutlinedIcon style={{ color: "#9a141a" }} /> help@emergencypaisa.com
              </div>
              <div className="pt-3">
                <CallOutlinedIcon style={{ color: "#9a141a" }} />
                <Link to="https://wa.me/9821388824" target="_blank" style={{ textDecoration: "none", color: "#000" }} >
                  +91 83681-74368
                </Link>
              </div>
            </div>
          </h6>
        </div>
         )}
      </div>
      <MobileNav/>

      {/* </BoxWrapper> */}
    </div>
    </>
  );
}

export default ThankYou;
