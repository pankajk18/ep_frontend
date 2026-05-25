# Complete `/journey` Route Deep Analysis

## Overview
The `/journey` route is the **protected customer application journey** where users go through a multi-step loan application process. It's wrapped by the `Layout` component which guards access via a token check.

---

## 1. ENTRY POINT: How Users Enter `/journey`

### Route Entry Flow
```
User lands on /redirect-to-journey?encId=xxx
           ↓
RedirectToJourney calls API with encId
           ↓
API returns token + profileId + journey data
           ↓
Redux state updated with token
           ↓
User redirected to /journey
           ↓
Layout verifies token exists
           ↓
MyJourney component renders
```

### Code in RedirectToJourney.jsx
```js
const resp = await redirectToJourney(encId);
dispatch(updateCustomerDetails({
    profileId: resp?.data?.data?.profileId,
    mobile: resp?.data?.data?.mobile,
    token: resp?.data?.data?.token
}));

if (resp?.data?.data?.journeyCompletedFlag === 1) {
    // Already completed
    window.location.href = '/journey/dashboard';
} else {
    // Start fresh journey
    navigate('/journey');
}
```

---

## 2. LAYOUT GUARD: Access Control

### File: `src/Layout.js`

```js
const customerDetails = useSelector((state) => state?.customerJourneyDetails?.customerDetails);
const checklogin = customerDetails?.token;

useEffect(() => {
  if (checklogin) {
    setLogin(true);  // ✅ Authenticated - render journey
  } else {
    handleLogout();
    navigate('/apply-now');  // ❌ No token - redirect out
  }
}, [checklogin, navigate]);
```

**Protected Routes Inside Layout:**
- `/journey` → NewDashboard → MyJourney
- `/journey/application` → ApplicationStep
- `/journey/dashboard` → UserDashboard
- `/journey/loan-history` → LoanHistory
- `/journey/loan-detail` → LoanDetail
- `/journey/congratulations` → ThankYou
- `/journey/support-detail` → Support
- `/journey/not-eligible` → NotEligible
- `/auto-journey*` → AutoJourney flow

---

## 3. REDUX STATE STRUCTURE

### File: `src/store/store.js`
```js
const rootReducer = combineReducers({
  customerJourneyDetails: customerJourneyDetailsReducer,  // Regular journey
  autoCustomerJourneyDetails: autoCustomerJourneyDetailsReducer  // Auto loan journey
});
```

### Redux State for Regular Journey
**Location:** `state.customerJourneyDetails`

```js
{
  customerDetails: {
    profileId: "12345",
    token: "abc123xyz",  // ← Auth token (required)
    mobile: "9876543210",
    full_name: "John Doe",
    dob: "1990-01-15",
    pancard: "ABCDE1234F",
    monthly_income: 50000,
    gender: "M",
    
    // COMPLETION FLAGS
    is_journey_completed: 0 or 1,  // ← Main completion flag
    isAuto: false or true,  // ← Auto journey flag
    
    // UI FLAGS for UserDashboard
    show_loan_history_flag: 0 or 1,
    show_ekyc_btn_flag: 0 or 1,
    show_esign_btn_flag: 0 or 1,
    show_sanction_letter_btn_flag: 0 or 1,
    
    ekyc_url: "https://...",
    esign_url: "https://...",
    sanction_letter_url: "https://...",
    
    applicationStatus: "PENDING" or "APPROVED" or "REJECTED",
    lead_id: "lead_123"
  },
  
  journeySteps: {
    check_eligibility: 0,  // Status flag
    loan_quote: 0,         // Status flag
    personal_details: 0,   // Status flag
    employment_details: 0,
    upload_documents: 0,   // Status flag
    aadhaar_upload: 0,
    pan_upload: 0,
    pay_slip_upload: 0,
    bank_statement_upload: 0,
    residence_proof_upload: 0,
    banking_details: 0,
    thank_you: 0
  },
  
  error: null
}
```

### Status Flag Values (0, 1, 2 meaning)
```
0 = NOT STARTED / INCOMPLETE / NOT ALLOWED
1 = COMPLETED ✅
2 = ACTIVE / IN PROGRESS / CURRENTLY FILLING
```

### Redux State for Auto Journey
**Location:** `state.autoCustomerJourneyDetails`
- Same structure but for automated loan processing
- Used when `customerDetails.isAuto === true`

---

## 4. MyJourney COMPONENT - The Main Logic Hub

### File: `src/journey/Pages/MyJourney.jsx`

#### Initial State Reading
```js
const customerStep = useSelector((state) => state?.customerJourneyDetails?.journeySteps);
const customerDetails = useSelector((state) => state?.customerJourneyDetails?.customerDetails);
const journeyComplete = useSelector((state) => state?.customerJourneyDetails?.customerDetails?.is_journey_completed);
const isAutoJourney = useSelector((state) => state?.customerJourneyDetails?.customerDetails?.isAuto);
```

#### API Call to Fetch Latest Journey Data
```js
async function fetchCustomerDetails() {
    if (params.profileId) {
        let { payload } = await dispatch(customerDetailsApiCall(params));
        
        if (payload?.data?.apiStatus == 1) {  // Success
            // Update BOTH regular and auto journey states
            dispatch(updateCustomerDetails(payload?.data?.data?.customer_details));
            dispatch(updateJourneyEvents(payload?.data?.data?.screen_details));
            dispatch(updateAutoCustomerDetails(payload?.data?.data?.customer_details));
            dispatch(updateAutoJourneyEvents(payload?.data?.data?.screen_details));
        }
    }
}
```

**Called on:** Component mount and when `check_eligibility` step status changes

#### Router Branching Logic
```js
useEffect(() => {
    fetchCustomerDetails();
    
    // AUTO JOURNEY CHECK - Most Important!
    if(isAutoJourney){  // If isAuto == true
        navigate('/auto-journey');  // Redirect to auto journey flow
        return;
    }
}, [customerStep?.check_eligibility]);
```

#### Conditional Rendering - THE CORE FLOW DECISION
```js
return (
  <div style={{ minHeight: '80vh' }}>
    {/* 
      CONDITIONAL TREE:
      
      IF journey_completed == 1
        → Show UserDashboard (final dashboard)
      
      ELSE IF check_eligibility == 1
        → Show ApplicationStep (multi-step application)
      
      ELSE
        → Show PanDetails (initial PAN verification)
    */}
    
    {(journeyComplete == 1) ? 
        <UserDashboard /> 
    : 
        (customerStep.check_eligibility == 1) ? 
            <ApplicationStep /> 
        : 
            <PanDetails />
    }
  </div>
);
```

---

## 5. THREE MAIN JOURNEY STAGES

### STAGE 1: PAN DETAILS (Initial Verification)
**Component:** `PanDetails.jsx`
**Condition:** `check_eligibility == 0`
**What it does:**
1. User enters 10-digit PAN number
2. User enters monthly income
3. Calls `getPanVerify()` API

**Success Flow:**
```js
const response = await getPanVerify({
    profileId: customerDetails?.profileId,
    pancard: fullPan,
    monthlyIncome: salary
});

if (response?.data?.apiStatus == 1) {
    // PAN verified - update Redux with extracted data
    dispatch(updateCustomerDetails({
        full_name: response?.data?.data?.name,
        dob: response?.data?.data?.dob,
        pancard: response?.data?.data?.panNumber,
        monthly_income: salary,
        gender: response?.data?.data?.gender
    }));
    
    // Track event
    window.clevertap?.event.push("lje_Pancard_Verfication", {
        "message": "PanCard Verified"
    });
}
```

**Triggers:** New `check_eligibility` status from API → refreshes MyJourney → moves to Stage 2

---

### STAGE 2: APPLICATION STEPS (Multi-step form)
**Component:** `ApplicationStep.jsx`
**Condition:** `check_eligibility == 1`
**What it does:** Renders 3 main tabs in sequence

#### Sub-components in ApplicationStep
```js
const navLinks = [
    {
        title: "Loan calculator",
        activeStatus: loan_quote == 2,  // Active if status == 2
        showSuccessIcon: loan_quote == 1,  // Show checkmark if status == 1
        tabContentElement: <LoanCalculator />
    },
    {
        title: "Personal Details",
        activeStatus: personal_details == 2,
        showSuccessIcon: personal_details == 1,
        tabContentElement: <PersonalInformation />
    },
    {
        title: "Documents Upload",
        activeStatus: upload_documents == 2,
        showSuccessIcon: upload_documents == 1,
        tabContentElement: <UploadDocument />
    }
];
```

#### Auto-completion Logic
```js
useEffect(() => {
    // If ALL main steps are completed (status == 1)
    if (loan_quote === 1 && personal_details === 1 && upload_documents === 1) {
        navigate("/journey/congratulations");  // Auto-navigate to completion
    }
}, [loan_quote, personal_details, upload_documents, navigate]);
```

**Sub-Steps Status Tracking:**
```
TAB 1: Loan Calculator
  ├─ Status 0: Not started
  ├─ Status 1: Completed ✅
  └─ Status 2: User is filling it now (active tab)

TAB 2: Personal Information
  ├─ Name, Email, Phone
  ├─ Employment info
  └─ Status 0/1/2 tracking

TAB 3: Document Upload
  ├─ PAN upload
  ├─ Aadhaar upload
  ├─ Pay slip upload
  ├─ Bank statement upload
  ├─ Residence proof upload
  └─ Status 0/1/2 tracking
```

---

### STAGE 3: USER DASHBOARD (Completed/In-progress view)
**Component:** `UserDashboard.jsx`
**Condition:** `is_journey_completed == 1` OR journey already in progress

#### Dashboard Features
```js
const handlejourney = () => {
    var lead_creation_mode = resCustomerDetails?.data?.data?.lead_detail?.lead_type;
    var lead_process_mode = resCustomerDetails?.data?.data?.lead_detail?.lead_process_mode;
    
    // CRITICAL: Route to auto-journey based on lead type
    if(lead_creation_mode == 1 && ![2,0].includes(lead_process_mode)){
        navigate('/auto-journey');  // Go to auto loan process
        return;
    }else {
        navigate('/journey');  // Back to regular journey
    }
};
```

**Dashboard Components:**
1. **ProfileNav** - Left sidebar with profile menu
2. **BasicInfo** - Customer basic information
3. **CreditManager** - Credit score / credit info
4. **ApplicationStatus** - Current application stage
5. **Loan History Button** - If `show_loan_history_flag == 1`
6. **eKYC Button** - If `show_ekyc_btn_flag == 1`
7. **eSign Button** - If `show_esign_btn_flag == 1`
8. **Sanction Letter Button** - If `show_sanction_letter_btn_flag == 1`

#### Conditional Button Rendering
```js
{(journeyComplete == 0) && (
  <Button onClick={handlejourney}>
    Continue to Apply
  </Button>
)}

{customerDetails?.show_loan_history_flag === 1 && (
  <Button>Loan History</Button>
)}

{customerDetails?.show_ekyc_btn_flag === 1 && (
  <Button>
    <Link to={customerDetails?.ekyc_url} target='_blank'>
      {customerDetails?.show_ekyc_btn_text}
    </Link>
  </Button>
)}

// Similar for eSign and Sanction Letter...
```

---

## 6. AUTO JOURNEY BRANCHING

### When Does Auto Journey Trigger?

**Trigger Condition 1:** In MyJourney
```js
if(isAutoJourney){  // isAuto == true
    navigate('/auto-journey');
}
```

**Trigger Condition 2:** In UserDashboard
```js
if(lead_creation_mode == 1 && ![2,0].includes(lead_process_mode)){
    navigate('/auto-journey');
}
```

### AutoJourney Flow
**File:** `src/journey/Pages/AutoMyJourney.jsx`

```js
const customerStep = useSelector((state) => state?.autoCustomerJourneyDetails?.journeySteps);
const customerDetails = useSelector((state) => state?.autoCustomerJourneyDetails?.customerDetails);
const isAutoJourney = useSelector((state) => state?.autoCustomerJourneyDetails?.customerDetails?.isAuto);

// Fetch auto-specific data
async function fetchCustomerDetails() {
    let { payload } = await dispatch(autoCustomerDetailsApiCall(params));
    dispatch(updateAutoCustomerDetails(...));
    dispatch(updateAutoJourneyEvents(...));
}

// If NOT auto journey, redirect back to regular
if(!isAutoJourney){
    navigate('/journey');
}

return (
    // Conditionally render different auto components
    // Similar structure to MyJourney but with auto-specific components
);
```

### Auto Journey Sub-components
- **AutoPersonalInformation** - Auto-populated personal info
- **AutoLoanCalculator** - Auto loan quote calculation
- **AutoEkyc** - Automated eKYC process
- **AutoBankDetails** - Auto bank verification
- **AutoEnach** - Auto eNACH mandate setup
- **AutoSanction** - Auto sanction letter

---

## 7. COMPLETION PATHS

### Path 1: Normal Journey Completion
```
PanDetails (check_eligibility = 0)
    ↓
[API updates check_eligibility to 1]
    ↓
MyJourney re-renders
    ↓
ApplicationStep visible (check_eligibility == 1)
    ↓
User completes all 3 tabs
    ↓
[Each tab completion updates status to 1]
    ↓
UseEffect detects: loan_quote=1 AND personal_details=1 AND upload_documents=1
    ↓
Auto-navigate to /journey/congratulations
    ↓
ThankYou component renders
```

### Path 2: Journey Already Completed
```
User enters /redirect-to-journey?encId=xxx
    ↓
[journeyCompletedFlag == 1]
    ↓
Redirect to /journey/dashboard
    ↓
[is_journey_completed == 1]
    ↓
UserDashboard renders (not MyJourney)
```

### Path 3: Not Eligible Path
```
[During eligibility check, API returns not_eligible status]
    ↓
App navigates to /journey/not-eligible
    ↓
NotEligible component renders
```

### Path 4: Auto Journey Path
```
MyJourney detects isAuto == true
    ↓
Navigate to /auto-journey
    ↓
AutoMyJourney component renders
    ↓
Auto-journey sub-steps flow
    ↓
Complete → /journey/congratulations
```

---

## 8. KEY FLAGS AND THEIR MEANINGS

### Customer Detail Flags
| Flag | Type | Values | Meaning |
|------|------|--------|---------|
| `token` | String | Present/Null | User authenticated for journey |
| `is_journey_completed` | Number | 0/1 | Journey fully completed |
| `isAuto` | Boolean | true/false | Auto loan journey mode |
| `show_loan_history_flag` | Number | 0/1 | Show loan history button on dashboard |
| `show_ekyc_btn_flag` | Number | 0/1 | Show eKYC button |
| `show_esign_btn_flag` | Number | 0/1 | Show eSign button |
| `show_sanction_letter_btn_flag` | Number | 0/1 | Show sanction letter button |
| `applicationStatus` | String | PENDING/APPROVED/REJECTED | Current application stage |

### Journey Step Status Values
| Status | Meaning | UI Behavior |
|--------|---------|-------------|
| 0 | Not started / Not allowed | Disabled state, lock icon |
| 1 | Completed | Show checkmark, can view summary |
| 2 | Active / In progress | Tab is editable, highlight active |

### Lead Type and Process Mode
```js
lead_type: 1 = Auto loan eligible
lead_process_mode: 0 = Complete manual process
                   2 = Complete auto process
                   Other = Partial/mixed process
```

---

## 9. API CALLS IN JOURNEY FLOW

| Step | API | Input | Output |
|------|-----|-------|--------|
| PAN Verification | `getPanVerify()` | pancard, monthlyIncome | full_name, dob, gender |
| Eligibility Check | `getEligibility()` | income, pan | eligibility status, loan amount |
| Loan Quote | `getLoanQuote()` | loanAmount, tenure | EMI, rate, total amount |
| Personal Details | `getPersonalDetail()` | name, email, phone, address | confirmation |
| Document Upload | `getDocsUpload()` | FormData with files | upload status |
| Bank Verification | `getBankVerify()` | account, ifsc | verified/rejected |
| Customer Details Fetch | `getCustomerDetails()` | profileId | All journey data, current status |

---

## 10. COMPLETE JOURNEY FLOW DIAGRAM

```
LOGIN / REDIRECT ENTRY
        ↓
/redirect-to-journey?encId=xxx
        ↓
API Call: redirectToJourney(encId)
        ↓
    ┌───┴────┐
    │         │
[COMPLETED]  [IN PROGRESS]
    │         │
    ↓         ↓
/journey/   /journey
dashboard       │
    │           ├─────────────────────────────┐
    │           │                             │
    │      Is Auto?                      Is Auto?
    │      /isAuto                       (isAuto)
    │    ┌─┴─┐                          ┌─┴─┐
    │    │   │                          │   │
    │   YES NO                         YES NO
    │    │   │                          │   │
    │    │   ↓                          ↓   └─────┐
    │    │MyJourney                  AutoJourney  │
    │    │   │                        (Auto flow) │
    │    └─┬─┘                                    │
    │      │                                      │
    │      ├─ check_eligibility == 0?            │
    │      │    ↓ YES: Show PanDetails           │
    │      │    ├─ Enter PAN                     │
    │      │    ├─ Enter Income                  │
    │      │    └─ Verify (API call)             │
    │      │                                      │
    │      ├─ check_eligibility == 1?            │
    │      │    ↓ YES: Show ApplicationStep      │
    │      │    ├─ Tab 1: Loan Calculator        │
    │      │    │   (status: loan_quote)         │
    │      │    ├─ Tab 2: Personal Details       │
    │      │    │   (status: personal_details)   │
    │      │    └─ Tab 3: Documents Upload       │
    │      │        (status: upload_documents)   │
    │      │                                      │
    │      └─ All tabs == 1?                     │
    │           ↓ YES: Auto-navigate             │
    │           └─→ /journey/congratulations     │
    │               (ThankYou component)         │
    │                                            │
    │        NOT ELIGIBLE PATH:                  │
    │        /journey/not-eligible               │
    │        (NotEligible component)             │
    │                                            │
    ├─ is_journey_completed == 1                 │
    │    ↓ YES: Show UserDashboard               │
    │    ├─ Profile Info                         │
    │    ├─ Credit Manager                       │
    │    ├─ Application Status                   │
    │    ├─ Conditional Buttons:                 │
    │    │   └─ Loan History (flag check)        │
    │    │   └─ eKYC (flag check)                │
    │    │   └─ eSign (flag check)               │
    │    │   └─ Sanction Letter (flag check)     │
    │    └─ "Continue to Apply" button           │
    │        (if is_journey_completed == 0)      │
    │                                            │
    └────────────────┬───────────────────────────┘
                     │
           (Optional Support/Help)
                     │
        /journey/support-detail (Support)
        /journey/loan-history (LoanHistory)
        /journey/loan-detail (LoanDetail)
```

---

## 11. MAJOR CALCULATIONS & CRITERIA

### PAN Validation Regex
```js
const isValidPan = /^[A-Z]{5}[0-9]{4}[A-Z]$/.test(fullPan);
// Format: ABCDE1234F
// First 5: Letters
// Next 4: Digits
// Last 1: Letter
```

### Income Validation
```js
const salaryValid = salary && /^\d+$/.test(salary) && parseInt(salary) > 0;
// Must be: numeric, positive, non-zero
```

### Journey Completion Criteria
```js
const allStepsCompleted = 
    loan_quote === 1 &&           // Loan amount selected ✅
    personal_details === 1 &&     // Personal info filled ✅
    upload_documents === 1;        // All docs uploaded ✅

if (allStepsCompleted) {
    navigate("/journey/congratulations");
}
```

### Lead Type Decision (Auto vs Manual)
```js
lead_creation_mode == 1 &&        // Auto-eligible lead
![2, 0].includes(lead_process_mode)  // NOT (complete manual OR partial)
```

---

## 12. REDUX PERSISTENCE

**File:** `src/store/store.js`

```js
const persistConfig = {
  key: "root",
  storage,  // localStorage
  // Everything in store persists
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
```

**What persists:**
- `customerJourneyDetails` (token, profile, journey steps)
- `autoCustomerJourneyDetails` (auto journey state)

**Survives:** Page refresh, browser close (within localStorage expiry)

---

## 13. CLEVERTAP EVENT TRACKING

Journey events tracked for analytics:

```js
// PAN verification success
window.clevertap?.event.push("lje_Pancard_Verfication", {
    "message": "PanCard Verified"
});

// PAN verification failure
window.clevertap?.event.push("lje_Pancard_Failed", {
    message: "PanCard Verification Failed: {reason}"
});

// Income capture
window.clevertap?.event.push("lje_income_details", {
    "message": `Income: ${salary}`
});

// Logout
window.clevertap?.event.push("lje_logout", {
    "message": "User logged out"
});
```

---

## 14. ERROR HANDLING & EDGE CASES

### No Token (Unauthorized)
```js
// Layout.js
if (!checklogin) {
    handleLogout();
    navigate('/apply-now');  // Redirect to application
}
```

### PAN Verification Failure
```js
if (response?.data?.apiStatus !== 1) {
    toast.error(response?.data?.message);
    // Stay on PanDetails, allow retry
}
```

### API Failure During Journey
```js
catch (error) {
    console.error(error);
    toast.error("Error verifying PAN. Please check your connection or try later.");
}
```

### Not Eligible
```js
// API returns not eligible
navigate('/journey/not-eligible');
```

### Auto Journey Mismatch
```js
// In AutoMyJourney:
if(!isAutoJourney){
    navigate('/journey');  // Wrong journey type, redirect
}
```

---

## 15. SUMMARY TABLE

| Component | Location | Shows When | What It Does |
|-----------|----------|-----------|--------------|
| **MyJourney** | `/journey` | Always (entry) | Decides which stage to show |
| **PanDetails** | Stage 1 | check_eligibility = 0 | Verify PAN + income |
| **ApplicationStep** | Stage 2 | check_eligibility = 1 | 3-step form (loan calc, personal, docs) |
| **UserDashboard** | Stage 3 | is_journey_completed = 1 | Show profile + optional actions |
| **ThankYou** | `/journey/congratulations` | All steps = 1 | Completion acknowledgment |
| **NotEligible** | `/journey/not-eligible` | API says not eligible | Rejection page |
| **AutoMyJourney** | `/auto-journey` | isAuto = true | Auto-processing flow |

---

## 16. KEY TAKEAWAYS

✅ **Three-stage journey:** PAN → Application → Dashboard
✅ **Status-driven:** All rendering based on Redux journey steps (0, 1, 2)
✅ **Auto-branching:** Checks `isAuto` flag to route to auto journey
✅ **Protected:** Layout guards with token check
✅ **Persistent:** Redux state saved to localStorage
✅ **Analytics:** Every major action tracked via CleverTap
✅ **Conditional UI:** Dashboard shows buttons based on feature flags
✅ **Auto-completion:** ApplicationStep auto-navigates when all steps = 1
✅ **API-driven:** All progress controlled by backend journey data
