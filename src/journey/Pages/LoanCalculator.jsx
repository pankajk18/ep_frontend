import React, { useEffect, useState } from "react";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { Button } from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import { getGenerateLoan, getLoanQuote } from "../../Utils/api";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { updateJourneyEvents } from "../../CustomerJourneyDetails/CustomerJourneyDetails";
import { updateAutoJourneyEvents } from "../../CustomerJourneyDetails/AutoCustomerJourneyDetails";
import "react-toastify/dist/ReactToastify.css";

export default function LoanCalculator() {
  const [principal, setPrincipal] = useState();
  const [rate, setRate] = useState(1);
  const [time, setTime] = useState();
  const [selecteLoanPurpose, setSelecteloanpurpose] = useState("11"); // Default to Travel
  const [error, setError] = useState("");
  const [loanData, setLoanData] = useState([]);
  const [loader, setLoader] = useState(false);
  const dispatch = useDispatch();
  const customerDetails = useSelector(
    (state) => state.customerJourneyDetails.customerDetails,
  );
  const autocustomerDetails = useSelector(
    (state) => state.autoCustomerJourneyDetails.customerDetails,
  );

  // Calculate interest and total repay amount
  const interest = (principal * rate * time) / 100;
  const totalRepayAmount = parseInt(principal) + parseInt(interest);

  // Format currency values
  let principalAmount = parseInt(principal);
  let formattedRepayAmount = "";

  if (principal) {
    principalAmount = new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(principal);

    formattedRepayAmount = setFormatterRepayment(totalRepayAmount);
  }

  function setFormatterRepayment(amount) {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);
  }

  const loanPurposeType = [
    { label: "Travel", value: "4" },
    { label: "Medical", value: "5" },
    { label: "Academics", value: "6" },
    { label: "Obligation", value: "7" },
    { label: "Festival", value: "8" },
    { label: "Purchase", value: "9" },
    { label: "Emergency", value: "11" },
  ];

  const handleLoanPurpuse = (event) => {
    setSelecteloanpurpose(event.target.value);
    setError("");
  };

  useEffect(() => {
    const fetchData = async () => {
      const params = {
        profileId: customerDetails?.profileId,
      };

      try {
        const response = await getGenerateLoan(params);
        if (response?.data?.apiStatus === 1) {
          const loanDetails = response?.data?.data;
          setLoanData(loanDetails);

          // Set max values and default loan purpose to "Travel"
          setPrincipal(loanDetails.maxLoanAmount);
          setTime(15);
          setSelecteloanpurpose("11");
          window.clevertap?.event.push("lje_generate_loan_quote", {
            message: "Generated Loan Quote",
          });
        } else {
          console.warn("Loan generation failed:", response);
        }
      } catch (error) {
        console.error("Error generating loan:", error);
      }
    };

    fetchData();
  }, []);

  const submit = async () => {
    localStorage.setItem("applicationMode", "manual");
    if (loader) return; // Prevent duplicate submissions
    setLoader(true); // Set loader to true immediately

    if (!selecteLoanPurpose) {
      setError("Please select Loan Purpose");
      setLoader(false); // Reset loader since we're exiting
      return;
    }

    const param = {
      profileId: customerDetails?.profileId,
      loanAmount: principal,
      tenure: time,
      loanPurpose: selecteLoanPurpose,
      loanQuoteDecision: 1,
    };

    try {
      const response = await getLoanQuote(param);
      if (response?.data?.apiStatus === 1) {
        toast.success(response?.data?.message);

        if (
          autocustomerDetails?.isAuto == true &&
          autocustomerDetails?.leadProcessMode == 3
        ) {
          dispatch(
            updateAutoJourneyEvents({
              loan_quote: 1,
              ekyc_detail: 2,
            }),
          );
        } else {
          dispatch(
            updateJourneyEvents({
              loan_quote: 1,
              personal_details: 2,
            }),
          );
        }
        window.clevertap?.event.push("lje_loan_quaotation_decision", {
          message: "Loan Quote Decision",
          ...param,
        });
      } else {
        toast.error(response?.data?.message);
      }
    } catch (error) {
      toast.error("Error");
    } finally {
      setLoader(false); // Reset loader at the end
    }
  };

  return (
    <div className="box-height bg-calculator">
      <div className="wraper-right-box">
        <div className="row">
          <h3 className="pl-5 fontstyle">Loan Calculator</h3>

          <div className="row">
            <p className="mb-0 pb-1 fw-medium fs-6 fontstyle ">
              Purpose of Loan <span className="text-danger">*</span>
            </p>
            <div className="col-lg-12">
              <select
                className="form-select"
                value={selecteLoanPurpose}
                onChange={handleLoanPurpuse}
              >
                {loanPurposeType.map((item, index) => (
                  <option value={item.value} key={index}>
                    {item.label}
                  </option>
                ))}
              </select>
              {error && <small className="text-danger err-msg">{error}</small>}
            </div>
          </div>

          <div className="row">
            <div className="mt-4">
              <div
                className="cal-input-wrap"
                style={{ backgroundColor: "transparent", padding: "0px" }}
              >
                <div className="d-flex justify-content-between">
                  <h5 className="fontstyle">
                    Eligible Loan Amount <span className="text-danger">*</span>
                  </h5>
                  <div className="amtbox fw-bold fs-5">{principalAmount}</div>
                </div>

                <div>
                  <input
                    type="range"
                    min={loanData.minLoanAmount}
                    max={loanData.maxLoanAmount}
                    step="1"
                    value={principal}
                    onChange={(e) => setPrincipal(e.target.value)}
                    className="w-full sot-cal-slider"
                  />
                </div>

                <div
                  className="d-flex align-content-between pt-1 fw-medium"
                  style={{ justifyContent: "space-between" }}
                >
                  <div className="small text-start">
                    <CurrencyRupeeIcon style={{ fontSize: "16px" }} />{" "}
                    {loanData.minLoanAmount}
                  </div>
                  <div className="small text-end">
                    <CurrencyRupeeIcon style={{ fontSize: "16px" }} />{" "}
                    {loanData.maxLoanAmount}
                  </div>
                </div>

                <div className="d-flex justify-content-between mt-4">
                  <h5 className="fontstyle">
                    Period (Days) <span className="text-danger">*</span>
                  </h5>
                  <div className="amtbox">
                    <AccessTimeIcon
                      size="large"
                      style={{ fontWeight: "700", fontSize: "25px" }}
                    />
                    <span
                      className="fs-6 fw-medium text-end"
                      style={{ width: "18px", display: "inline-block" }}
                    >
                      &nbsp;{Math.floor(time)}
                    </span>
                  </div>
                </div>

                <div>
                  <input
                    type="range"
                    min={loanData.minLoanTenure}
                    max={loanData.maxLoanTenure}
                    value={time}
                    onChange={(e) => setTime(Math.floor(e.target.value))}
                    className="w-full sot-cal-slider"
                  />
                </div>

                <div
                  className="d-flex align-content-between pt-1"
                  style={{ justifyContent: "space-between" }}
                >
                  <div className="col-lg-6 small text-start fw-medium">
                    <AccessTimeIcon style={{ fontSize: "16px" }} />{" "}
                    {loanData.minLoanTenure} Days
                  </div>
                  <div className="col-lg-6 small text-end fw-medium">
                    <AccessTimeIcon style={{ fontSize: "16px" }} />{" "}
                    {loanData.maxLoanTenure} Days
                  </div>
                </div>

                <div className="row pt-3">
                  <div className="col-lg-12">
                    <table className="table table-bordered border-info">
                      <thead className="table-primary">
                        <tr>
                          <th className="text-center fs-5" colSpan={2}>
                            Total Pay Amount: &nbsp; {formattedRepayAmount}
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="fw-medium">Eligible Loan Amount</td>
                          <td className="fs-6 fw-medium">{principalAmount}</td>
                        </tr>
                        <tr>
                          <td className="fw-medium">Period (Days)</td>
                          <td>{Math.floor(time)}</td>
                        </tr>
                        <tr>
                          <td className="fw-medium">Interest Rate (%)</td>
                          <td>{Math.floor(loanData.interestRate)}</td>
                        </tr>
                        <tr>
                          <td className="fw-medium">Processing Fee</td>
                          <td>{Math.floor(loanData.processingFee)}%</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div className="col-lg-12">
                    <Button
                      variant="contained"
                      className="mt-2 fw-bolder ms-bg-secondary"
                      size="large"
                      style={{ width: "190px" }}
                      onClick={submit}
                      disabled={loader}
                    >
                      {loader ? "Accepting.." : "Accept"}&nbsp;&nbsp;&nbsp;
                      <ThumbUpIcon />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
