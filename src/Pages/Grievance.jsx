import React, { useState } from "react";
import "../css/grievance.css";
import { Helmet } from "react-helmet";
import Header from "../component/Header";
import Footer from "../component/Footer";

const Section = ({ title, children }) => {
  const [open, setOpen] = useState(true);
  return (
    <div className="section">
      <div className="section-header" onClick={() => setOpen(!open)}>
        <h2>{title}</h2>
        <span>{open ? "−" : "+"}</span>
      </div>
      {open && <div className="section-body">{children}</div>}
    </div>
  );
};

export default function Grievance() {
  return (
    <>
      <Header />
      <Helmet>
        <title>Grievance Redressal – EmergencyPaisa</title>
        <meta
          name="description"
          content="EmergencyPaisa grievance page — submit your complaint or issue related to our personal loan services and get timely assistance through our grievance redressal system."
        />
        <link rel="canonical" href="https://emergencypaisa.com/grievance" />
      </Helmet>

      <div
        className="row"
        style={{
          paddingTop: "150px",
          paddingBottom: "40px",
          backgroundColor: "#1973be",
        }}
      >
        <div className="container text-center">
          <h1 className="text-white">
            Grievance Redressal Mechanism (GRM)
          </h1>
        </div>
      </div>

      <div className="fpc-container" style={{ paddingTop: "60px" }}>

        <Section title="1. Background">
          <p>
            This Grievance Redressal Mechanism Policy (“Policy”) is framed in accordance with:
          </p>
          <ul>
            <li>RBI Master Directions for NBFC-ICC</li>
            <li>RBI Fair Practices Code guidelines</li>
            <li>RBI Circular dated November 28, 2025</li>
          </ul>
          <p>
            The Policy aims to ensure that customer complaints are handled in a prompt, fair, transparent, and efficient manner.
          </p>
        </Section>

        <Section title="2. Objective">
          <ul>
            <li>To establish a structured grievance redressal system</li>
            <li>To ensure timely resolution of customer complaints</li>
            <li>To enhance customer confidence and satisfaction</li>
            <li>To comply with regulatory requirements of the RBI</li>
            <li>To ensure accountability at all levels</li>
          </ul>
        </Section>

        <Section title="3. Applicability">
          <ul>
            <li>All customers of the Company</li>
            <li>All products and services offered (including digital lending)</li>
            <li>All employees, agents, recovery personnel, and Lending Service Providers (LSPs)</li>
          </ul>
        </Section>

        <Section title="4. Definition of Complaint">
          <ul>
            <li>Any dissatisfaction expressed by a customer</li>
            <li>Related to products, services, staff behaviour, charges, recovery practices, or digital platforms</li>
          </ul>
        </Section>

        <Section title="5. Principles of Grievance Redressal">
          <ul>
            <li>Fairness – unbiased handling of complaints</li>
            <li>Transparency – clear communication</li>
            <li>Accessibility – easy complaint lodging channels</li>
            <li>Confidentiality – protection of customer data</li>
            <li>Timeliness – resolution within defined timelines</li>
          </ul>
        </Section>

        <Section title="6. Channels for Lodging Complaints">
          <ul>
            <li>Email</li>
            <li>Phone</li>
            <li>Website / Mobile App</li>
            <li>Written application</li>
            <li>Customer support</li>
          </ul>
        </Section>

        <Section title="7. Grievance Redressal Mechanism (Escalation Matrix)">
          <p><strong>Level 1 – Customer Care</strong></p>
          <p>Phone: +91 9821388824</p>
          <p>Email: info@emergencypaisa.com</p>
          <p>Resolution Timeline: Within 15 working days</p>

          <p><strong>Level 2 – Grievance Officer/Nodal Officer</strong></p>
          <p>Name: Mr. Sunny Sharma</p>
          <p>Phone: +91 7678378898</p>
          <p>Email: nodal.officer@emergencypaisa.com</p>
          <p>Resolution Timeline: Within 10 working days</p>

          <p><strong>Level 3 – Principal Nodal Officer</strong></p>
          <p>Name: Mr. Pankaj Dhall</p>
          <p>Phone: +91 7675378901</p>
          <p>Email: pno@emergencypaisa.com</p>
        </Section>

        <Section title="8. Escalation to RBI">
          <p>If the complaint is not resolved within 30 days, or complainant/customer is not satisfied, the customer may approach:</p>
          <ul>
            <li>
              RBI Complaint Management System (CMS):  
              https://cms.rbi.org.in/cms/indexpage.html#eng
            </li>
            <li>Ombudsman Scheme for NBFCs</li>
          </ul>
        </Section>

        <Section title="9. Complaint Handling Process">
          <ol>
            <li><strong>Acknowledgment</strong> – within 48 hours</li>
            <li><strong>Registration</strong> – Unique complaint ID generated</li>
            <li><strong>Investigation</strong> – Concerned department review</li>
            <li><strong>Resolution</strong> – Corrective action taken</li>
            <li><strong>Closure</strong> – Customer informed with response</li>
          </ol>
        </Section>

        <Section title="10. Special Focus Areas">
          <ul>
            <li>Digital lending issues</li>
            <li>Unauthorized charges</li>
            <li>Data privacy breaches</li>
            <li>Harassment by recovery agents</li>
            <li>Mis-selling</li>
          </ul>
        </Section>

        <Section title="11. Role of Grievance Officer">
          <ul>
            <li>Monitor complaint resolution</li>
            <li>Ensure regulatory compliance</li>
            <li>Submit periodic reports to the Board</li>
            <li>Act as nodal point for RBI communication</li>
          </ul>
        </Section>

        <Section title="12. Digital Lending Compliance">
          <ul>
            <li>Grievance contact details must be clearly displayed</li>
            <li>Complaints through apps must be trackable</li>
            <li>No suppression or deletion of complaints</li>
          </ul>
        </Section>

        <Section title="13. Record Maintenance">
          <ul>
            <li>All complaints shall be recorded and tracked</li>
            <li>Data shall include:
              <ul>
                <li>Nature of complaint</li>
                <li>Resolution time</li>
                <li>Status</li>
              </ul>
            </li>
          </ul>
        </Section>

        <Section title="14. Review & Reporting">
          <ul>
            <li>Periodic review by Senior Management</li>
            <li>Report to the Board of Directors</li>
            <li>Reports shall include:
              <ul>
                <li>Number of complaints received</li>
                <li>Resolved vs pending</li>
                <li>Root cause analysis</li>
              </ul>
            </li>
          </ul>
        </Section>

        <Section title="15. Customer Awareness">
          <ul>
            <li>Display grievance mechanism on website & app</li>
            <li>Include details in loan agreements / KFS</li>
            <li>Educate customers through communication</li>
          </ul>
        </Section>

        <Section title="16. Confidentiality">
          <ul>
            <li>Kept confidential</li>
            <li>Used only for grievance resolution</li>
            <li>Shared only if required by law</li>
          </ul>
        </Section>

        <Section title="17. Non-Retaliation Policy">
          <ul>
            <li>Customers shall not be harassed</li>
            <li>Denied services</li>
            <li>Discriminated against</li>
          </ul>
        </Section>

        <Section title="18. Policy Review">
          <ul>
            <li>Reviewed annually or upon regulatory changes</li>
            <li>Approved by Board of Directors</li>
          </ul>
        </Section>

      </div>

      <Footer />
    </>
  );
}