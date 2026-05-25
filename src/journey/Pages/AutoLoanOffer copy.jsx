import React, { useEffect, useState } from 'react';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import { getGenerateLoan, getLoanQuote, updateCustomerJourneyEvent } from '../../Utils/api';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

import { updateAutoJourneyEvents } from '../../CustomerJourneyDetails/AutoCustomerJourneyDetails';
import { updateJourneyEvents } from '../../CustomerJourneyDetails/CustomerJourneyDetails';
import { set } from 'date-fns';




import SendIcon from '@mui/icons-material/Send';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import CelebrationIcon from '@mui/icons-material/Celebration';

export default function AutoLoanOffer() {

  const [principal, setPrincipal] = useState(0);
  const [rate, setRate] = useState(1);
  const [time, setTime] = useState();
  const [selecteLoanPurpose, setSelecteloanpurpose] = useState('11');
  const [error, setError] = useState('');
  const [loanData, setLoanData] = useState({});
  const [loader, setLoader] = useState(false);
  const [credeoResData, setcredeoResData] = useState(null);
  const [openPopup, setOpenPopup] = useState(false);
  const navigate = useNavigate();
  const [credeoApprovedAmount, setcredeoApprovedAmount] = useState(0);

  const dispatch = useDispatch();
  const customerDetails = useSelector(
    (state) => state.customerJourneyDetails.customerDetails
  );

  useEffect(() => {
    const storedCredoData = localStorage.getItem("credeoResData");
    if (storedCredoData) {
      setcredeoResData(JSON.parse(storedCredoData));
    }
  }, []);

  // Fetch loan data
  useEffect(() => {
    
    const fetchData = async () => {
      try {
        const response = await getGenerateLoan({
          profileId: customerDetails?.profileId,
        });

        if (response?.data?.apiStatus === 1) {
          setLoanData(response.data.data);
          setTime(15);
          setSelecteloanpurpose("11");
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [customerDetails]);

  // Set default principal = Credo amount, but capped within min/max
  useEffect(() => {
    if (credeoResData?.amount && loanData?.minLoanAmount) {
      const credoAmount = Number(credeoResData.amount);
      const safeAmount = Math.min(
        Math.max(credoAmount, loanData.minLoanAmount),
        loanData.maxLoanAmount
      );
      setPrincipal(safeAmount);      
      setcredeoApprovedAmount(safeAmount);
    }
  }, [credeoResData, loanData]);

  // Interest & total repayment calculation
  const interest = (principal * rate * time) / 100;
  const totalRepayAmount = parseInt(principal) + parseInt(interest);

  let principalAmount = parseInt(principal);
  let formattedRepayAmount = '';

  if (principal) {
    principalAmount = new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(principal);

    formattedRepayAmount = new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(totalRepayAmount);
  }

  const loanPurposeType = [
    { label: "Travel", value: "4" },
    { label: "Medical", value: "5" },
    { label: "Academics", value: "6" },
    { label: "Obligation", value: "7" },
    { label: "Festival", value: "8" },
    { label: "Purchase", value: "9" },
    { label: "Emergency", value: "11" }
  ];

  const handleLoanPurpuse = (event) => {
    setSelecteloanpurpose(event.target.value);
    setError('');
  };

  // API call separated for reuse
  const proceedLoanQuote = async (mode) => {
    // alert("call"+mode);
    console.log(mode);
    localStorage.setItem("applicationMode",mode);   
    setLoader(true);
    let modeValue = mode == "auto" ? 1:0;

 

    try {

      if (mode == 'auto') {

        // alert("modeValue==="+modeValue);
        console.log({
          profileId: customerDetails?.profileId,
          loanAmount: credeoApprovedAmount,
          tenure: time,
          loanPurpose: selecteLoanPurpose,
          loanQuoteDecision: 1,
          modeValue:modeValue.toString()
        })
         const response = await getLoanQuote({
          profileId: customerDetails?.profileId,
          loanAmount: credeoApprovedAmount,
          tenure: time,
          loanPurpose: selecteLoanPurpose,
          loanQuoteDecision: 1,
          modeValue:modeValue.toString()
        });
        //  return;
        

         if (response?.data?.apiStatus === 1) {
          toast.success(response.data.message);
          
        } else {
          toast.error(response.data.message);
        }

        // updateCustomerJourneyEvent({
        //     leadId: 643,
        //     type: 'lje_ekyc', 
        // });
  
        dispatch(updateAutoJourneyEvents({
            loan_quote: 1,            
            ekyc_detail: 2,
          }));

            
      } else {


        //  alert("modeValue==="+modeValue);
        console.log({
          profileId: customerDetails?.profileId,
          loanAmount: credeoApprovedAmount,
          tenure: time,
          loanPurpose: selecteLoanPurpose,
          loanQuoteDecision: 1,
          modeValue:modeValue
        })

          const response = await getLoanQuote({
              profileId: customerDetails?.profileId,
              loanAmount: principal,
              tenure: time,
              loanPurpose: selecteLoanPurpose,
              loanQuoteDecision: 1,
              modeValue:modeValue
            });

        //  return;


          dispatch(updateJourneyEvents({
            loan_quote: 1,
            personal_details: 2,
          }));
          navigate('/journey');
      }
    } catch {
      toast.error("Error");
    } finally {
      setLoader(false);
    }
  };

  // Submit button logic
  const submit = async () => {
    if (loader) return;

    if (!selecteLoanPurpose) {
      setError('Please select Loan Purpose');
      return;
    }

    if (credeoResData?.amount && Number(principal) > Number(credeoResData.amount)) {
      setOpenPopup(true);
      return;
    }
    proceedLoanQuote('auto');
  };

  const stored = localStorage.getItem("credeoResLatest");
  const response = stored ? JSON.parse(stored) : null;

  // let response = JSON.parse(localStorage.getItem("credeoResLatest") || {});
  let repaymentDate = response?.repaymentDate || '';
  let loanOfferAmt = response?.credeoRes?.amount || 0;
  // alert(loanOfferAmt);
  // alert(repaymentDate);

return (
        <>
            <div className='box-height' style={{  
                backgroundImage: 'url(/assets-crm/loan-offer.png  )',
            }}>
                <div className="wraper-right-box" style={{ width: '60%' }}>
                    <div className='row m-0 p-0'>
                        <h3 className='pl-5 fontstyle text-success'> <CelebrationIcon style={{fontSize:'40px'}}/> Congratulations!</h3>
                        <div className='row m-0 p-0'>
                            <p className='fs-6 fw-medium'>Your loan has been successfully approved</p>
                        </div>

                        <div className='row m-0 p-0'>
                            <div className='offer-inner p-4 border'>
                                <div className=''>
                                    <div className='info d-flex justify-content-between align-items-center'>
                                        <p>You are approved for a loan amount of 1   </p>
                                        <p style={{ fontSize: '30px', fontWeight: '700' }}> <CurrencyRupeeIcon style={{ color: '#9a141a', fontSize: '30px' }} /> {loanOfferAmt}</p>
                                    </div>
                                </div>
                                <div className='border p-2 rounded-3 shadow-md' style={{ backgroundColor: '#c3cfdf59' }}>
                                    <p className='mb-0 small ' style={{ color: '#9a141a', fontWeight: '500' }}> <LocalOfferIcon /> Hurry! Your approved loan offer is available for a limited time.</p>
                                </div>
                                <div className='d-flex justify-content-between mt-4'>
                                    <div className='info'>
                                        <p className='fw-semibold opacity-75'>The repayment will start from </p>
                                    </div>
                                    <div> <p className='fw-bold'> <CalendarMonthIcon style={{ color: '#9a141a', fontWeight: '500' }} /> {repaymentDate}</p></div>
                                </div>
                                {/* enhace section start */}
                                <div className='row py-3 px-3 rounded-4 shadow-lg text-white mt-3 ms-bg-primary'>
                                    <h5 className='fw-bold'>Want to Enhance Your Loan?</h5>
                                    <p style={{ lineHeight: '30px' }}>Based on your profile, you may be eligible to increase your loan amount for higher financial flexibility.</p>
                                    <div className=' d-flex justify-content-start'>
                                        <Button variant='contained' onClick={()=>navigate('/journey')}>Loan Enhancement</Button>
                                    </div>
                                </div>
                                {/* end */}

                            </div>

                        </div>
                        <div className='d-flex justify-content-start'>
                            <Button
                                variant='contained'
                                className='mt-4'
                                size='large fw-bold'
                                onClick={() => proceedLoanQuote('auto')}
                                style={{background:'#9a141a'}}
                            > Continue &nbsp;
                                <SendIcon />
                            </Button>
                        </div>



                    </div>
                </div>

            </div>
        </>
    );
}
