import React from 'react'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import { useSelector } from 'react-redux';

export default function ApplicationStatus() {
  const customerDetails = useSelector((state) => state.customerJourneyDetails.customerDetails);

  const formatDate = (dateString) => {
    if (dateString == null || dateString === undefined || dateString === '') {
      return '-';
    }
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is 0-based
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };


  return (
    // <div className='border p-2 rounded-3'>
    //   <div style={{ margin: '0px 12px' }}>
    //     <div className='row border '>
    //       <div className='col-lg-6 col-md-6 border-end p-2'>
    //         <p className='mb-0'> Status </p>
    //       </div>
    //       <div className='col-lg-6 col-md-6  p-2'>
    //         <p className='mb-0'>{customerDetails?.credit_manager_details?.applicationStatus || 'NA'}  </p>
    //       </div>
    //       <div className='col-lg-6 col-md-6 border-end p-2 border-top'>
    //         <p className='mb-0'>Repayment Amt. &nbsp;
    //           <CurrencyRupeeIcon className='icon-color-primary' style={{ fontSize: '20px', color:'#9a141a' }} />
    //         </p>
    //       </div>
    //       <div className='col-lg-6 col-md-6 p-2 border-top'>
    //         <p className='mb-0'>{customerDetails?.credit_manager_details?.repayAmount || 'NA'} </p>
    //       </div>
    //       <div className='col-lg-6 col-md-6 border-end p-2 border-top'>
    //         <p className='mb-0'>Repayment Date &nbsp;
    //           <CalendarMonthIcon className='icon-color-primary' style={{ fontSize: '20px',color:'#9a141a' }} />
    //         </p>
    //       </div>
    //       <div className='col-lg-6 col-md-6 p-2 border-top'>
    //         <p className='mb-0'>{formatDate(customerDetails?.credit_manager_details?.repayDate) || 'NA'} </p>
    //       </div>
    //     </div>
    //   </div>
    // </div>

    <div className='mobItem border p-2 rounded-3'>
      <div>Status</div>
      <div>{customerDetails?.applicationStatus || '-'}</div>

      <div>Repayment Amt. <CurrencyRupeeIcon className='icon-color-primary' style={{ fontSize: '20px', color: '#9a141a' }} /></div>
      <div>{customerDetails?.credit_manager_details?.repayAmount || '-'}</div>

      <div>Repayment Date <CalendarMonthIcon className='icon-color-primary' style={{ fontSize: '20px', color: '#9a141a' }} /></div>
      <div>{formatDate(customerDetails?.credit_manager_details?.repayDate) || '-'}</div>
    </div>

  )
}
