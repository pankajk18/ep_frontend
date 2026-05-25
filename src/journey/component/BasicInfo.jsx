import React from 'react';
import CallIcon from '@mui/icons-material/Call';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import MailIcon from '@mui/icons-material/Mail';
import { useSelector } from 'react-redux';

export default function BasicInfo() {
    const customerDetails = useSelector((state) => state.customerJourneyDetails.customerDetails);


    const formattedDOB = customerDetails?.dob
        ? (() => {
            const date = new Date(customerDetails.dob);
            const day = String(date.getDate()).padStart(2, '0');
            const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
            const year = date.getFullYear();
            return `${day}-${month}-${year}`;
        })()
        : '';



    const getMaritalStatus = (id) => {
        const numId = Number(id);
        switch (numId) {
            case 1:
                return 'Single';
            case 2:
                return 'Married';
            case 3:
                return 'Divorced';
            default:
                return '-';
        }
    };

    return (
        <>
        {/* desktop view start */}
        <div className='border p-2 rounded-3 mob-none'>
            <div style={{ margin: '0px 12px' }}>
                <div className='row bg-light border '>
                    <div className='col-lg-2 col-md-2 border-end p-2'>
                        <p className='mb-0'> Name </p>
                    </div>
                    <div className='col-lg-4 col-md-4 border-end p-2'>
                        <p className='mb-0'>{customerDetails?.full_name || '-'}</p>
                    </div>
                    <div className='col-lg-2 col-md-2 border-end p-2'>
                        <p className='mb-0'>Phone No. &nbsp;
                            <CallIcon style={{ fontSize: '20px', color: '#9a141a' }} />
                        </p>
                    </div>
                    <div className='col-lg-4 col-md-4 p-2'>
                        <p className='mb-0'> {customerDetails?.mobile || '-'}</p>
                    </div>
                </div>

                <div className='row bg-light border border-top-0'>
                    <div className='col-lg-2  col-md-2 border-end p-2'>
                        <p className='mb-0'>Personal ID &nbsp;&nbsp;&nbsp;
                            <MailIcon style={{ fontSize: '20px', color: '#9a141a' }} />
                        </p>
                    </div>
                    <div className='col-lg-4 col-md-4 p-2 border-end'>
                        <p className='mb-0'>{String(customerDetails?.personal_email).toLowerCase() || '-'}</p>
                    </div>

                    <div className='col-lg-2 col-md-2 border-end p-2'>
                        <p className='mb-0'>Date of Birth &nbsp;
                            <CalendarMonthIcon style={{ fontSize: '20px', color: '#9a141a' }} />
                        </p>
                    </div>
                    <div className='col-lg-4 col-md-4 p-2'>
                        <p className='mb-0'>{formattedDOB || '-'}</p>
                    </div>
                </div>


               
                <div className='row bg-light border border-top-0'>
                    <div className='col-lg-2 col-md-2 border-end p-2'>
                        <p className='mb-0'>PAN </p>
                    </div>
                    <div className='col-lg-4 col-md-4 border-end p-2'>
                        <p className='mb-0'>{customerDetails?.pancard || '-'}</p>
                    </div>
                    <div className='col-lg-2 col-md-2 border-end p-2'>
                        <p className='mb-0'>Official Mail &nbsp;&nbsp;&nbsp;
                            <MailIcon style={{ fontSize: '20px', color: '#9a141a',  }} />
                        </p>
                    </div>
                    <div className='col-lg-4 col-md-4 p-2'>
                        <p className='mb-0' >
                            {String(customerDetails?.office_email).toLowerCase() || '-'}
                        </p>
                    </div>

                </div>

                <div className='row bg-light border border-top-0'>
                    <div className='col-lg-2 col-md-2 border-end p-2'>
                        <p className='mb-0'>Marital Status</p>
                    </div>
                    <div className='col-lg-4 col-md-4 border-end p-2'>
                        <p className='mb-0'>{getMaritalStatus(customerDetails?.marital_status_id) || '-'}</p>
                    </div>
                    <div className='col-lg-2 col-md-2 border-end p-2'>
                        <p className='mb-0'>Spouse Name</p>
                    </div>
                    <div className='col-lg-4 col-md-4  p-2'>
                        <p className='mb-0'>{customerDetails?.spouse_name || '-'}</p>
                    </div>
                </div>

            </div>
        </div>
        {/* end */}


        {/* mobile view start */}
            <div className='desktop-none'>
                <table className='table border'>
                    <tbody>
                        <tr>
                            <td className='border-end'><p className='mb-0'> Name </p></td>
                            <td ><p className='mb-0'>{customerDetails?.full_name || '-'}</p></td>
                        </tr>
                        <tr>
                            <td className='border-end'><p className='mb-0'> Phone No. </p></td>
                            <td ><p className='mb-0'>{customerDetails?.mobile || '-'}</p></td>
                        </tr>
                         <tr>
                            <td className='border-end'><p className='mb-0'> Personal ID </p></td>
                            <td ><p className='mb-0'>{customerDetails?.personal_email || '-'}</p></td>
                        </tr>
                        <tr>
                            <td className='border-end'><p className='mb-0'> DOB</p></td>
                            <td ><p className='mb-0'>{formattedDOB || '-'}</p></td>
                        </tr>

                        <tr>
                            <td className='border-end'><p className='mb-0'>  PAN</p></td>
                            <td ><p className='mb-0'>{customerDetails?.pancard || '-'}</p></td>
                        </tr>

                        <tr>
                            <td className='border-end'><p className='mb-0'>  Official Mail</p></td>
                            <td ><p className='mb-0' style={{textTransform:'lowercase'}}>{customerDetails?.office_email || '-'}</p></td>
                        </tr>

                        <tr>
                            <td className='border-end'><p className='mb-0'> Marital Status</p></td>
                            <td ><p className='mb-0'>{getMaritalStatus(customerDetails?.marital_status_id) || '-'}</p></td>
                        </tr>

                         <tr>
                            <td className='border-end'><p className='mb-0'> Spouse Name</p></td>
                            <td ><p className='mb-0'>{customerDetails?.spouse_name || '-'}</p></td>
                        </tr>


                       
                    </tbody>
                </table>
              
            </div>
        {/* end */}
        </>
    );
}
