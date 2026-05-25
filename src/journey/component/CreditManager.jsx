import React from 'react'
import CallIcon from '@mui/icons-material/Call';
import MailIcon from '@mui/icons-material/Mail';
import { useSelector } from 'react-redux';

export default function CreditManager() {
    const customerDetails = useSelector((state) => state.customerJourneyDetails.customerDetails);

    return (

        <div className='mobItem border p-2 rounded-3'>
            <div>Name</div>
            <div>{customerDetails?.credit_manager_details?.managerName || '-'}</div>

            <div>Contact No. </div>
            <div>{customerDetails?.credit_manager_details?.managerMobile || '-'}</div>

            <div>Mail ID. </div>
            <div>{customerDetails?.credit_manager_details?.managerEmail != null ? String(customerDetails?.credit_manager_details?.managerEmail).toLowerCase() : '-'}</div>


        </div>
    )

}
