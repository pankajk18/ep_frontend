import React from 'react'

import keyImg from '../assets/keybenifit.png'
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import '../css/KeyBenefits.css'
export default function KeyBenefits() {
    const benefits = [
    "Instant loan approval within minutes",
    "Minimal documentation process",
    "100% online application",
    "Flexible repayment options",
    "Competitive interest rates",
    "Safe and secure process",
    "Available for salaried & self-employed individuals",
  ];
  return (
    <section className="py-3">
      <div className="container">
        <div className="key-benefits-wrapper p-4">
          <div className="row align-items-center">

            {/* Left Content */}
            <div className="col-lg-6 mb-4 mb-lg-0">
              <h4 className="fw-bold mb-4">Key Benefits:</h4>

              <ul className="list-unstyled benefit-list">
                {benefits.map((item, index) => (
                  <li key={index} className="d-flex align-items-start mb-2">
                    <CheckCircleIcon className="me-3 ms-text-secondary mt-1" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right Image */}
            <div className="col-lg-6 text-end">
              <img
                src={keyImg}
                alt="Loan Benefits"
                className='' style={{width:'100%'}}
              />
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}
