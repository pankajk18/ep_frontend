import React, { useEffect, useState } from "react";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import {
  getGenerateLoan,
  getLoanQuote,
  getSanctionDetail,
  initiateEkyc,
  updateAutoJourneyStatus,
  updateCustomerJourneyEvent,
} from "../../Utils/api";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

import {
  autoCustomerJourneyDetailsReducer,
  updateAutoCustomerDetails,
  updateAutoJourneyEvents,
} from "../../CustomerJourneyDetails/AutoCustomerJourneyDetails";
import {
  updateCustomerDetails,
  updateJourneyEvents,
} from "../../CustomerJourneyDetails/CustomerJourneyDetails";
import { set } from "date-fns";

import SendIcon from "@mui/icons-material/Send";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import CelebrationIcon from "@mui/icons-material/Celebration";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import CampaignIcon from "@mui/icons-material/Campaign";

export default function AutoLoanOffer() {
  const [principal, setPrincipal] = useState(0);
  const [rate, setRate] = useState(1);
  const [time, setTime] = useState();
  const [selecteLoanPurpose, setSelecteloanpurpose] = useState("11");
  const [error, setError] = useState("");
  const [loanData, setLoanData] = useState({});
  const [loader, setLoader] = useState(false);
  const [credeoResData, setcredeoResData] = useState(null);
  const [openPopup, setOpenPopup] = useState(false);
  const navigate = useNavigate();
  const [credeoApprovedAmount, setcredeoApprovedAmount] = useState(0);
  const [credeoRepaymentDate, setcredeoRepaymentDate] = useState(null);

  const dispatch = useDispatch();
  const customerDetails = useSelector(
    (state) => state.customerJourneyDetails.customerDetails,
  );

  const autoCustomerDetails = useSelector(
    (state) => state.autoCustomerJourneyDetails.customerDetails,
  );

  useEffect(() => {
    const storedCredoData = localStorage.getItem("credeoResData");
    if (storedCredoData) {
      setcredeoResData(JSON.parse(storedCredoData));
    }
  }, []);

  // Fetch loan data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getGenerateLoan({
          profileId: customerDetails?.profileId,
        });
        console.log(
          "response.data.autoJourney.data.tenure::",
          response.data.data.autoJourney.data.tenure,
        );

        if (response?.data?.apiStatus === 1) {
          // console.log(`response.data.autoJourney.data.credeau_repayment_date`, response.data.autoJourney.data);
          setLoanData(response.data.data);
          setcredeoApprovedAmount(
            response.data.data.autoJourney.data.credeau_amount,
          );
          const formattedDate = new Date(
            response.data.data.autoJourney.data.credeau_repayment_date,
          ).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
            timeZone: "Asia/Kolkata", // important for IST
          });
          setcredeoRepaymentDate(formattedDate);
          if (response?.data?.data?.autoJourney?.data?.tenure) {
            setTime(response.data.data.autoJourney.data.tenure); // set tenure from response if available
          } else {
            setTime(15);
          }
          setSelecteloanpurpose("11");
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [customerDetails]);

  // Set default principal = Credo amount, but capped within min/max
  useEffect(() => {
    if (credeoResData?.amount && loanData?.minLoanAmount) {
      const credoAmount = Number(credeoResData.amount);
      const safeAmount = Math.min(
        Math.max(credoAmount, loanData.minLoanAmount),
        loanData.maxLoanAmount,
      );
      setPrincipal(safeAmount);
      setcredeoApprovedAmount(safeAmount);
    }
  }, [credeoResData, loanData]);

  // Interest & total repayment calculation
  const interest = (principal * rate * time) / 100;
  const totalRepayAmount = parseInt(principal) + parseInt(interest);

  let principalAmount = parseInt(principal);
  let formattedRepayAmount = "";

  if (principal) {
    principalAmount = new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(principal);

    formattedRepayAmount = new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(totalRepayAmount);
  }

  const loanPurposeType = [
    { label: "Travel", value: "4" },
    { label: "Medical", value: "5" },
    { label: "Academics", value: "6" },
    { label: "Obligation", value: "7" },
    { label: "Festival", value: "8" },
    { label: "Purchase", value: "9" },
    { label: "Emergency", value: "11" },
  ];

  const handleLoanPurpuse = (event) => {
    setSelecteloanpurpose(event.target.value);
    setError("");
  };

  // API call separated for reuse
  const proceedLoanQuote = async (mode) => {
    // alert("call"+mode);
    console.log(mode);
    localStorage.setItem("applicationMode", mode);
    setLoader(true);
    let modeValue = mode === "auto" ? 1 : 0;

    try {
      if (mode === "auto") {
        // alert("modeValue==="+modeValue);
        console.log({
          profileId: customerDetails?.profileId,
          loanAmount: credeoApprovedAmount,
          tenure: time,
          loanPurpose: selecteLoanPurpose,
          loanQuoteDecision: 1,
          repaymentDate: credeoRepaymentDate,
          modeValue: modeValue.toString(),
        });
        const response = await getLoanQuote({
          profileId: customerDetails?.profileId,
          loanAmount: credeoApprovedAmount,
          tenure: time,
          loanPurpose: selecteLoanPurpose,
          loanQuoteDecision: 1,
          modeValue: modeValue.toString(),
        });
        //  return;

        if (response?.data?.apiStatus === 1) {
          toast.success(response.data.message);
        } else {
          toast.error(response.data.message);
        }

        // updateCustomerJourneyEvent({
        //     leadId: 643,
        //     type: 'lje_ekyc',
        // });

        dispatch(
          updateAutoJourneyEvents({
            loan_quote: 1,
            ekyc_detail: 2,
          }),
        );
      } else {
        //  alert("modeValue==="+modeValue);
        console.log({
          profileId: customerDetails?.profileId,
          loanAmount: credeoApprovedAmount,
          tenure: time,
          loanPurpose: selecteLoanPurpose,
          loanQuoteDecision: 1,
          modeValue: modeValue,
        });

        const response = await getLoanQuote({
          profileId: customerDetails?.profileId,
          loanAmount: principal,
          tenure: time,
          loanPurpose: selecteLoanPurpose,
          loanQuoteDecision: 1,
          modeValue: modeValue,
        });

        //  return;

        dispatch(
          updateJourneyEvents({
            loan_quote: 1,
            personal_details: 2,
          }),
        );
        navigate("/journey");
      }
    } catch {
      toast.error("Error");
    } finally {
      setLoader(false);
    }
  };

  // Submit button logic
  const submit = async () => {
    if (loader) return;

    if (!selecteLoanPurpose) {
      setError("Please select Loan Purpose");
      return;
    }

    if (
      credeoResData?.amount &&
      Number(principal) > Number(credeoResData.amount)
    ) {
      setOpenPopup(true);
      return;
    }
    proceedLoanQuote("auto");
  };

  const stored = localStorage.getItem("credeoResLatest");
  const response = stored ? JSON.parse(stored) : null;

  // let response = JSON.parse(localStorage.getItem("credeoResLatest") || {});
  // let repaymentDate = response?.repaymentDate || '';
  // let loanOfferAmt = response?.credeoRes?.amount || 0;
  // alert(loanOfferAmt);
  // alert(repaymentDate);

  const handleEnhanceLoan = async () => {
    setLoader(true);
    const param = {
      profileId: customerDetails?.profileId,
    };

    try {
      const response = await initiateEkyc(param);
      if (response?.data?.apiStatus == 1) {
        setLoader(false);
        toast.success("Verification process started");
        window.location.href = response?.data?.data?.ekyc_url;
      } else {
        toast.error("Failed to start verification process");
      }
    } catch (error) {
      setLoader(false);
      toast.error("Failed to start verification process");
    }
  };

  return (
    <>
      <div
        className="box-height"
        style={{
          backgroundImage: "url(/assets-crm/loan-offer.png)",
        }}
      >
        <div className="wraper-right-box" style={{ width: "53%" }}>
          <div className="row m-0 p-0">
            <h3 className="pl-5 fontstyle ms-text-primary">
              {" "}
              <CampaignIcon style={{ fontSize: "60px" }} /> Congratulations!
            </h3>
            <div className="row m-0 p-0">
              <p className="fs-6 fw-medium">
                Your loan has been successfully approved
              </p>
            </div>

            <div className="row m-0 p-0">
              <div className="offer-inner">
                <div className="">
                  <div className="info d-flex justify-content-between align-items-center border p-3 rounded mt-4 bg-light">
                    <p className="fw-medium mb-0">Your Approved Loan Amount </p>
                    <p
                      className="mb-0"
                      style={{ fontSize: "30px", fontWeight: "700" }}
                    >
                      {" "}
                      <CurrencyRupeeIcon
                        style={{ fontSize: "40px", color: "#9a141a" }}
                      />{" "}
                      {credeoApprovedAmount}
                    </p>
                  </div>
                </div>
                {/* <div className='p-2'>
                  <p className='mb-0 small ' style={{ color: '#9a141a', fontWeight: '500' }}> <CampaignIcon /> Your approved loan offer is available for a limited time.</p>
                </div> */}
                <div className="d-flex justify-content-between mt-4">
                  <div className="info">
                    <p className="fw-semibold opacity-75">
                      Upcoming repayment date{" "}
                    </p>
                  </div>
                  <div>
                    {" "}
                    <p className="fw-bold">
                      {" "}
                      <CalendarMonthIcon
                        style={{ color: "#9a141a", fontWeight: "500" }}
                      />{" "}
                      {credeoRepaymentDate}
                    </p>
                  </div>
                </div>
              </div>

              <div className="d-flex justify-content-start">
                <Button
                  variant="contained"
                  className="mt-3 px-4 py-2 fs-5 ms-bg-secondary"
                  size="large"
                  onClick={() => proceedLoanQuote("auto")}
                >
                  {" "}
                  Accept Loan Offer
                </Button>
              </div>

              {autoCustomerDetails?.show_enhance_btn == true && (
                <>
                  {/* enhace section start */}
                  <div className="row py-3">
                    <div className="d-flex justify-content-between mt-4 py-3 border rounded shadow-lg">
                      <h5 className="fw-bold pb-0 mb-0">
                        Want to Enhance Your Loan?
                      </h5>
                      <span>
                        <ArrowForwardIosIcon />
                      </span>
                    </div>
                    <p
                      className="text-sm pt-3 opacity-75"
                      style={{ lineHeight: "24px" }}
                    >
                      Based on your profile, you may be eligible for a higher
                      loan amount to enhance your financial flexibility. This
                      may require additional processing time and documentation.
                    </p>
                    <div className=" d-flex justify-content-start">
                      <Button
                        className="mt-3 px-4 py-2 fs-5 ms-bg-secondary"
                        variant="contained"
                        size="large"
                        onClick={() => handleEnhanceLoan()}
                      >
                        Loan Enhancement
                      </Button>
                    </div>
                  </div>
                </>
              )}
              {/* end */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
