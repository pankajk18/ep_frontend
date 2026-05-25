import React, { useState } from "react";
import "../css/FairPracticesCode.css";
import privacyImg from '../assets/privacyImg.png'
import { Link } from "react-router-dom";

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

export default function FairPracticesCode() {
  return (

    <>
      <div className='ms-hero-banner-sec' style={{ paddingTop: '80px' }}>
                <div className="container">
                    <div className='row  align-items-center'>
                        <div className='col-lg-6'>
                             <div className='ms-banner-heading'>  
                                 <span className='ms-takeaways'> Information Kept Confidential</span>                             
                                <h1 className='fs-1 pt-3 fw-semibold'>Fair Practices Code</h1>
                                <p className='fw-lighter' style={{ fontSize: '20px' }}>Suburban Finance Private Limited</p>
                            </div>
                        </div>
                        <div className='col-lg-6'>
                            <img src={privacyImg} alt='' className='img-fluid' />
                        </div>
                    </div>
                </div>
            </div>
      <div className="fpc-container">


        {/* Introduction */}
        <Section title="1. Introduction">
          <p>
            Suburban Finance & Investment Private Limited (“Emergency Paisa” or “the Company”) is a NBFC registered with the Reserve Bank of India (“RBI”) is presently engaged in the business of providing personal loan to the customers throughout India.
Pursuant to Reserve Bank of India (RBI) Circular DNBS.CC.PD.NO.266/03.10.01//2011-12 dated 28th Day of September 2006, issued to Non-Banking Financial Companies (NBFCs), the Board of Directors of the company have adopted a Fair Practices Code.
Further, RBI vide Circular DNBS.CC.PD.No.266/03.10.01/2011-12 dated 26th Day of March 2012, Master Circular RBI/2013-14/42 DNBS (PD) CC No.340 / 03.10.042 / 2013-14 dated July 1, 2013 , RBI/2015-16/16 DNBR (PD) CC.No.054/03.10.119/2015-16 dated July 1, 2015, RBI/2024-25/30 DoS.CO.PPG.SEC.1/11.01.005/2024-25 dated April 29, 2024 and RBI/DOR/2025-26/362, DOR.MCS.REC.No.281/01-01-039/2025-26 dated November 28, 2025 had amended guidelines on Fair Practices Code for NBFCs and accordingly suitable modifications are made hereunder in the Code to comply with the aforesaid guidelines.
The Board of Directors of the company have adopted a Fair Practices Code. In accordance with the aforesaid provisions, the Company has framed and adopted this Fair Practices Code (“FPC” or “this Code”) which sets the fair practice standards while dealing with its customers.
The Company has adopted this Fair Practices Code for its lending operations which intends to provide assurance to all the borrowers of the Company's commitment to fair dealing, and transparency in its business transactions.



          </p>
          <p>This Code shall apply to all stages of the lending process including:</p>
          <ul>
            <li>Loan sourcing through digital platforms or otherwise</li>
            <li>Loan appraisal and sanction</li>
            <li>Disbursement</li>
            <li>Servicing and recovery</li>
            <li>Customer grievance redressal</li>
          </ul>
        </Section>

        <Section title="2. Objectives of the Policy">
          <p>The objectives of this Fair Practices Code are:</p>
          <ul>
            <li>To promote fair and transparent practices in lending operations.</li>
            <li>To ensure customer protection in digital lending.</li>
            <li>To maintain high standards of corporate governance.</li>
            <li>To provide clear disclosure of loan terms and charges.</li>
            <li>To establish an effective customer grievance redressal mechanism.</li>
          </ul>
        </Section>

        {/* 3 */}
        <Section title="3. Applicability">
          <p>This policy applies to:</p>
          <ul>
            <li>All personal loans offered through digital platforms</li>
            <li>Lending through mobile apps, websites, or other digital interfaces</li>
            <li>Lending through Lending Service Providers (LSPs) acting on behalf of the Company.</li>
            <li>All employees, agents, and digital partners must comply with this policy.</li>
          </ul>
        </Section>

        {/* 4 */}
        <Section title="4. Loan Application Process">
          <p>
            All loan applications will include necessary information affecting borrower interest so that she or he can take informed & comparative decisions.
          </p>
          <p>Customers shall be informed about:</p>
          <ul>
            <li>Interest rate</li>
            <li>Processing fees</li>
            <li>Annualised percentage rate (APR)</li>
            <li>Other applicable charges. If any,</li>
          </ul>
          <p>An acknowledgment of loan application shall be provided through digital confirmation.</p>
        </Section>
         <Section title="5. Loan Appraisal and Sanction">
          <p>The Company shall conduct proper credit assessment before sanctioning loans and use fair and objective criteria for credit evaluation. Avoid discrimination based on Gender, Religion, Caste, Region etc., while processing loan applications.</p>

          <p>Upon approval & before disbursement of loan, borrower shall receive a Sanction Letter / Key Fact Statement (KFS) containing:</p>
          <ul>
            <li>Loan amount</li>
            <li>Interest rate</li>
            <li>Tenure</li>
            <li>Repayment schedule</li>
            <li>All fees and charges</li>
          </ul>
        </Section>

        {/* 6 */}
        <Section title="6. Key Facts Statement (KFS)">
          <p>Before execution of the loan agreement, the borrower shall be provided with a Key Fact Statement containing:</p>
          <ul>
            <li>APR (Annual Percentage Rate)</li>
            <li>Processing fee</li>
            <li>Penal charges</li>
            <li>Foreclosure charges</li>
            <li>Cooling-off period</li>
            <li>Recovery mechanism</li>
          </ul>
          <p>No hidden charges shall be imposed beyond those disclosed in the KFS.</p>
        </Section>


 <Section title="7. Digital Lending Compliance">
          <p>For digital loans, the Company shall ensure:</p>
          <ul>
            <li>Direct disbursement of loan amount to the borrower’s bank account.</li>
            <li>No pass-through accounts except those permitted by RBI.</li>
            <li>Loan servicing and repayments shall be routed directly between borrower and the Company.</li>
          </ul>

          <p>Digital lending applications used by the Company shall:</p>
          <ul>
            <li>Clearly display Company name</li>
            <li>Provide customer support details</li>
            <li>Display grievance officer details.</li>
          </ul>
        </Section>

        {/* 8 */}
        <Section title="8. Data Privacy and Security">
          <p>The Company shall comply with applicable data protection requirements. Digital platforms shall: collect only necessary data and obtain explicit borrower consent whenever required.</p>

          <p>The Company shall not access:</p>
          <ul>
            <li>Contact lists</li>
            <li>Photos</li>
            <li>Personal files</li>
          </ul>

          <p>unless essential and consented. Customer data shall not be shared with third parties without consent except where required by law.</p>
        </Section>

        {/* 9 */}
        <Section title="9. Interest Rates and Charges">
          <p>The Company shall adopt a Board-approved Interest Rate Policy. Interest rates shall be determined based on:</p>
          <ul>
            <li>Cost of funds</li>
            <li>Credit risk</li>
            <li>Operational costs</li>
            <li>Market conditions</li>
          </ul>

          <p>All charges shall be:</p>
          <ul>
            <li>Transparent</li>
            <li>Disclosed upfront</li>
            <li>Included in the Key Fact Statement</li>
          </ul>
        </Section>

        {/* 10 */}
        <Section title="10. Loan Disbursement">
          <p>Loan disbursement shall occur only after:</p>
          <ul>
            <li>Borrower acceptance of loan terms</li>
            <li>Execution of loan agreement</li>
            <li>Completion of KYC requirements</li>
          </ul>

          <p>Borrowers shall receive:</p>
          <ul>
            <li>Loan agreement copy along with sanction letter & KFS</li>
            <li>Repayment schedule</li>
            <li>Digital confirmation of disbursement.</li>
          </ul>

          <p>The Company would give notice to the borrower in the language as understood by the borrower of any change in the terms and conditions including disbursement schedule, interest rates, service charges, prepayment charges etc. The Company would also ensure that changes in interest rates and charges are effected only prospectively.</p>
        </Section>

        {/* 11 */}
        <Section title="11. Recovery Practices">
          <p>The Company shall follow ethical recovery practices.</p>

          <p>Recovery agents must:</p>
          <ul>
            <li>Maintain professional conduct at all time while dealing with the borrowers</li>
            <li>Respect borrower dignity</li>
            <li>Avoid harassment or intimidation.</li>
            <li>Recovery communications shall be limited to reasonable hours.</li>
          </ul>

          <p>Apart from the above, recovery process shall be as aligned with standards as laid down in the Code of Conduct for Recovery Agents as approved by the Board of Directors.</p>
        </Section>


        {/* Grievance Redressal */}
        <Section title="12. Customer Grievance Redressal Mechanism">
          <li>The Board of Directors of the Company has laid down the appropriate grievance redressal mechanism within the organization. The mechanism ensures that all disputes arising out of the decisions of lending institutions' functionaries are heard and disposed of at least at the next higher level.
          The Company’s grievance redressal mechanism shall operate in following manner:
          </li>
          <table className="fpc-table">
            <thead>
              <tr><th>Level</th><th>Contact Details</th><th>Description</th></tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>First Escalation - Customer Care</strong></td>
                <td>
                  Phone: +91 9821388824<br />
                  Email: info@emergencypaisa.com
                </td>
                <td>If the issue is not resolved within 15 working days of raising the issue, the customer shall raise the issue with the Grievance Officer </td>
              </tr>
              <tr>
                <td><strong>Second Escalation – Grievance Officer/Nodal Officer</strong></td>
                <td>
                  Name: Sunny Sharma<br />
                  Phone: +91 7678378898<br />
                  Email: nodal.officer@emergencypaisa.com
                </td>
                <td>If the issue is not resolved within 10 working days of raising the issue, the customer shall raise the such issue with the Nodal Officer.</td>

              </tr>
              <tr>
                <td><strong>Final Escalation – Principal Nodal Officer</strong></td>
                <td>
                  Name: Pankaj Dhall<br />
                  Phone: +91 7675378901<br />
                  Email: pno@emergencypaisa.com
                </td>
                <td>Final escalation level for unresolved grievances.</td>
              </tr>
            </tbody>
          </table>
          <li>If the Complaints of borrowers shall be resolved within 30 working days, the borrower may escalate the matter to the Reserve Bank of India – Complaint Management System (CMS).</li>


        </Section>

        <Section title="13. Lending Service Providers (LSPs)">
          Wherever the Company engages digital lending partners / LSPs, it shall ensure:
          <ul>
            <li>Full responsibility for their actions</li>
            <li>Proper due diligence before onboarding</li>
            <li>Compliance with RBI digital lending norms.</li>
          </ul>
          The Company shall disclose on its website:
          <ul>
            <li>List of LSPs</li>
            <li>Roles and responsibilities.</li>
          </ul>
        </Section>

        <Section title="14. Review of Policy">
          This Fair Practices Code shall be:
          <ul>
            <li>Approved by the Board of Directors</li>
            <li>Reviewed periodically or whenever required due to regulatory changes.</li>
          </ul>
          The Company shall publish this Fair Practices Code on its official website for public access as required under RBI guidelines.

        </Section>

      </div>
    </>
  );
}
