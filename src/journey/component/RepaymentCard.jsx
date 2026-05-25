import React, { useState } from 'react'
import CurrencyRupeeOutlinedIcon from '@mui/icons-material/CurrencyRupeeOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import TaskAltOutlinedIcon from '@mui/icons-material/TaskAltOutlined';
import UnpublishedOutlinedIcon from '@mui/icons-material/UnpublishedOutlined';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import razorPay from '../../assets/rozypay-logo.png'
import { toast } from 'react-toastify';
import { getRazorpayOrderId } from '../../Utils/api';

export default function RepaymentCard() {
  const customerDetails = useSelector((state) => state.customerJourneyDetails.customerDetails);
  const [paymentAmount, setPaymentAmount] = useState('');
  const [isModalOpen, setModalOpen] = useState(false);
  const [content, setContent] = useState('');
  const [paymentStatus, setPaymentStatus] = useState('');
  const [getLoading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [orderId, setOrderId] = useState('');



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

  const handlePaymentAmountChange = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setPaymentAmount(value);
    }
  };

  const handlePaymentClick = async () => {

    var total_due_amount = customerDetails?.loan_repayment_detail?.repayment_amount_as_on_date;

    if (
      paymentAmount !== '' &&
      Number(paymentAmount) > 0 &&
      Number(paymentAmount) < Number(customerDetails?.loan_repayment_detail?.repayment_amount_as_on_date)
    ) {
      total_due_amount = paymentAmount;

    }
    const param = {
      amount: total_due_amount,
      pancard: customerDetails?.pancard
    }
    try {
      const response = await getRazorpayOrderId(param);
      if (response?.status == true) {
        console.log("Order created successfully:", response?.data);
      } else {
        console.log(response?.data?.message || "Failed to create order. Please try again.");
      }
    } catch (error) {
      console.log("Error");
    }


    setModalOpen(true);
  };


  const payHere = async () => {

    try {
      var total_due_amount = customerDetails?.loan_repayment_detail?.repayment_amount_as_on_date;
      if (
        paymentAmount !== '' &&
        Number(paymentAmount) > 0 &&
        Number(paymentAmount) < Number(customerDetails?.loan_repayment_detail?.repayment_amount_as_on_date)
      ) {
        total_due_amount = paymentAmount;

      }


      // let pgConfig = paymentGateways.find((pg) => pg.mpg_gateway_name == 'Razorpay');

      const options = {
        // key:pgConfig?.mpg_gateway_key ?? 'rzp_live_3XXwpvgLtdYIh3',
        key: "rzp_live_RTKZNuT7Iqa5FB",
        amount: (total_due_amount * 100).toString(),
        currency: "INR",
        name: "EmergencyPaisa",
        description: customerDetails?.pancard,
        image: "https://web.salaryontime.in/public/images/final_logo.png",
        order_id: 'order_RNPPby4acYLsvt',
        prefill: {
          name: "Hidden",
          email: customerDetails?.personal_email,
          contact: customerDetails?.mobile,

        },


        theme: { color: "#05335a " },
        handler: function (response) {
          const paymentDetails = {
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_order_id: response.razorpay_order_id,
            razorpay_signature: response.razorpay_signature,
          };

          fetch("https://api.crmpaisa.com/Api/CustomerDetails/verifyRazorPayCheckPaymentStatus", {
            method: "POST",
            headers: {
              "Content-Type": "application/json; charset=UTF-8",
              Auth: "Y2M0Nzk0OGYwNmQyMjdmZTlhY2E1ZWQ1Nzk5YTZmMWE=",
              Accept: "application/json",
            },
            body: JSON.stringify(paymentDetails),
          })
            .then((res) => res.json())
            .then((data) => {
              let txnStatus = data.status
              let txnId = data.txnId || "N/A";  // Get txnId from response if available

              // Pass txnStatus and txnId to the thank you page using navigate
              navigate("/thanku", {
                state: {
                  txnStatus: txnStatus,
                  txnId: txnId,
                },
              });
              window.location.reload();

              setPaymentStatus(txnStatus === 'SUCCESS' ? "Payment Successful" : "Payment Verification Failed");
              setContent(txnStatus === 'SUCCESS' ? "paymentSuccess" : "paymentFailure");

            })
            .catch((error) => {
              console.error("Error verifying payment:", error);
              setPaymentStatus("Payment Verification Failed");

            });
        },
      };

      const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");
      if (res) {
        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
      } else {
        alert("Razorpay SDK failed to load. Are you online?");
      }
    } catch (error) {
      console.error("Error during payment:", error);
      setLoading(false);
    }
  };

  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleRazorpay = () => {
    setModalOpen(false);
    payHere();
  };

  const PaymentModal = ({ onClose, onRazorpay }) => (
    <div style={{
      position: 'fixed',
      top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000
    }}>
      <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '8px', width: '90%', maxWidth: '500px' }}>
        <h4>Select Payment Gateway</h4>
        <div className='payment-card'>
          <a><img onClick={onRazorpay} src={razorPay} alt='Logo' style={{ cursor: 'pointer', width: '150px' }} /></a>
        </div>
        <div className="modal-footer mt-3">
          <button onClick={onClose} type="button" className="btn btn-secondary">Close</button>
        </div>
      </div>
    </div>
  );



  return (
    <>
      <div className='d-flex justify-content-start align-middle pb-2 pt-5'>
        <h5 className='text-uppercase fw-semibold' >Repayment Details &nbsp;</h5>
        <TaskAltOutlinedIcon style={{ color: 'green' }} />
        {/* <p>Pay Now</p> */}
      </div>

      <div className='border p-2 rounded-3'>
        <div style={{ margin: '0px 12px' }}>
          <div className='row bg-light border '>
            <div className='col-lg-3 col-md-2 border-end p-2'>
              <p className='mb-0'> Loan No. </p>
            </div>
            <div className='col-lg-3 col-md-4 border-end p-2'>
              <p className='mb-0'>{customerDetails?.loan_repayment_detail?.loan_no}</p>
            </div>
            <div className='col-lg-3 col-md-2 border-end p-2'>
              <p className='mb-0'>Repay Loan Amount </p>
            </div>
            <div className='col-lg-3 col-md-4 p-2'>
              <p className='mb-0'> <CurrencyRupeeOutlinedIcon style={{ fontSize: '16px', color: '#9a141a' }} />{customerDetails?.loan_repayment_detail?.repayment_amount}</p>
            </div>
          </div>

          <div className='row bg-light border border-top-0'>
            <div className='col-lg-3 border-end p-2'>
              <p className='mb-0'> Loan Amount</p>
            </div>
            <div className='col-lg-3 border-end p-2'>
              <p className='mb-0'><CurrencyRupeeOutlinedIcon style={{ fontSize: '16px', color: '#9a141a' }} />{customerDetails?.loan_repayment_detail?.loan_recommended}</p>
            </div>
            <div className='col-lg-3 border-end p-2'>
              <p className='mb-0'>Loan Pay Date</p>
            </div>
            <div className='col-lg-3 p-2'>
              <p className='mb-0'><CalendarMonthOutlinedIcon style={{ fontSize: '18px', color: '#9a141a' }} />{formatDate(customerDetails?.loan_repayment_detail?.repayment_date)}</p>
            </div>
          </div>

          <div className='row bg-light border border-top-0'>
            <div className='col-lg-3 border-end p-2'>
              <p className='mb-0'>Tenure</p>
            </div>
            <div className='col-lg-3 border-end p-2'>
              <p className='mb-0'>{customerDetails?.loan_repayment_detail?.tenure}</p>
            </div>
            <div className='col-lg-3 border-end p-2'>
              <p className='mb-0'>Repayment with interest </p>
            </div>
            <div className='col-lg-3 p-2'>
              <p className='mb-0'><CurrencyRupeeOutlinedIcon style={{ fontSize: '16px', color: '#9a141a' }} />{customerDetails?.loan_repayment_detail?.repayment_amount_as_on_date}</p>
            </div>

          </div>
          <div className='row bg-light border border-top-0'>
            <div className='col-lg-3 border-end p-2'>
              <p className='mb-0'>Disbursal Date</p>
            </div>
            <div className='col-lg-3 border-end p-2'>
              <p className='mb-0'> <CalendarMonthOutlinedIcon style={{ fontSize: '18px', color: '#9a141a' }} />{formatDate(customerDetails?.loan_repayment_detail?.disbursal_date)} </p>
            </div>
            <div className='col-lg-3 border-end p-2'>
              <p className='mb-0'>Over Due Days </p>
            </div>
            <div className='col-lg-3 p-2'>
              <p className='mb-0'>{customerDetails?.loan_repayment_detail?.overdue_days}</p>
            </div>

          </div>

          <div className='row bg-light pt-4 pb-4 border border-top-0'>
            <div className='d-flex' style={{ maxWidth: '400px', margin: '0 auto' }}>
              <input type='text' className='form-control' placeholder='Enter Amount' style={{ height: '50px', borderRadius: '0', borderRight: '0' }} value={paymentAmount} onChange={handlePaymentAmountChange} />
              <button style={{
                width: '195px', border: '1px solid #ddd', background: '#1973be',
                fontWeight: '600', borderRadius: '0 10px 10px 0', padding: '0 15px', textAlign: 'center', color: '#fff'
              }} onClick={handlePaymentClick}>Pay Now</button>
            </div>
          </div>
          {isModalOpen && (
            <PaymentModal
              onClose={handleCloseModal}
              onRazorpay={handleRazorpay}

            />
          )}
        </div>
      </div>

      {/* <div className='bg-light mt-3 rounded border'>
                <div className='active-box d-flex justify-content-between' style={{ borderBottom: '1px solid #ddd' }}>
                    <h5 className='fs-5 fw-semibold'>Loan Status</h5>
                    <div className='btn ms-bg-primary text-white fw-semibold'> Active <TaskAltOutlinedIcon /> </div>
                </div>
                <div className='drap-wrap d-flex justify-align-content-between'>
                    <div>Over Due Days <CalendarMonthOutlinedIcon /></div>
                    <div>10</div>
                    <div>Total Due Amount <CurrencyRupeeOutlinedIcon /></div>
                    <div>200000</div>

                </div>

            </div> */}



      {/* <div className='drap-wrap'>
                    <p> Over Due Days <CalendarMonthOutlinedIcon /><span>10</span></p>
                    <p> Total Due Amount <CurrencyRupeeOutlinedIcon /> <span>200000</span></p>
                </div>

                <div className='pay-wrap'>
                    <p>Amount To pay</p>
                    <input type='text' placeholder='Enter Amout '/>
                    <button className='btn btn-primary'>Pay Now</button>
                </div> */}



      {/* <div className='btn ms-bg-secondary text-white fw-semibold'> Close <UnpublishedOutlinedIcon/> </div> */}
    </>
  )
}
