import React, { useEffect, useState } from 'react'
import contactBanner from '../assets/about-pages/contact_banner.webp'
import LocationCityOutlinedIcon from '@mui/icons-material/LocationCityOutlined';
import ContactPhoneOutlinedIcon from '@mui/icons-material/ContactPhoneOutlined';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Helmet } from 'react-helmet';

export default function Contact() {
  const [isChecked, setIsChecked] = useState(false);
  const [captchaQuestion, setCaptchaQuestion] = useState('');
  const [recaptchaToken, setRecaptchaToken] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    captchaAnswer: '',
  });

  const [errors, setErrors] = useState({});
  const [data, setData] = useState(null);

  const checkedHandleChange = (e) => {
    setIsChecked(e.target.checked);
  };

  useEffect(() => {
    fetch('https://api.crmpaisa.com/index.php/Api/EnquiryController/generate_captcha', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer example-token' // if required
      }
    })
      .then(res => res.json())
      .then(json => setData(json))
      .catch(err => console.error('Error:', err));
  }, []);

  const handleChange = (e) => {
    setIsChecked(e.target.checked);
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  // const handleRecaptchaChange = (token) => {
  //   setRecaptchaToken(token);
  //   setErrors((prev) => ({ ...prev, recaptcha: '' }));
  // };

  const emailRegex = /^[A-Z0-9._]+@[A-Z0-9.]+\.[A-Z]{2,}$/i;
  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^[0-9]{10}$/.test(formData.phone)) {
      newErrors.phone = "Enter a valid 10-digit phone number";
    }
    if (!formData.subject.trim()) newErrors.subject = "Subject is required";
    if (!formData.message.trim()) newErrors.message = "Message is required";
    if (!formData.captchaAnswer.trim()) newErrors.captchaAnswer = "Answer is required";
    if (!recaptchaToken) newErrors.recaptcha = "Please complete the reCAPTCHA";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const submit = () => {
    // if (!validate()) return;

    const param = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      subject: formData.subject,
      message: formData.message,
      answer: formData.captchaAnswer,
      question_id: data?.id,
      recaptcha_token: recaptchaToken,
    };

    fetch('https://api.crmpaisa.com//Api/EnquiryController/enquire', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(param),
    })
      .then((response) => response.json())
      .then((resp) => {

        if (resp?.status === "success") {
          toast.success('Enquiry submitted successfully!');
          setFormData({
            name: '',
            email: '',
            phone: '',
            subject: '',
            message: '',
            captchaAnswer: '',
          });
          setRecaptchaToken('');
          setErrors({});
        } else {
          toast.error(resp?.data?.data || 'Submission failed');
        }
      })
      .catch((err) => {
        console.error('Submission error:', err);
        toast.error('Something went wrong.');
      });
  };

  return (
    <>
    <Helmet>
      <title>EmergencyPaisa | Contact Us</title>
      <meta name="description" content="Contact EmergencyPaisa for detailed information on loan rates, terms and personalized support — clear interest, fees and repayment guidance from our team." />
      <link rel="canonical" href="https://emergencypaisa.com/contact" />
    </Helmet>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
      <div className='ms-hero-banner-sec' style={{ paddingTop: '80px' }}>
        <div className="container">
          <div className='row  align-items-center'>
            <div className='col-lg-6'>
              <div className='ms-banner-heading'>
                <span className='ms-takeaways ms-bg-secondary'> Instant Monetary Relief</span>
                <h1 className='fs-1 pt-3 fw-semibold'> Enjoy Smooth Processing</h1>
                <p className='fw-lighter fs-5 pt-3'>From a month-end cash crunch to instant monetary relief, experience hassle-free loan processing.</p>
              </div>
            </div>
            <div className='col-lg-6'>
              <img src={contactBanner} alt='Instant Monetary Relief' className='img-fluid' />
            </div>
          </div>
        </div>
      </div>

      <div className='container p-5'>
        <div className="row">
          <div className='col-lg-4 p-3' style={{ borderRight: '1px solid #ddd' }}>
            <div className='col-lg-12 pt-4 pb-3' style={{ borderBottom: '1px solid #ddd', }}>
              <h5 className=' fw-medium text-uppercase'> <LocationCityOutlinedIcon className='ms-text-secondary' style={{ fontSize: '40px' }} /> Our Registered Address</h5>
              <p style={{ fontSize: '14px', lineHeight: '22px', whiteSpace: 'pre-line' }}>
              {`Floor No.: Seventh Floor
              Building No./Flat No.: Bearing No. 752
              Name Of Premises/Building: Netaji Subhash Place
              Road/Street: Aggarwal Metro Heights
              Locality/Sub Locality: Pitampura
              City/Town/Village: New Delhi
              District: North West Delhi
              State: Delhi
              PIN Code: 110034`}
              </p>
            </div>
            <div className='col-lg-12 pt-4 pb-3' style={{ borderBottom: '1px solid #ddd' }}>
              <h5 className='fw-medium text-uppercase'> <LocationCityOutlinedIcon className='ms-text-secondary' style={{ fontSize: '40px' }} /> Our Office Address</h5>
              <p style={{ fontSize: '14px', lineHeight: '22px', whiteSpace: 'pre-line' }}>
              {`Floor No.: Seventh Floor
              Building No./Flat No.: Bearing No. 752
              Name Of Premises/Building: Netaji Subhash Place
              Road/Street: Aggarwal Metro Heights
              Locality/Sub Locality: Pitampura
              City/Town/Village: New Delhi
              District: North West Delhi
              State: Delhi
              PIN Code: 110034`}
              </p>
            </div>
            <div className='col-lg-12 pt-4'>
              <h5 className='fw-medium text-uppercase'> <ContactPhoneOutlinedIcon className='ms-text-secondary' style={{ fontSize: '40px' }} /> Contact Us</h5>
              <p className='mb-0'>+91 9821388824</p>
              <p>info@emergencypaisa.com</p>
            </div>
          </div>
          <div className='col-lg-8 p-3'>
            <h3 className='fw-bold'>Have <span className='ms-text-primary'>Any Questions?</span></h3>
            <p className='mb-0'>Have any query or want to enquire about the services we provide?</p>
            <p>Fill out the contact form below and our team will get back to you as soon as possible.</p>

            <form noValidate>
              <div className='row '>
                <div className='col-lg-6 p-3'>
                  <label className='fw-medium'>Name *</label>
                  <input type='text'
                    className='form-control'
                    placeholder='Enter Name'
                    style={{ height: '50px' }}
                    name='name'
                    value={formData.name}
                    onChange={handleChange} />
                  {errors.name && <small className='text-danger'>{errors.name}</small>}
                </div>
                <div className='col-lg-6 p-3'>
                  <label className='fw-medium'>Email *</label>
                  <input type='email'
                    className='form-control'
                    placeholder='Enter Email ID'
                    style={{ height: '50px' }}
                    name='email'
                    value={formData.email}
                    onChange={handleChange}
                    onKeyDown={(e) => {
                      const invalidKeys = [' ', ',', ';', '(', ')'];
                      if (invalidKeys.includes(e.key)) e.preventDefault();
                    }}
                  />
                  {errors.email && <small className='text-danger'>{errors.email}</small>}
                </div>
              </div>
              <div className='row '>
                <div className='col-lg-6 p-3'>
                  <label className='fw-medium'>Phone No.*</label>
                  <input type='text'
                    className='form-control'
                    placeholder='Enter Contact No.'
                    style={{ height: '50px' }}
                    name='phone'
                    value={formData.phone}
                    onChange={handleChange}
                    onKeyDown={(e) => {
                      const allowedKeys = ['Backspace', 'ArrowLeft', 'ArrowRight', 'Tab', 'Delete'];
                      if (!/^[0-9]$/.test(e.key) && !allowedKeys.includes(e.key)) {
                        e.preventDefault();
                      }
                    }}
                    maxLength={10}
                  />
                  {errors.phone && <small className='text-danger'>{errors.phone}</small>}
                </div>
                <div className='col-lg-6 p-3'>
                  <label className='fw-medium'>Subject</label>
                  <input type='text'
                    className='form-control'
                    style={{ height: '50px' }}
                    name='subject'
                    value={formData.subject}
                    onChange={handleChange}
                  />
                  {errors.subject && <small className='text-danger'>{errors.subject}</small>}
                </div>
              </div>
              <div className='row '>
                <div className='col-lg-12 p-3'>
                  <label className='fw-medium'>Message</label>
                  <textarea
                    rows="4"
                    className='form-control'
                    name='message'
                    value={formData.message}
                    onChange={handleChange}
                  ></textarea>
                  {errors.message && <small className='text-danger'>{errors.message}</small>}
                </div>
              </div>
              {/* capcha start */}
              <div className='row mt-1'>
                <div className='col-lg-12'>
                  <h5 className='fs-5 fw-semibold'>Solve this question first:</h5>
                </div>
                <div className='col-lg-6' style={{ padding: '15px', fontSize: '25px' }}>
                  <div>{captchaQuestion}</div>
                 <p className='fw-medium'> {data?.data?.captcha_question}</p>
                </div>
                <div className='col-lg-6'>
                  <input

                    name='captchaAnswer'
                    value={formData.captchaAnswer}
                    onChange={handleChange}
                    onKeyDown={(e) => {
                      const allowedKeys = ['Backspace', 'ArrowLeft', 'ArrowRight', 'Tab', 'Delete'];
                      if (!/^[0-9]$/.test(e.key) && !allowedKeys.includes(e.key)) {
                        e.preventDefault();
                      }
                    }}
                    placeholder='Answer *'
                    className='form-control'
                    style={{ border: '2px solid #ddd' }}
                  />
                  {errors.captchaAnswer && <small className='text-danger'>{errors.captchaAnswer}</small>}
                </div>
              </div>
              {/* end */}
              <div className='row'>
                <div style={{ display: 'flex', alignItems: 'start' }}>
                  <input style={{ marginTop: '5px' }}
                    type="checkbox"
                    checked={isChecked}
                    onChange={checkedHandleChange}

                  />
                  <p style={{ color: '999', fontSize: '13px', paddingLeft: '10px' }}>We may use your information to respond to your inquiries, provide customer service support, send you important information about the services, and send you marketing communications (with your consent) via different channels, including but not limited to SMS, RCS, Email, WhatsApp, and Voice.</p>

                </div>


              </div>

              <div className='mt-4'>
                <button 
                  disabled={!isChecked}
                  type="button"
                  className="apply-now-btn btn btn-primary rounded-5 fs-5 fw-medium"
                  onClick={submit}
                >
                  Submit
                </button>

              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}