import React, { useEffect, useState } from 'react'
import ekycBg from '../assets-crm/ekyc.jpg';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import { getAcceptedEnhancedOffer, getEnhancedOffer } from '../../Utils/api';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Table } from 'antd';
import { toast } from 'react-toastify';
import { updateAutoJourneyEvents } from '../../CustomerJourneyDetails/AutoCustomerJourneyDetails';
import { useNavigate } from 'react-router-dom';

export default function LoanOfferAcceptance() {

  const customerDetails = useSelector((state) => state.customerJourneyDetails.customerDetails);
  const [loader, setLoader] = useState(false);
  const [offerDetails, setOfferDetails] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getEnhancedOffer({
          profileId: customerDetails?.profileId,
        });

        if (response?.data?.apiStatus === 1) {
          setOfferDetails(response?.data?.data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [customerDetails]);



  const submit = async (decision) => {

  if (loader) return;
  setLoader(true);

  try {
    const param = {
      profileId: customerDetails?.profileId,
      loanQuoteDecision: decision,
    };

    const response = await getAcceptedEnhancedOffer(param);

    if (response?.data?.apiStatus === 1) {
       toast.success(response?.data?.message);

       if(decision == 1 && customerDetails?.isAuto==true){
          dispatch(updateAutoJourneyEvents({
            loan_offer_accept: 1,
            banking_details:2
          }));
       }else{
           navigate('journey/congratulations')
       }
    }
  } catch (error) {
    console.error(error);
  } finally {
    setLoader(false);
  }
};


  const columns = [
    {
      title: 'Loan Details',
      dataIndex: 'label',
      key: 'label',
      render: (text) => <b>{text}</b>,
    },
    {
      title: 'Value',
      dataIndex: 'value',
      key: 'value',
    },
  ];


  const dataSource = offerDetails
    ? [
        {
          key: '1',
          label: 'Loan Amount',
          value: `₹${offerDetails.loanAmount}`,
        },
        {
          key: '2',
          label: 'Repayment Date',
          value: new Date(offerDetails.repaymentDate).toLocaleDateString(),
        },
        {
          key: '3',
          label: 'Tenure (Days)',
          value: offerDetails.tenure,
        },
        {
          key: '4',
          label: 'Processing Fee',
          value: offerDetails.processingFee,
        },
        {
          key: '5',
          label: 'Net Disbursal Amount',
          value: `₹${offerDetails.netDisbursalAmount}`,
        },
        {
          key: '6',
          label: 'Repayment Amount',
          value: `₹${offerDetails.repaymentAmount}`,
        },
      ]
    : [];

  return (
    <>
      <div
        className='box-height bg-ekyc'
        style={{ backgroundImage: `url(${ekycBg})` }}
      >
        <div className='wraper-right-box' style={{ paddingBottom: '10%' }}>
          <div className='row'>
            <h3 className='pl-5 fontstyle'>Final Loan Offer</h3>

            <h6 className='opacity-75' style={{ lineHeight: '30px' }}>
              Your loan has been successfully approved
            </h6>

            {/* Table */}
            <div className='col-lg-12 mt-3'>
              <Table
                columns={columns}
                dataSource={dataSource}
                pagination={false}
                bordered
                style={{ background: 'white', borderRadius: '10px' }}
              />
            </div>

            {/* Button */}
            <div className='col-lg-12 mt-3'>
              <Button
                className='fw-bolder ms-bg-secondary'
                size='large'
                style={{ width: '200px' }}
                onClick={() => submit(1)}   
                disabled={loader}
                >
                {loader ? 'Accepting..' : 'Accept'} &nbsp;
                <ThumbUpIcon />
                </Button> &nbsp;&nbsp;&nbsp;&nbsp;

                <Button
                className='fw-bolder ms-bg-secondary'
                size='large'
                style={{ width: '200px'}}
                onClick={() => submit(2)}   
                disabled={loader}
                >
                {loader ? 'Skipping..' : 'Skip'} &nbsp;
                <ThumbUpIcon />
                </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}