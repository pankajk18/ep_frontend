import React, { useEffect, useState } from 'react'
import ProfileNav from '../component/ProfileNav'
import HistoryIcon from '@mui/icons-material/History';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import MoreTimeIcon from '@mui/icons-material/MoreTime';
import CallIcon from '@mui/icons-material/Call';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import MailIcon from '@mui/icons-material/Mail';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import { Button } from '@mui/material'
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import { Link, useLocation } from 'react-router-dom';
import { getLeadHistory } from '../../Utils/api';
import MobileNav from '../component/MobileNav';
import DownloadIcon from '@mui/icons-material/Download';

export default function LoanDetail() {

    const location = useLocation();
    const { leadId } = location.state || {};
    const [leadData, setLeadData] = useState([]);
    


    useEffect(() => {

        const fetchData = async () => {
            const params = {
                leadId: leadId,
            };

            try {
                const response = await getLeadHistory(params);
                if (response?.data?.status === 1) {
                    const leadDetails = response?.data?.data;
                    setLeadData(leadDetails[0]);

                } else {
                    console.warn('Lead detail generation failed:', response);
                }
            } catch (error) {
                console.error('Error generating lead detail:', error);
            }
        };

        fetchData();

    }, [])

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        if (typeof date !== 'object' || isNaN(date.getTime())) {
            return '-';
        }
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is 0-based
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
    };

    return (
        <>
            <div className='container mt-5' style={{ display: 'flex' }}>
                <div className='left-box pt-5'>
                    <ProfileNav />
                </div>
                <div className='right-box'>
                    <div className='panel'>
                        <div className='top-panel'>
                            <div className='d-flex justify-content-start p-1'>
                                <h5 className='mb-0 fw-semibold'> <HistoryIcon style={{ fontSize: '35px', color: '#9a141a' }} /> Loan Details </h5>
                            </div>
                        </div>
                        <div className='border p-2 mob-none' style={{ marginBottom: '70px' }}>
                            <div style={{ margin: '0px 12px' }}>
                                <div className='row bg-light border '>
                                    <div className='col-lg-3 col-md-3  border-end p-2'>
                                        <p className='mb-0'> Loan Number </p>
                                    </div>
                                    <div className='col-lg-3 col-md-3  border-end p-2'>
                                        <p className='mb-0'>{leadData?.loan_no || '-'}</p>
                                    </div>
                                    <div className='col-lg-2 col-md-2 border-end p-2'>
                                        <p className='mb-0'>Customer Name </p>
                                    </div>
                                    <div className='col-lg-4 col-md-4 p-2'>
                                        <p className='mb-0'> {leadData?.first_name || '-'}</p>
                                    </div>
                                </div>
                                <div className='row bg-light border border-top-0  '>
                                    <div className='col-lg-3 col-md-3 border-end p-2'>
                                        <p className='mb-0'>Monthly Salary </p>
                                    </div>
                                    <div className='col-lg-3 col-md-3 border-end p-2'>
                                        <p className='mb-0'> <CurrencyRupeeIcon style={{ fontSize: '25px', color: '#9a141a' }} /> <span>{leadData?.monthly_salary_amount || '-'}</span></p></div>
                                    <div className='col-lg-2 col-md-2 border-end p-2'>
                                        <p className='mb-0 '> Loan Amount </p>
                                    </div>
                                    <div className='col-lg-4 col-md-4 p-2'>
                                        <p className='mb-0'><CurrencyRupeeIcon style={{ fontSize: '25px', color: '#9a141a' }} /> <span>{leadData?.loan_recommended || '-'}</span></p>
                                    </div>
                                </div>
                                <div className='row bg-light border border-top-0 '>
                                    <div className='col-lg-3 col-md-3 border-end p-2'>
                                        <p className='mb-0'>Tenure</p>
                                    </div>
                                    <div className='col-lg-3 col-md-3 border-end p-2'>
                                        <p className='mb-0'> <AccessTimeFilledIcon style={{ fontSize: '25px', color: '#9a141a' }} /> <span>{leadData?.tenure || '-'}</span> Day</p>
                                    </div>
                                    <div className='col-lg-2 col-md-2 border-end p-2'>
                                        <p className='mb-0'> Purpose </p>
                                    </div>
                                    <div className='col-lg-4 col-md-4 p-2'>
                                        <p className='mb-0'>{leadData?.purpose || '-'}</p>
                                    </div>

                                </div>
                                <div className='row bg-light border border-top-0  '>
                                    <div className='col-lg-3 col-md-3 border-end p-2'>
                                        <p className='mb-0'>Mobile No. </p>
                                    </div>
                                    <div className='col-lg-3 col-md-3 border-end p-2'>
                                        <p className='mb-0'> <CallIcon style={{ fontSize: '25px', color: '#9a141a' }} /> <span>{leadData?.mobile || '-'}</span> </p></div>
                                    {/* <div className='col-lg-2 border-end p-2'>
                                    <p className='mb-0'> Mail Id </p>
                                </div>
                                <div className='col-lg-4 p-2'>
                                    <p className='mb-0'><MailIcon className='icon-color-primary' style={{ fontSize: '20px' }} /> <span>manish@salaryontime.com</span></p>
                                </div> */}

                                    <div className='col-lg-2 col-md-2 border-end p-2'>
                                        <p className='mb-0'>App Status </p>
                                    </div>
                                    <div className='col-lg-4 col-md-4 border-end p-2'>
                                        <p className='mb-0'> {leadData?.app_status || '-'}  </p>
                                    </div>
                                </div>

                                <div className='row bg-light border border-top-0  '>
                                    <div className='col-lg-3 col-md-3 border-end p-2'>
                                        <p className='mb-0'>Current City </p>
                                    </div>
                                    <div className='col-lg-3 col-md-3 border-end p-2'>
                                        <p className='mb-0'>{leadData?.city_name || '-'}</p></div>
                                    <div className='col-lg-2 col-md-2 border-end p-2'>
                                        <p className='mb-0'> Current State </p>
                                    </div>
                                    <div className='col-lg-4 col-md-4 p-2'>
                                        <p className='mb-0'> {leadData?.state_name || '-'}</p>
                                    </div>
                                </div>
                                <div className='row bg-light border border-top-0  '>
                                    <div className='col-lg-3 col-md-3 border-end p-2'>
                                        <p className='mb-0'>Loan Apply Date </p>
                                    </div>
                                    <div className='col-lg-3 col-md-3 border-end p-2'>
                                        <p className='mb-0'> <CalendarMonthIcon style={{ fontSize: '25px', color: '#9a141a' }} /> <span>{formatDate(leadData?.lead_entry_date || '-')}</span> </p>
                                    </div>
                                    <div className='col-lg-2 col-md-2 border-end p-2'>
                                        <p className='mb-0'> Loan Date </p>
                                    </div>
                                    <div className='col-lg-4 col-md-4 p-2'>
                                        <p className='mb-0'><CalendarMonthIcon style={{ fontSize: '25px', color: '#9a141a' }} /> <span>{formatDate(leadData?.disbursal_date || '-')}</span> </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* mobile view start */}
                        <div className='desktop-none'>
                            <table className='table border'>
                                <tbody>
                                    <tr>
                                        <td className='border-end'><p className='mb-0'>Loan Number </p></td>
                                        <td><p className='mb-0'>{leadData?.loan_no || '-'}</p></td>
                                    </tr>
                                    <tr>
                                        <td className='border-end'><p className='mb-0'>Customer Name </p></td>
                                        <td><p className='mb-0'>{leadData?.first_name || '-'}</p></td>
                                    </tr>
                                    <tr>
                                        <td className='border-end'><p className='mb-0'>Monthly Salary </p></td>
                                        <td><p className='mb-0'>{leadData?.monthly_salary_amount || '-'}</p></td>
                                    </tr>
                                    <tr>
                                        <td className='border-end'><p className='mb-0'>Loan Amount </p></td>
                                        <td><p className='mb-0'>{leadData?.loan_recommended || '-'}</p></td>
                                    </tr>
                                    <tr>
                                        <td className='border-end'><p className='mb-0'>Tenure </p></td>
                                        <td><p className='mb-0'>{leadData?.tenure || '-'}</p></td>
                                    </tr>
                                    <tr>
                                        <td className='border-end'><p className='mb-0'>Purpose </p></td>
                                        <td><p className='mb-0'>{leadData?.purpose || '-'}</p></td>
                                    </tr>
                                    <tr>
                                        <td className='border-end'><p className='mb-0'>Mobile No. </p></td>
                                        <td><p className='mb-0'>{leadData?.mobile || '-'}</p></td>
                                    </tr>
                                    <tr>
                                        <td className='border-end'><p className='mb-0'>App Status </p></td>
                                        <td><p className='mb-0'>{leadData?.app_status || '-'}</p></td>
                                    </tr>
                                    <tr>
                                        <td className='border-end'><p className='mb-0'>City </p></td>
                                        <td><p className='mb-0'>{leadData?.city_name || '-'}</p></td>
                                    </tr>
                                    <tr>
                                        <td className='border-end'><p className='mb-0'> State </p></td>
                                        <td><p className='mb-0'>{leadData?.state_name || '-'}</p></td>
                                    </tr>
                                    <tr>
                                        <td className='border-end'><p className='mb-0'> Apply Date </p></td>
                                        <td><p className='mb-0'>{formatDate(leadData?.lead_entry_date || '-')}</p></td>
                                    </tr>
                                    <tr>
                                        <td className='border-end'><p className='mb-0'> Loan Date </p></td>
                                        <td><p className='mb-0'>{formatDate(leadData?.disbursal_date || '-')}</p></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        {/* mobile view end */}


                        {/* <div className='d-flex justify-content-end p-2 mt-3'>
                        <Link to='/'>
                            <Button
                                variant='contained'
                                size='medium'
                                style={{ background: '#1EBDDA', padding: '10px 14px', }}

                            > <CloudDownloadIcon /> &nbsp; Download NOC Letter
                            </Button>
                        </Link>

                    </div> */}

                        <div className='ms-loan-history-btn'>
                            {leadData?.sanction_letter && (
                                <Button variant="outlined" className='icon-color-primary mt-4 fs-5' style={{ background: '#9a141a', color: '#fff', padding: '10px 15px' }} startIcon={<DownloadIcon />}>
                                    <Link to={leadData?.sanction_letter} target='_blank' className='text-decoration-none icon-color-primary text-white ' style={{ fontSize: "14px" }} > Download Sanction Letter</Link>
                                </Button>
                            )}

                            {leadData?.disbursal_letter && (
                                <Button variant="outlined" className='icon-color-primary mt-4 fs-5' style={{ background: '#9a141a', color: '#fff', padding: '10px 15px' }} startIcon={<DownloadIcon />}>
                                    <Link to={leadData?.disbursal_letter} target='_blank' className='text-decoration-none icon-color-primary text-white ' style={{ fontSize: "14px" }} > Download Disbursal Letter</Link>
                                </Button>
                            )}

                            {(leadData?.noc_closing_letter || leadData?.noc_settlement_letter) && (() => {
                                const nocLetter = leadData.noc_closing_letter || leadData.noc_settlement_letter;
                                return (
                                    <Button
                                        variant="outlined"
                                        className="icon-color-primary mt-4 fs-5"
                                        style={{ background: '#9a141a', color: '#fff', padding: '10px 15px' }}
                                        startIcon={<DownloadIcon />}
                                    >
                                        <Link
                                            to={nocLetter}
                                            target="_blank"
                                            className="text-decoration-none icon-color-primary text-white "
                                            style={{ fontSize: "14px" }}
                                        >
                                            Download NOC Letter
                                        </Link>
                                    </Button>
                                );
                            })()}
                        </div>




                    </div>

                </div>

            </div>
            <MobileNav />
        </>
    )
}
