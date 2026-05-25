# `/journey` Route - CODE FLOW WITH EXAMPLES

## Complete Step-by-Step Code Walkthrough

---

## STEP 1: USER ENTERS JOURNEY (RedirectToJourney)

### Scenario: User clicks "Apply Now" email link
**Email link format:** `https://app.com/redirect-to-journey?encId=abc123xyz`

### File: `src/journey/component/RedirectToJourney.jsx`

```jsx
import { useNavigate } from "react-router-dom";
import { redirectToJourney } from "../../Utils/api";
import { useDispatch } from "react-redux";
import { updateCustomerDetails } from "../../CustomerJourneyDetails/CustomerJourneyDetails";

function RedirectToJourney() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // Extract encId from URL
    const encId = (window.location.href).split("?encId=")[1];
    // Example: "abc123xyz"

    const callRedirectionApi = async () => {
        try {
            // 1️⃣ CALL API with encoded ID
            const resp = await redirectToJourney(encId);
            
            // 2️⃣ CHECK API RESPONSE
            if (resp?.data?.status && resp?.data?.apiStatus == 1) {
                
                // 3️⃣ SUCCESS: Store in Redux
                dispatch(updateCustomerDetails({
                    profileId: resp?.data?.data?.profileId,     // "PROF_12345"
                    mobile: resp?.data?.data?.mobile,           // "9876543210"
                    token: resp?.data?.data?.token              // "jwt_abc123xyz"
                }));

                // 4️⃣ CHECK IF JOURNEY ALREADY COMPLETED
                if (resp?.data?.data?.journeyCompletedFlag === 1) {
                    // Journey already done → Show dashboard
                    dispatch(updateCustomerDetails({ 
                        journeyCompletedFlag: 1 
                    }));
                    window.location.href = '/journey/dashboard';
                    // User sees UserDashboard
                } else {
                    // Journey not started → Start fresh
                    navigate('/journey');
                    // User sees MyJourney → PanDetails
                }
            } else {
                // 5️⃣ ERROR: API returned failure
                let msg = resp?.data?.message || "An error occurred";
                alert(msg);
                window.location.href = '/apply-now';
                // Redirect back to application
            }
        } catch (err) {
            // 6️⃣ NETWORK ERROR
            alert("some error occured");
            window.location.href = '/apply-now';
        }
    };

    // 7️⃣ EXECUTE ON COMPONENT MOUNT
    if (encId) {
        callRedirectionApi();
    } else {
        alert("not working");
        window.location.href = '/apply-now';
    }

    return <></>;
}

export default RedirectToJourney;
```

### Redux State After Step 1
```js
state = {
    customerJourneyDetails: {
        customerDetails: {
            profileId: "PROF_12345",
            mobile: "9876543210",
            token: "jwt_abc123xyz",
            journeyCompletedFlag: 0  // 0 = start fresh journey
        },
        journeySteps: { /* initial empty state */ },
        error: null
    }
}
```

### User Flow After Step 1
```
✅ Token stored in Redux
✅ ProfileId stored in Redux
↓
navigate('/journey')
↓
Layout checks: customerDetails.token exists? YES ✅
↓
Layout renders header, main, footer
↓
<Outlet /> renders MyJourney (nested route)
```

---

## STEP 2: MYJOUNEY CONTROLLER LOGIC

### File: `src/journey/Pages/MyJourney.jsx`

```jsx
import React, { useEffect } from 'react';
import PanDetails from './PanDetails';
import ApplicationStep from './ApplicationStep';
import UserDashboard from './UserDashboard';
import { useSelector, useDispatch } from 'react-redux';
import { updateCustomerDetails, updateJourneyEvents, customerDetailsApiCall } from '../../CustomerJourneyDetails/CustomerJourneyDetails';
import { updateAutoCustomerDetails, updateAutoJourneyEvents } from '../../CustomerJourneyDetails/AutoCustomerJourneyDetails';
import { useNavigate } from 'react-router-dom';

export default function MyJourney() {
  // ═══════════════════════════════════════════════════════════
  // 1️⃣ READ FROM REDUX (Get current state)
  // ═══════════════════════════════════════════════════════════
  
  const customerStep = useSelector((state) => 
    state?.customerJourneyDetails?.journeySteps
  );
  // Example value:
  // {
  //   check_eligibility: 0,
  //   loan_quote: 0,
  //   personal_details: 0,
  //   upload_documents: 0,
  //   ...
  // }

  const customerDetails = useSelector((state) => 
    state?.customerJourneyDetails?.customerDetails
  );
  // Example value:
  // {
  //   profileId: "PROF_12345",
  //   token: "jwt_abc123xyz",
  //   mobile: "9876543210",
  //   full_name: null,
  //   dob: null,
  //   pancard: null,
  //   monthly_income: null,
  //   is_journey_completed: 0,
  //   isAuto: false
  // }

  const journeyComplete = useSelector((state) => 
    state?.customerJourneyDetails?.customerDetails?.is_journey_completed
  );
  // Values: 0 (not done) or 1 (done)

  const isAutoJourney = useSelector((state) => 
    state?.customerJourneyDetails?.customerDetails?.isAuto
  );
  // Values: true or false

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // ═══════════════════════════════════════════════════════════
  // 2️⃣ PREPARE API CALL PARAMETERS
  // ═══════════════════════════════════════════════════════════

  const params = {
    profileId: customerDetails?.profileId  // "PROF_12345"
  };

  // ═══════════════════════════════════════════════════════════
  // 3️⃣ FETCH LATEST JOURNEY DATA FROM BACKEND
  // ═══════════════════════════════════════════════════════════

  async function fetchCustomerDetails() {
    if (params.profileId) {
      try {
        // 3a) Dispatch async thunk to fetch
        let { payload } = await dispatch(
          customerDetailsApiCall(params)
        );

        // 3b) Check if API successful
        if (payload?.data?.apiStatus == 1) {
          
          // 3c) Extract response data
          const customerData = payload?.data?.data?.customer_details;
          // Example:
          // {
          //   full_name: "John Doe",
          //   dob: "1990-01-15",
          //   pancard: "ABCDE1234F",
          //   monthly_income: "50000",
          //   is_journey_completed: 0,
          //   isAuto: false,
          //   ...
          // }

          const screenData = payload?.data?.data?.screen_details;
          // Example:
          // {
          //   check_eligibility: 1,  ← User passed PAN check
          //   loan_quote: 0,
          //   personal_details: 0,
          //   upload_documents: 0,
          //   ...
          // }

          // 3d) UPDATE REDUX FOR REGULAR JOURNEY
          dispatch(updateCustomerDetails(customerData));
          dispatch(updateJourneyEvents(screenData));

          // 3e) UPDATE REDUX FOR AUTO JOURNEY (dual update)
          dispatch(updateAutoCustomerDetails(customerData));
          dispatch(updateAutoJourneyEvents(screenData));
        }
      } catch (error) {
        console.error("Error fetching customer details:", error);
      }
    }
  }

  // ═══════════════════════════════════════════════════════════
  // 4️⃣ EFFECT: FETCH DATA ON MOUNT & WHEN ELIGIBILITY CHANGES
  // ═══════════════════════════════════════════════════════════

  useEffect(() => {
    // Fetch latest journey status from API
    fetchCustomerDetails();

    // 🔄 CRITICAL: Check if user should be in Auto Journey
    if (isAutoJourney) {
      // Auto journey flag is true
      // → Redirect to auto-journey
      navigate('/auto-journey');
      return;
      // User now in AutoMyJourney component
    }

    // Dependency: Re-run when eligibility step changes
  }, [customerStep?.check_eligibility]);

  // ═══════════════════════════════════════════════════════════
  // 5️⃣ RENDER: CONDITIONAL LOGIC (THE CORE DECISION TREE)
  // ═══════════════════════════════════════════════════════════

  return (
    <div style={{ minHeight: '80vh' }}>
      {/* 
        DECISION TREE:
        ├─ IF is_journey_completed == 1
        │   └─ → RENDER UserDashboard (Final state)
        ├─ ELSE IF check_eligibility == 1
        │   └─ → RENDER ApplicationStep (Multi-step form)
        └─ ELSE
            └─ → RENDER PanDetails (Initial verification)
      */}

      {(journeyComplete == 1) ? 
        // BRANCH A: Journey Complete
        <UserDashboard /> 
      : 
        (customerStep.check_eligibility == 1) ? 
          // BRANCH B: Eligibility Passed, Fill Application
          <ApplicationStep /> 
        : 
          // BRANCH C: Initial Stage, Verify PAN
          <PanDetails />
      }
    </div>
  );
}

export default MyJourney;
```

### Rendering Logic Decision Table

| Condition | journeyComplete | check_eligibility | Renders | Next Step |
|-----------|-----------------|-------------------|---------|-----------|
| **Initial** | 0 | 0 | PanDetails | User enters PAN |
| **After PAN Verify** | 0 | 1 | ApplicationStep | User fills 3 tabs |
| **After All Tabs** | 0 | 1 | ApplicationStep → auto-navigate to /journey/congratulations | ✅ Complete |
| **Journey Done** | 1 | 1 | UserDashboard | View dashboard + optional actions |
| **Auto Eligible** | - | - | (Auto condition triggers first) | → /auto-journey |

---

## STEP 3: PAN DETAILS STAGE (Initial Verification)

### File: `src/journey/Pages/PanDetails.jsx`

```jsx
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@mui/material';
import { getPanVerify } from '../../Utils/api';
import { useDispatch, useSelector } from 'react-redux';
import { updateCustomerDetails } from '../../CustomerJourneyDetails/CustomerJourneyDetails';
import { toast } from 'react-toastify';

export default function PanDetails() {
  // ═══════════════════════════════════════════════════════════
  // 1️⃣ STATE MANAGEMENT
  // ═══════════════════════════════════════════════════════════

  const inputLength = 10; // PAN is 10 digits
  const dispatch = useDispatch();

  // Get existing PAN from Redux (if user already filled)
  const customerDetails = useSelector((state) => 
    state.customerJourneyDetails.customerDetails
  );

  // Initialize PAN: Use existing if available
  let initialPan = customerDetails?.pancard
    ? customerDetails.pancard.toUpperCase().split('')
    : Array(inputLength).fill();

  const [userpan, setuserPan] = useState(initialPan);
  // Example: ['A','B','C','D','E','1','2','3','4','F']

  const [salary, setSalary] = useState(
    customerDetails?.monthly_income || null
  );
  // Example: "50000"

  const inputRefs = useRef([]);
  const [loader, setLoader] = useState(false);
  const [verifyBtn, setVerifyBtn] = useState(true);
  const [isInvalidPan, setIsInvalidPan] = useState(false);
  const [isInvalidSalary, setIsInvalidSalary] = useState(false);

  // ═══════════════════════════════════════════════════════════
  // 2️⃣ PAN INPUT HANDLER (Character by character)
  // ═══════════════════════════════════════════════════════════

  const handleChange = (e, index) => {
    const value = e.target.value.toUpperCase();
    let isValidChar = false;

    // PAN FORMAT: ABCDE1234F
    // Positions 0-4: Letters only
    if (index >= 0 && index <= 4) {
      isValidChar = /^[A-Z]{1}$/.test(value);  // Only A-Z
    }
    // Positions 5-8: Digits only
    else if (index >= 5 && index <= 8) {
      isValidChar = /^[0-9]{1}$/.test(value);  // Only 0-9
    }
    // Position 9: Letter only
    else if (index === 9) {
      isValidChar = /^[A-Z]{1}$/.test(value);  // Only A-Z
    }

    // Update if valid or empty (backspace)
    if (isValidChar || value === '') {
      const updatedPan = [...userpan];
      updatedPan[index] = value;
      setuserPan(updatedPan);

      // Auto-focus next input
      if (value && index < inputLength - 1) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  // ═══════════════════════════════════════════════════════════
  // 3️⃣ PAN BACKSPACE HANDLER
  // ═══════════════════════════════════════════════════════════

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !userpan[index] && index > 0) {
      const updatedPan = [...userpan];
      updatedPan[index - 1] = '';
      setuserPan(updatedPan);
      inputRefs.current[index - 1].focus();
    }
  };

  // ═══════════════════════════════════════════════════════════
  // 4️⃣ VALIDATION LOGIC
  // ═══════════════════════════════════════════════════════════

  const fullPan = userpan.join('');
  // Example: "ABCDE1234F"

  // PAN REGEX: ^[A-Z]{5}[0-9]{4}[A-Z]$
  const isValidPan = /^[A-Z]{5}[0-9]{4}[A-Z]$/.test(fullPan);
  // TRUE if format matches, FALSE otherwise

  // ═══════════════════════════════════════════════════════════
  // 5️⃣ VERIFY BUTTON CLICK HANDLER
  // ═══════════════════════════════════════════════════════════

  const handleVerify = async () => {
    // Prevent double-click
    if (loader) return;

    const fullPan = userpan.join('');
    const panValid = /^[A-Z]{5}[0-9]{4}[A-Z]$/.test(fullPan);
    const salaryValid = salary && /^\d+$/.test(salary) && parseInt(salary) > 0;

    setIsInvalidPan(!panValid);
    setIsInvalidSalary(!salaryValid);

    // ✅ VALIDATION CHECK
    if (!panValid) {
      toast.error("Please enter a valid 10-character PAN number.");
      return;
    }

    if (!salaryValid) {
      toast.error("Please enter a valid Monthly Income.");
      return;
    }

    // ═══════════════════════════════════════════════════════════
    // 6️⃣ API CALL: PAN VERIFICATION
    // ═══════════════════════════════════════════════════════════

    const param = {
      profileId: customerDetails?.profileId,  // "PROF_12345"
      pancard: fullPan,                        // "ABCDE1234F"
      monthlyIncome: salary                    // "50000"
    };

    try {
      setLoader(true);

      // 🔗 CALL getPanVerify API
      const response = await getPanVerify(param);

      // ✅ API SUCCESS
      if (response?.data?.apiStatus == 1) {
        
        toast.success(response?.data?.message);
        // "PAN Verified Successfully"

        // ═══════════════════════════════════════════════════════════
        // 7️⃣ UPDATE REDUX WITH VERIFIED DATA
        // ═══════════════════════════════════════════════════════════

        dispatch(updateCustomerDetails({
          full_name: response?.data?.data?.name,        // "JOHN DOE"
          dob: response?.data?.data?.dob,               // "1990-01-15"
          pancard: response?.data?.data?.panNumber,     // "ABCDE1234F"
          monthly_income: salary,                       // "50000"
          gender: response?.data?.data?.gender          // "M"
        }));

        // ═══════════════════════════════════════════════════════════
        // 8️⃣ TRACK ANALYTICS EVENT
        // ═══════════════════════════════════════════════════════════

        window.clevertap?.event.push("lje_Pancard_Verfication", {
          "message": "PanCard Verified"
        });

        window.clevertap?.event.push("lje_income_details", {
          "message": `Income: ${salary}`
        });

        setVerifyBtn(false);
        // Button now disabled

        // 🔄 NEXT STEP:
        // MyJourney detects Redux update
        // → Re-renders
        // → check_eligibility might now be 1 (if backend updates it)
        // → ApplicationStep becomes visible
      } 
      // ❌ API FAILURE
      else {
        const failureMessage = response?.data?.message || "Unknown error";
        toast.error(failureMessage);

        window.clevertap?.event.push("lje_Pancard_Failed", {
          message: `PanCard Verification Failed: ${failureMessage}`
        });
        // Allow user to retry
      }
    } 
    catch (error) {
      console.error("PAN verification error:", error);
      toast.error("Error verifying PAN. Please check your connection or try later.");
    } 
    finally {
      setLoader(false);
    }
  };

  // ═══════════════════════════════════════════════════════════
  // 9️⃣ RENDER UI
  // ═══════════════════════════════════════════════════════════

  return (
    <div>
      {/* PAN Input Fields (10 inputs, one per digit) */}
      <div style={{ display: 'flex', gap: '5px' }}>
        {Array(10).fill().map((_, idx) => (
          <input
            key={idx}
            ref={el => inputRefs.current[idx] = el}
            type="text"
            maxLength="1"
            value={userpan[idx] || ''}
            onChange={(e) => handleChange(e, idx)}
            onKeyDown={(e) => handleKeyDown(e, idx)}
            placeholder={idx === 9 ? 'Z' : idx < 5 ? 'A' : '0'}
          />
        ))}
      </div>

      {/* Monthly Income Input */}
      <input
        type="number"
        placeholder="Monthly Income"
        value={salary || ''}
        onChange={(e) => setSalary(e.target.value)}
      />

      {/* Verify Button */}
      <button
        onClick={handleVerify}
        disabled={loader || !isValidPan}
      >
        {loader ? 'Verifying...' : 'Verify PAN'}
      </button>
    </div>
  );
}
```

### PAN Stage Flow Diagram

```
User at PanDetails page
  │
  ├─ Fill 10-digit PAN: A B C D E 1 2 3 4 F
  ├─ Fill Monthly Income: 50000
  │
  └─ Click "Verify PAN"
     │
     ├─ Validate format: /^[A-Z]{5}[0-9]{4}[A-Z]$/ ✅
     ├─ Validate income: numeric + > 0 ✅
     │
     └─ Call getPanVerify(param)
        │
        ├─ SUCCESS (apiStatus == 1)
        │  ├─ Extract: name, dob, gender
        │  ├─ updateCustomerDetails in Redux
        │  ├─ Track clevertap event
        │  ├─ Disable "Verify" button
        │  │
        │  └─ Backend marks check_eligibility = 1
        │     │
        │     └─ (useEffect in MyJourney triggers)
        │        │
        │        └─ fetchCustomerDetails() called
        │           │
        │           └─ Redux updated with check_eligibility: 1
        │              │
        │              └─ MyJourney re-renders
        │                 │
        │                 └─ ApplicationStep appears
        │
        └─ FAILURE (apiStatus != 1)
           ├─ Show error toast
           ├─ Track clevertap failure event
           └─ Allow retry (button stays enabled)
```

---

## STEP 4: APPLICATION STEP (Multi-step Form)

### File: `src/journey/Pages/ApplicationStep.jsx`

```jsx
import React, { useEffect } from "react";
import { CalculateIcon, SwitchAccountIcon, UploadFileIcon } from "@mui/icons-material";
import PersonalInformation from "./PersonalInformation";
import LoanCalculator from "./LoanCalculator";
import UploadDocument from "./UploadDocument";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function ApplicationStep() {
  // ═══════════════════════════════════════════════════════════
  // 1️⃣ READ JOURNEY STEP STATUS
  // ═══════════════════════════════════════════════════════════

  const { loan_quote, personal_details, upload_documents } = useSelector(
    (state) => state?.customerJourneyDetails?.journeySteps
  );

  // Example values:
  // loan_quote: 0 (not started) or 1 (completed) or 2 (in progress)
  // personal_details: 0, 1, or 2
  // upload_documents: 0, 1, or 2

  const navigate = useNavigate();

  // ═══════════════════════════════════════════════════════════
  // 2️⃣ AUTO-COMPLETION LOGIC
  // ═══════════════════════════════════════════════════════════

  useEffect(() => {
    // Check if ALL three main steps are completed (status == 1)
    if (
      loan_quote === 1 &&         // ✅ Loan calculator filled
      personal_details === 1 &&   // ✅ Personal info filled
      upload_documents === 1      // ✅ Documents uploaded
    ) {
      // 🎉 ALL STEPS COMPLETE → Navigate to thank you
      navigate("/journey/congratulations");
    }
  }, [loan_quote, personal_details, upload_documents, navigate]);

  // ═══════════════════════════════════════════════════════════
  // 3️⃣ TAB CONFIGURATION
  // ═══════════════════════════════════════════════════════════

  const navLinks = [
    {
      // TAB 1: LOAN CALCULATOR
      title: "Loan calculator",
      id: "v-pills-loan-tab",
      desc: "Choose the loan amount and tenure",
      
      // ACTIVE STATE: Show tab if user is filling (status == 2)
      activeStatus: loan_quote == 2,
      
      // SUCCESS ICON: Show checkmark if completed (status == 1)
      showSuccessIcon: loan_quote == 1,
      
      // TAB CONTENT
      tabContentElement: <LoanCalculator />,
      
      showPreviousStepNotification: () => {
        // Show notification if status is 0 or 1
        if (loan_quote === 0) {
          // "Please complete previous step"
        } else if (loan_quote === 1) {
          // "This step is already completed"
        }
      },
    },

    {
      // TAB 2: PERSONAL DETAILS
      title: "Personal Details",
      id: "v-pills-personalinfo-tab",
      desc: "Tell us a bit about yourself",
      
      activeStatus: personal_details == 2,
      showSuccessIcon: personal_details == 1,
      tabContentElement: <PersonalInformation />,
      
      showPreviousStepNotification: () => {
        if (personal_details === 0) {
          // "Please complete previous step"
        } else if (personal_details === 1) {
          // "This step is already completed"
        }
      },
    },

    {
      // TAB 3: DOCUMENTS UPLOAD
      title: "Documents Upload",
      id: "v-pills-upload-tab",
      desc: "Share your documents to verify details",
      
      activeStatus: upload_documents == 2,
      showSuccessIcon: upload_documents == 1,
      tabContentElement: <UploadDocument />,
      
      showPreviousStepNotification: () => {
        if (upload_documents === 0) {
          // "Please complete previous step"
        } else if (upload_documents === 1) {
          // "This step is already completed"
        }
      },
    },
  ];

  // ═══════════════════════════════════════════════════════════
  // 4️⃣ RENDER: VERTICAL TABS WITH STEP INDICATORS
  // ═══════════════════════════════════════════════════════════

  return (
    <div className="application-step-container">
      <div className="tabs-list">
        {navLinks.map((link, idx) => (
          <div
            key={link.id}
            className={`tab-item ${link.activeStatus ? 'active' : ''}`}
          >
            {/* STEP NUMBER */}
            <span className="step-number">{idx + 1}</span>

            {/* TAB TITLE */}
            <h5 className="tab-title">{link.title}</h5>

            {/* TAB DESCRIPTION */}
            <p className="tab-desc">{link.desc}</p>

            {/* SUCCESS CHECKMARK */}
            {link.showSuccessIcon && (
              <CheckCircleIcon className="success-icon" />
            )}

            {/* ACTIVE INDICATOR */}
            {link.activeStatus && (
              <span className="active-badge">In Progress</span>
            )}
          </div>
        ))}
      </div>

      {/* TAB CONTENT */}
      <div className="tab-content">
        {navLinks.map((link) => (
          <div
            key={link.tabContentId}
            id={link.tabContentId}
            className={`tab-pane ${link.activeStatus ? 'show active' : ''}`}
          >
            {link.tabContentElement}
          </div>
        ))}
      </div>
    </div>
  );
}
```

### Tab Status Examples

```
SCENARIO 1: User just entered ApplicationStep
┌─────────────────────┐
│ Tab 1: Loan Calc    │  Status: 0 (disabled, grayed out)
├─────────────────────┤
│ Tab 2: Personal     │  Status: 0 (disabled)
├─────────────────────┤
│ Tab 3: Documents    │  Status: 0 (disabled)
└─────────────────────┘
→ Show error notification


SCENARIO 2: User clicked Tab 1 and started filling
┌─────────────────────┐
│ Tab 1: Loan Calc ⚡ │  Status: 2 (ACTIVE - editable, highlight)
├─────────────────────┤
│ Tab 2: Personal     │  Status: 0 (locked)
├─────────────────────┤
│ Tab 3: Documents    │  Status: 0 (locked)
└─────────────────────┘
→ User can fill Tab 1


SCENARIO 3: User completed Tab 1
┌─────────────────────┐
│ Tab 1: Loan Calc ✅ │  Status: 1 (COMPLETED - show checkmark)
├─────────────────────┤
│ Tab 2: Personal ⚡  │  Status: 2 (ACTIVE - unlocked)
├─────────────────────┤
│ Tab 3: Documents    │  Status: 0 (locked)
└─────────────────────┘
→ User can now fill Tab 2


SCENARIO 4: User completed all tabs
┌─────────────────────┐
│ Tab 1: Loan Calc ✅ │  Status: 1
├─────────────────────┤
│ Tab 2: Personal ✅  │  Status: 1
├─────────────────────┤
│ Tab 3: Documents ✅ │  Status: 1
└─────────────────────┘
→ useEffect detects all == 1
→ auto-navigate("/journey/congratulations")
```

---

## STEP 5: JOURNEY COMPLETION (Congratulations Page)

### When it triggers:

```js
// In ApplicationStep.jsx
useEffect(() => {
  if (
    loan_quote === 1 &&
    personal_details === 1 &&
    upload_documents === 1
  ) {
    navigate("/journey/congratulations");  // ← AUTO-NAVIGATE
  }
}, [loan_quote, personal_details, upload_documents]);
```

### File: `src/journey/Pages/thankyou/ThankYou.jsx`

```jsx
export default function ThankYou() {
  return (
    <div className="congratulations-page">
      <h1>🎉 Congratulations!</h1>
      <p>Your application has been submitted successfully.</p>
      <p>We will review your details and get back to you soon.</p>
      
      {/* Track completion event */}
      {useEffect(() => {
        window.clevertap?.event.push("lje_application_completed", {
          message: "Application submitted"
        });
      }, [])}
    </div>
  );
}
```

### Redux After Completion

```js
state = {
  customerJourneyDetails: {
    customerDetails: {
      profileId: "PROF_12345",
      token: "jwt_abc123xyz",
      full_name: "John Doe",
      dob: "1990-01-15",
      pancard: "ABCDE1234F",
      monthly_income: "50000",
      is_journey_completed: 0,  // Still 0 until backend confirms
      isAuto: false,
      applicationStatus: "UNDER_REVIEW"
    },
    journeySteps: {
      check_eligibility: 1,
      loan_quote: 1,
      personal_details: 1,
      upload_documents: 1,
      ...
    }
  }
}
```

---

## STEP 6: FINAL DASHBOARD (UserDashboard)

### Triggers When:
- User comes back after applying
- `is_journey_completed == 1`
- MyJourney detects journeyComplete == 1

### File: `src/journey/Pages/UserDashboard.jsx`

```jsx
export default function UserDashboard() {
  const { loan_quote, personal_details, upload_documents } = useSelector(
    (state) => state?.customerJourneyDetails?.journeySteps
  );
  const journeyComplete = useSelector(
    (state) => state?.customerJourneyDetails?.customerDetails?.is_journey_completed
  );
  const customerDetails = useSelector(
    (state) => state?.customerJourneyDetails?.customerDetails
  );
  const [resCustomerDetails, setResCustomerDetails] = React.useState(null);

  // Fetch latest data
  async function fetchCustomerDetails() {
    const response = await getCustomerDetails({
      profileId: customerDetails?.profileId
    });
    setResCustomerDetails(response);

    if (response?.data?.apiStatus == 1) {
      dispatch(updateCustomerDetails(response?.data?.data?.customer_details));
      dispatch(updateJourneyEvents(response?.data?.data?.screen_details));
    }
  }

  useEffect(() => {
    fetchCustomerDetails();
  }, [customerDetails?.profileId]);

  // ═══════════════════════════════════════════════════════════
  // DECIDE: AUTO JOURNEY OR REGULAR JOURNEY?
  // ═══════════════════════════════════════════════════════════

  const handlejourney = () => {
    const lead_creation_mode = resCustomerDetails?.data?.data?.lead_detail?.lead_type;
    // Values: 1 (auto eligible) or 0 (manual only)

    const lead_process_mode = resCustomerDetails?.data?.data?.lead_detail?.lead_process_mode;
    // Values: 0 (complete manual), 2 (complete auto), other (partial)

    // LOGIC: Go to auto-journey if:
    // - lead_creation_mode == 1 (auto eligible)
    // - AND lead_process_mode is NOT 0 or 2 (not fully manual or fully auto yet)
    if (lead_creation_mode == 1 && ![2, 0].includes(lead_process_mode)) {
      navigate('/auto-journey');  // Start auto processing
      return;
    } else {
      navigate('/journey');  // Stay in regular journey
    }
  };

  // ═══════════════════════════════════════════════════════════
  // RENDER DASHBOARD
  // ═══════════════════════════════════════════════════════════

  return (
    <div className="dashboard">
      {/* CONTINUE TO APPLY BUTTON (only if not completed) */}
      {(journeyComplete == 0) && (
        <Button onClick={handlejourney}>
          Continue to Apply
        </Button>
      )}

      {/* BASIC CUSTOMER INFO */}
      <BasicInfo />

      {/* CREDIT SCORE */}
      <CreditManager />

      {/* APPLICATION STATUS */}
      <ApplicationStatus />

      {/* CONDITIONAL ACTION BUTTONS */}

      {customerDetails?.show_loan_history_flag === 1 && (
        <Button>
          <Link to='/journey/loan-history'>Loan History</Link>
        </Button>
      )}

      {customerDetails?.show_ekyc_btn_flag === 1 && (
        <Button>
          <Link to={customerDetails?.ekyc_url} target='_blank'>
            {customerDetails?.show_ekyc_btn_text}
          </Link>
        </Button>
      )}

      {customerDetails?.show_esign_btn_flag === 1 && (
        <Button>
          <Link to={customerDetails?.esign_url} target='_blank'>
            {customerDetails?.show_esign_btn_text}
          </Link>
        </Button>
      )}

      {customerDetails?.show_sanction_letter_btn_flag === 1 && (
        <Button>
          <Link to={customerDetails?.sanction_letter_url} target='_blank'>
            {customerDetails?.show_sanction_letter_btn_text}
          </Link>
        </Button>
      )}

      {/* APPLICATION STATUS MESSAGE */}
      <div className="status-message">
        Your application is in the {customerDetails?.applicationStatus || 'PENDING'} stage.
        Kindly contact customer support for further assistance.
      </div>
    </div>
  );
}
```

---

## AUTO JOURNEY ALTERNATIVE FLOW

### File: `src/journey/Pages/AutoMyJourney.jsx`

```jsx
export default function AutoMyJourney() {
  const customerStep = useSelector(
    (state) => state?.autoCustomerJourneyDetails?.journeySteps
  );
  const customerDetails = useSelector(
    (state) => state?.autoCustomerJourneyDetails?.customerDetails
  );
  const isAutoJourney = useSelector(
    (state) => state?.autoCustomerJourneyDetails?.customerDetails?.isAuto
  );

  // Fetch auto journey data
  async function fetchCustomerDetails() {
    let { payload } = await dispatch(autoCustomerDetailsApiCall(params));
    dispatch(updateAutoCustomerDetails(payload?.data?.data?.customer_details));
    dispatch(updateAutoJourneyEvents(payload?.data?.data?.screen_details));
  }

  useEffect(() => {
    fetchCustomerDetails();

    // If NOT auto journey, redirect back to regular
    if (!isAutoJourney) {
      navigate('/journey');  // Redirect if wrong mode
    }
  }, [customerStep?.check_eligibility]);

  // Similar conditional rendering to MyJourney, but with auto components
  return (
    <div>
      {(journeyComplete == 1) ? (
        <AutoUserDashboard />
      ) : (customerStep.check_eligibility == 1) ? (
        <AutoApplicationStep />
      ) : (
        <AutoPanDetails />
      )}
    </div>
  );
}
```

---

## COMPLETE STATE FLOW DIAGRAM

```
┌─────────────────────────────────────────────────────────────────────┐
│                      JOURNEY STATE MACHINE                          │
└─────────────────────────────────────────────────────────────────────┘

INITIAL STATE (after /redirect-to-journey)
├─ token: "jwt_abc123xyz"
├─ profileId: "PROF_12345"
├─ check_eligibility: 0
├─ journeyComplete: 0
└─ isAuto: false

AFTER PAN VERIFICATION ✅
├─ token: "jwt_abc123xyz"
├─ profileId: "PROF_12345"
├─ check_eligibility: 1 ← UPDATED BY BACKEND
├─ full_name: "John Doe"
├─ dob: "1990-01-15"
├─ pancard: "ABCDE1234F"
├─ monthly_income: "50000"
├─ journeyComplete: 0
└─ isAuto: false
    ↓ MyJourney re-renders → ApplicationStep visible

DURING APPLICATION FILLING ⚡
├─ check_eligibility: 1
├─ loan_quote: 2 ← User filling
├─ personal_details: 0 ← Locked
├─ upload_documents: 0 ← Locked
└─ isAuto: false
    ↓ After Tab 1 completion, backend updates:

AFTER TAB 1 COMPLETION ✅
├─ check_eligibility: 1
├─ loan_quote: 1 ← UPDATED TO 1
├─ personal_details: 2 ← NOW ACTIVE
├─ upload_documents: 0 ← Still locked
└─ isAuto: false
    ↓ User can click Tab 2, after completion:

AFTER TAB 2 COMPLETION ✅
├─ check_eligibility: 1
├─ loan_quote: 1
├─ personal_details: 1 ← UPDATED TO 1
├─ upload_documents: 2 ← NOW ACTIVE
└─ isAuto: false
    ↓ User can click Tab 3, after completion:

AFTER ALL TABS COMPLETION ✅✅✅
├─ check_eligibility: 1
├─ loan_quote: 1
├─ personal_details: 1
├─ upload_documents: 1 ← UPDATED TO 1
└─ isAuto: false
    ↓ useEffect detects all == 1 → auto-navigate

JOURNEY COMPLETE 🎉
├─ check_eligibility: 1
├─ loan_quote: 1
├─ personal_details: 1
├─ upload_documents: 1
├─ journeyComplete: 1 ← BACKEND MARKS COMPLETE
├─ isAuto: false (or true if auto path)
└─ applicationStatus: "UNDER_REVIEW"
    ↓ User now sees UserDashboard
    ↓ Can click optional action buttons (eKYC, eSign, etc.)
```

---

## KEY TAKEAWAYS - CODE FLOW

✅ **Three main rendering stages** controlled by status flags (0, 1, 2)
✅ **Redux dual-update** for both regular and auto journeys
✅ **API-driven progression** - backend controls status changes
✅ **Auto-navigation** - ApplicationStep auto-navigates on completion
✅ **Flag-based UI** - Dashboard buttons shown/hidden based on flags
✅ **Branching logic** - Auto journey vs regular journey decision in UserDashboard
✅ **Analytics tracking** - CleverTap events on every major step
✅ **Input validation** - PAN regex + income validation before API
✅ **Error handling** - Try-catch + toast notifications
✅ **State persistence** - Redux persisted to localStorage
