import React from "react";
import MobileNav from "../component/MobileNav";
import bgSupport from "../assets-crm/bg-support.jpg";
import CallOutlinedIcon from "@mui/icons-material/CallOutlined";
import DraftsOutlinedIcon from "@mui/icons-material/DraftsOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import { Link } from "react-router-dom";

export default function Support() {
  return (
    <>
      <img src={bgSupport} alt="support Pages" style={{ width: "100%" }} />
      <div className=" container pt-4">
        <h3 className="fw-semibold pb-2">Contact Details</h3>
        <div className="contact-item pt-3">
          <p className="fs-6 fw-medium">
            {" "}
            <CallOutlinedIcon className="ms-text-secondary" /> +91 9821388824
          </p>
          <p className="fs-6 fw-medium">
            <DraftsOutlinedIcon className="ms-text-secondary" /> &nbsp;
            <Link
              mailto="info@emergencypaisa.com"
              className="text-decoration-none text-black"
            >
              info@emergencypaisa.com
            </Link>
          </p>
        </div>

        <div className="contact-item">
          <p className="fs-6 fw-medium">
            {" "}
            <AccessTimeOutlinedIcon className="ms-text-secondary" /> 9:30
            AM-10:30 PM
          </p>
        </div>

        <div className="contact-item">
          <p className="fs-6 fw-medium">
            {" "}
            <LanguageOutlinedIcon className="ms-text-secondary" /> &nbsp;
            <Link
              to="https://emergencypaisa.com/"
              className="text-decoration-none text-black"
            >
              www.emergencypaisa.com
            </Link>
          </p>
        </div>
        <p style={{ fontSize: "14px", lineHeight: "22px" }}>
          Our customer support team is available to assist you with any
          inquiries or concerns. Feel free to reach out we're always ready to
          lend a helping hand! <b>Suburban Finance & Investment PVT. LTD.</b>
        </p>
        <p
          style={{
            fontSize: "14px",
            lineHeight: "22px",
            whiteSpace: "pre-line",
          }}
        >
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

      <MobileNav />
    </>
  );
}
