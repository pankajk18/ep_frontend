import React, { useEffect, useState } from 'react'
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { Grid, Button } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import CallIcon from '@mui/icons-material/Call';
import SendIcon from '@mui/icons-material/Send';
import { useDispatch, useSelector } from 'react-redux';
import { getPersonalDetail, getPersonalDetailAuto, updateAutoJourneyStatus, updateCustomerJourneyEvent } from '../../Utils/api';
import { toast } from 'react-toastify';
import { updateCustomerDetails, updateJourneyEvents } from '../../CustomerJourneyDetails/CustomerJourneyDetails';
import { updateAutoCustomerDetails, updateAutoJourneyEvents } from '../../CustomerJourneyDetails/AutoCustomerJourneyDetails';
import CustomerSelfie from './CustomerSelfie';
import { useNavigate, useParams } from 'react-router-dom';

export default function AutoPersonalInformation() {
  const [genderType, setgenderType] = useState('');
  const [resType, setresType] = useState('');
  const [maritalStatus, setMaritalStatus] = useState('1')
  const [addressline1, setAddressLine1] = useState('')
  const [addressline2, setAddressLine2] = useState('')
  const [spousename, setSpousename] = useState('')
  const [spousecontact, setSpouseContact] = useState('')
  const [referenceNumber, setReferenceNumber] = useState('')
  const [referenceName, setReferenceName] = useState('')
  const [referenceRelation, setReferenceRelation] = useState('1')
  const [mailid, setmailId] = useState('')
  const [landmark, setLandmark] = useState('')
  const [officialEmail, setOfficialEmail] = useState('');
  const [workingMode, setworkingMode] = useState('');
  // const customerDetails = useSelector((state) => state.customerJourneyDetails.customerDetails);
  const customerDetails = useSelector((state) => state.autoCustomerJourneyDetails.customerDetails);
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();
  const journeySteps = useSelector((state) => state.autoCustomerJourneyDetails.journeySteps);

  const [selfieImage, setSelfieImage] = useState(null);
  const [file, setFile] = useState(null);
  const [location, setLocation] = useState({
    latitude: null,
    longitude: null,
  });
  const [error, setError] = useState({});

  const params = useParams();


  const regexEmail =
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  // Pre-fill input fields from Redux
  useEffect(() => {
    // if (customerDetails) {
    //   setgenderType(String(customerDetails.gender));
    //   setresType(String(customerDetails.residence_type_id));

    //   setMaritalStatus(
    //     customerDetails.marital_status_id ? String(customerDetails.marital_status_id) : "1"
    //   );

    //   setmailId(customerDetails.personal_email);
    //   setAddressLine1(customerDetails.residence_address_1);
    //   setAddressLine2(customerDetails.residence_address_2);
    //   setLandmark(customerDetails.residence_landmark);
    //   setOfficialEmail(customerDetails.office_email);
    //   console.log("customerDetails.journeySteps.personal_details", journeySteps.personal_details);\
    //  }
      if( journeySteps.personal_details == 2){ 
         getCurrentLocation();
      }

    
  }, [customerDetails]);


  const handleworkingType = (event) => {
    setworkingMode(event.target.value);
  };

  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      toast.error("Geolocation not supported");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLocation({ latitude, longitude });
        console.log("LAT LONG:", latitude, longitude);
      },
      (error) => {
        console.error(error);

        if (error.code === 3) {
          toast.error("Unable to fetch location. Please check GPS / Wi-Fi");
        } else if (error.code === 1) {
          toast.error("Location permission denied");
        } else {
          toast.error("Location unavailable");
        }
      },
      {
        enableHighAccuracy: false,   // 🔥 KEY FIX
        timeout: 20000,              // increase timeout
        maximumAge: 30000,           // allow cached location
      }
    );

  };


  const personalParameter = {
    genderType: genderType,
    resType: resType,
    maritalStatus: maritalStatus,
    addressline1: addressline1,
    addressline2: addressline2,
    spousename: spousename,
    spousecontact: spousecontact,
    mailid: mailid,
    landmark: landmark,

  }

  const validateMobile = (number) => {
    const pattern = /^[6-9]\d{9}$/; // Indian mobile numbers only
    return pattern.test(number);
  };

  const validation = () => {
    // console.log("val :::->",validation );
    const newErr = {};

    if (!addressline1) {
      newErr.addressline1 = 'Enter Address Line 1';
    }

     if (!resType) {
      newErr.resType = 'Select Residence Type';
    }
    // alert(resType);
    if (!genderType) {
      newErr.genderType = 'Select Gender';
    }

    if (!addressline2) {
      newErr.addressline2 = 'Enter Address Line 2';
    }

    if (!maritalStatus) {
      newErr.maritalStatus = 'Select your marital status';
    }

    if (maritalStatus === '2') {
      if (!spousename) {
        newErr.spousename = 'Enter spouse name';
      }

      if (spousecontact && !validateMobile(spousecontact)) {
        newErr.spousecontact = 'Enter a valid 10-digit number';
      }
    }

    // Personal email validation
    if (!mailid) {
      newErr.mailid = 'Personal email is required';
    } else if (!regexEmail.test(mailid)) {
      newErr.mailid = 'Enter a valid personal email address';
    }
    if (!referenceNumber) {
      newErr.referenceNumber = 'Enter reference number';
    }
    if (!referenceName) {
      newErr.referenceName = 'Enter reference name';
    }
    if (!referenceRelation) {
      newErr.referenceRelation = 'Select reference relation';
    }

    // Official email validation (optional field but validate if filled)
    if (officialEmail && !regexEmail.test(officialEmail)) {
      newErr.officialEmail = 'Enter a valid official email address';
    }

    setError(newErr);
    return Object.keys(newErr).length === 0;
  };


  const handleGenderType = (event) => {
    setgenderType(event.target.value);
  };
  const handleResType = (event) => {
    setresType(event.target.value);
  };


  // const Getpersonaldata = (event) => {
  //   event.preventDefault();
  //   if (validation()) {


  //   }
  // }

  


  const submit = async (e) => {
  e.preventDefault();
  const newErr = {};



  if (loader) return;
    setLoader(true);

  if (!validation()) {
    toast.error("All fields are required!");
    setLoader(false);
    return;
  }

  // console.log("location", location);

  if (!location.latitude || !location.longitude) {
    toast.error("Please allow location access");
    setLoader(false);
    return;
  }

  if (!selfieImage) {
    toast.error("Please capture selfie");
    setLoader(false);
    return;
  }

  const formData = new FormData();

  formData.append("profileId", customerDetails?.profileId);
  formData.append("gender", parseInt(genderType));
  formData.append("maritalStatus", parseInt(maritalStatus));
  formData.append("residenceAddress1", addressline1);
  formData.append("residenceAddress2", addressline2);
  formData.append("residenceType", resType);
  formData.append("personalEmail", mailid);
  formData.append("spouseName", spousename || "");
  formData.append("spouseMobile", spousecontact || "");
  formData.append("referenceMobile", referenceNumber || "");
  formData.append("referenceName", referenceName || "");
  formData.append("referenceRelationship", parseInt(referenceRelation) || "");
  formData.append("residenceLandmark", landmark);
  formData.append("workMode", workingMode);
  formData.append("officialEmail", officialEmail);

  // Append the File object (selfieImage is already a File from CustomerSelfie)
  formData.append("selfieImage", selfieImage, "selfie.jpg");

  // Location
  formData.append("latitude", location?.latitude);
  formData.append("longitude", location?.longitude);

  try {
    const response = await getPersonalDetailAuto(formData);
    console.log("response", response);
    console.log("response.data", response.data);
    // return;
 
    // console.log(response);
    

    if (response?.apiStatus === 1) {

      toast.success(response.message);
      // alert(response.validationStatus);

      if (response.validationStatus == false){

        // await updateAutoJourneyStatus({
        //   profileId:customerDetails?.profileId,
        //   leadProcessMode:0
        // })
        navigate("/journey/congratulations");
        setLoader(false);
        return;

      }

      dispatch(updateAutoCustomerDetails({
        gender: genderType,
        residence_type_id: resType,
        marital_status_id: maritalStatus,
        personal_email: mailid,
        residence_address_1: addressline1,
        residence_address_2: addressline2,
        residence_landmark: landmark,
        spouse_name: spousename,
        office_email: officialEmail,
      }));

      if (customerDetails?.show_upload_docs == true) {
        dispatch(updateAutoJourneyEvents({
        personal_details: 1,
        upload_documents: 2,
        // remain_tab_show:response.validationStatus
      }));
      }else{

      dispatch(updateAutoJourneyEvents({
        personal_details: 1,
        banking_details: 2,
        remain_tab_show:response.validationStatus
      }));
    }
    } else {

      toast.error(response?.data?.message);
    }
  } catch (err) {
    console.error("API Error:", err);
    toast.error("Something went wrong");
  } finally {
    setLoader(false);
  }
};



  return (
    <div className='box-height bg-personalinfo'>
      <div className='wraper-right-box' style={{ width: '100%', backgroundColor: '#fff', borderRadius: '8px' }}>
        {/* <form onSubmit={Getpersonaldata}> */}
        <form  >

          <div className='row'>
            <h3 className='pl-5 fontstyle'>Personal Details</h3>
            <div className='row'>
              <div className='col-lg-4 col-md-12 col-sm-6 '>
                <FormControl>
                  <FormLabel
                    className='label-text fontstyle fw-semibold'>
                    Select Gender <span className='text-danger'>*</span>
                  </FormLabel>
                  <RadioGroup
                    name='genderType'
                    value={genderType}
                    onChange={handleGenderType}
                  >
                    <Grid container>
                      <Grid>
                        <FormControlLabel name='genderType' value="1" control={<Radio />} label="Male" />
                      </Grid>
                      <Grid>
                        <FormControlLabel name='genderType' value="2" control={<Radio />} label="Female" />
                      </Grid>
                    </Grid>
                  </RadioGroup>
                </FormControl>
              </div>
              <div className='col-lg-4 col-md-12 col-sm-6 '>
                <FormControl>
                  <FormLabel className='label-text fontstyle fw-semibold' >Residence Type <span className='text-danger'>*</span></FormLabel>
                  <RadioGroup
                    name='resType'
                    value={resType}
                    onChange={handleResType}
                  >
                    <Grid container>
                      <Grid><FormControlLabel name='resType' value="1" control={<Radio />} label="Owned" /></Grid>
                      <Grid> <FormControlLabel name='resType' value="2" control={<Radio />} label="Rented" /></Grid>
                    </Grid>
                  </RadioGroup>
                  {error.resType && (<small className='text-danger err-msg'>{error.resType}</small>)}
                </FormControl>

              </div>

              <div className='col-lg-4'>
                <FormLabel
                  className='label-text fontstyle fw-semibold'>
                  Working Mode
                </FormLabel>
                <div className=''>
                  <FormControl>
                    <RadioGroup
                      aria-labelledby="demo-controlled-radio-buttons-group"
                      name="controlled-radio-buttons-group"
                      value={workingMode}
                      onChange={handleworkingType}
                    >
                      <Grid container>

                        <Grid>
                          <FormControlLabel
                            value="1"
                            control={<Radio />}
                            label="WFO"
                          />
                        </Grid>
                        <Grid>
                          <FormControlLabel
                            value="2"
                            control={<Radio />}
                            label="WFH"
                          />
                        </Grid>
                      </Grid>
                    </RadioGroup>
                  </FormControl>
                </div>
              </div>

            </div>
            <div className='row d-flex align-items-center'>
              <div className='col-lg-6 '>

              </div>


            </div>
            {/* Email Fields */}
            <div className='row'>
              <div className='col-lg-6 mt-3'>
                <p className='mb-0 pb-1 fw-medium fs-6'>Personal Mail ID <span className='text-danger'>*</span></p>
                <div className="input-group mb-3" >
                  <span className="input-group-text   "><EmailIcon style={{ color: '#9a141a' }} /></span>
                  <input
                    type="email"
                    value={mailid}
                    onChange={(e) => setmailId(e.target.value)}
                    placeholder='Personal Mail ID'
                    className="form-control  rounded-0 h-45"
                  />

                </div>
                {error.mailid && (<small className='text-danger err-msg'>{error.mailid}</small>)}
              </div>

              <div className='col-lg-6 mt-3'>
                <p className='mb-0 pb-1 fw-medium fs-6'>Official Mail ID</p>
                <div className="input-group mb-3">
                  <span className="input-group-text "><EmailIcon style={{ color: '#9a141a' }} /></span>
                  <input
                    type="email"
                    value={officialEmail}
                    onChange={(e) => setOfficialEmail(e.target.value)}
                    placeholder='Office Email'
                    className="form-control  rounded-0 h-45"
                  />
                </div>
                {error.officialEmail && (<small className='text-danger err-msg'>{error.officialEmail}</small>)}
              </div>
            </div>

            <div className='row '>
              <div className='col-lg-4 mt-3'>
                <p className='mb-0 pb-1 fw-medium fs-6  '>Marital Status <span className='text-danger'>*</span></p>
                <select
                  className="form-select h-45 rounded-0"
                  value={maritalStatus}
                  onChange={(e) => setMaritalStatus(e.target.value)}
                  name='maritalStatus'
                >

                  <option value="1">Single</option>
                  <option value="2">Married</option>
                  <option value="3">Divorced</option>
                </select>

                {error.maritalStatus && <small className='err-msg'>{error.maritalStatus}</small>}

              </div>
              <div className='col-lg-8'>
                {/* married status show and hide input start */}
                {maritalStatus == '2' && (
                  <div className='row'>
                    <div className='col-lg-6 pt-3'>
                      <p className='mb-0 pb-1 fw-medium fs-6 '>Spouse Name <span className='text-danger'>*</span></p>
                      <div className=''>
                        <input type='text'
                          value={spousename}
                          onChange={(e) => setSpousename(e.target.value)}
                          className='form-control  rounded-0 h-45'
                          placeholder='Spouse Name' />
                      </div>
                      {error.spousename && (<small className='text-danger err-msg'>{error.spousename}</small>)}

                    </div>

                    <div className='col-lg-6 pt-3'>
                      <p className='mb-0 pb-1 fw-medium fs-6  '>Spouse Contact No. </p>
                      <div className="input-group">
                        <span className="input-group-text  rounded-0 h-45"> <CallIcon style={{ color: '#9a141a' }} /></span>
                        <input
                          type="text"
                          value={spousecontact}
                          onChange={(e) => {
                            const input = e.target.value;
                            // Allow only digits and limit to 10
                            if (/^\d{0,10}$/.test(input)) {
                              setSpouseContact(input);
                            }
                          }}
                          placeholder='Spouse Contact No.'
                          maxLength={10}
                          className="form-control  rounded-0 h-45"
                        />


                      </div>
                      {error.spousecontact && (
                        <small className='text-danger err-msg'>{error.spousecontact}</small>
                      )}

                    </div>
                  </div>
                )}
                {/* end */}
              </div>






            </div>

            <div className='row '>
              <div className='col-lg-4 mt-3'>
                <p className='mb-0 pb-1 fw-medium fs-6  '>Reference Number <span className='text-danger'>*</span></p>
                      <div className="input-group">
                        <span className="input-group-text  rounded-0 h-45"> <CallIcon style={{ color: '#9a141a' }} /></span>
                        <input
                          type="text"
                          value={referenceNumber}
                          onChange={(e) => {
                            const input = e.target.value;
                            // Allow only digits and limit to 10
                            if (/^\d{0,10}$/.test(input)) {
                              setReferenceNumber(input);
                            }
                          }}
                          placeholder='Reference Number'
                          maxLength={10}
                          className="form-control  rounded-0 h-45"
                        />


                      </div>
                      {error.referenceNumber && (
                        <small className='text-danger err-msg'>{error.referenceNumber}</small>
                      )}

              </div>
              <div className='col-lg-8'>
                
                  <div className='row'>
                    <div className='col-lg-6 pt-3'>
                      <p className='mb-0 pb-1 fw-medium fs-6 '>Reference Name <span className='text-danger'>*</span></p>
                      <div className=''>
                        <input type='text'
                          value={referenceName}
                          onChange={(e) => setReferenceName(e.target.value)}
                          className='form-control  rounded-0 h-45'
                          placeholder='Reference Name' />
                      </div>
                      {error.referenceName && (
                        <small className='text-danger err-msg'>{error.referenceName}</small>
                      )}
                     

                    </div>

                    <div className='col-lg-6 pt-3'>
                      <p className='mb-0 pb-1 fw-medium fs-6  '>Reference Relation<span className='text-danger'>*</span></p>
                        <select
                          className="form-select h-45 rounded-0"
                          value={referenceRelation}
                          onChange={(e) => setReferenceRelation(e.target.value)}
                          name='referenceRelation'
                        >

                          <option value="1">Parents</option>
                          <option value="2">Relative</option>
                          <option value="3">Friends</option>
                          <option value="4">Colleague</option>
                          <option value="6">Sibling</option>
                          <option value="5">Other</option>
                          
                        </select>
                      {error.referenceRelation && (
                        <small className='text-danger err-msg'>{error.referenceRelation}</small>
                      )}

                    </div>
                  </div>
                {/* end */}
              </div>






            </div>

            <div className='row '>
              <div className='col-lg-6 pt-3'>
                <p className='mb-0 pb-1 fw-medium fs-6 '>Current Residential Address 1 <span className='text-danger'>*</span></p>
                <div className=''>
                  <input
                    type='text'
                    name='add1'
                    value={addressline1}
                    onChange={(e) => setAddressLine1(e.target.value)}
                    className='form-control rounded-0 h-45'
                    placeholder='Current Residential Address 1' />
                </div>
                {error.addressline1 && (<small className='text-danger err-msg'>{error.addressline1}</small>)}
              </div>
              <div className='col-lg-6 pt-3'>
                <p className='mb-0 pb-1 fw-medium fs-6  '>Current Residential Address 2 <span className='text-danger'>*</span></p>
                <div className=''>
                  <input
                    type='text'
                    name='add2'
                    value={addressline2}
                    onChange={(e) => setAddressLine2(e.target.value)}
                    className='form-control rounded-0 h-45'
                    placeholder='Current Residential Address 1'
                  />
                </div>
                {error.addressline2 && (<small className='text-danger err-msg'>{error.addressline2}</small>)}
              </div>
            </div>


            <div className='row'>
              <div className='col-lg-6 pt-3'>
                <p className='mb-0 pb-1 fw-medium fs-6  '>Landmark</p>
                <div className=''>
                  <input type='text'
                    value={landmark}
                    onChange={(e) => setLandmark(e.target.value)}
                    className='form-control rounded-0 h-45'
                    placeholder='Landmark' />
                </div>
              </div>
              <div className='col-lg-6 pt-3'>
                <p className='mb-0 pb-1 fw-medium fs-6 '>Pincode</p>
                <input
                  type="text"
                  value={customerDetails.residence_pincode}
                  name='citycode'
                  placeholder='City Pincode'
                  className="form-control rounded-0 h-45"
                  disabled />
              </div>
            </div>

            <div className='row'>
              <div className='col-lg-6 pt-3'>
                <p className='mb-0 pb-1 fw-medium fs-6  '>City</p>
                <div className=''>
                  <input type='text'
                    name='city'
                    value={customerDetails.residence_city_name}
                    className='form-control rounded-0 h-45'
                    placeholder='City Name'
                    disabled />
                </div>
              </div>
              <div className='col-lg-6 pt-3'>
                <p className='mb-0 pb-1 fw-medium fs-6  '>State</p>
                <input
                  type="text"
                  name='state'
                  value={customerDetails.residence_state_name}
                  placeholder='State'
                  className="form-control rounded-0 h-45"
                  disabled />
              </div>
            </div>


            {/* <CustomerSelfie onCapture={setSelfieImage setFile} /> */}

            <CustomerSelfie   onCapture={(file) => {
                  // setFile(file);
                  console.log("file", file);  
                  setSelfieImage(file); 
                }}/>


            {/* <div className='row'>
              
              <div className='col-lg-6 pt-3'>
                <p className='mb-0 pb-1 fw-medium fs-6  '>Upload Address Proof</p>
                <input
                  type='file' />
              </div>
            </div> */}

            <div className='row mb-5 pt-3'>
              <div className='col-lg-6'>

                <Button
                  type="submit"
                  onClick={submit}
                  variant='contained'
                  className='mt-4 ms-bg-secondary py-2 px-4'
                  disabled={loader}
                  size='large fw-bold' 
                > {loader ? 'Continuing...' : 'Continue'}  &nbsp;&nbsp;
                  <SendIcon />
                </Button>




              </div>
            </div>

          </div>
        </form>
      </div>
    </div>
  )
}