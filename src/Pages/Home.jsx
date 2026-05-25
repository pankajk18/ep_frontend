import React from "react";
import HeroBanner from "../component/HeroBanner";
import HomeAbout from "../component/HomeAbout";
import HomeServices from "../component/HomeServices";
import Feature from "../component/Feature";
import AppScreen from "../component/AppScreen";
import Faq from "../component/Faq";
import { Helmet } from "react-helmet";
import QuickLinkPage from "../component/QuickLinkPages";

export default function Home() {
  return (
    <>
      <Helmet>
        <title>
          Apply for Instant Paperless Personal Loan | EmergencyPaisa
        </title>
        <meta
          name="description"
          content="Apply for instant, paperless personal loans online with EmergencyPaisa—fast approvals, secure processing, and flexible repayment options to cover your financial emergencies quickly."
        />
        <link rel="canonical" href="https://emergencypaisa.com/" />
      </Helmet>
      <HeroBanner />

      <HomeAbout />
      <HomeServices />
      <Feature />

      <AppScreen />
      <QuickLinkPage />
      <div className="container">
        <Faq />
      </div>
      <section className="py-5">
        <div className="container">
          <div className="mb-5">
            <h3 className="fw-bold ms-text-primary">
              {" "}
              <span className="ms-text-secondary">Interest Rates</span> &
              Charges
            </h3>
            <p className="text-muted mt-2">
              Welcome to the EmergencyPaisa website, operated by SUBURBAN
              FINANCE & INVESTMENT PRIVATE LIMITED ("we", "us", "our"). By
              accessing or using our website ("Site") and services ("Services"),
              you agree to be bound by the following terms and conditions.
            </p>
          </div>

          <div className="row">
            <div className="col-md-6 col-lg-4 py-3 border-end border-bottom">
              <h3 className="fw-bold ">2.9166%</h3>
              <p className="fw-medium ms-text-secondary">
                Monthly Interest Rate
              </p>
            </div>

            <div className="col-md-6 col-lg-4 py-3 border-end border-bottom">
              <h3 className="fw-bold ">2%</h3>
              <p className="fw-medium ms-text-secondary">Processing Fee</p>
            </div>

            <div className="col-md-6 col-lg-4 py-3 border-bottom">
              <h3 className="fw-bold">35% (Fixed)</h3>
              <p className="fw-medium ms-text-secondary">
                Offered Annual Percentage Rate (APR)
              </p>
            </div>

            <div className="col-md-6 col-lg-4 py-3 border-end">
              <h3 className="fw-bold">18%</h3>
              <p className="fw-medium ms-text-secondary">
                GST on Processing Fee
              </p>
            </div>

            <div className="col-md-6 col-lg-4 py-3 border-end">
              <h3 className="fw-bold">1 – 3 Years</h3>
              <p className="fw-medium ms-text-secondary">
                Tenure / Repayment Period
              </p>
            </div>

            <div className="col-md-6 col-lg-4 py-3">
              <h3 className="fw-bold ">₹10,000 – ₹5,00,000</h3>
              <p className="fw-medium ms-text-secondary">Loan Amount</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-3">
        <div className="container">
          <h3 className="fw-bold mb-4 ms-text-primary">
            Representative Example
          </h3>

          {/* Responsive Table */}
          <div className="table-responsive shadow-sm rounded">
            <table className="table table-bordered align-middle mb-0">
              <thead className="table-light">
                <tr>
                  <th>Loan Amount</th>
                  <th>APR</th>
                  <th>Tenure</th>
                  <th>Processing Fee</th>
                  <th>GST on Processing Fee</th>
                  <th>Amount Disbursed</th>
                  <th>EMI</th>
                  <th>Total Repayment Amount</th>
                  <th>Total Interest</th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td>₹ 50,000</td>
                  <td>35%</td>
                  <td>12 Months</td>
                  <td>₹ 1,000</td>
                  <td>₹ 180</td>
                  <td>₹ 48,820</td>
                  <td>₹ 4,998</td>
                  <td>₹ 59,978</td>
                  <td>₹ 9,978</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Note */}
          <p className="text-muted small mt-3">
            *The above example is for representative purposes only and actual
            loan terms may vary.
          </p>
        </div>
      </section>
    </>
  );
}
