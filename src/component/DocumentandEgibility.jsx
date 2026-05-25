import React from 'react'

import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import EmojiFlagsIcon from '@mui/icons-material/EmojiFlags';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import CameraFrontIcon from '@mui/icons-material/CameraFront';
import PaymentsIcon from '@mui/icons-material/Payments';


export default function DocumentandEgibility() {
    return (
        <div className='row'>
            <div className='col-lg-6 col-md-6 eligibility-box pt-5'>
                <h3 className='ms-text-secondary'>Eligibility Criteria</h3>
                <div className='d-flex align-items-center'>
                    <div className='icon-box'> <EmojiFlagsIcon size={20} className='ms-text-primary'/></div> 
                    <p className='fs-6 fw-medium mb-0'>&nbsp; Indian Citizen</p>
                </div>
                <div className='d-flex align-items-center'>
                    <div className='icon-box'>< PeopleAltIcon size={20} className='ms-text-primary'  /></div>
                    <p className='fs-6 fw-medium mb-0'>&nbsp; Age Limit: 21 - 55 years</p>
                </div>
                <div className='d-flex align-items-center'>
                    <div className='icon-box'><CurrencyRupeeIcon size={20} className='ms-text-primary' /></div>
                    <p className='fs-6 fw-medium mb-0'>&nbsp; Monthly Income: minimum ₹30,000</p>
                </div>
                
            </div>
            <div className='col-lg-6 col-md-6 doc-box pt-5'>
                <h3 className='ms-text-secondary'>Documents Required</h3>
                <div className='d-flex align-items-center'>
                    <div className='icon-box'><CreditCardIcon size={20} className='ms-text-primary'  /></div>
                    <p className='fs-6 fw-medium mb-0'>&nbsp; PAN Card required.</p>
                </div>
                <div className='d-flex align-items-center'>
                    <div className='icon-box'><CameraFrontIcon size={20} className='ms-text-primary'  /></div>
                    <p className='fs-6 fw-medium mb-0'>&nbsp; Photograph (Selfie)</p>
                </div>
                <div className='d-flex align-items-center'>
                    <div className='icon-box'><PaymentsIcon size={20} className='ms-text-primary' /></div>
                    <p className='fs-6 fw-medium mb-0'>&nbsp; Address Proof (Aadhaar, Passport)</p>
                </div>
                
            </div>
        </div>
    )
}
