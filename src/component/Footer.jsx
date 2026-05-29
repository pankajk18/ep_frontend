import React from "react";
import FooterCard from "./FooterCard";
import FooterBottom from "./FooterBottom";
import { Link } from "react-router-dom";
import logoWhite from "../assets/ep_logo_white.png";
import FacebookIcon from "@mui/icons-material/Facebook";
import YouTubeIcon from "@mui/icons-material/YouTube";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";

export default function Footer() {
  const socialLinks = [
    {
      name: "Facebook",
      url: "https://www.facebook.com/emergencypaisa",
      icon: <FacebookIcon size={50} className="socilthum" />,
    },
    {
      name: "YouTube",
      url: "https://www.youtube.com/@EmergencyPaisa",
      icon: <YouTubeIcon size={50} className="socilthum" />,
    },
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/company/emergencypaisa",
      icon: <LinkedInIcon size={50} className="socilthum" />,
    },
    {
      name: "Instagram",
      url: "https://www.instagram.com/emergency_paisa",
      icon: <InstagramIcon size={50} className="socilthum" />,
    },
  ];

  const ourServices = [
    { name: "Short Term Loan", path: "/short-term-loan" },
    { name: "Instant Personal Loan", path: "/instant-personal-loan" },
    { name: "Emergency Loan", path: "/emergency-loan" },
  ];

  const quickLinks = [
    { name: "About", path: "/about" },
    { name: "Contact Us", path: "/contact" },
    { name: "Pay Now", path: "/repay-loan" },
    { name: "Apply Now", path: "/apply-now" },
    { name: "Rate and Terms", path: "/rate-and-terms" },
    { name: "Grievances", path: "/grievance" },
    { name: "Deletion Policy", path: "/deletion-policy" },
    { name: "Fair Practices Code", path: "/fair-practice" },
    { name: "Code of Conduct", path: "/code-of-conduct" },
    { name: "Blogs", path: "/blogs" },
  ];

  return (
    <>
      <div
        className="footer-section-bottom text-white pt-5"
        style={{ background: "#000" }}
      >
        <div className="container">
          <div className="row mt-4 pb-5 footer">
            <div className="col-lg-4">
              <Link to="/">
                <img src={logoWhite} alt={"Emergency Paisa"} />
              </Link>
              <p className="text-white mt-3">
                SUBURBAN FINANCE AND INVESTMENT PRIVATE LIMITED is a Non-Banking
                Financial Company (NBFC) registered with the Reserve Bank of
                India (RBI). EmergencyPaisa is the brand name under which the
                company conducts its lending operations and specializes in
                meeting customers’ instant financial needs.
              </p>

              <div className="d-flex gap-3 mt-3">
                {socialLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.url}
                    target="_blank"
                    color="#fff"
                    aria-label={link.name}
                  >
                    {link.icon}
                  </Link>
                ))}
              </div>
            </div>

            <div className="col-lg-3">
              <h4>Our Services</h4>
              <ul className="link-text">
                {ourServices.map((service) => (
                  <li key={service.name}>
                    <Link to={service.path}>
                      <KeyboardArrowLeftIcon />
                      {service.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="col-lg-2">
              <h4>Quick Link</h4>

              <ul className="link-text">
                {quickLinks.map((link) => {
                  return (
                    <li>
                      <Link to={link.path}>
                        {" "}
                        <KeyboardArrowLeftIcon />
                        {link.name}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="col-lg-3">
              <h4>Contact Us</h4>
              <FooterCard
                static="Our Registered Office"
                val={`Floor No.: Seventh Floor
                                Building No./Flat No.: Bearing No. 752
                                Name Of Premises/Building: Netaji Subhash Place
                                Road/Street: Aggarwal Metro Heights
                                Locality/Sub Locality: Pitampura
                                City/Town/Village: New Delhi
                                District: North West Delhi
                                State: Delhi
                                PIN Code: 110034`}
              />

              <p>+91 9821388824</p>

              <a
                href="mailto: info@emergencypaisa.com"
                style={{ color: "#fff", textDecoration: "none" }}
              >
                <p>info@emergencypaisa.com</p>
              </a>
            </div>
          </div>
        </div>
      </div>
      <FooterBottom />
    </>
  );
}
