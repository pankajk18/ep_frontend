import React, { useEffect } from "react";
import CalculateIcon from "@mui/icons-material/Calculate";
import SwitchAccountIcon from "@mui/icons-material/SwitchAccount";
import LeaderboardIcon from "@mui/icons-material/Leaderboard";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import PersonalInformation from "./PersonalInformation";
import LoanCalculator from "./LoanCalculator";
import EmploymentDetails from "./EmploymentDetails";
import UploadDocument from "./UploadDocument";
import BankDetails from "./BankDetails";
import { useSelector } from "react-redux";
import { showMsg } from "../../component/ui/Notification";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import AutoBankDetails from "./AutoBankDetails";
import Ekyc from "./AutoEkyc";
import AutoEkyc from "./AutoEkyc";
import AutoSanction from "./AutoSanction";
import AutoEnach from "./AutoEnach";
import AutoLoanCalculator from "./AutoLoanCalculator";
import AutoPersonalInformation from "./AutoPersonalInformation";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import RequestPageIcon from "@mui/icons-material/RequestPage";

import AutorenewIcon from "@mui/icons-material/Autorenew";
import AutoLoanOffer from "./AutoLoanOffer";
import AccountAggregator from "./AccountAggregator";
import LoanOfferAcceptance from "./LoanOfferAcceptance";

export default function AutoApplicationStep() {
  const customerDetails = useSelector(
    (state) => state.autoCustomerJourneyDetails.customerDetails,
  );

  // const { loan_quote, personal_details, upload_documents } = useSelector((state) => state?.customerJourneyDetails?.journeySteps);

  let {
    loan_quote,
    personal_details,
    banking_details,
    ekyc_detail,
    sanction,
    enach_detail,
    upload_documents,
    account_aggregator,
    loan_offer_accept,
    remain_tab_show,
  } = useSelector((state) => state?.autoCustomerJourneyDetails.journeySteps);

  console.log(
    "auto journey steps--",
    loan_quote,
    personal_details,
    banking_details,
    sanction,
    ekyc_detail,
    enach_detail,
  );

  let { lead_id } = useSelector(
    (state) => state?.autoCustomerJourneyDetails?.customerDetails,
  );
  console.log("lead id--", lead_id);

  // loan_quote =;
  const navigate = useNavigate();

  let notificationMsg = {
    0: { type: "error", msg: "Please complete previous step." },
    1: { type: "success", msg: "This step is already completed." },
  };

  const showNotification = (status) => {
    if ([0, 1].includes(status)) {
      showMsg(notificationMsg[status].msg, "", notificationMsg[status].type);
    }
  };

  useEffect(() => {
    if (
      loan_quote === 1 &&
      account_aggregator === 1 &&
      personal_details === 1 &&
      banking_details === 1 &&
      sanction === 1 &&
      ekyc_detail === 1 &&
      enach_detail === 1
    ) {
      navigate("/journey/congratulations");
    }
  }, [
    loan_quote,
    personal_details,
    banking_details,
    sanction,
    ekyc_detail,
    enach_detail,
    account_aggregator,
    navigate,
  ]);

  const navLinks = [
    {
      title: "Pre-approved Loan Offer",
      id: "v-pills-loan-tab",
      dataBsTarget: "#v-pills-loan",
      desc: "A tool to estimate monthly payments, interest, and total repayment amount", //Choose the loan amount and tenure.
      iconElelement: <CalculateIcon className="ms-icon-size-auto" />,
      activeStatus: loan_quote == 2,
      tabContentId: "v-pills-loan",
      tabContentElement:
        customerDetails?.isAuto == true &&
        customerDetails?.show_auto_loan_quote == true ? (
          <AutoLoanOffer />
        ) : (
          <LoanCalculator />
        ),
      showSuccessIcon: loan_quote == 1,
      showPreviousStepNotification: () => {
        showNotification(loan_quote);
      },
      defaultShowStatus: remain_tab_show == false,
    },
    {
      title: "Ekyc (Aadhaar Verification)",
      id: "v-pills-adhar-tab",
      dataBsTarget: "#v-pills-adhar",
      desc: "To continue with your loan application, please complete e-KYC...", //Share your documents to verify your details
      iconElelement: <HowToRegIcon className="ms-icon-size-auto" />,
      activeStatus: ekyc_detail == 2,
      tabContentId: "v-pills-adhar",
      tabContentElement: <AutoEkyc />,
      showSuccessIcon: ekyc_detail == 1,
      showPreviousStepNotification: () => showNotification(ekyc_detail),
      defaultShowStatus: remain_tab_show == false,
    },
    {
      title: "Personal (Current Residence & Selfie)",
      id: "v-pills-personalinfo-tab",
      dataBsTarget: "#v-pills-personalinfo",
      desc: "To complete your profile, please enter your name, email, phone....", //Tell us a bit about yourself.
      iconElelement: <SwitchAccountIcon className="ms-icon-size-auto" />,
      activeStatus: personal_details == 2,
      tabContentId: "v-pills-personalinfo",
      tabContentElement: <AutoPersonalInformation />,
      showSuccessIcon: personal_details == 1,
      showPreviousStepNotification: () => showNotification(personal_details),
      defaultShowStatus: remain_tab_show == false,
    },
    {
      title: "Documents Upload",
      id: "v-pills-upload-tab",
      dataBsTarget: "#v-pills-upload",
      desc: "Lets users upload and save documents securely for verification...",
      iconElelement: <UploadFileIcon className="ms-icon-size" />,
      activeStatus: upload_documents == 2,
      tabContentId: "v-pills-upload",
      tabContentElement: <UploadDocument />,
      showSuccessIcon: upload_documents == 1,
      showPreviousStepNotification: () => showNotification(upload_documents),
      defaultShowStatus: customerDetails?.show_upload_docs == true,
    },
    {
      title: "Account Aggregator",
      id: "v-pills-account-aggregator-tab",
      dataBsTarget: "#v-pills-account-aggregator",
      desc: "Lets users connect their bank accounts for seamless verification...",
      iconElelement: <SwitchAccountIcon className="ms-icon-size" />,
      activeStatus: account_aggregator == 2,
      tabContentId: "v-pills-account-aggregator",
      tabContentElement: <AccountAggregator />,
      showSuccessIcon: account_aggregator == 1,
      showPreviousStepNotification: () => showNotification(account_aggregator),
      defaultShowStatus: customerDetails?.show_upload_docs == true,
    },
    {
      title: "Loan Offer Acceptance",
      id: "v-pills-loan-offer-acceptance-tab",
      dataBsTarget: "#v-pills-loan-offer-acceptance",
      desc: "Lets users review and accept their loan offers...",
      iconElelement: <CheckCircleIcon className="ms-icon-size" />,
      activeStatus: loan_offer_accept == 2,
      tabContentId: "v-pills-loan-offer-acceptance",
      tabContentElement: <LoanOfferAcceptance />,
      showSuccessIcon: loan_offer_accept == 1,
      showPreviousStepNotification: () => showNotification(loan_offer_accept),
      defaultShowStatus:
        remain_tab_show == true && customerDetails?.show_upload_docs == true,
    },

    {
      title: "Bank Verification (Penny Drop)",
      id: "v-pills-banking-details-tab",
      dataBsTarget: "#v-pills-banking-details",
      desc: "To process your loan and ensure smooth disbursal, please provide your bank...", //Share your documents to verify your details
      iconElelement: <AccountBalanceIcon className="ms-icon-size-auto" />,
      activeStatus: banking_details == 2,
      tabContentId: "v-pills-banking-details",
      tabContentElement: <AutoBankDetails />,
      showSuccessIcon: banking_details == 1,
      showPreviousStepNotification: () => showNotification(banking_details),
      defaultShowStatus: remain_tab_show == true,
    },

    {
      title: "Sanction & eSign",
      id: "v-pills-sanction-tab",
      dataBsTarget: "#v-pills-sanction",
      desc: "To proceed with disbursal, please review the sanction details and complete...", //Share your documents to verify your details
      iconElelement: <RequestPageIcon className="ms-icon-size-auto" />,
      activeStatus: sanction == 2,
      tabContentId: "v-pills-sanction",
      tabContentElement: <AutoSanction />,
      showSuccessIcon: sanction == 1,
      showPreviousStepNotification: () => showNotification(sanction),
      defaultShowStatus: remain_tab_show == true,
    },

    {
      title: "Enach Mandate",
      id: "v-pills-enach-tab",
      dataBsTarget: "#v-pills-enach",
      desc: "Paperless, automatic bank mandate for recurring payments or EMI deductions.",
      iconElelement: <AutorenewIcon className="ms-icon-size-auto" />,
      activeStatus: enach_detail == 2,
      tabContentId: "v-pills-upload",
      tabContentElement: <AutoEnach />,
      showSuccessIcon: enach_detail == 1,
      showPreviousStepNotification: () => showNotification(enach_detail),
      defaultShowStatus: remain_tab_show == true,
    },
  ];

  return (
    <div>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className="fuild-container">
        <div className="d-flex align-items-start tabs">
          <div
            className="nav nav-pills me-3 custome-tab tab-buttons"
            id="v-pills-tab"
            role="tablist"
            aria-orientation="vertical"
          >
            {navLinks.map(
              (step, index) =>
                step.defaultShowStatus == true && (
                  <button
                    key={`${step.id}${index}`}
                    id={step.id}
                    className={`nav-link ${step.activeStatus ? "active" : ""}`}
                    data-bs-toogle="pill"
                    style={{ height: "auto" }}
                    data-bs-target={step.dataBsTarget}
                    onClick={() => step.showPreviousStepNotification()}
                  >
                    <div className="d-flex justify-content-around">
                      {step.iconElelement}
                      <div className="tab-info-right mob-none">
                        <p className="mb-0">
                          {step.title}{" "}
                          {step.showSuccessIcon ? (
                            <CheckCircleIcon style={{ color: "green" }} />
                          ) : (
                            ""
                          )}
                        </p>
                        <span>{step.desc}</span>
                      </div>
                    </div>
                  </button>
                ),
            )}
          </div>
          <div className=" tab-content ml450" id="v-pills-tabContent">
            {navLinks.map((tabPanes, index) => (
              <div
                key={`${tabPanes.tabContentId}${index}`}
                id={tabPanes.tabContentId}
                className={`tab-pane fade ${tabPanes.activeStatus ? "show active" : ""}`}
                role="tabpanel"
                aria-labelledby={tabPanes.id}
              >
                {tabPanes.defaultShowStatus &&
                  tabPanes.activeStatus &&
                  tabPanes.tabContentElement}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/*end */}
    </div>
  );
}
