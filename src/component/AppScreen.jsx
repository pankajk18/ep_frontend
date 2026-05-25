import React, { useState } from "react";
import aScreenLight from "../assets/em-mockup-light.webp";
import qr from "../assets/qr-scan.png";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import DoneIcon from "@mui/icons-material/Done";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";

export default function AppScreen() {
  const [step, setStep] = useState(1);
  return (
    <>
      <div className="get_started_section">
        <div className="get_started_row">
          {step === 1 ? (
            <>
              <div className="image_section">
                <div className="d-flex align-content-center align-items-center">
                  <img
                    className="thumb-style-four"
                    src={aScreenLight}
                    alt="EmergencyPaisa app"
                    style={{ width: "32%" }}
                  />
                  <div className="app-info pe-5 pt-5 pb-5">
                    <h3 className="pt-5 text-center text-uppercase ms-text-secondary fs-4">
                      India's <span className="ms-takeaways">Trusted</span> Loan
                      App
                    </h3>
                    <p className="fs-5">
                      Download the EmergencyPaisa app, fill out a basic form,
                      and upload the required documents.
                    </p>
                    <div className="scanner-box mt-4">
                      <img src={qr} alt="EmergencyPaisa" />
                      <p
                        style={{
                          padding: "0 0px 0 20px",
                          fontWeight: "500",
                          marginBottom: "0",
                          lineHeight: "30px",
                        }}
                      >
                        Your Loan in Minutes Scan and Install EmergencyPaisa
                        Now.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : step === 2 ? (
            <>
              <div className="image_section">
                <div className="d-flex align-content-center align-items-center">
                  {/* <img src={appImg} alt="" /> */}
                  <img
                    className="thumb-style-four"
                    src={aScreenLight}
                    alt="App Screen"
                    style={{ width: "32%" }}
                  />
                  <div className="app-info pe-5">
                    <h3 className="pt-5 text-center text-uppercase ms-text-secondary fs-4">
                      India's <span className="ms-takeaways">Trusted</span> Loan
                      App
                    </h3>
                    <p className="fs-5">
                      We’re quick to consider your loan application and approve
                      it if you qualify for the easy-to-meet criteria.{" "}
                    </p>
                    <div className="scanner-box mt-4">
                      <img src={qr} alt="EmergencyPaisa" />
                      <p
                        style={{
                          padding: "0 0px 0 20px",
                          fontWeight: "500",
                          marginBottom: "0",
                          lineHeight: "30px",
                        }}
                      >
                        Your Loan in Minutes Scan and Install EmergencyPaisa
                        Now.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : step === 3 ? (
            <>
              <div className="image_section">
                <div className="d-flex align-content-center align-items-center">
                  {/* <img src={appImg} alt="" /> */}
                  <img
                    className="thumb-style-four"
                    src={aScreenLight}
                    alt="App Screen"
                    style={{ width: "32%" }}
                  />
                  <div className="app-info pe-5">
                    <h3 className="pt-5 text-center text-uppercase ms-text-secondary fs-4">
                      India's <span className="ms-takeaways">Trusted</span> Loan
                      App
                    </h3>
                    <p className="fs-5">
                      {" "}
                      If all goes well, you can expect to receive the desired
                      loan amount in just 10 minutes.
                    </p>
                    <div className="scanner-box mt-4">
                      <img src={qr} alt="EmergencyPaisa" />
                      <p
                        style={{
                          padding: "0 0px 0 20px",
                          fontWeight: "500",
                          marginBottom: "0",
                          lineHeight: "30px",
                        }}
                      >
                        Your Loan in Minutes Scan and Install EmergencyPaisa
                        Now.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            ""
          )}
          <div className="steps_section">
            <div
              className={
                step === 1 ? "step_item d-flex step_active" : "step_item d-flex"
              }
            >
              <div
                className={
                  step === 1
                    ? "step_icon_container icon_active"
                    : "step_icon_container"
                }
                onClick={(e) => setStep(1)}
              >
                <ArrowDownwardIcon className="step_icon" />
              </div>
              <div className="step_content">
                <h4 className="content_title">
                  Complete our online application
                </h4>
              </div>
            </div>
            <div
              className={
                step === 2 ? "step_item d-flex step_active" : "step_item d-flex"
              }
            >
              <div
                className={
                  step === 2
                    ? "step_icon_container icon_active"
                    : "step_icon_container"
                }
                onClick={(e) => setStep(2)}
              >
                <ArrowUpwardIcon className="step_icon" />
              </div>
              <div className="step_content">
                <h4 className="content_title">Get instant loan approval</h4>
              </div>
            </div>
            <div
              className={
                step === 3
                  ? "step_item d-flex step_active last_item"
                  : "step_item d-flex last_item"
              }
            >
              <div
                className={
                  step === 3
                    ? "step_icon_container icon_active"
                    : "step_icon_container"
                }
                onClick={(e) => setStep(3)}
              >
                <DoneIcon className="step_icon" />
              </div>
              <div className="step_content">
                <h4 className="content_title">
                  Receive funds directly into your bank account
                </h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
