import React, { useState } from 'react';
import { Button, TextField } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import ekycBg from '../assets-crm/ekyc.jpg';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { getAggregatorResponse, initiateAccountAggregator } from '../../Utils/api';
import { useNavigate, useSearchParams } from 'react-router-dom';

export default function AggregatorVerify() {
    const [loader, setLoader] = useState(false);
    const [searchParams] = useSearchParams();
    const leadId = searchParams.get('refstr');

    const [showButton, setShowButton] = useState(false);
    const [salarySlip, setSalarySlip] = useState(null);

    const navigate = useNavigate();
    const customerDetails = useSelector(
        (state) => state?.customerJourneyDetails?.customerDetails
    );

    // 🔁 Re-initiate AA
    const resubmit = async () => {
        setLoader(true);

        const param = {
            profileId: customerDetails?.profileId,
            mobile_number: customerDetails?.mobile,
            skipped_flag: 1,
        };

        try {
            const response = await initiateAccountAggregator(param);
            if (response?.data?.apiStatus == 1) {
                toast.success('Verification process started');
                navigate('/auto-journey');
            } else {
                toast.error('Failed to start verification process');
            }
        } catch (error) {
            toast.error('Failed to start verification process');
        } finally {
            setLoader(false);
        }
    };

    // ✅ Verify AA
    const submit = async () => {
        setLoader(true);

        const param = {
            lead_id: leadId,
        };

        try {
            const response = await getAggregatorResponse(param);

            if (response?.data?.Status == 1) {
                navigate('/auto-journey');
            } else {
                setShowButton(true); 
                toast.error('Failed to start verification process');
            }
        } catch (error) {
            toast.error('Failed to start verification process');
        } finally {
            setLoader(false);
        }
    };

    const handleReInitiate = () => {
        navigate('/auto-journey');
    };

   

    return (
        <>
            <div
                className="box-height bg-ekyc"
                style={{ backgroundImage: `url(${ekycBg})` }}
            >
                <div
                    className="wraper-right-box"
                    style={{ paddingBottom: '19%' }}
                >
                    <div className="row">
                        <h3 className="pl-5 fontstyle">
                            Verify Account Aggregator
                        </h3>

                        <h6
                            className="opacity-75"
                            style={{ lineHeight: '30px' }}
                        >
                            Click the{' '}
                            <strong>
                                Verify with Account Aggregator
                            </strong>{' '}
                            button below to validate your Account Aggregator
                            number securely.
                        </h6>

                        {showButton ? (
                            <>
                                {/* Re-initiate */}
                                <Button
                                    variant="contained"
                                    className="mt-2 fw-bolder ms-bg-secondary"
                                    size="large"
                                    disabled={loader}
                                    style={{ width: '310px' }}
                                    onClick={handleReInitiate}
                                >
                                    Re-Initiate Account Aggregator{' '}
                                    <SendIcon />
                                </Button>

                                &nbsp;&nbsp;&nbsp;&nbsp;

                                {/* ⏭ Skip */}
                                <Button
                                    variant="contained"
                                    className="mt-2 fw-bolder ms-bg-secondary"
                                    size="large"
                                    disabled={loader}
                                    style={{ width: '310px' }}
                                    onClick={resubmit}
                                >
                                    Skip Account Aggregator <SendIcon />
                                </Button>

                               
                            </>
                        ) : (
                            <>
                                {/* Initial Verify */}
                                <Button
                                    variant="contained"
                                    className="mt-2 fw-bolder ms-bg-secondary"
                                    size="large"
                                    disabled={loader}
                                    style={{ width: '310px' }}
                                    onClick={submit}
                                >
                                    {loader
                                        ? 'Starting Verification...'
                                        : 'Verify with Account Aggregator'}
                                    &nbsp; <SendIcon />
                                </Button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}