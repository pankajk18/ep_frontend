import React, { useEffect, useState } from "react";
import "../css/apply.css";
import scannerImg from "../assets/applyNow/scanner.png";
import razorPay from "../assets/rozypay-logo.png";
import payULogo from "../assets/payu-logo.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import WarningAmberOutlinedIcon from "@mui/icons-material/WarningAmberOutlined";
import { Helmet } from "react-helmet";

export default function PayNow() {
  const PayNowTag = [
    { id: "01", name: "Flexible Options" },
    { id: "02", name: "Auto-Debit Facility" },
    { id: "03", name: "Online Payment" },
    { id: "04", name: "Timely Reminders" },
    { id: "05", name: "No Hidden Charges" },
    { id: "06", name: "EMI Calculation" },
  ];

  const brandName = process.env.REACT_APP_COMPANY_N;
  const brandLogo = process.env.REACT_APP_LOGO;

  // States
  const [getPancard, setPancard] = useState("");
  const [panError, setPanError] = useState("");
  const [otpError, setOtpError] = useState("");
  const [getOtp, setOtp] = useState("");
  const [content, setContent] = useState("pannumber");
  const [paymentAmount, setPaymentAmount] = useState("");
  const [paymentGateways, setPaymentGateways] = useState([]);
  const [orderId, setOrderId] = useState("");
  const [repaymentData, setRepaymentData] = useState(null);
  const [getLoading, setLoading] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState("");
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);
  const [panInputs, setPanInputs] = useState(Array(10).fill(""));
  const panRefs = Array.from({ length: 10 }, () => React.createRef());

  const [otpInputs, setOtpInputs] = useState(Array(4).fill(""));
  const otpRefs = Array.from({ length: 4 }, () => React.createRef());
  const location = useLocation();

  const leadId = location.pathname.split("/").filter(Boolean)[1];

  const handlePanInputChange = (e, index) => {
    const value = e.target.value.toUpperCase();
    if (/^[A-Z0-9]{0,1}$/.test(value)) {
      const newInputs = [...panInputs];
      newInputs[index] = value;
      setPanInputs(newInputs);

      if (value && index < 9) {
        panRefs[index + 1].current.focus();
      }

      const joinedPan = newInputs.join("");
      setPancard(joinedPan);
      const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
      setPanError(
        joinedPan.length === 10 && !panRegex.test(joinedPan)
          ? "Invalid PAN format."
          : "",
      );
    }
  };

  const handlePanKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      e.preventDefault();
      const newInputs = [...panInputs];

      if (newInputs[index]) {
        newInputs[index] = "";
        setPanInputs(newInputs);
        setPancard(newInputs.join(""));
      } else if (index > 0) {
        panRefs[index - 1].current.focus();
        newInputs[index - 1] = "";
        setPanInputs(newInputs);
        setPancard(newInputs.join(""));
      }
    }
  };

  const handleOtpKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      e.preventDefault();
      const newInputs = [...otpInputs];

      if (newInputs[index]) {
        newInputs[index] = "";
        setOtpInputs(newInputs);
        setOtp(newInputs.join(""));
      } else if (index > 0) {
        otpRefs[index - 1].current.focus();
        newInputs[index - 1] = "";
        setOtpInputs(newInputs);
        setOtp(newInputs.join(""));
      }
    }
  };

  const handleOtpInputChange = (e, index) => {
    const value = e.target.value;
    if (/^[0-9]{0,1}$/.test(value)) {
      const newInputs = [...otpInputs];
      newInputs[index] = value;
      setOtpInputs(newInputs);

      if (value && index < 3) {
        otpRefs[index + 1].current.focus();
      }

      setOtp(newInputs.join(""));
    }
  };

  const handlePaymentAmountChange = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setPaymentAmount(value);
    }
  };

  useEffect(() => {
    const fetchRepayLink = async () => {
      try {
        const resp = await fetch(
          "https://api.crmpaisa.com/Api/CustomerDetails/verifyRepayLink",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              refstr: leadId,
            }),
          },
        );

        if (resp.status === 200) {
          const dataset = await resp.json();

          if (dataset.Status === 1) {
            const repaymentData = dataset.repayment_data;
            setRepaymentData(repaymentData);
            setOrderId(dataset.order_id);
            setContent("amountfetched");
          }
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchRepayLink();
  }, []);

  const sendOtp = async () => {
    if (!getPancard) {
      setPanError("PAN card is required.");
      return;
    }

    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
    if (!panRegex.test(getPancard)) {
      setPanError("Invalid PAN format.");
      return;
    }

    setPanError("");

    try {
      setLoader(true);
      const resp = await fetch(
        "https://api.crmpaisa.com/Api/CustomerDetails/Sendotp",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json; charset=UTF-8",
            Auth: "Y2M0Nzk0OGYwNmQyMjdmZTlhY2E1ZWQ1Nzk5YTZmMWE=",
            Accept: "application/json",
          },
          body: JSON.stringify({ pancard: getPancard }),
        },
      );

      const dataset = await resp.json();

      if (resp.status === 200 && dataset.Status === 1) {
        setContent("panotp");
      } else {
        alert(dataset.Message || "Something went wrong.");
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
      alert("An error occurred while sending OTP.");
    } finally {
      setLoader(false);
    }
  };

  const verifyOtp = async () => {
    if (!getOtp) {
      setOtpError("OTP is required.");
      return;
    }

    setOtpError("");
    setLoading(true);

    try {
      const resp = await fetch(
        "https://api.crmpaisa.com/Api/CustomerDetails/verifyOtp",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json; charset=UTF-8",
            Auth: "Y2M0Nzk0OGYwNmQyMjdmZTlhY2E1ZWQ1Nzk5YTZmMWE=",
            Accept: "application/json",
          },
          body: JSON.stringify({
            panNumber: getPancard,
            otp: getOtp,
          }),
        },
      );

      const dataset = await resp.json();

      if (resp.status === 200 && dataset.Status === 1) {
        setRepaymentData(dataset.repayment_data);
        setOrderId(dataset.order_id);
        setContent("amountfetched");
        if (dataset?.pg_data?.length > 0) {
          setPaymentGateways(dataset.pg_data);
        }
      } else {
        setOtpError(dataset.Message || "Invalid OTP");
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      setOtpError("An error occurred while verifying OTP.");
    } finally {
      setLoading(false);
    }
  };

  const payHere = async () => {
    try {
      var total_due_amount = repaymentData.total_due_amount;
      if (
        paymentAmount !== "" &&
        Number(paymentAmount) > 0 &&
        Number(paymentAmount) < Number(repaymentData.total_due_amount)
      ) {
        total_due_amount = paymentAmount;
      }
      console.log(repaymentData);

      // let pgConfig = paymentGateways.find((pg) => pg.mpg_gateway_name == 'Razorpay');

      const options = {
        // key:pgConfig?.mpg_gateway_key ?? 'rzp_live_3XXwpvgLtdYIh3',
        key: "rzp_live_RTKZNuT7Iqa5FB",
        amount: (total_due_amount * 100).toString(),
        currency: "INR",
        name: "EmergencyPaisa",
        description: getPancard,
        image: "https://web.emergencypaisa.com/public/images/final_logo.png",
        order_id: orderId,
        prefill: {
          name: "Hidden",
          email: repaymentData.email,
          contact: repaymentData.mobile,
        },

        theme: { color: "#05335a " },
        handler: function (response) {
          const paymentDetails = {
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_order_id: response.razorpay_order_id,
            razorpay_signature: response.razorpay_signature,
          };

          fetch(
            "https://api.crmpaisa.com/Api/CustomerDetails/verifyRazorPayCheckPaymentStatus",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json; charset=UTF-8",
                Auth: "Y2M0Nzk0OGYwNmQyMjdmZTlhY2E1ZWQ1Nzk5YTZmMWE=",
                Accept: "application/json",
              },
              body: JSON.stringify(paymentDetails),
            },
          )
            .then((res) => res.json())
            .then((data) => {
              let txnStatus = data.status;
              let txnId = data.txnId || "N/A"; // Get txnId from response if available

              // Pass txnStatus and txnId to the thank you page using navigate
              navigate("/thanku", {
                state: {
                  txnStatus: txnStatus,
                  txnId: txnId,
                },
              });
              window.location.reload();

              setPaymentStatus(
                txnStatus === "SUCCESS"
                  ? "Payment Successful"
                  : "Payment Verification Failed",
              );
              setContent(
                txnStatus === "SUCCESS" ? "paymentSuccess" : "paymentFailure",
              );
            })
            .catch((error) => {
              console.error("Error verifying payment:", error);
              setPaymentStatus("Payment Verification Failed");
            });
        },
      };

      const res = await loadScript(
        "https://checkout.razorpay.com/v1/checkout.js",
      );
      if (res) {
        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
      } else {
        alert("Razorpay SDK failed to load. Are you online?");
      }
    } catch (error) {
      console.error("Error during payment:", error);
      setLoading(false);
    }
  };

  const payWithPayU = async () => {
    // if (processing) return;
    // processing = true;
    let pgConfig = paymentGateways.find((pg) => pg.mpg_gateway_name == "Payu");

    setLoading(true);
    try {
      const total_due_amount = paymentAmount || repaymentData.total_due_amount; // Use part payment amount if provided
      // const MERCHANT_KEY = "lMtcGQ";
      const MERCHANT_KEY = pgConfig?.mpg_merchant_id ?? "lMtcGQ";
      const productinfo = "Loan repayment for Loan No";
      const fullname = repaymentData.full_name;
      const email = repaymentData.email;
      const phone = repaymentData.mobile;

      const response = await fetch(
        "https://api.crmpaisa.com/Api/RepayLoanApi/payuOrders",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json; charset=UTF-8",
            Accept: "application/json",
            Auth: "Y2M0Nzk0OGYwNmQyMjdmZTlhY2E1ZWQ1Nzk5YTZmMWE=",
          },
          body: JSON.stringify({
            amount: total_due_amount,
            productinfo: productinfo,
            firstname: fullname,
            email: email,
            mobile: phone,
            udf5: repaymentData.lead_id,
            companyId: pgConfig?.mpg_company_id,
          }),
        },
      );

      const data = await response.json();

      if (data.Status === 1) {
        const hashData = data.data.parameters;

        const payuOptions = {
          key: MERCHANT_KEY,
          txnid: hashData.txnid,
          amount: total_due_amount,
          productinfo: productinfo,
          firstname: fullname,
          email: email,
          phone: phone,
          surl: "https://emergencypaisa.com/thanku",
          furl: "https://emergencypaisa.com/fail",
          hash: hashData.hash,
          udf5: repaymentData.lead_id,
        };

        const scriptLoaded = await loadScript(
          "https://jssdk.payu.in/bolt/bolt.min.js",
        );

        if (scriptLoaded) {
          console.log("PayU script loaded");
          if (typeof window.bolt !== "undefined") {
            window.bolt.launch(payuOptions, {
              responseHandler: function (BOLT) {
                if (BOLT.response.txnStatus === "SUCCESS") {
                  // Pass the transaction status to the Thank You page via React Router's state
                  navigate("/thanku", {
                    state: {
                      txnStatus: BOLT.response.txnStatus,
                      txnId: BOLT.response.txnid,
                    },
                  });
                }
                if (
                  BOLT.response.txnStatus === "FAILED" ||
                  BOLT.response.txnStatus === "CANCEL"
                ) {
                  navigate("/thanku", {
                    state: {
                      txnStatus: BOLT.response.txnStatus,
                      txnId: BOLT.response.txnid,
                    },
                  });
                }
              },
              catchException: function (BOLT) {
                console.log("Payment failed. Please try again.");
              },
            });
          } else {
            console.error("PayU SDK not initialized correctly after loading.");
          }
        } else {
          console.error("Failed to load PayU script.");
        }
      } else {
        console.error("Failed to get valid response from PayU API.");
      }
    } catch (error) {
      console.error("Error during PayU payment:", error);
    } finally {
      setLoading(false);
      // processing = false;
    }
  };

  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePaymentClick = () => {
    // if (!paymentAmount || parseFloat(paymentAmount) <= 0) {
    //   alert('Please enter a valid payment amount.');
    //   return;
    // }

    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleRazorpay = () => {
    setModalOpen(false);
    payHere();
  };
  const handlePayU = () => {
    setModalOpen(false);
    payWithPayU();
  };

  // Dummy Modal Component
  // const PaymentModal = ({ onClose, onRazorpay, onPayU, onInstify }) => (
  //   <div className="payment-modal">
  //     <div className="modal-content">
  //       <h4>Select Payment Gateway</h4>
  //       <button onClick={onRazorpay}>Razorpay</button>
  //       <button onClick={onClose}>Cancel</button>
  //     </div>
  //   </div>
  // );

  // <Modal
  const PaymentModal = ({ onClose, onRazorpay, onPayU }) => (
    <div className="payment-modal-overlay">
      <div className="payment-modal">
        <div className="modal-header">
          <h4>Select Payment Gateway</h4>
        </div>

        <div className="modal-body d-flex justify-content-around">
          <div className="payment-card">
            <img
              src={payULogo}
              alt="PayU"
              style={{ cursor: "pointer", width: "120px" }}
              onClick={onPayU}
            />
          </div>

          <div className="payment-card">
            <img
              src={razorPay}
              alt="Razorpay"
              style={{ cursor: "pointer", width: "120px" }}
              onClick={onRazorpay}
            />
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn btn-secondary" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <Helmet>
        <title>
          EmergencyPaisa Loan Repayment – Fast & Secure Online Loan Payment
        </title>
        <meta
          name="description"
          content="Repay your EmergencyPaisa loan securely and conveniently online. Use simple digital payment options to complete your repayment on time and manage your loan with ease."
        />
        <link rel="canonical" href="https://emergencypaisa.com/repay-loan" />
      </Helmet>
      <div className="ms-applyWrap d-flex fluid-container">
        <div className="row">
          <div className="col-lg-6 ms-left-wrap">
            <div
              className="ms-bg-white p-1"
              style={{
                maxWidth: "200px",
                margin: "0 auto",
                border: "1px solid #ddd",
                background: "#fff",
              }}
            >
              <img
                src={scannerImg}
                alt="Emergency Paisa"
                style={{ width: "100%" }}
              />
            </div>

            <div className="p-4 mt-5">
              <h5>Here's how our loan repayment works</h5>
              <ul className="d-flex flex-wrap">
                {PayNowTag.map((item) => (
                  <li
                    key={item.id}
                    className="p-2 ms-bg-white m-2 fs-6 border text-center rounded-2"
                  >
                    {item.name}
                  </li>
                ))}
              </ul>
              <p
                className="pt-2"
                style={{
                  fontSize: "13px",
                  lineHeight: "22px",
                  fontWeight: "400",
                }}
              >
                At <b>EmergencyPaisa</b>, we allow you enough time and
                flexibility to repay your loan. This is done to ensure that
                repayments don’t feel like a burden. However, when it comes to
                the precise duration, the maximum repayment period is 40 days.
              </p>
            </div>
          </div>

          <div className="col-lg-6 ms-right-wrap p-5">
            <Link className="navbar-brand" to="/" style={{ margin: "0 auto" }}>
              <img src={`/${brandLogo}`} alt={brandName} />
            </Link>

            <p className="ms-text-secondary fs-6 pt-5">
              <strong>*</strong> Please verify the accuracy of the below details
              before doing any transfer.
            </p>

            {content === "pannumber" && (
              <>
                <div className="ms-login-wrap">
                  <h6 className="pt-4">Please enter your PAN Details</h6>
                  <div style={{ display: "flex", gap: "6px" }}>
                    {panInputs.map((val, index) => (
                      <input
                        key={index}
                        type="text"
                        maxLength={1}
                        value={val}
                        ref={panRefs[index]}
                        onChange={(e) => handlePanInputChange(e, index)}
                        onKeyDown={(e) => handlePanKeyDown(e, index)}
                        className="border border-gray-400 text-center rounded input-box mx-1"
                        style={{
                          width: "40px",
                          height: "40px",
                          textTransform: "uppercase",
                        }}
                      />
                    ))}
                  </div>
                  {panError && (
                    <p className="error_message" style={{ color: "red" }}>
                      {panError}
                    </p>
                  )}
                </div>
                <button
                  className="btn ms-bg-secondary p-2 mt-3 text-white fw-semibold"
                  onClick={sendOtp}
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
                    "SEND OTP"
                  )}
                </button>
              </>
            )}

            {content === "panotp" && (
              <>
                <div className="ms-login-wrap">
                  <h6 className="pt-4">
                    Enter OTP sent to your registered mobile
                  </h6>
                  <div style={{ display: "flex", gap: "6px" }}>
                    {otpInputs.map((val, index) => (
                      <input
                        key={index}
                        type="text"
                        maxLength={1}
                        value={val}
                        ref={otpRefs[index]}
                        onChange={(e) => handleOtpInputChange(e, index)}
                        onKeyDown={(e) => handleOtpKeyDown(e, index)}
                        className="border border-gray-400 text-center rounded input-box mx-1"
                        style={{ width: "40px", height: "40px" }}
                      />
                    ))}
                  </div>
                </div>
                {otpError && (
                  <p className="error_message" style={{ color: "red" }}>
                    {otpError}
                  </p>
                )}
                <button
                  className="btn ms-bg-secondary p-2 mt-3 text-white fw-semibold"
                  onClick={verifyOtp}
                >
                  {loader ? (
                    <>
                      <span
                        className="spinner-border spinner-border-sm me-2"
                        role="status"
                        aria-hidden="true"
                      ></span>
                      Verifying OTP...
                    </>
                  ) : (
                    "Verify OTP"
                  )}
                </button>
              </>
            )}

            {content === "amountfetched" && repaymentData && (
              <div className="repayment-card">
                <div className="repayment-header">
                  <h3 className="fw-semibold">Loan Repayment Details</h3>
                </div>
                <div className="repayment-info">
                  <div className="info-item">
                    <span className="label">Loan Number:</span>
                    <span className="value">
                      {" "}
                      &nbsp; {repaymentData.loan_no}
                    </span>
                  </div>
                  <div className="info-item">
                    <span className="label">Disbursal Date:</span>
                    <span className="value">
                      &nbsp;{repaymentData.disbursal_date}
                    </span>
                  </div>
                  <div className="info-item">
                    <span className="label">Repayment Date:</span>
                    <span className="value">
                      &nbsp;{repaymentData.repayment_date}
                    </span>
                  </div>
                  <div className="info-item">
                    <span className="label">Repayment Amount:</span>
                    <span className="value">
                      &nbsp;{repaymentData.repayment_amount.toLocaleString()}
                    </span>
                  </div>
                  <div className="info-item">
                    <span className="label">Loan Amount:</span>
                    <span className="value">
                      &nbsp;{repaymentData.loan_recommended.toLocaleString()}
                    </span>
                  </div>
                  <div className="info-item">
                    <span className="label">Real Interest:</span>
                    <span className="value">
                      &nbsp;{repaymentData.real_interest.toLocaleString()}
                    </span>
                  </div>
                  <div className="info-item">
                    <span className="label">Repayment With Interest:</span>
                    <span className="value">
                      &nbsp;{repaymentData.total_due_amount.toLocaleString()}
                    </span>
                  </div>
                  <div className="due-amount info-item">
                    <span className="label">Total Due Amount:</span>
                    <span className="value">
                      {" "}
                      &nbsp;{repaymentData.total_due_amount.toLocaleString()}
                    </span>
                  </div>
                  <div className="part-amount">
                    <span className="label">Amount To Pay</span>
                    <input
                      type="text"
                      value={paymentAmount}
                      onChange={handlePaymentAmountChange}
                      placeholder="Enter payment amount"
                    />
                  </div>
                </div>
                <div className="repayment-button ">
                  {/* <button className="repayment-button btn-apply" onClick={handlePaymentClick}>
                  {getLoading ? <div className="loadinganim"></div> : 'Proceed to Pay'}
                </button> */}
                  <button
                    onClick={handlePaymentClick}
                    type="button"
                    className="btn-apply"
                  >
                    {/* Launch demo modal */}
                    {getLoading ? (
                      <div className="loadinganim"></div>
                    ) : (
                      "Proceed to Pay"
                    )}
                  </button>
                </div>

                {isModalOpen && (
                  <PaymentModal
                    onClose={handleCloseModal}
                    onRazorpay={handleRazorpay}
                    onPayU={handlePayU}
                  />
                )}
              </div>
            )}

            {content === "paymentSuccess" && (
              <div className="payment-success">
                <h3>{paymentStatus}</h3>
                <p>Thank you for your payment!</p>
              </div>
            )}

            <div className="ms-massage-box p-3 mt-5">
              <p style={{ fontSize: "12px", lineHeight: "25px" }}>
                <WarningAmberOutlinedIcon className="ms-text-secondary" />
                <b> Important:</b> Make sure you only repay through official
                EmergencyPaisa channels. Payments made via direct bank transfer
                or third-party apps will not be recognized.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
