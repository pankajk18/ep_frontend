import React, { useEffect } from 'react'
import ProfileNav from '../component/ProfileNav'
import BasicInfo from '../component/BasicInfo'
import CreditManager from '../component/CreditManager'
import ApplicationStatus from '../component/ApplicationStatus'
import { Button } from '@mui/material';
import LibraryAddCheckIcon from '@mui/icons-material/LibraryAddCheck';
import { Link, useNavigate } from 'react-router-dom'
import HistoryIcon from '@mui/icons-material/History';
import "../profile.css";
import { useSelector, useDispatch } from 'react-redux';
import { updateCustomerDetails, updateJourneyEvents, customerDetailsApiCall } from '../../CustomerJourneyDetails/CustomerJourneyDetails';
import { getCustomerDetails } from '../../Utils/api'
import RepaymentCard from '../component/RepaymentCard'
import MobileNav from '../component/MobileNav'
import EditNotificationsIcon from '@mui/icons-material/EditNotifications';

export default function UserDashaboard() {
  const { loan_quote, personal_details, upload_documents } = useSelector((state) => state?.customerJourneyDetails?.journeySteps);
  const journeyComplete = useSelector((state) => state?.customerJourneyDetails?.customerDetails?.is_journey_completed);
  const navigate = useNavigate();
  const customerStep = useSelector((state) => state?.customerJourneyDetails?.journeySteps);
  const customerDetails = useSelector((state) => state?.customerJourneyDetails?.customerDetails);
  const dispatch = useDispatch();

  const [resCustomerDetails, setResCustomerDetails] = React.useState(null);

  const params = {
    profileId: customerDetails?.profileId,
  };



  async function fetchCustomerDetails() {
    if (params.profileId) {
      const response = await getCustomerDetails(params);
      setResCustomerDetails(response);
      if (response?.data?.apiStatus == 1) {
        dispatch(updateCustomerDetails(response?.data?.data?.customer_details));
        dispatch(updateJourneyEvents(response?.data?.data?.screen_details));

      }
    }
  }



  useEffect(() => {
    fetchCustomerDetails();

  }, [customerStep?.check_eligibility]);

  const handlejourney = () => {
    console.log("resCustomerDetails--->>",resCustomerDetails);

    var lead_creation_mode = resCustomerDetails?.data?.data?.lead_detail?.lead_type;
    var lead_process_mode = resCustomerDetails?.data?.data?.lead_detail?.lead_process_mode;
  //  alert("lead_creation_mode==="+lead_creation_mode+" lead_process_mode==="+lead_process_mode);
    if(lead_creation_mode == 1 &&  ![2,0].includes(lead_process_mode)){                                        
            navigate('/auto-journey');
            return false;
        }else {
              navigate('/journey');
        }
   }

  // Check if all journey steps are 1
  const allStepsCompleted = loan_quote === 1 && personal_details === 1 && upload_documents === 1;

  return (
    <>
      <div className='container mt-5' style={{ display: 'flex' }}>
        <div className='left-box pt-5'>
          <ProfileNav />
        </div>
        <div className='right-box'>
          <div className='panel'>
            {/* Conditionally render the Continue to Apply button */}
            {(journeyComplete == 0) && (
              <div className='mb-3 d-flex justify-content-end'>
                <Button
                  variant='contained'
                  className='text-upper ms-bg-secondary fs-6 fw-semibold'
                  size='small'
                  onClick={handlejourney}
                >
                  <LibraryAddCheckIcon /> &nbsp; Continue to Apply
                </Button>
              </div>
            )}

            <BasicInfo />
            <div className='row'>
              <div className='col-lg-6 mt-4'>
                <h5 className='text-uppercase fw-semibold pb-2'>Credit Manager</h5>
                <CreditManager />
              </div>
              <div className='col-lg-6 mt-4'>
                <h5 className='text-uppercase fw-semibold pb-2'>Application Status</h5>
                <ApplicationStatus />
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' }}>
              {customerDetails?.show_loan_history_flag === 1 && (
                <Button variant="outlined" className='icon-color-primary mt-4' style={{ background: '#9a141a', color: '#fff' }} startIcon={<HistoryIcon />}>
                  <Link to='/journey/loan-history' className='text-decoration-none icon-color-primary text-white fw-bold'  > Loan History </Link>
                </Button>
              )}

              <div style={{ display: 'flex', gap: '10px' }}>
                {customerDetails?.show_ekyc_btn_flag === 1 && (

                  <Button variant="outlined" className='icon-color-primary mt-4 fs-5' style={{ background: '#9a141a', color: '#fff', padding: '10px 15px' }} startIcon={<LibraryAddCheckIcon />}>
                    <Link to={customerDetails?.ekyc_url} target='_blank' className='text-decoration-none icon-color-primary text-white fw-bold fs-6' style={{ fontSize: "14px" }} > {customerDetails?.show_ekyc_btn_text} </Link>
                  </Button>
                )}

                {customerDetails?.show_esign_btn_flag === 1 && (
                  <Button variant="outlined" className='icon-color-primary mt-4 fs-5' style={{ background: '#9a141a', color: '#fff', padding: '10px 15px' }} startIcon={<LibraryAddCheckIcon />}>
                    <Link to={customerDetails?.esign_url} target='_blank' className='text-decoration-none icon-color-primary text-white fw-bold fs-6' style={{ fontSize: "14px" }} > {customerDetails?.show_esign_btn_text} </Link>
                  </Button>
                )}
                {customerDetails?.show_sanction_letter_btn_flag === 1 && (
                  <Button variant="outlined" className='icon-color-primary mt-4 fs-5' style={{ background: '#9a141a', color: '#fff', padding: '10px 15px' }} startIcon={<LibraryAddCheckIcon />}>
                    <Link to={customerDetails?.sanction_letter_url} target='_blank' className='text-decoration-none icon-color-primary text-white fw-bold fs-6' style={{ fontSize: "14px" }} > {customerDetails?.show_sanction_letter_btn_text} </Link>
                  </Button>
                )}
              </div>
            </div>

            {/*           
             {customerDetails?.show_active_loan_flag==1 && (
            <RepaymentCard/>
            )} */}

            <div className=' ms-notice-data fw-medium fs-4 d-flex aligin'> <EditNotificationsIcon style={{ marginTop: '10px', color: '#9a141a' }} />
              <marquee  > Your application is in the {customerDetails?.applicationStatus || 'PENDING'} stage. Kindly contact customer support for further assistance.</marquee></div>
          </div>

        </div>

      </div>

      <MobileNav />

    </>
  )
}
