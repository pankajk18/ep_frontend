import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { otpVerify, resendOtp } from "../Utils/api";
import { useDispatch, useSelector } from "react-redux";
import { updateCustomerDetails } from "../CustomerJourneyDetails/CustomerJourneyDetails";
import ModeOutlinedIcon from "@mui/icons-material/ModeOutlined";

export default function OtpBox() {
  const [digits, setDigits] = useState(new Array(4).fill(""));
  const [timeLeft, setTimeLeft] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const [loadingOtp, setLoadingOtp] = useState(false);
  const [loadingResend, setLoadingResend] = useState(false);

  const inputsRef = useRef([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const customerDetails = useSelector(
    (state) => state.customerJourneyDetails.customerDetails,
  );

  const hideNo =
    "*".repeat(customerDetails?.mobile.length - 4) +
    customerDetails?.mobile.slice(-4);

  // Timer countdown
  useEffect(() => {
    if (timeLeft === 0) {
      setCanResend(true);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  useEffect(() => {
    if (inputsRef.current[0]) {
      inputsRef.current[0].focus();
    }
  }, []);

  const startTimer = () => {
    setTimeLeft(60);
    setCanResend(false);
  };

  const handleChange = (index, event) => {
    let value = event.target.value;
    if (!/^\d?$/.test(value)) return;

    const newDigits = [...digits];
    newDigits[index] = value;
    setDigits(newDigits);

    if (value !== "" && index < 3) {
      inputsRef.current[index + 1].focus();
    }
  };

  const handleKeyDown = (index, event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleOtp();
    }
    if (event.key === "Backspace" && !digits[index] && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  const handleOtp = async () => {
    // alert("handleOtp called");return;
    if (loadingOtp) return; // prevent duplicate clicks
    setLoadingOtp(true);

    const param = {
      profileId: customerDetails?.profileId,
      mobile: customerDetails?.mobile,
      otp: digits.join(""),
    };

    try {
      const response = await otpVerify(param);
      // console.log(response?.data?.lead_detail?.data?.lead_creation_mode);

      const isAutoJourney = response?.data?.isAuto;
      // return;
      if (response?.data?.apiStatus == 1) {
        localStorage.setItem(
          "masterProfile",
          JSON.stringify(response?.data?.data?.negativeProfile?.data) || "",
        );

        const formatPhone = (mobileNumber) => {
          if (!mobileNumber) return undefined;
          return mobileNumber.startsWith("+")
            ? mobileNumber
            : `+91${mobileNumber}`;
        };

        window.clevertap?.onUserLogin.push({
          Site: {
            Identity: customerDetails?.profileId || "",
            Phone: formatPhone(customerDetails?.mobile) || "",
            "MSG-email": false,
            "MSG-push": true,
            "MSG-sms": true,
            "MSG-whatsapp": true,
          },
        });

        window.clevertap?.profile.push({
          Site: {
            UserId: customerDetails?.profileId || "",
            userType:
              response?.data?.data?.userType ||
              customerDetails?.user_type ||
              "",
          },
        });
        window.clevertap.event.push("lje_OTP_Verify", {
          message: "OTP verified",
          userType:
            response?.data?.data?.userType || customerDetails?.user_type || "",
        });

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
                        fbq('track', 'Lead');

                    `;
        document.head.appendChild(script);

        const imgLead = new Image();
        imgLead.src = "https://www.facebook.com/tr?id=910056785411046&ev=Lead";

        toast.success("OTP verified successfully");
        dispatch(
          updateCustomerDetails({
            token: response?.data?.data?.token,
          }),
        );

        if (response?.data?.data?.journeyCompletedFlag === 1) {
          dispatch(updateCustomerDetails({ journeyCompletedFlag: 1 }));
          window.location.href = "/journey/dashboard";
        } else {
          // alert("lead_creation_mode==="+lead_creation_mode);

          if (isAutoJourney == true) {
            navigate("/auto-journey");
          } else {
            navigate("/journey");
          }
        }
      } else {
        toast.error("OTP does not match");
      }
    } catch (error) {
      console.error("OTP Verification Failed", error);
      toast.error("OTP verification failed");
    } finally {
      setLoadingOtp(false);
    }
  };

  const handleResendOtp = async () => {
    if (loadingResend) return; // prevent duplicate clicks
    setLoadingResend(true);
    window.clevertap.event.push("lje_OTP_Resend", {
      message: "Resend OTP",
    });

    const param = {
      mobile: customerDetails?.mobile,
    };

    try {
      const response = await resendOtp(param);
      if (response?.data?.apiStatus === 1) {
        toast.success(response?.data?.message);
      } else {
        toast.error(response?.data?.message || "Failed to resend OTP");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error resending OTP");
    } finally {
      startTimer(); // Restart timer either way
      setLoadingResend(false);
    }
  };

  return (
    <>
      <ToastContainer position="top-right" autoClose={1000} />
      <div>
        <p className="pt-5 fs-6 fw-semibold text-center">
          Mobile number : {hideNo}
          <span
            onClick={() => window.location.reload()}
            style={{ cursor: "pointer" }}
          >
            <ModeOutlinedIcon />
          </span>
        </p>
        <p className="pt-0 text-center">
          Please enter the OTP to unlock your next step.
        </p>

        <div className="num-wrap-otp">
          {digits.map((digit, index) => (
            <input
              key={index}
              ref={(el) => (inputsRef.current[index] = el)}
              type="text"
              value={digit}
              onChange={(e) => handleChange(index, e)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className="border border-gray-400 text-center rounded input-box mx-1"
              inputMode="numeric"
            />
          ))}
        </div>

        <button
          onClick={!loadingOtp ? handleOtp : null}
          disabled={loadingOtp}
          style={{ width: "100%" }}
          className={`btn p-2 mt-5 fw-bold fs-5 ${loadingOtp ? "disablebtn" : "ms-bg-secondary text-white"}`}
        >
          {loadingOtp ? (
            <>
              <span
                className="spinner-border spinner-border-sm me-2"
                role="status"
                aria-hidden="true"
              ></span>
              Verifying...
            </>
          ) : (
            "Verify OTP"
          )}
        </button>

        {!canResend ? (
          <p className="text-center fw-semibold pt-4">
            Didn't receive the OTP ?{" "}
            <span className="text-danger">{timeLeft}s</span>
          </p>
        ) : (
          <button
            onClick={!loadingResend ? handleResendOtp : null}
            disabled={loadingResend}
            className={`btn p-2 mt-5 fw-normal fs-6 ${loadingResend ? "disablebtn" : "ms-bg-primary text-white"}`}
          >
            {loadingResend ? (
              <>
                <span
                  className="spinner-border spinner-border-sm me-2"
                  role="status"
                  aria-hidden="true"
                ></span>
                Resending...
              </>
            ) : (
              "Resend OTP"
            )}
          </button>
        )}
      </div>
    </>
  );
}
