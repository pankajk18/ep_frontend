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

export default function CodeOfConduct() {
  return (
    <>
      <Header />
      <Helmet>
        <title>Code of Conduct – EmergencyPaisa</title>
        <meta
          name="description"
          content="EmergencyPaisa Code of Conduct — understand our commitment to ethical practices, transparency, and fair treatment of all stakeholders."
        />
        <link rel="canonical" href="https://emergencypaisa.com/code-of-conduct" />
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
          <h1 className="text-white">Code of Conduct</h1>
        </div>
      </div>

      <div className="fpc-container" style={{ paddingTop: "60px" }}>

        <Section title="1. Introduction">
          <p>
            Suburban Finance & Investment Private Limited (“Emergency Paisa” or “the Company”) is a NBFC registered with the Reserve Bank of India (“RBI”) is presently engaged in the business of providing personal loan to the customers throughout India.
          </p>
          <p>
            Pursuant to Reserve Bank of India (RBI) Master Directions Reserve Bank of India (Non-Banking Financial Companies – Responsible Business Conduct) Directions, 2025 dated 28th Day of November 2026 or any other Directions, Circulars, Notifications or other law for the time  being in force, the Board of Directors of the company have adopted a Code of Conduct cum recovery policy.
          </p>
        </Section>

        <Section title="2. Applicability">
          <p>
            This policy shall be unanimously applicable to all employees, recovery agents, outsourced agencies, and authorized representatives irrespective of their gender, designation, profile etc. In no event, any of the employees, recovery agents, outsourced agencies, and authorized representatives shall be given relaxation to comply with.
          </p>
        </Section>

        <Section title="3. Objectives">
          <ul>
            <li>Ensure ethical recovery</li>
            <li>Follow due process of recovery</li>
            <li>Prevent harassment</li>
            <li>Protect borrower dignity</li>
            <li>Avoid using foul words/language</li>
            <li>Ensure compliance</li>
          </ul>
        </Section>

        <Section title="4. Code of Conduct">

          <p><strong>4.1 General Principles</strong></p>
          <p>
            All the employees, recovery agents, outsourced agencies, and authorized representatives shall maintain at all times Integrity, fairness, transparency while dealing with customers/borrowers.  The Company is committed to ensuring that all written and verbal communication with its customers/borrower will be in simple language and it will adopt civil manners in its interaction with the customers/borrower.
          </p>

          <p><strong>4.2 Prohibited Practices</strong></p>
          <p>
            No employees, recovery agents, outsourced agencies, and authorized representatives shall take recourse to or adopt including but not limited to coercion, harassment, threats, or public humiliation for recovery of loan amount or any other charges. Decency and Decorum would be maintained during visits to the customer/borrower’s place for collection of dues
          </p>

          <p><strong>4.3 Communication</strong></p>
          <p>
            All employees, recovery agents, outsourced agencies, and authorized representatives that they will communicate with the customer/borrowers in the gentle manner Only between 9 AM to 7 PM.
          </p>

          <p><strong>4.4 Identification</strong></p>
          <p>
            All employees, recovery agents, outsourced agencies, and authorized representatives must carry Company issued ID Card and/or authorization and whenever is required, produce the same while doing field verification, inspection, visit etc., outside the business premises.
          </p>

          <p><strong>4.5 Privacy</strong></p>
          <p>
            The Company hereby undertakes it shall maintain confidentiality of borrower data and shall deploy appropriate measures to make sure that confidential data are remain protected at all time. The Company shall not disclose any confidential data of borrowers to third parties except when it is required under law for the time being in force.
          </p>

        </Section>

        <Section title="5. Recovery Process">
          <ul>
            <li>5.1 Pre-Recovery: Reminders via SMS/Email</li>
            <li>5.2 Soft Recovery: Negotiation and follow-ups</li>
            <li>5.3 Field Recovery: Professional conduct</li>
            <li>5.4 Legal Action: As per law</li>
          </ul>
        </Section>

        <Section title="6. Recovery Agents">
          <p>
            All the recovery agents employed by the Company either directly or indirectly, on board or third parties’ agents, must adhere to this Code of Conduct and maintain  decency and decorum during authorised visits to the customer/borrower’s place for collection of dues. Always carry valid ID card issued by the Company and produce the ID whenever asked for the same customers/borrowers or any other having legal authority to ask for same. Avoid unnecessary threatening for legal/criminal action as well as Use of abusive, aggressive, or defamatory language.
          </p>
          <p>
            The Company will not initiate any legal or other measures including forfeiting of the security, if any without giving 7 days’ notice, requiring the customer/borrower to discharge his/her liability in full.
          </p>
          <p>
            The Company make sure that it is providing necessary trainings to its staff as required by the RBI or other legal Authority for recovery mechanism  as well as regulatory & compliance part whenever required.
          </p>
        </Section>

        <Section title="7. Grievance Redressal">
          <pre>
            {`The Company’s grievance redressal mechanism shall operate in following manner:
            First Escalation	Customer Care
            Phone:	+91 9821388824,
            Email: info@emergencypaisa.com
                If the issue is not resolved within 15 working days of raising the issue, the customer shall raise the issue with the Grievance Officer
            Second Escalation	Grievance Officer
            Name: Sunny Sharma
            Phone: +91 7678378898
            Email:nodal.officer@emergencypaisa.com
                If the issue is not resolved within 10 working days of raising the issue, the customer shall raise the such issue with the Nodal Officer.
            Final escalation	Nodal Officer
            Name: Pankaj Dhall
            Phone: +91 7675378901
            Email:nodal.officer@emergencypaisa.com
                Final escalation level for unresolved grievances.

            If the Complaints of borrowers shall be resolved within 30 working days, the borrower may escalate the matter to the Reserve Bank of India – Complaint Management System (CMS).`}
          </pre>
        </Section>

        <Section title="8. Penal Charges">
          <p>
            The Company may charge for overdue/delay payments charges at rate as specified by the management. However, such overdue/ delay payments charge can not exceed at the rate of 2% per day. The details of Penal Interest or other charges, if any, will be mentioned in the sanctioned letter, KFS & loan agreement so that customers/borrowers can take informed decisions.
          </p>
        </Section>

        <Section title="9. Board Responsibility">
          <p>
            The Board shall approve and management take steps to implement this policy at all levels in the organization. The Board shall review this code of conduct annually or as when required due to regulatory changes to make sure, it remains updated with RBI or other law which are in force.
          </p>
          <p>
            The Company shall publish this Code on its official website for public access as required under RBI guidelines.
          </p>
        </Section>

        <Section title="10. Review">
          <p>
            This Code would be reviewed annually or whenever required, considering the various amendments to guidelines and regulations (if any), Business models and placed with the Board for approval. However, if there are any substantial changes in the guidelines by regulators, before the annual cycle, the Company will take necessary steps and review the Code.
          </p>
        </Section>

      </div>

      
    </>
  );
}