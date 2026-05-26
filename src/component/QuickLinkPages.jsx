import React from "react";
import { Link } from "react-router-dom";
import loanAmount from "../assets/loan.jpg.jpeg";
import aadharLoan from "../assets/byaadhar.jpg.jpeg";
import "../css/quick.css";

export default function QuickLinkPages() {
  return (
    <section className="loan-section py-5">
      <div className="container">
        <div className="row g-4">
          {/* LEFT BIG CARD */}
          <div className="col-lg-4">
            <Link to="/personal-loan-by-amount">
              <div className="loan-card big-card">
                <img
                  src={loanAmount}
                  alt="Loan By Amount"
                  style={{ width: "100%", height: "100%" }}
                />
                <div className="loan-content">
                  <h4>Personal Loan by Amount</h4>
                  <p>
                    Get instant personal loans based on your required amount
                    with quick approval and easy online application.
                  </p>
                  <button className="loan-btn">Explore →</button>
                </div>
              </div>
            </Link>
          </div>

          {/* CENTER SMALL CARDS */}
          <div className="col-lg-4">
            <div className="row g-4">
              <div className="col-12">
                <Link
                  className="text-decoration-none text-black"
                  to={"/service-area"}
                >
                  <div className="loan-card small-card d-flex align-items-center">
                    <div>
                      <h5>Personal Loan in Different Cities</h5>
                      <p>
                        Get quick personal loans in different cities with easy
                        approval and fast processing.{" "}
                      </p>
                      <button className="loan-btn">Know More →</button>
                    </div>
                  </div>
                </Link>
              </div>

              <div className="col-12">
                <Link
                  className="text-decoration-none text-black"
                  to={"/loan-for-personal-needs"}
                >
                  <div
                    className="loan-card small-card d-flex align-items-center"
                    style={{ background: "#e0ebf4" }}
                  >
                    <div>
                      <h5>Loan for Personal Needs</h5>
                      <p>
                        {" "}
                        Get instant personal loans for urgent needs with quick
                        approval.{" "}
                      </p>
                      <button className="loan-btn">Know More →</button>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>

          {/* RIGHT BIG CARD */}
          <div className="col-lg-4">
            <Link to={"/loan-on-aadhaar-card"}>
              <div className="loan-card big-card">
                <img
                  src={aadharLoan}
                  alt="Loan on Aadhar Card"
                  style={{ width: "100%", height: "100%" }}
                />
                <div className="loan-content">
                  <h4>Loan on Aadhar Card</h4>
                  <p>
                    Apply for a loan on an Aadhaar card with quick approval,
                    minimal documents, and instant bank transfer.
                  </p>
                  <button className="loan-btn">Apply Now →</button>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
