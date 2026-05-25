import React from "react";
import "./../css/DeletionPolicy.css";

const DeletionPolicy = () => {
  return (
    <div>

      {/* HERO */}
      <div className="hero">
        <div className="hero-inner">
          <div className="hero-label">Data Rights & Transparency</div>

          <h1>
            Account & Data <br />
            <span>Deletion Policy</span>
          </h1>

          <p className="hero-desc">
            Emergency Paisa respects your privacy and gives you full control
            over your personal data. This page explains how you can request the
            deletion of your account and associated personal information.
          </p>
        </div>
      </div>


      {/* PAGE BODY */}
      <div className="page-body">

        {/* INTRO */}
        <div className="intro-card">
          <p>
            Users can request account deletion even if they only checked
            eligibility or started an application. We are committed to handling
            your data with respect and transparency at every step.
          </p>

          <p>
            Digital lending platforms may retain some information when required
            under applicable financial regulations and compliance obligations.
          </p>
        </div>


        {/* TOC */}
        <div className="toc">
          <div className="toc-title">Table of Contents</div>

          <ul className="toc-list">
            <li><a href="#s1"><span className="toc-num">01</span> How to Request Deletion</a></li>
            <li><a href="#s2"><span className="toc-num">02</span> Processing Timeline</a></li>
            <li><a href="#s3"><span className="toc-num">03</span> What Will Be Deleted</a></li>
            <li><a href="#s4"><span className="toc-num">04</span> Data That May Be Retained</a></li>
            <li><a href="#s5"><span className="toc-num">05</span> Active Loan / Outstanding Dues</a></li>
            <li><a href="#s6"><span className="toc-num">06</span> Impact of Account Deletion</a></li>
            <li><a href="#s7"><span className="toc-num">07</span> Confirmation of Deletion</a></li>
            <li><a href="#s8"><span className="toc-num">08</span> Contact & Grievance</a></li>
          </ul>
        </div>



        {/* SECTION 1 */}
        <div className="section" id="s1">

          <div className="section-header-deletion">
            <div className="section-num">01</div>
            <div className="section-title">How to Request Account Deletion</div>
          </div>

          <div className="section-body">

            <p>
              You can request deletion of your Emergency Paisa account and
              personal data at any time. Follow the steps below to submit your
              request:
            </p>

            <ol className="steps">

              <li>
                <div className="step-num">1</div>

                <div className="step-content">
                  Send an email from your <strong>registered email ID</strong>{" "}
                  to:{" "}
                  <a href="mailto:support@emergencypaisa.com">
                    support@emergencypaisa.com
                  </a>
                </div>
              </li>

              <li>
                <div className="step-num">2</div>
                <div className="step-content">
                  Use the subject line:{" "}
                  <strong>"Account / Data Deletion Request"</strong>
                </div>
              </li>

              <li>
                <div className="step-num">3</div>
                <div className="step-content">
                  Include the following details for verification:
                </div>
              </li>

            </ol>


            <div className="verify-box">
              <div className="verify-box-title">Required Verification Details</div>

              <ul className="verify-list">
                <li>Full Name</li>
                <li>Registered Mobile Number</li>
                <li>Registered Email ID</li>
                <li>Last 4 digits of Customer ID or Loan ID (if available)</li>
                <li>Reason for deletion (optional)</li>
              </ul>
            </div>

          </div>
        </div>


        {/* SECTION 2 */}
        <div className="section" id="s2">

          <div className="section-header-deletion">
            <div className="section-num">02</div>
            <div className="section-title">Processing Timeline</div>
          </div>

          <div className="section-body">

            <div className="timeline">

              <div className="timeline-pill">
                <div className="timeline-icon-deletion">📬</div>
                <div>
                  <div className="timeline-label">Acknowledgement</div>
                  <div className="timeline-value">
                    Within <strong>7 working days</strong>
                  </div>
                </div>
              </div>

              <div className="timeline-pill">
                <div className="timeline-icon-deletion">✅</div>
                <div>
                  <div className="timeline-label">Deletion Complete</div>
                  <div className="timeline-value">
                    Within <strong>30 days</strong>
                  </div>
                </div>
              </div>

            </div>
             <p>Backup data may take additional time to be removed from internal systems.</p>
          </div>
        </div>

        <div className="section" id="s3">
      <div className="section-header-deletion">
        <div className="section-num">03</div>
        <div className="section-title">What Information Will Be Deleted</div>
      </div>
      <div className="section-body">
        <p>Upon successful verification, the following information may be deleted from our systems:</p>
        <ul className="data-list">
          <li><span className="icon-deletion">👤</span> Profile details and contact information</li>
          <li><span className="icon-deletion">🔐</span> Login credentials and account information</li>
          <li><span className="icon-deletion">📄</span> Application details submitted on the Emergency Paisa platform</li>
          <li><span className="icon-deletion">📱</span> Device and app usage data collected through our application</li>
          <li><span className="icon-deletion">📣</span> Marketing preferences and communication history</li>
        </ul>
      </div>
    </div>

    <div className="section" id="s4">
      <div className="section-header-deletion">
        <div className="section-num">04</div>
        <div className="section-title">Data That May Be Retained</div>
      </div>
      <div className="section-body">
        <p>Certain information may be retained where required by law or financial regulations. Examples include:</p>
        <ul className="data-list">
          <li><span className="icon-deletion">📑</span> Loan agreements and repayment records</li>
          <li><span className="icon-deletion">🪪</span> KYC documents submitted during verification</li>
          <li><span className="icon-deletion">💳</span> Financial transaction records</li>
          <li><span className="icon-deletion">🛡️</span> Data required for fraud prevention or legal obligations</li>
        </ul>
        <div className="retain-notice">
          <strong>Note:</strong> These records may be retained for the minimum period required under applicable laws and regulatory requirements. Retention is strictly limited to legal necessity.
        </div>
      </div>
    </div>

    <div className="section" id="s5">
      <div className="section-header-deletion">
        <div className="section-num">05</div>
        <div className="section-title">Active Loan or Outstanding Dues</div>
      </div>
      <div className="section-body">
        <div className="alert-box">
          <div className="alert-icon-deletion">⚠️</div>
          <div className="alert-body">
            <strong>Important:</strong> If you currently have an active loan or pending repayments, your account deletion request will be processed <strong>only after the loan obligations are fully settled</strong>. Please ensure all dues are cleared before initiating a deletion request.
          </div>
        </div>
      </div>
    </div>


        <div className="section" id="s6">
            <div className="section-header-deletion">
                <div className="section-num">06</div>
                <div className="section-title">Impact of Account Deletion</div>
            </div>
            <div className="section-body">
                <p>Once your account deletion request is completed:</p>
                <ul className="impact-list">
                    <li><span className="check">✕</span> Your Emergency Paisa account will be permanently deactivated</li>
                    <li><span className="check">✕</span> You will no longer be able to log in to the app or website</li>
                    <li><span className="check">✕</span> Any saved data or profile details will be removed from our systems</li>
                </ul>
            <div className="retain-notice">
            <strong>Please note:</strong> Deleted accounts cannot be restored. This action is permanent and irreversible.
            </div>
        </div>
        </div>

        <div className="section" id="s7">
            <div className="section-header-deletion">
                <div className="section-num">07</div>
                <div className="section-title">Confirmation of Deletion</div>
            </div>
            <div className="section-body">
                <p>Once the deletion process is completed, you will receive a <strong>confirmation email</strong> stating that your account and associated personal data have been deleted — except information required to be retained by law.</p>
            </div>
            </div>

    

        {/* CONTACT */}
        <div className="section" id="s8">

          <div className="section-header-deletion">
            <div className="section-num">08</div>
            <div className="section-title">Contact & Grievance Redressal</div>
          </div>

          <div className="section-body">

            <div className="contact-grid">

              <div className="contact-card">
                <div className="contact-card-label">Support Email</div>
                <div className="contact-card-value">
                  <a href="mailto:support@emergencypaisa.com">
                    support@emergencypaisa.com
                  </a>
                </div>
              </div>

              <div className="contact-card">
                <div className="contact-card-label">Phone</div>
                <div className="contact-card-value">
                  <a href="tel:+919821388824">+91-9821388824</a>
                </div>
              </div>

              <div className="contact-card">
                <div className="contact-card-label">Grievance Officer</div>
                <div className="contact-card-value">
                  <a href="mailto:grievance@emergencypaisa.com">
                    grievance@emergencypaisa.com
                  </a>
                </div>
              </div>

              <div className="contact-card">
                <div className="contact-card-label">Registered Office</div>
                <div className="contact-card-value">
                  <p style={{ fontSize: '14px', lineHeight: '22px', whiteSpace: 'pre-line' }}>
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
              </div>

            </div>

          </div>
        </div>



        {/* CONSENT */}
        <div className="consent-box">
          <div className="consent-box-title">Consent & Policy Updates</div>

          <p>
            By submitting a deletion request, you acknowledge and agree to the
            terms mentioned in this policy.
          </p>

          <p>
            Emergency Paisa reserves the right to update this page from time to
            time.
          </p>
        </div>

      </div>


      

    </div>
  );
};

export default DeletionPolicy;