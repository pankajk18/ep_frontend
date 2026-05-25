import React, { useState } from 'react';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import PersonPinIcon from '@mui/icons-material/PersonPin';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import SendIcon from '@mui/icons-material/Send';
import { Button } from '@mui/material';
import { getBankVerify } from '../../Utils/api';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { updateCustomerDetails, updateJourneyEvents } from '../../CustomerJourneyDetails/CustomerJourneyDetails';
import { useNavigate } from 'react-router-dom';




export default function BankDetails() {

  const [accountNo, setAccountNo] = useState('');
  const [confirmAccountNo, setConfirmAccountNo] = useState('');
  const [bankType, setBankType] = useState('');
  const [ifscCode, setIfscCode] = useState('');
  const [error, setError] = useState('');
  const customerDetails = useSelector((state) => state.customerJourneyDetails.customerDetails);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleAccountChanger = (e) => {
    const val = e.target.value;
    if (/^\d{0,18}$/.test(val)) {
      setAccountNo(val);
    }
  };

  const handleConfirmChanger = (e) => {
    const val = e.target.value;
    if (/^\d{0,18}$/.test(val)) {
      setConfirmAccountNo(val);
    }
  };

  const accountValidation = () => {
    const errList = {};


    if (accountNo.trim() === '') {
      errList.accountNo = "Account number is required.";
    }
    else if (!/^\d+$/.test(accountNo)) {
      errList.accountNo = "Account number must contain only digits.";
    }
    else if (accountNo.length < 9 || accountNo.length > 18) {
      errList.accountNo = "Account number must be between 9 and 18 digits.";
    }
    if (accountNo !== confirmAccountNo) {
      errList.confirmAccountNo = 'Account numbers do not match.';
    }


    if (bankType.trim() === '') {
      errList.bankType = 'Bank Type is required.';
    }
    if (ifscCode.trim() === '') {
      errList.ifscCode = 'IFSC code is required.';
    }
    else if (!/^[A-Z]{4}0[A-Z0-9]{6}$/i.test(ifscCode)) {
      errList.ifscCode = 'Invalid IFSC code format.';
    }


    setError(errList);
    return Object.keys(errList).length === 0;
  };

  const bankPerameter = {

    accountNo: accountNo,
    confirmAccountNo: confirmAccountNo,
    bankType: bankType,
    ifscCode: ifscCode,
  };

  const handleBankinfo = (event) => {
    event.preventDefault();
    if (accountValidation()) {

    }
  };

  const submit = async () => {

    const param = {
      profileId: customerDetails?.profileId,
      bankAccountNo: accountNo,
      confirmBankAccountNo: confirmAccountNo,
      ifscCode: ifscCode,
      accountTypeId: bankType

    };

    try {

      const response = await getBankVerify(param);

      if (response?.data?.apiStatus == 1) {

        toast.success(response?.data?.message);

        window.clevertap?.event.push("lje_banking_details", {
          "message": "Banking Details Submitted"
        });


        dispatch(updateJourneyEvents({
          banbanking_details: 1,
          thank_you: 1

        }));
        navigate('/congratulations');

      } else {
        toast.error(response?.data?.message, '', 'error');

      }
    } catch (error) {
      toast.error("Error");
    }
  };

  return (

    <div className='box-height' style={{
      backgroundImage: 'url(/assets-crm/banking-bg.jpg)',
    }}>
      <div className="wraper-right-box">
        <div className='row'>
          <h3 className='pl-5 fontstyle'>Banking Details</h3>
          <div className='row'>
            <p>Share your bank details.</p>
          </div>

          <form onSubmit={handleBankinfo}>

            <div className='row pt-2'>
              <div className='col-lg-6'>
                <p className='mb-0 pb-1 fw-medium fs-6 fontstyle '>
                  Account Number <span className='text-danger'>*</span>
                </p>
                <div className="input-group " >
                  <span className="input-group-text solid-border" >
                    <AccountBalanceIcon style={{ color: '#9a141a' }} />
                  </span>
                  <input
                    type="text"
                    onChange={handleAccountChanger}
                    value={accountNo}
                    placeholder='A/C Number'
                    className="form-control solid-border" />
                </div>
                {error.accountNo && (<small className='text-danger err-msg'>{error.accountNo}</small>)}
              </div>
              <div className='col-lg-6'>
                <p className='mb-0 pb-1 fw-medium fs-6 fontstyle '>
                  Confirm Account Number <span className='text-danger'>*</span></p>
                <div className="input-group mb-3" >
                  <span className="input-group-text solid-border" >
                    <AccountBalanceIcon style={{ color: '#9a141a' }} />
                  </span>
                  <input
                    type="text"
                    value={confirmAccountNo}
                    onChange={handleConfirmChanger}
                    placeholder='Confirm A/C Number'
                    className="form-control solid-border" />
                </div>
                {error.confirmAccountNo && (<small className='text-danger err-msg'>{error.confirmAccountNo}</small>)}
              </div>
            </div>
            <div className='row pt-2'>
              <div className='col-lg-6 '>
                <p className='mb-0 pb-1 fw-medium fs-6 fontstyle '>Bank Type <span className='text-danger'>*</span></p>
                <select
                  className="form-select"
                  value={bankType}
                  onChange={(e) => setBankType(e.target.value)}
                  name='maritalStatus'
                >
                  <option value="">---- Choose Bank Type ----</option>
                  <option value="1">SAVING</option>
                  <option value="2">CURRENT</option>
                  <option value="3">SALARY</option>
                  <option value="4">FIXED</option>
                  <option value="5">RECURRING</option>
                </select>

                {error.bankType && (<small className='text-danger err-msg'>{error.branchName}</small>)}

              </div>
              <div className='col-lg-6'>
                <p className='mb-0 pb-1 fw-medium fs-6 fontstyle '>
                  IFSC Code <span className='text-danger'>*</span></p>
                <div className="input-group">
                  <span className="input-group-text solid-border" >
                    <PersonPinIcon style={{ color: '#9a141a' }} /></span>
                  <input
                    type="text"
                    value={ifscCode}
                    onChange={(e) => setIfscCode(e.target.value)}
                    placeholder='IFSC Code'
                    maxLength={11}

                    className="form-control solid-border" />
                </div>
                {error.ifscCode && (<small className='text-danger err-msg'>{error.ifscCode}</small>)}

              </div>
            </div>
            <div className='row'>
              <div className='col-lg-6'>
                {/* <Button variant='contained' className='mt-4' size='large' style={{ background: '#1EBDDA', width: '170px' }}>
                  <SendIcon /> &nbsp; Continues
                </Button> */}
                <Button
                  type="submit"
                  variant='contained'
                  className='mt-4'
                  onClick={submit}
                  size='large fw-bold' style={{ background: '#9a141a' }}
                > Continue &nbsp;&nbsp;
                  <SendIcon />
                </Button>
              </div>
            </div>
          </form>

        </div>
      </div>

    </div>


  );
}
