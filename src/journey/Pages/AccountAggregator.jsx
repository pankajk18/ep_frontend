import React, { useState } from 'react'
import LibraryAddCheckIcon from '@mui/icons-material/LibraryAddCheck';
import { Button, TextField } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import ekycBg from '../assets-crm/ekyc.jpg';
import PanToolIcon from '@mui/icons-material/PanTool';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { initiateAccountAggregator } from '../../Utils/api';


export default function AccountAggregator() {
    const [loader, setLoader] = useState(false);
    const [mobile, setMobile] = useState('');
    const customerDetails = useSelector((state) => state.customerJourneyDetails.customerDetails);

    const submit = async () => {

        setLoader(true);

        const param = {
            profileId: customerDetails?.profileId,
            mobile_number: mobile ,
            skipped_flag:''
        };

        try {
            const response = await initiateAccountAggregator(param);
            if (response?.data?.apiStatus==1) {
                setLoader(false);
                toast.success('Verification process started');
                window.location.href = response?.data?.data?.aggregator_url;

            }else{
                toast.error('Failed to start verification process');
            }
        } catch (error) {
            setLoader(false);
            toast.error('Failed to start verification process');
        }
    };

    return (
        <>
            <div
                className='box-height bg-ekyc'
                style={{ backgroundImage: `url(${ekycBg})` }}
            >
                <div className='wraper-right-box' style={{ paddingBottom: '19%' }}>
                    <div className='row'>
                        <h3 className='pl-5 fontstyle'>Account Aggregator</h3>

                        <h6 className='opacity-75' style={{ lineHeight: '30px' }}>
                            Account Aggregator is a secure and paperless way to verify your identity online while applying for a loan.
                        </h6>

                        <p
                            className='ms-text-secondary'
                            style={{ fontSize: '16px', fontWeight: '600', marginTop: '20px' }}
                        >
                            <PanToolIcon className='ms-text-secondary' />
                            &nbsp; Use your Bank-linked mobile number to complete the process
                        </p>

                        {/* ✅ Mobile Input */}
                        <TextField
                            label="Enter Mobile Number"
                            variant="outlined"
                            value={mobile}
                            onChange={(e) => setMobile(e.target.value)}
                            inputProps={{ maxLength: 10 }}
                            style={{ width: '310px', marginTop: '15px' }}
                        />

                        <h5 className='fw-medium fs-5 pt-5'>
                            How the Account Aggregator Process Works
                        </h5>

                        <div className='topic'>
                            <ul
                                style={{
                                    listStyle: 'none',
                                    paddingLeft: '0',
                                    marginLeft: '0',
                                    lineHeight: '40px',
                                }}
                            >
                                <li>
                                    <LibraryAddCheckIcon className='ms-text-primary' /> &nbsp;
                                    Enter your Mobile number
                                </li>
                                <li>
                                    <LibraryAddCheckIcon className='ms-text-primary' /> &nbsp;
                                    Verify using OTP or secure authentication
                                </li>
                                <li>
                                    <LibraryAddCheckIcon className='ms-text-primary' /> &nbsp;
                                    Details are verified instantly
                                </li>
                                <li>
                                    <LibraryAddCheckIcon className='ms-text-primary' /> &nbsp;
                                    Loan application moves forward for approval
                                </li>
                            </ul>
                        </div>

                        <Button
                            variant='contained'
                            className='mt-2 fw-bolder ms-bg-secondary'
                            size='large'
                            disabled={loader}
                            style={{ width: '310px' }}
                            onClick={submit}
                        >
                            {loader
                                ? 'Start Aggregator...'
                                : 'Start Account Aggregator '}{' '}
                            &nbsp; <SendIcon />
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
}