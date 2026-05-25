import React, { useEffect, useState } from "react";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { Grid, Button, TextField } from "@mui/material";
// import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import LibraryAddCheckIcon from "@mui/icons-material/LibraryAddCheck";
import { getCredeauApiCall, getEligibility } from "../../Utils/api";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { format } from "date-fns";
import {
  updateCustomerDetails,
  updateJourneyEvents,
} from "../../CustomerJourneyDetails/CustomerJourneyDetails";
import { useNavigate } from "react-router-dom";
import { updateAutoCustomerDetails, updateAutoJourneyEvents } from "../../CustomerJourneyDetails/AutoCustomerJourneyDetails";

export default function IncomeDetails() {


  const [empType, setempType] = useState(0);
  const [salMode, setsalMode] = useState(0);
  const [pincode, setPincode] = useState("");
  const [dob, setDob] = useState(null);
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();
  // const [personalEmail, setPersonalEmail] = useState("");
  // const [professionalEmail, setProfessionalEmail] = useState("");
  const [nextSalaryDate, setNextSalaryDate] = useState(null);



  const dispatch = useDispatch();
  const customerDetails = useSelector(
    (state) => state.customerJourneyDetails.customerDetails
  );


  const validateEmail = (email) => {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      return true;
    }
    console.log("You have entered an invalid email address!")
    return false;
  }

  // Pre-fill input fields from Redux
  useEffect(() => {

    if (customerDetails) {
      setempType(customerDetails.income_type_id);
      setsalMode(customerDetails.salary_mode_id);
      setPincode(customerDetails.residence_pincode || "");
      setDob(customerDetails.dob ? new Date(customerDetails.dob) : null);
    }
  }, [customerDetails]);

  const submit = async () => {
    if (loader) return;
    if (!pincode || !dob || !salMode) {
      toast.error("Please fill all required fields");
      return;
    }

    if (pincode.length < 6) {
      toast.error("Please fill all fields correctly");
      return;
    }

    if (nextSalaryDate == null || nextSalaryDate == '' || nextSalaryDate == undefined) {
      toast.error("Please fill all fields correctly");
      return;
    }
    // alert(format(nextSalaryDate,"dd-MM-yyyy"));
    // return false;

    const param = {
      profileId: customerDetails?.profileId,
      pancard: customerDetails?.pancard,
      monthlyIncome: Number(customerDetails?.monthly_income),
      pincode: Number(pincode),
      dob: format(dob, "yyyy-MM-dd"),
      sourceId: 4,
      employmentType: empType,
      salaryMode: salMode,
      nextSalaryDate: format(nextSalaryDate, "yyyy-MM-dd"),
      // personalEmail:personalEmail,
      // professionEmail:professionalEmail
    };

    try {
      setLoader(true);
      const response = await getEligibility(param);
      //autmated code is here ... and nagvigate auto creduo api call here ..
      console.log("response :::", response.data);
      // return false;
      localStorage.setItem("credeoResLatest", JSON.stringify(response?.data));


      if (response?.data?.apiStatus == 1) {
        localStorage.setItem("credeoResData", JSON.stringify(response?.data?.credeoRes));

        // console.log("JSON.stringify(response?.data) ::",JSON.stringify(response?.data));
        toast.success(response?.data?.message);

        window.clevertap.profile.push({
          "Site": {
            "pincode": param.pincode ?? "",
            "dob": new Date(dob),
          }
        });


        // alert("response?.data?.isAuto "+response?.data?.isAuto);
        // console.log("response?.data?.isAuto ",response?.data);
        if (response?.data?.isAuto == true) {

          //  alert("yes Yes");
          // dispatch(
          //   updateAutoCustomerDetails({
          //     dob: dob,
          //     residence_pincode: pincode,
          //     income_type_id: empType,
          //     salary_mode_id: salMode,
          //   })
          // );


          dispatch(
            updateAutoJourneyEvents({
              check_eligibility: 1,
            })
          );
          navigate("/auto-journey");

        } else {

          //  alert("no");

          dispatch(
            updateCustomerDetails({
              dob: dob,
              residence_pincode: pincode,
              income_type_id: empType,
              salary_mode_id: salMode,
            })
          );


          dispatch(
            updateJourneyEvents({
              check_eligibility: 1,
            })
          );

          navigate('/journey');

        }




      } else {
        navigate("/journey/not-eligible");
        toast.error(response?.data?.message);
      }
    } catch (error) {
      toast.error("Error in CheckEligibility");
      console.error("Check Eligibility Error:", error);
    } finally {
      setLoader(false);
    }
  };



  return (
    <div className="income-details-wrap">
      <div className="d-flex align-items-center gap-2 pt-4">
        <div className="bor rounded-circle">
          <ArrowForwardIosIcon style={{ fontSize: "30px", color: "#9a141a" }} />
        </div>
        <h4 className="pl-5 fontstyle">Income Details</h4>
      </div>

      <div className="pl-45">
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <div className="row">
            <div className="col-lg-6">
              <FormControl>
                <FormLabel className="label-text fontstyle fw-medium">
                  Select Employment Type <span className="text-danger">*</span>
                </FormLabel>
                <RadioGroup
                  value={empType}
                  onChange={(e) => setempType(Number(e.target.value))}
                >
                  <Grid container>
                    <Grid>
                      <FormControlLabel
                        value={1}
                        control={<Radio />}
                        label="Salaried"
                      />
                    </Grid>
                    <Grid>
                      <FormControlLabel
                        value={2}
                        control={<Radio />}
                        label="Self-Employed"
                      />
                    </Grid>
                  </Grid>
                </RadioGroup>
              </FormControl>

              <div className="pt-2">
                <p className="mb-0 pb-1 fw-medium fs-6 fontstyle">
                  Date of Birth <span className="text-danger">*</span>
                </p>
                <DatePicker
                  label="Date of Birth"
                  value={dob}
                  onChange={(newValue) => {
                    // if (!customerDetails?.dob) {
                    setDob(newValue);
                    // }
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      size="small"
                      sx={{ maxWidth: 200 }}
                      disabled={!!customerDetails?.dob} // Disable input if DOB exists
                    />
                  )}
                  inputFormat="dd/MM/yyyy"
                />
              </div>
            </div>

            <div className="col-lg-6">
              <FormControl>
                <FormLabel className="label-text fontstyle fw-medium">
                  Mode of Salary Received <span className="text-danger">*</span>
                </FormLabel>
                <RadioGroup
                  value={salMode}
                  onChange={(e) => setsalMode(Number(e.target.value))}
                >
                  <Grid container>
                    <Grid>
                      <FormControlLabel
                        value={1}
                        control={<Radio />}
                        label="Bank"
                      />
                    </Grid>
                    {/* <Grid><FormControlLabel value={2} control={<Radio />} label="Cheque" /></Grid> */}
                    <Grid>
                      <FormControlLabel
                        value={3}
                        control={<Radio />}
                        label="Cash"
                      />
                    </Grid>
                  </Grid>
                </RadioGroup>
              </FormControl>

              <div className="pt-2">
                <p className="mb-0 pb-1 fw-medium fs-6 fontstyle">
                  Current Pin Code <span className="text-danger">*</span>
                </p>
                <div className="input-group mb-3">
                  <TextField
                    // label="Pincode"
                    variant="outlined"
                    size="small"
                    value={pincode}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (/^\d{0,6}$/.test(value)) {
                        setPincode(value);
                      }
                    }}
                    onKeyDown={(e) => {
                      const allowedKeys = [
                        "Backspace",
                        "Delete",
                        "ArrowLeft",
                        "ArrowRight",
                        "Tab",
                      ];
                      if (!/^\d$/.test(e.key) && !allowedKeys.includes(e.key)) {
                        e.preventDefault();
                      }
                    }}
                    onPaste={(e) => {
                      const pasteData = e.clipboardData.getData("Text");
                      if (!/^\d{1,6}$/.test(pasteData)) {
                        e.preventDefault();
                      }
                    }}
                    error={pincode.length > 0 && pincode.length !== 6}
                    helperText={
                      pincode.length > 0 && pincode.length !== 6
                        ? "Pincode must be exactly 6 digits"
                        : ""
                    }
                    inputProps={{
                      inputMode: "numeric",
                      maxLength: 6,
                    }}
                    sx={{ maxWidth: "150px", height: "55px" }}
                  />
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-lg-6 mt-3">
                <p className="mb-0 pb-1 fw-medium fs-6 fontstyle">
                  Next Salary Date <span className="text-danger">*</span></p>
                <DatePicker
                  label="Next Salary Date"
                  value={nextSalaryDate}
                  onChange={(newValue) => {
                    setNextSalaryDate(newValue);
                  }}
                  minDate={new Date()}
                  error={nextSalaryDate === null || nextSalaryDate === '' || nextSalaryDate === undefined}
                  helperText={
                    nextSalaryDate === null || nextSalaryDate === '' || nextSalaryDate === undefined
                      ? "Next Salary Date is required" : ''}

                  inputFormat="dd/MM/yyyy"
                />
              </div>
            </div>
          </div>
        </LocalizationProvider>

        <Button
          variant="contained"
          className="mt-4 ms-bg-secondary"
          size="large"
          onClick={submit}
          // style={{ background: "#9a141a" }}
          disabled={loader} // disable while loading
        >
          <LibraryAddCheckIcon /> &nbsp;
          {loader ? "Checking..." : "Check Eligibility"}
        </Button>
      </div>
    </div>
  );
}
