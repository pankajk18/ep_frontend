import React from 'react'
import dataimg from '../assets/blank-profile.webp'
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import CallIcon from '@mui/icons-material/Call';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import { useSelector } from 'react-redux';
// import featureImg from '../assets-crm/feature-01.png'
import featureImg1 from '../assets-crm/test.png'
import ProfileFeature from './ProfileFeature';



export default function ProfileNav() {

    const customerDetails = useSelector((state) => state.customerJourneyDetails.customerDetails);
    
    return (

        <div className='pt-4'>
            <div className='profile-pic'>
                <img src={customerDetails?.profile_pic || dataimg} alt='' style={{ width: '100px', height: '100px', borderRadius: '50%' }} />
            </div>
            <div className='base-info pt-5'>
                <h5 className='fw-semibold text-center'> {customerDetails?.full_name}</h5>
                <h6 className='pt-2'> <CallIcon style={{color:'#9a141a'}}/> {customerDetails?.mobile}</h6>
            </div>
            
            <div className='mail-info pt-2'>
                <h6 style={{fontSize:"15px"}}> <MailOutlineIcon style={{color:'#9a141a'}}/> &nbsp; {String(customerDetails?.personal_email)}</h6>
            </div>
            <ProfileFeature/>
            {/* <img src={featureImg} alt='Feature' style={{width:'100%'}}/> */}
        </div>
    )
}
