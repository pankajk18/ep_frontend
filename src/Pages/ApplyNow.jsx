import React, { useEffect, useRef, useState } from "react";
import "../css/apply.css";
import LibraryAddCheckIcon from "@mui/icons-material/LibraryAddCheck";
import { Link, useNavigate } from "react-router-dom";
// import LaunchOutlinedIcon from '@mui/icons-material/LaunchOutlined';
import OtpBox from "../component/OtpBox";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getLeadHistory, login } from "../Utils/api";
import { useDispatch, useSelector } from "react-redux";
import { updateCustomerDetails } from "../CustomerJourneyDetails/CustomerJourneyDetails";
import { updateAutoCustomerDetails } from "../CustomerJourneyDetails/AutoCustomerJourneyDetails";
import scannerImg from "../assets/scannerImg.jpeg";
import Logo from "../assets/logo.png";

export default function ApplyNow() {
  const [ischk, setIschk] = useState(true);
  const [ischk2, setIschk2] = useState(true);
  const [otpInput, setOtpInput] = useState(false);
  const [loader, setLoader] = useState(false);
  const [digits, setDigits] = useState(new Array(10).fill(""));
  const [phone, setPhone] = useState("");
  const inputsRef = useRef([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const customerDetails = useSelector(
    (state) => state.customerJourneyDetails.customerDetails,
  );
  const checklogin = customerDetails?.token;
  const { loan_quote, personal_details, upload_documents } = useSelector(
    (state) => state?.customerJourneyDetails?.journeySteps,
  );

  const getUtmParams = () => {
    const params = new URLSearchParams(window.location.search);
    return {
      utm_source: params.get("utm_source") || "",
      utm_medium: params.get("utm_medium") || "",
      utm_campaign: params.get("utm_campaign") || "",
      utm_term: params.get("utm_term") || "",
      utm_content: params.get("utm_content") || "",
      click_id: params.get("click_id") || "",
    };
  };

  useEffect(() => {
    if (loan_quote === 1 && personal_details === 1 && upload_documents === 1) {
      navigate("/journey/dashboard");
      return;
    }

    if (checklogin) {
      const fetchData = async () => {
        const params = {
          leadId: customerDetails.lead_id,
        };

        try {
          const response = await getLeadHistory(params);
          if (response?.data?.status === 1) {
            var leadDetails = response?.data?.data;
            if (leadDetails[0]?.lead_creation_mode == 1) {
              navigate("/auto-journey");
            } else {
              navigate("/journey");
            }
          } else {
            console.warn("Lead detail generation failed:", response);
          }
        } catch (error) {
          console.error("Error generating lead detail:", error);
        }
      };
      fetchData();
    }
  }, [checklogin]);

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
    setIschk(e.target.checked);
  };

  const handleTerm2 = (e) => {
    setIschk2(e.target.checked);
  };

  const handlelogin = async () => {
    const mobileNumber = digits.join("");

    //  Validate 10-digit mobile number before proceeding
    if (mobileNumber.length < 10) {
      toast.error("Please enter a valid 10-digit mobile number.");
      return;
    }

    const { utm_source, utm_medium, utm_campaign, utm_term, utm_content } =
      getUtmParams();

    const param = {
      utmSource: utm_source,
      utmMedium: utm_medium,
      utmCampaign: utm_campaign,
      utmTerm: utm_term,
      utm_content,
      mobile: mobileNumber,
      sourceId: 1,
    };

    try {
      setLoader(true);
      const response = await login(param);
      if (response?.data?.apiStatus === 1) {
        toast.success(response?.data?.message);
        dispatch(
          updateCustomerDetails({
            profileId: response?.data?.data?.profileId,
            mobile: mobileNumber,
          }),
        );

        dispatch(
          updateAutoCustomerDetails({
            profileId: response?.data?.data?.profileId,
            mobile: mobileNumber,
          }),
        );

        setOtpInput(true);
      } else {
        toast.error(
          response?.data?.message || "Login Failed, Check your number again",
        );
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
      <div className="ms-applyWrap container" style={{ overflow: "hidden" }}>
        <div className="row">
          <div className="col-lg-6 ms-left-wrap">
            {/* <img src={AppScreenImg} alt='Emergency Paisa' style={{ width: '50%' }} /> */}
            <div className="p-4">
              {/* <h5 className='fw-semibold pt-2' style={{ lineHeight: '30px' }}>Instant Loans for Your Urgent Needs</h5>
                            <p>EmergencyPaisa helps you get quick financial support whenever life throws unexpected expenses your way. With a fully digital process, you can apply in minutes and receive fast approval without heavy paperwork or collateral. Once approved, the amount is transferred directly to your bank account for immediate use. We focus on speed, simplicity, and secure processing to make your borrowing experience smooth and worry-free.</p> */}
              <h5 className="fw-bolder ms-text-secondary">
                Why EmergencyPaisa?
              </h5>
              <ul className="pt-3">
                <li>
                  {" "}
                  <LibraryAddCheckIcon className="ms-text-primary" /> Quick
                  online application
                </li>
                <li>
                  {" "}
                  <LibraryAddCheckIcon className="ms-text-primary" /> Instant
                  approval{" "}
                </li>
                <li>
                  {" "}
                  <LibraryAddCheckIcon className="ms-text-primary" /> No
                  collateral required
                </li>
                <li>
                  {" "}
                  <LibraryAddCheckIcon className="ms-text-primary" /> Direct
                  bank transfer
                </li>
                <li>
                  {" "}
                  <LibraryAddCheckIcon className="ms-text-primary" /> Safe &
                  transparent process
                </li>
                <li>
                  {" "}
                  <LibraryAddCheckIcon className="ms-text-primary" /> Apply now
                  and get funds when you need them most
                </li>
              </ul>
              <div className="d-flex justify-content-start align-items-center gap-3">
                <div className="rounded d-inline-block p-1 shadow">
                  <img
                    src={scannerImg}
                    alt="Scan QR to Download App"
                    className="img-fluid mb-3"
                    style={{ width: "140px", height: "140px" }}
                  />
                </div>
                <div className="text-center">
                  <p className="fw-semibold mb-0">Scan QR Code to Download</p>
                  <small className="text-muted">
                    Available on Android & iOS
                  </small>
                  <div className="d-flex gap-3 mt-4">
                    <Link
                      to="https://play.google.com/store/apps/details?id=com.suburban.emergency_paisa"
                      target="_blank"
                      className="btn btn-dark d-flex align-items-center px-3"
                    >
                      <i className="bi bi-google-play fs-4 me-2"></i>
                      <div className="text-start lh-1">
                        <small>GET IT ON</small>
                        <strong className="d-block">Google Play</strong>
                      </div>
                    </Link>

                    {/* <Link to="/" target="_blank" className="btn btn-dark d-flex align-items-center px-3">
                                            <i className="bi bi-apple fs-4 me-2"></i>
                                            <div className="text-start lh-1">
                                                <small>Download on the</small>
                                                <strong className="d-block">App Store</strong>
                                            </div>
                                        </Link> */}
                  </div>
                </div>
              </div>

              {/* <div className='btn-wrap pt-3 d-flex '>
                                <div className='app-store  d-flex'>
                                    <Link to='https://play.google.com/store/apps/details?id=com.suburban.emergency_paisa' target='_blank'><img src={playStoreIcon} alt='EP' width="192" height="67" /></Link>
                                </div>
                                <div className='app-store  d-flex'>
                                    <Link to='/'><img src={appStoreIcon} alt='EP' width="192" height="67" /></Link>
                                </div>
                            </div> */}
            </div>
          </div>
          <div className="col-lg-6 ms-right-wrap">
            <Link className="navbar-brand" to="/" style={{ margin: "0 auto" }}>
              <img src={Logo} alt={"Emergency Paisa"} />
            </Link>
            <div className="ms-login-wrap pt-5">
              <h1 className="text-uppercase fw-bold fs-2">
                Welcome To{" "}
                <span className="ms-text-secondary">EmergencyPaisa</span>
              </h1>
              {phone}
              {!otpInput ? (
                <>
                  <h5 className="pt-4">Enter your mobile number</h5>
                  <div className="num-wrap d-flex pt-3">
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

                  <div className="pt-3">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        checked={ischk}
                        onChange={handleTerm}
                      />
                      <span
                        className="form-check-label fs-6"
                        htmlFor="flexCheckIndeterminate"
                      >
                        I agree to the{" "}
                        <Link
                          to="/terms-and-conditions"
                          className="text-decoration-none fw-semibold ms-text-secondary"
                        >
                          Terms & Conditions
                        </Link>{" "}
                        and{" "}
                        <Link
                          to="/privacy-policy"
                          className="text-decoration-none fw-semibold ms-text-secondary"
                        >
                          Privacy Policy
                        </Link>
                        .
                      </span>
                    </div>

                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        checked={ischk2}
                        onChange={handleTerm2}
                      />
                      <span
                        className="form-check-label fs-6"
                        htmlFor="flexCheckIndeterminate"
                      >
                        I agree to receive Messages, Emails, RCS, SMS, Calls,
                        and WhatsApp communications, along with updates to my
                        mobile number or email.
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={!loader ? handlelogin : null}
                    disabled={!ischk || loader}
                    style={{ width: "100%" }}
                    className={`btn p-2 mt-5 fw-bold fs-5 mx-auto ${ischk && !loader ? "ms-bg-secondary text-white" : "disablebtn"}`}
                  >
                    {loader ? (
                      <>
                        <span
                          className="spinner-border spinner-border-sm me-2"
                          role="status"
                          aria-hidden="true"
                        ></span>
                        Sending OTP...
                      </>
                    ) : (
                      "Get OTP"
                    )}
                  </button>
                </>
              ) : (
                <OtpBox />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* start */}
      <section class="py-5 bg-light">
        <div class="container">
          <div class="text-center mb-5">
            <h3 class="fw-bold ms-text-primary">
              {" "}
              <span className="ms-text-secondary">Loan Eligibility</span> &
              Documents Required
            </h3>
            <p class="text-muted">
              Check who can apply and what documents are needed for quick
              approval
            </p>
          </div>

          <div class="row g-4">
            {/* Eligibility Criteria  */}
            <div class="col-lg-6">
              <div class="card shadow-sm border-0">
                <div class="card-body">
                  <h5 class="fw-semibold mb-3 ms-text-secondary">
                    Eligibility Criteria
                  </h5>
                  <ul class="list-group list-group-flush">
                    <li class="list-group-item">
                      {" "}
                      <span className="ms-text-primary"> ✔</span> Age between 21
                      to 55 years
                    </li>
                    <li class="list-group-item">
                      <span className="ms-text-primary"> ✔</span>Indian resident
                    </li>
                    <li class="list-group-item">
                      <span className="ms-text-primary"> ✔</span> For salaried
                      working professionals{" "}
                    </li>
                    <li class="list-group-item">
                      <span className="ms-text-primary"> ✔</span> Minimum
                      monthly income ₹30,000
                    </li>
                    <li class="list-group-item">
                      <span className="ms-text-primary"> ✔</span> Valid PAN &
                      mobile number
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Documents Required  */}
            <div class="col-lg-6">
              <div class="card h-100 shadow-sm border-0">
                <div class="card-body">
                  <h5 class="fw-semibold mb-3 ms-text-primary">
                    Documents Required
                  </h5>
                  <ul class="list-group list-group-flush">
                    <li class="list-group-item">📄 PAN Card</li>
                    <li class="list-group-item">📄 Aadhaar Card</li>
                    <li class="list-group-item">
                      📄 Bank Statement (Last 3 months)
                    </li>
                    <li class="list-group-item">
                      📄 Salary slips or income proof
                    </li>
                    <li class="list-group-item">📄 Active mobile number</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* end */}

      {/* start  */}
      <section className="py-5">
        <div className="container">
          <div className="mb-5">
            <h3 className="fw-bold ms-text-primary">
              {" "}
              <span className="ms-text-secondary">Interest Rates</span> &
              Charges
            </h3>
            <p className="text-muted mt-2">
              Welcome to the EmergencyPaisa website, operated by SUBURBAN
              FINANCE & INVESTMENT PRIVATE LIMITED ("we", "us", "our"). By
              accessing or using our website ("Site") and services ("Services"),
              you agree to be bound by the following terms and conditions.
            </p>
          </div>

          <div className="row">
            <div className="col-md-6 col-lg-4 py-3 border-end border-bottom">
              <h3 className="fw-bold ">2.9166%</h3>
              <p className="fw-medium ms-text-secondary">
                Monthly Interest Rate
              </p>
            </div>

            <div className="col-md-6 col-lg-4 py-3 border-end border-bottom">
              <h3 className="fw-bold ">2%</h3>
              <p className="fw-medium ms-text-secondary">Processing Fee</p>
            </div>

            <div className="col-md-6 col-lg-4 py-3 border-bottom">
              <h3 className="fw-bold">35% (Fixed)</h3>
              <p className="fw-medium ms-text-secondary">
                Offered Annual Percentage Rate (APR)
              </p>
            </div>

            <div className="col-md-6 col-lg-4 py-3 border-end">
              <h3 className="fw-bold">18%</h3>
              <p className="fw-medium ms-text-secondary">
                GST on Processing Fee
              </p>
            </div>

            <div className="col-md-6 col-lg-4 py-3 border-end">
              <h3 className="fw-bold">1 – 3 Years</h3>
              <p className="fw-medium ms-text-secondary">
                Tenure / Repayment Period
              </p>
            </div>

            <div className="col-md-6 col-lg-4 py-3">
              <h3 className="fw-bold ">₹10,000 – ₹5,00,000</h3>
              <p className="fw-medium ms-text-secondary">Loan Amount</p>
            </div>
          </div>
        </div>
      </section>

      {/* end */}

      {/* representative example start */}
      <section className="py-3">
        <div className="container">
          <h3 className="fw-bold mb-4 ms-text-primary">
            Representative Example
          </h3>

          {/* Responsive Table */}
          <div className="table-responsive shadow-sm rounded">
            <table className="table table-bordered align-middle mb-0">
              <thead className="table-light">
                <tr>
                  <th>Loan Amount</th>
                  <th>APR</th>
                  <th>Tenure</th>
                  <th>Processing Fee</th>
                  <th>GST on Processing Fee</th>
                  <th>Amount Disbursed</th>
                  <th>EMI</th>
                  <th>Total Repayment Amount</th>
                  <th>Total Interest</th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td>₹ 50,000</td>
                  <td>35%</td>
                  <td>12 Months</td>
                  <td>₹ 1,000</td>
                  <td>₹ 180</td>
                  <td>₹ 48,820</td>
                  <td>₹ 4,998</td>
                  <td>₹ 59,978</td>
                  <td>₹ 9,978</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Note */}
          <p className="text-muted small mt-3">
            *The above example is for representative purposes only and actual
            loan terms may vary.
          </p>
        </div>
      </section>
      {/* end */}

      <section className="py-2 pb-5">
        <div className="container">
          <h3 className="fw-bold mb-2 ms-text-primary">
            Company Accreditation
          </h3>
          <p className="small mt-1">
            We are registered under the name{" "}
            <span className="fw-semibold">
              SUBURBAN FINANCE & INVESTMENT PRIVATE LIMITED,
            </span>{" "}
            a registered NBFC (non-banking financial institution), approved by
            RBI.
          </p>
        </div>
      </section>
    </>
  );
}
