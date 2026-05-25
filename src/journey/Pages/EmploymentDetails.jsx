import React, { useEffect, useState } from 'react'
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { Grid, Button } from '@mui/material';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import EmailIcon from '@mui/icons-material/Email';
import SendIcon from '@mui/icons-material/Send';
import { getEmployeeDetail } from '../../Utils/api';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { updateCustomerDetails, updateJourneyEvents } from '../../CustomerJourneyDetails/CustomerJourneyDetails';


export default function EmploymentDetails() {
  const [workingMode, setworkingMode] = useState('');
  const [comtype, setCompType] = useState('')
  const [department, setDepartment] = useState('')
  const [empDesination, setEmpDesination] = useState('')
  const [empsince, setEmpsince] = useState('')
  const [companyname, setCompanyname] = useState('')
  const [companyaddline1, setCompanyAddLine1] = useState('')
  const [companyaddline2, setCompanyAddLine2] = useState('')
  const [companypincode, setCompanyPincode] = useState('')
  const [officialEmail, setOfficialEmail] = useState('');
  const [landmark, setLandmark] = useState('');

  const customerDetails = useSelector((state) => state.customerJourneyDetails.customerDetails);
  const dispatch = useDispatch();

  const [errors, setError] = useState('')

  // Pre-fill input fields from Redux
    useEffect(() => {
    if (customerDetails) {
        setCompanyname(customerDetails.emp_company_name);
        setCompanyAddLine1(customerDetails.emp_address_1);
        setCompanyAddLine2(customerDetails.emp_address_2);
        setOfficialEmail(customerDetails.office_email);
        setLandmark(customerDetails.emp_landmark);
        setCompanyPincode(customerDetails.emp_pincode);
    }
}, [customerDetails]);

  const handleworkingType = (event) => {
    setworkingMode(event.target.value);
  };

  const departmentName = [

    { label: "Sales", value: "1" },
    { label: "Credit", value: "2" },
    { label: "Accounts", value: "3" },
    { label: "Finance", value: "4" },
    { label: "Business", value: "5" },
    { label: "Operations", value: "6" },
    { label: "Technology", value: "7" },
    { label: "Admin", value: "8" },
    { label: "Human Resources", value: "9" },
  ]


  const companyType = [
    { label: "Private", value: "1" },
    { label: "Public", value: "2" },
    { label: "Listed Public", value: "3" },
    { label: "State Government", value: "4" },
    { label: "Centeral Government", value: "5" },
    { label: "Partnership Firm", value: "6" },
    { label: "Proprietorship Firm", value: "7" },
    { label: "Limited Liability Partnership(LLP)", value: "8" },
    { label: "NBFC", value: "9" },
  ]

  const formValidation = () => {
    const errList = {};
    if (!department.trim()) {
      errList.department = 'Please select department'
    }
    if (!comtype.trim()) {
      errList.comtype = 'Select company Type'
    }

    if (!empDesination.trim()) {
      errList.empDesination = 'Enter employee Desination'
    }
   
    if (!companyname.trim()) {
      errList.companyname = 'Enter Company Name'
    }
    if (!companyaddline1.trim()) {
      errList.companyaddline1 = 'Enter Address Line 1'
    }
    if (!companyaddline2.trim()) {
      errList.companyaddline2 = 'Enter Address Line 2'
    }

    if (!companypincode.trim()) {
      errList.companypincode = 'Enter pincode'
    }

    setError(errList);
    return Object.keys(errList).length === 0;

  }


  const handleEmployment = (event) => {
    event.preventDefault();
    if (formValidation()) {
      console.log("Form submitted successfully");
      //console.log(personalParameter)

    }
  }

   const submit = async () => {
  if (!formValidation()) {
    return; // Do not proceed if form is invalid
  }

  const param = {
    profileId: customerDetails?.profileId,
    workMode: workingMode,
    departmentId: department,
    designation: empDesination,
    joiningDate: empsince,
    companyName: companyname,
    addressLine1: companyaddline1,
    addressLine2: companyaddline2,
    addressPincode: companypincode,
    addressLandmark: landmark,
    officialEmail: officialEmail,
    companyTypeId: comtype,
   
  };

  try {
    const response = await getEmployeeDetail(param);
    if (response?.data?.apiStatus == 1) {
      toast.success(response?.data?.message);
      dispatch(updateCustomerDetails({
         emp_company_name:companyname,
         emp_department:department,
         emp_designation:empDesination,
         office_email:officialEmail,
         emp_pincode:companypincode,
         emp_address_1:companyaddline1,
         emp_address_2:companyaddline2,
         emp_landmark:landmark,


      }));
      dispatch(updateJourneyEvents({
        employment_details: 1,
        upload_documents: 2,
      }));
    } else {
      toast.error(response?.data?.message || 'Something went wrong');
    }
  } catch (error) {
    toast.error("Error submitting data");
    console.error(error);
  }
};


  return (
    <div className='box-height bg-emp'>
      <div className='wraper-right-box'>

        <form onSubmit={handleEmployment}>
          <div className='row d-flex align-items-center'>
            {/* <div className='row'>
              <h3 className='pl-5 fontstyle'>Employment Information</h3>
            </div> */}
            <div className='col-lg-3 p-0 '>
              <FormLabel
                className='label-text fontstyle fw-medium'>
                Working Mode <span className='text-danger'>*</span>
              </FormLabel>
            </div>
            <div className='col-lg-9 col-md-12 col-sm-12 '>
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
                        value="2"
                        control={<Radio />}
                        label="Work from Home"
                      />
                    </Grid>
                    <Grid>
                      <FormControlLabel
                        value="1"
                        control={<Radio />}
                        label="Work from Office"
                      />
                    </Grid>
                  </Grid>
                </RadioGroup>
              </FormControl>
            </div>
          </div>

          <div className='row '>
            <div className='col-lg-6 mt-2 '>
              <select
                className="form-select"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
              >
                <option value=" ">Select Department</option>
                {
                  departmentName.map((dept_name) => {
                    return (
                      <option
                        key={dept_name.value}
                        value={dept_name.value}
                      >
                        {dept_name.label}
                      </option>
                    )
                  })
                }
              </select>
              {errors.department && (<small className='text-danger err-msg'>{errors.department}</small>)}

            </div>

            <div className='col-lg-6 mt-2'>
              <select
                className="form-select"
                id="floatingSelectGrid"
                aria-label="Floating label select example"
                value={comtype}
                onChange={(e) => setCompType(e.target.value)}
              >
                <option>Select Company Type</option>
                {
                  companyType.map((comList) => {
                    return (
                      <option
                        key={comList.value}
                        value={comList.value}
                      >
                        {comList.label}
                      </option>
                    )
                  })
                }
              </select>
              {errors.comtype && <small className='err-msg'>{errors.comtype}</small>}
            </div>
          </div>

          <div className='row mt-2'>
            <div className='col-lg-6 '>
              <p className='mb-0 pb-1 fs-6 fontstyle '>
                Employee Designation <span className='text-danger'>*</span></p>
              <input
                type="text"
                value={empDesination}
                onChange={(e) => setEmpDesination(e.target.value)}
                className="form-control solid-border"
              />
              {errors.empDesination && <small className='err-msg'>{errors.empDesination}</small>}
            </div>
            <div className='col-lg-6 '>
              <p className='mb-0 pb-1  fs-6 fontstyle '>Joining Date</p>
              <div className="input-group " >
                {/* <span className="input-group-text solid-border" >
                  <CalendarMonthIcon style={{ color: '#9a141a' }} /></span> */}
                <input
                  type="date"
                  className="form-control solid-border"
                  value={empsince}
                  onChange={(e) => setEmpsince(e.target.value)}
                />
              </div>
              
            </div>
          </div>

          <div className='row mt-2'>
            <div className='col-lg-6 '>
              <p className='mb-0 pb-1 fs-6 fontstyle '>
                Company Name<span className='text-danger'>*</span>
              </p>
              <input
                type="text"
                className="form-control solid-border"
                value={companyname}
                onChange={(e) => setCompanyname(e.target.value)}
              />
              {errors.companyname && <small className='err-msg'>{errors.companyname}</small>}
            </div>
            <div className='col-lg-6 '>
              <p className='mb-0 pb-1  fs-6 fontstyle '>Official Mail ID </p>
              <div className="input-group mb-3" >
                {/* <span className="input-group-text solid-border" > <EmailIcon style={{ color: '#9a141a' }} /></span> */}
                <input
                  type="mail"
                  className="form-control solid-border"
                  value={officialEmail}
                  onChange={(e) => setOfficialEmail(e.target.value)}
                />
              </div>
            </div>
          </div>

          <h5 className='pt-3'>ALSO, WHERE’S YOUR OFFICE</h5>
          <div className='row mt-3'>
            <div className='col-lg-6 '>
               <p className='mb-0 pb-1 fw-medium fs-6 fontstyle '>
                 Address Line1<span className='text-danger'>*</span>
              </p>
              <input
                type="text"
                value={companyaddline1}
                onChange={(e) => setCompanyAddLine1(e.target.value)}
                placeholder='Address Line1'
                className="form-control solid-border"
              />
              {errors.companyaddline1 && <small className='err-msg'>{errors.companyaddline1}</small>}
            </div>
            <div className='col-lg-6 '>
               <p className='mb-0 pb-1 fw-medium fs-6 fontstyle '>
                 Address Line2<span className='text-danger'>*</span>
              </p>
              <input
                type="text"
                value={companyaddline2}
                onChange={(e) => setCompanyAddLine2(e.target.value)}
                placeholder='Address Line2'
                className="form-control solid-border"
              />
              {errors.companyaddline2 && <small className='err-msg'>{errors.companyaddline2}</small>}
            </div>
          </div>

          <div className='row mt-3'>
            <div className='col-lg-6 '>
              <p className='mb-0 pb-1 fw-medium fs-6 fontstyle '>
                Landmark
              </p>
            <input
              type="text"
              placeholder='Landmark'
              value={landmark}
              onChange={(e) => setLandmark(e.target.value)}
              className="form-control solid-border"
            />
            </div>
            <div className='col-lg-6'>
               <p className='mb-0 pb-1 fw-medium fs-6 fontstyle '>
                 PinCode<span className='text-danger'>*</span>
              </p>
              <input
                type="number"
                value={companypincode}
                 onChange={(e) => {
                  const value = e.target.value;
                  if (/^\d{0,6}$/.test(value)) {
                      setCompanyPincode(value);
                  }
              }}
                placeholder='City pincode'
                className="form-control solid-border" />
              {errors.companypincode && <small className='err-msg'>{errors.companypincode}</small>}
            </div>
          </div>

          <div className='row pt-1 mb-3'>
            <div className='col-lg-6'>
              <Button
                type="submit"
                variant='contained'
                onClick={submit}
                className='mt-4'
                size='large fw-bold' style={{ background: '#9a141a' }}
              > Continues &nbsp;&nbsp;
                <SendIcon />
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
