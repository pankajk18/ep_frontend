import React from 'react'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import ShuffleOnIcon from '@mui/icons-material/ShuffleOn';
import approveIcon from '../assets/quick-approve.png'
import mindocumentation from '../assets/minimum-documentation.png'
import collateral from '../assets/nocollateral.png'
import flexUse from '../assets/flexible-usage.png'
import digital from '../assets/digital.png'
import flexTimeTenure from '../assets/time-is-money.png'
import pay from '../assets/paylater.png'
import discount from '../assets/discount.png'

const benefits = [
    {
        icon: approveIcon,
        name: "Quick Approval"
    },
    {
        icon: mindocumentation,
        name: "Minimum Documentation"
    },
    {
        icon: collateral,
        name: "No Collateral Needed"
    },
    {
        icon: flexUse,
        name: "Flexible Usage"
    },
    {
        icon: digital,
        name: "Digital & Convenient"
    },
    {
        icon: flexTimeTenure,
        name: "Flexible Loan Amounts & Tenure"
    },

    {
        icon: pay,
        name: "Builds Credit History"
    },
    {
        icon: discount,
        name: "Pre-Approved Offers"
    }
];
export default function Usp() {
    return (
        <>
            <section className="py-5" style={{ backgroundColor: "#e0ebf4" }}>
                <div className="container py-3">

                    {/* Heading */}
                    <div className="text-center mb-5">
                        <h4 className="fw-bold mb-3 fs-3"> <span className='ms-text-secondary'>Benefits</span> of an Instant Personal Loan </h4>
                        <p className="text-muted mx-auto fs-6" style={{ maxWidth: "850px" }}>
                            An Instant Personal Loan gives you fast access to funds whenever you
                            need them - often within minutes - without the lengthy processes
                            associated with traditional banking loans. It’s a simple, flexible,
                            and digital way to bridge financial gaps when time matters most.
                        </p>
                    </div>

                    {/* Benefits Grid */}
                    <div className="row g-4">
                        {benefits.map((item, index) => (
                            <div className="col-md-6 col-lg-3 " key={index}>
                                <div className="benefit-card d-flex align-items-center p-3 rounded-3 gap-3 h-100" style={{ background: "#1973be", height: '70px' }}>
                                    <div style={{width:'60px'}}>
                                        <img src={item.icon} alt={item.name} style={{width:'100%'}} />
                                    </div>
                                    <div>
                                        <span className="fw-semibold text-white">{item.name}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
            </section>
        </>
    )
}
