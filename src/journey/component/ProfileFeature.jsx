import React from 'react'
import LibraryAddCheckIcon from '@mui/icons-material/LibraryAddCheck';
import MailOutlineOutlinedIcon from '@mui/icons-material/MailOutlineOutlined';
import CallOutlinedIcon from '@mui/icons-material/CallOutlined';

export default function ProfileFeature() {
  return (
    <div className='navFeature'>
      <h6 className='fw-semibold pt-4'>Empower Your Business with the Right Funding!</h6>
      <ul>
        <li className='fw-medium'> <LibraryAddCheckIcon style={{ color: '#9a141a' }} /> Quick 10-minute disbursal</li>
        <li className='fw-medium'> <LibraryAddCheckIcon style={{ color: '#9a141a' }} /> No CIBIL score required</li>
        {/* <li className='fw-medium'> <LibraryAddCheckIcon style={{color: '#9a141a'}}/> Collateral-free loans</li> */}
        <li className='fw-medium'> <LibraryAddCheckIcon style={{ color: '#9a141a' }} /> Lightning-fast approval</li>
        <li>
          <MailOutlineOutlinedIcon style={{ color: '#9a141a' }} /> &nbsp;&nbsp;
          <a className='fw-semibold text-black' href='mailto:info@emergencypaisa.com' style={{ textDecoration: 'none' }}>info@emergencypaisa.com</a>
        </li>
        <li className='pt-2 fw-semibold fs-4'>
          <CallOutlinedIcon style={{ color: '#9a141a' }} /> &nbsp;&nbsp;  +91: 9821388824
        </li>
      </ul>

     

    </div>
  )
}
