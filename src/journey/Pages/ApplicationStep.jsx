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

export default function ApplicationStep() {
  const { loan_quote, personal_details, upload_documents } = useSelector(
    (state) => state?.customerJourneyDetails?.journeySteps,
  );
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
    if (loan_quote === 1 && personal_details === 1 && upload_documents === 1) {
      navigate("/journey/congratulations");
    }
  }, [loan_quote, personal_details, upload_documents, navigate]);

  const navLinks = [
    {
      title: "Loan calculator",
      id: "v-pills-loan-tab",
      dataBsTarget: "#v-pills-loan",
      desc: "A tool to estimate monthly payments, interest, and total repayment amount", //Choose the loan amount and tenure.
      iconElelement: <CalculateIcon className="ms-icon-size" />,
      activeStatus: loan_quote == 2,
      tabContentId: "v-pills-loan",
      tabContentElement: <LoanCalculator />,
      showSuccessIcon: loan_quote == 1,
      showPreviousStepNotification: () => {
        showNotification(loan_quote);
      },
    },
    {
      title: "Personal Details",
      id: "v-pills-personalinfo-tab",
      dataBsTarget: "#v-pills-personalinfo",
      desc: "To complete your profile, please enter your name, email, phone...", //Tell us a bit about yourself.
      iconElelement: <SwitchAccountIcon className="ms-icon-size" />,
      activeStatus: personal_details == 2,
      tabContentId: "v-pills-personalinfo",
      tabContentElement: <PersonalInformation />,
      showSuccessIcon: personal_details == 1,
      showPreviousStepNotification: () => showNotification(personal_details),
    },
    // {
    //     title: 'Employment Details',
    //     id: 'v-pills-empdetails-tab',
    //     dataBsTarget: '#v-pills-empdetails',
    //     desc: 'Includes job title, company name, employment type, duration...', //Where do you work
    //     iconElelement: <LeaderboardIcon  />,
    //     activeStatus: (employment_details == 2),
    //     tabContentId: 'v-pills-empdetails',
    //     tabContentElement: <EmploymentDetails />,
    //     showSuccessIcon: (employment_details == 1),
    //     showPreviousStepNotification: () => showNotification(employment_details)
    // },
    {
      title: "Documents Upload",
      id: "v-pills-upload-tab",
      dataBsTarget: "#v-pills-upload",
      desc: "Lets users upload and save documents securely for verification...", //Share your documents to verify your details
      iconElelement: <UploadFileIcon className="ms-icon-size" />,
      activeStatus: upload_documents == 2,
      tabContentId: "v-pills-upload",
      tabContentElement: <UploadDocument />,
      showSuccessIcon: upload_documents == 1,
      showPreviousStepNotification: () => showNotification(upload_documents),
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
            {navLinks.map((step, index) => (
              <button
                key={`${step.id}${index}`}
                id={step.id}
                className={`nav-link ${step.activeStatus ? "active" : ""}`}
                data-bs-toogle="pill"
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
            ))}
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
                {tabPanes.activeStatus && tabPanes.tabContentElement}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/*end */}
    </div>
  );
}
