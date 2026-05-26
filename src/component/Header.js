import React from "react";
import "../css/nav.css";
import { Link } from "react-router-dom";
import Loanbtn from "./Loanbtn";
import { useSelector } from "react-redux";
import Logo from "../assets/logo.png";

export default function Header() {
  const brandName = process.env.REACT_APP_COMPANY_N;
  const brandLogo = process.env.REACT_APP_LOGO;
  const customerDetails = useSelector(
    (state) => state?.customerJourneyDetails?.customerDetails,
  );
  const checklogin = customerDetails?.token;

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about" },
    { name: "Blogs", path: "/blogs" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <>
      <nav
        className="navbar navbar-expand-lg fixed-top bg-white"
        style={{ padding: "0" }}
      >
        <div className="container">
          {/* Logo */}
          <Link className="navbar-brand" to="/">
            <img src={Logo} alt={"EmergencyPaisa"} />
          </Link>

          {/* MOBILE HAMBURGER (ONLY MOBILE) */}
          <div className="mobile-menu attr-nav flex d-lg-none">
            <div
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasRight"
              aria-controls="offcanvasRight"
            >
              <li className="side-menu" style={{ position: "relative" }}>
                <Link>
                  <span className="bar-1"></span>
                  <span className="bar-2"></span>
                  <span className="bar-3"></span>
                </Link>
              </li>
            </div>
          </div>

          {/* DESKTOP NAVBAR */}
          <div
            className="collapse navbar-collapse d-none d-lg-flex"
            id="navbarSupportedContent"
          >
            <div className="navbar-nav mb-2 mb-lg-0 ms-auto">
              {navLinks.map((link) => (
                <Link key={link.name} to={link.path} className="nav-link">
                  {link.name}
                </Link>
              ))}
            </div>

            <div className="d-flex gap-3 align-items-center ms-4">
              {checklogin ? (
                <Link to="/apply-now">
                  <Loanbtn title="Dashboard" />
                </Link>
              ) : (
                <Link to="/apply-now">
                  <Loanbtn title="Apply Now" />
                </Link>
              )}

              <Link to="/repay-loan" className="btn-paynow ms-bg-secondary">
                Pay Now
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* MOBILE OFFCANVAS MENU */}
      <div
        className="offcanvas offcanvas-end d-lg-none"
        tabIndex="-1"
        id="offcanvasRight"
        aria-labelledby="offcanvasRightLabel"
      >
        <div className="offcanvas-header">
          <h5 id="offcanvasRightLabel" className="fw-semibold text-uppercase">
            Emergency <span className="ms-takeaways">Paisa</span>
          </h5>
          <button
            type="button"
            className="btn-close text-reset"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>

        <div className="offcanvas-body ms-side-nav">
          <ul>
            {navLinks.map((link) => (
              <li data-bs-dismiss="offcanvas" key={link.name}>
                <Link to={link.path}>{link.name}</Link>
              </li>
            ))}

            <div className="d-lg-none mt-3">
              {checklogin ? (
                <Link to="/apply-now">
                  <Loanbtn title="Dashboard" />
                </Link>
              ) : (
                <Link to="/apply-now">
                  <Loanbtn title="Apply Now" />
                </Link>
              )}

              <Link to="/repay-loan" className="btn-paynow">
                Pay Now
              </Link>
            </div>
          </ul>
        </div>
      </div>
    </>
  );
}
