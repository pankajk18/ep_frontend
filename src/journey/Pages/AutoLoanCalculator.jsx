import React, { useEffect, useState } from 'react';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import { getGenerateLoan, getLoanQuote } from '../../Utils/api';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

import { updateAutoJourneyEvents } from '../../CustomerJourneyDetails/AutoCustomerJourneyDetails';
import { updateJourneyEvents } from '../../CustomerJourneyDetails/CustomerJourneyDetails';
import { set } from 'date-fns';

export default function AutoLoanCalculator() {

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
  
       dispatch(updateAutoJourneyEvents({
            loan_quote: 1,
            personal_details: 2,
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

  return (
    <div className='box-height bg-calculator'>
      <div className='wraper-right-box'>
        <div className='row'>
          <h3 className='pl-5 fontstyle'>Loan Offer</h3>

          <div className='row'>
            <p className='mb-0 pb-1 fw-medium fs-6 fontstyle'>
              Purpose of Loan <span className='text-danger'>*</span>
            </p>
            <div className='col-lg-12'>
              <select
                className="form-select"
                value={selecteLoanPurpose}
                onChange={handleLoanPurpuse}
              >
                {loanPurposeType.map((item, index) => (
                  <option key={index} value={item.value}>{item.label}</option>
                ))}
              </select>
              {error && <small className='text-danger err-msg'>{error}</small>}
            </div>
          </div>

          <div className='row'>
            <div className='mt-4'>
              <div className='cal-input-wrap' style={{ backgroundColor: 'transparent', padding: '0px' }}>
                <div className='d-flex justify-content-between'>
                  <h5 className='fontstyle'>
                    Eligible Loan Amount <span className='text-danger'>*</span>
                  </h5>
                  <div className='amtbox fw-bold fs-5'>{principalAmount}</div>
                </div>

                {credeoResData?.amount && <p>Approved Amount: {credeoResData.amount}</p>}

                <input
                  type="range"
                  min={loanData.minLoanAmount}
                  max={loanData.maxLoanAmount}
                  step="1"
                  value={principal}
                  onChange={(e) => setPrincipal(e.target.value)}
                  className="w-full sot-cal-slider"
                />

                <div className='d-flex align-content-between pt-1 fw-medium' style={{ justifyContent: 'space-between' }}>
                  <div className='small'><CurrencyRupeeIcon style={{ fontSize: '16px' }} /> {loanData.minLoanAmount}</div>
                  <div className='small'><CurrencyRupeeIcon style={{ fontSize: '16px' }} /> {loanData.maxLoanAmount}</div>
                </div>

                <div className='d-flex justify-content-between mt-4'>
                  <h5 className='fontstyle'>Period (Days) <span className='text-danger'>*</span></h5>
                  <div className='amtbox'><AccessTimeIcon style={{ fontSize: '25px' }} /> &nbsp;{Math.floor(time)}</div>
                </div>

                <input
                  type="range"
                  min={loanData.minLoanTenure}
                  max={loanData.maxLoanTenure}
                  value={time}
                  onChange={(e) => setTime(Math.floor(e.target.value))}
                  className="w-full sot-cal-slider"
                />

                <div className='d-flex align-content-between pt-1' style={{ justifyContent: 'space-between' }}>
                  <div className='small fw-medium'><AccessTimeIcon style={{ fontSize: '16px' }} /> {loanData.minLoanTenure} Days</div>
                  <div className='small fw-medium'><AccessTimeIcon style={{ fontSize: '16px' }} /> {loanData.maxLoanTenure} Days</div>
                </div>

                <div className='row pt-3'>
                  <div className='col-lg-12'>
                    <table className="table table-bordered border-info">
                      <thead className='table-primary'>
                        <tr>
                          <th colSpan={2} className='text-center fs-5'>
                            Total Pay Amount: {formattedRepayAmount}
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>Eligible Loan Amount</td>
                          <td>{principalAmount}</td>
                        </tr>
                        <tr>
                          <td>Period (Days)</td>
                          <td>{Math.floor(time)}</td>
                        </tr>
                        <tr>
                          <td>Interest Rate (%)</td>
                          <td>{loanData.interestRate}</td>
                        </tr>
                        <tr>
                          <td>Processing Fee</td>
                          <td>{loanData.processingFee}%</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div className='col-lg-12'>
                    <Button
                      variant='contained'
                      className='mt-2 fw-bolder'
                      size='large'
                      style={{ background: '#9a141a', width: '160px' }}
                      onClick={submit}
                      disabled={loader}
                    >
                      {loader ? 'Accepting..' : 'Accept'} <ThumbUpIcon />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* ---------- MUI DIALOG ---------- */}

    <Dialog
  open={openPopup}
  onClose={() => setOpenPopup(false)}
  maxWidth="sm"
  fullWidth
>
  <DialogTitle><strong>Enhance Loan Offer</strong> <hr /></DialogTitle>
     


  <DialogContent>
    <p className="mb-2 fw-medium">
      <b>GO with Enhance offer – Increase your loan amount?</b>
    </p>

    <p className="mb-1">You can request a higher loan amount.</p>
    <p className="mb-3">Additional verification may take extra time.</p>

    
      
     
    
    

    {/* Accept Current Offer */}
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
      <Button title='Accept Current Offer'
        variant="contained"
        color="success"
        disabled={loader}
        onClick={() => {
          setOpenPopup(false);
          proceedLoanQuote('auto');
        }}
      >
        Accept Current Offer
      </Button>

        <Button
        variant="contained" title='Increase Amount'
        color="primary"
        disabled={loader}
        onClick={() => {
          setOpenPopup(false);
          proceedLoanQuote('manual');
        }}
      >
        Increase Amount
      </Button>
      <Button
      variant="outlined"
      color="secondary"
      onClick={() => setOpenPopup(false)}
      disabled={loader}
    >
      Cancel
    </Button>
    </div>
  </DialogContent>

  <DialogActions>
    
  </DialogActions>
</Dialog>

</div>
  );
}
