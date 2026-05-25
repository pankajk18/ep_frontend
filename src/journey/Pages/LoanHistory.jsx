import React, { use, useEffect, useState } from 'react'
import ProfileNav from '../component/ProfileNav'
import HistoryIcon from '@mui/icons-material/History';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { getLeadList } from '../../Utils/api';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import MobileNav from '../component/MobileNav';



export default function LoanHistory() {
    const [leadData, setLeadData] = useState([]);
    const customerDetails = useSelector((state) => state.customerJourneyDetails.customerDetails);
    const navigate = useNavigate();

    useEffect(() => {

        const fetchData = async () => {
            const params = {
                profileId: customerDetails?.profileId,
                pancard: customerDetails?.pancard
            };

            try {
                const response = await getLeadList(params);
                if (response?.data?.status === 1) {
                    const leadDetails = response?.data?.data;
                    setLeadData(leadDetails);


                } else {
                    console.warn('Lead history generation failed:', response);
                }
            } catch (error) {
                console.error('Error generating lead:', error);
            }
        };

        fetchData();

    }, [])

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



    const getStatusColor = (status) => {
        if (status === 'Pending') {
            return 'text-warning';
        }
        if (status === 'Submitted') {
            return 'text-success';
        }

        return 'text-danger';

    }

    const handleCardClick = (leadId) => {
        // Use navigate to redirect and pass state
        navigate("/journey/loan-detail", { state: { leadId } });
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
                                <h5 className='mb-0'> <HistoryIcon className='icon-color-primary fw-bold' style={{ color: '#9a141a' }} /> Loan History </h5>
                            </div>
                        </div>
                        <div className='table-responsive'>
                            <table className="table border">
                                <thead>
                                    <tr>

                                        <th scope="col">Lead ID</th>
                                        <th scope="col">Loan Amount</th>
                                        <th scope="col">Application Status</th>
                                        <th scope="col">Applied Date</th>
                                        <th scope="col">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        leadData.map((item, index) => {
                                            return (
                                                <tr key={item.id}>

                                                    <td>{item.lead_id || '-'}</td>
                                                    <td>{item.loan_recommended || '-'}</td>
                                                    <td className={getStatusColor(item.app_status)}>{item.app_status || '-'}</td>
                                                    <td>{formatDate(item.lead_entry_date) || '-'}</td>

                                                    <td
                                                        className='fw-medium'
                                                        style={{ color: '#1973be', cursor: 'pointer' }}
                                                        onClick={() => handleCardClick(item.lead_id)}
                                                    >
                                                        <VisibilityIcon className='icon-color-primary' style={{ color: '#9a141a' }} /> View
                                                    </td>

                                                </tr>
                                            )
                                        })
                                    }


                                </tbody>
                            </table>
                        </div>


                    </div>

                </div>
            </div>
            <MobileNav />

        </>

    )

}
