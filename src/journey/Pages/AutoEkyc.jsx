import React, { useEffect, useState } from "react";
import LibraryAddCheckIcon from "@mui/icons-material/LibraryAddCheck";
import { Button } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { updateAutoJourneyEvents } from "../../CustomerJourneyDetails/AutoCustomerJourneyDetails";
import { updateJourneyEvents } from "../../CustomerJourneyDetails/CustomerJourneyDetails";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useSearchParams } from "react-router-dom";
import { getEkycResponse, initiateEkyc } from "../../Utils/api";
import { se } from "date-fns/locale";
import ekycBg from "../assets-crm/ekyc.jpg";
import PanToolIcon from "@mui/icons-material/PanTool";
import { toast } from "react-toastify";

export default function AutoEkyc() {
  const dispatch = useDispatch();
  const params = useParams();
  const [searchParams] = useSearchParams();
  const [loader, setLoader] = useState(false);
  //   const customerDetails  = useSelector  ((state) => state?.autoCustomerJourneyDetails?.customerDetails);

  const customerDetails = useSelector(
    (state) => state?.autoCustomerJourneyDetails?.customerDetails,
  );

  const leadId = customerDetails?.lead_id;
  useEffect(() => {
    const handleEkyc = async () => {
      if (searchParams.get("status") === "success") {
        const param = { lead_id: params.id };

        if (leadId) {
          try {
            const ekycResponse = await getEkycResponse(param);

            if (ekycResponse?.data?.Status === 1) {
              // toast.success("Ekyc has been completed successfully!");

              dispatch(
                updateAutoJourneyEvents({
                  personal_details: 2,
                  ekyc_detail: 1,
                }),
              );
            }
          } catch (error) {
            console.error("Error fetching eKYC response:", error);
          }
        }
      }
    };

    handleEkyc();
  }, [searchParams, leadId, params.id, dispatch]);

  const submit = async () => {
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

  //   useEffect(() => {
  //   if (params.id) {
  //     console.log("eKYC process started with id === " + params.id);
  //     getEkycResponse({ lead_id: params.id })
  //       .then((response) => {
  //         console.log("Ekyc response--", response);
  //         if (response.status == 1) {
  //           dispatch(updateAutoJourneyEvents({
  //             ekyc_detail: 1,
  //             sanction: 2
  //           }));
  //         }
  //       })
  //       .catch((error) => {
  //         console.error("eKYC error:", error);
  //       });
  //   }
  // }, [params.id]); // Only run when params.id changes

  return (
    <>
      <div
        className="box-height bg-ekyc"
        style={{ backgroundImage: `url(${ekycBg})` }}
      >
        <div className="wraper-right-box" style={{ paddingBottom: "19%" }}>
          <div className="row">
            <h3 className="pl-5 fontstyle">E-KYC Verification</h3>
            <h6 className="opacity-75" style={{ lineHeight: "30px" }}>
              E-KYC (Electronic Know Your Customer) is a secure and paperless
              way to verify your identity online while applying for a loan.
            </h6>

            <p
              className="ms-text-secondary"
              style={{ fontSize: "16px", fontWeight: "600", marginTop: "20px" }}
            >
              {" "}
              <PanToolIcon className="ms-text-secondary" /> &nbsp; Use your
              Aadhaar-linked mobile number to complete eKYC
            </p>
            <h5 className="fw-medium fs-5 pt-5">How the eKYC Process Works</h5>
            <div className="topic">
              <ul
                style={{
                  listStyle: "none",
                  paddingLeft: "0",
                  marginLeft: "0",
                  lineHeight: "40px",
                }}
              >
                <li>
                  {" "}
                  <LibraryAddCheckIcon className="ms-text-primary" /> &nbsp;
                  Enter your Aadhaar/PAN details
                </li>
                <li>
                  {" "}
                  <LibraryAddCheckIcon className="ms-text-primary" /> &nbsp;
                  Verify using OTP or secure authentication
                </li>
                <li>
                  {" "}
                  <LibraryAddCheckIcon className="ms-text-primary" /> &nbsp;
                  Details are verified instantly
                </li>
                <li>
                  {" "}
                  <LibraryAddCheckIcon className="ms-text-primary" /> &nbsp;
                  Loan application moves forward for approval
                </li>
              </ul>
            </div>
            <Button
              variant="contained"
              className="mt-2 fw-bolder ms-bg-secondary"
              size="large"
              disabled={loader}
              style={{ width: "310px" }}
              onClick={submit}
            >
              {loader
                ? "Start e- KYC Verification ..."
                : "Start e- KYC Verification"}{" "}
              &nbsp; <SendIcon />
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
