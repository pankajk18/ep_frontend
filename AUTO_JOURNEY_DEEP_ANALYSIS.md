# AUTO JOURNEY DEEP ANALYSIS & COMPARISON

---

## PART 1: AUTO JOURNEY ENTRY AND CONTROL FLOW

### File: `src/journey/Pages/AutoMyJourney.jsx`

```jsx
export default function AutoMyJourney() {
  // ═══════════════════════════════════════════════════════════════════════════
  // 1️⃣ READ FROM AUTO JOURNEY REDUX STATE (separate from regular journey)
  // ═══════════════════════════════════════════════════════════════════════════
  
  const customerStep = useSelector(
    (state) => state?.autoCustomerJourneyDetails?.journeySteps
  );
  // Reads from: state.autoCustomerJourneyDetails (NOT customerJourneyDetails)
  
  const customerDetails = useSelector(
    (state) => state?.autoCustomerJourneyDetails?.customerDetails
  );
  
  const journeyComplete = useSelector(
    (state) => state?.autoCustomerJourneyDetails?.customerDetails?.is_journey_completed
  );
  
  const isAutoJourney = useSelector(
    (state) => state?.autoCustomerJourneyDetails?.customerDetails?.isAuto
  );
  // Key flag: isAuto must be TRUE for this flow
  
  // 2️⃣ FALLBACK TO MANUAL JOURNEY REDUX (for profileId)
  const customerDetailsmanual = useSelector(
    (state) => state?.customerJourneyDetails?.customerDetails
  );
  // Fallback: Get profileId from regular journey state
  
  // ═══════════════════════════════════════════════════════════════════════════
  // 2️⃣ FETCH AUTO JOURNEY DATA
  // ═══════════════════════════════════════════════════════════════════════════
  
  async function fetchCustomerDetails() {
    // Use profileId from MANUAL journey (fallback)
    params.profileId = customerDetailsmanual?.profileId;
    
    if (params.profileId) {
      let { payload } = await dispatch(autoCustomerDetailsApiCall(params));
      
      if (payload?.data?.apiStatus == 1) {
        // UPDATE BOTH AUTO AND MANUAL STATES (dual sync)
        dispatch(updateAutoCustomerDetails(
          payload?.data?.data?.customer_details
        ));
        dispatch(updateAutoJourneyEvents(
          payload?.data?.data?.screen_details
        ));
        
        // Also update manual journey state (cross-sync)
        dispatch(updateCustomerDetails(
          payload?.data?.data?.customer_details
        ));
        dispatch(updateJourneyEvents(
          payload?.data?.data?.screen_details
        ));
      }
    }
  }
  
  // ═══════════════════════════════════════════════════════════════════════════
  // 3️⃣ EFFECT: FETCH & VALIDATE AUTO JOURNEY MODE
  // ═══════════════════════════════════════════════════════════════════════════
  
  useEffect(() => {
    fetchCustomerDetails();
    
    // 🔴 CRITICAL GUARD: Verify user is in auto journey mode
    if (!isAutoJourney) {
      // If isAuto is FALSE or missing → redirect to regular journey
      navigate('/journey');
      // User ends up back in MyJourney flow
    }
  }, [customerStep?.check_eligibility]);
  // Re-run when eligibility status changes
  
  // ═══════════════════════════════════════════════════════════════════════════
  // 4️⃣ CONDITIONAL RENDERING (3-WAY BRANCHING, SAME AS REGULAR JOURNEY)
  // ═══════════════════════════════════════════════════════════════════════════
  
  return (
    <div style={{ minHeight: '80vh' }}>
      {/* BRANCHING:
          IF is_journey_completed == 1
            → UserDashboard (completed state)
          
          ELSE IF check_eligibility == 1
            → AutoApplicationStep (auto-specific multi-step form)
          
          ELSE
            → PanDetails (initial PAN verification, SAME as regular)
      */}
      
      {(journeyComplete == 1) ? 
        <UserDashboard />
      : 
        (customerStep.check_eligibility == 1) ? 
          <AutoApplicationStep />  // ← Different component!
        : 
          <PanDetails />  // ← Same component as regular journey
      }
    </div>
  );
}
```

### Key Differences in AutoMyJourney vs MyJourney

| Aspect | Regular (MyJourney) | Auto (AutoMyJourney) |
|--------|-------------------|----------------------|
| Redux State | `state.customerJourneyDetails` | `state.autoCustomerJourneyDetails` |
| ProfileId Source | Direct from auto state | Fallback from manual state |
| Guard Check | `if(isAutoJourney) navigate('/auto-journey')` | `if(!isAutoJourney) navigate('/journey')` |
| Main Component | `ApplicationStep` | `AutoApplicationStep` |
| PAN Step | `PanDetails` (reused) | `PanDetails` (reused) |
| Dual State Update | Single state update | **Dual state update** (both auto + manual) |

---

## PART 2: REDUX STATE STRUCTURE COMPARISON

### File: `src/CustomerJourneyDetails/AutoCustomerJourneyDetails.js`

```js
// ═══════════════════════════════════════════════════════════════════════════
// AUTO JOURNEY REDUX SLICE
// ═══════════════════════════════════════════════════════════════════════════

const initialState = {
  customerDetails: {},
  journeySteps: {
    // REGULAR JOURNEY STEPS (in MyJourney):
    check_eligibility: 0,
    loan_quote: 0,
    personal_details: 0,
    upload_documents: 0,
    
    // ADDITIONAL AUTO JOURNEY STEPS (new fields):
    banking_details: 0,           // ← New: Bank verification
    ekyc_detail: 0,              // ← New: Aadhaar eKYC
    sanction: 0,                 // ← New: Sanction & eSign
    enach_detail: 0,             // ← New: eNACH mandate
    account_aggregator: 0,       // ← New: Account aggregator link
    loan_offer_accept: 0,        // ← New: Loan offer acceptance
    
    remain_tab_show: false       // ← New: Controls which tabs show
  },
  error: null
};
```

### COMPARISON: Journey Steps

```
┌─────────────────────────────────────────────────────────────────────────┐
│                        JOURNEY STEPS COMPARISON                         │
├─────────────────────────────────────────────────────────────────────────┤
│ REGULAR JOURNEY (3 steps)    │ AUTO JOURNEY (9 steps + flags)          │
├──────────────────────────────┼──────────────────────────────────────────┤
│ 0. check_eligibility         │ 0. check_eligibility                    │
│ 1. loan_quote                │ 1. loan_quote                           │
│ 2. personal_details          │ 2. personal_details                     │
│ 3. upload_documents          │ 3. upload_documents                     │
│                              │ 4. account_aggregator ← NEW             │
│                              │ 5. banking_details ← NEW                │
│                              │ 6. ekyc_detail ← NEW                    │
│                              │ 7. sanction ← NEW                       │
│                              │ 8. enach_detail ← NEW                   │
│                              │ 9. loan_offer_accept ← NEW              │
│                              │ 10. remain_tab_show (flag) ← NEW        │
└──────────────────────────────┴──────────────────────────────────────────┘
```

### Auto-completion Condition: Regular vs Auto

**Regular Journey:**
```js
if (
  loan_quote === 1 &&
  personal_details === 1 &&
  upload_documents === 1
) {
  navigate("/journey/congratulations");
}
```

**Auto Journey:**
```js
if (
  loan_quote === 1 &&
  account_aggregator === 1 &&
  personal_details === 1 &&
  banking_details === 1 &&
  sanction === 1 &&
  ekyc_detail === 1 &&
  enach_detail === 1
) {
  navigate("/journey/congratulations");
}
```

**Completion Requirements:**
- Regular: 3 steps must all be = 1 ✅
- Auto: 7 steps must all be = 1 ✅

---

## PART 3: AUTO APPLICATION STEP - THE MAIN DIFFERENCE

### File: `src/journey/Pages/AutoApplicationStep.jsx`

```jsx
export default function AutoApplicationStep() {
  // ═══════════════════════════════════════════════════════════════════════════
  // 1️⃣ READ AUTO JOURNEY STEPS (9 steps instead of 3)
  // ═══════════════════════════════════════════════════════════════════════════
  
  let {
    loan_quote,              // Status: 0/1/2
    personal_details,        // Status: 0/1/2
    banking_details,         // ← NEW
    ekyc_detail,            // ← NEW (not ekyc, note the name)
    sanction,               // ← NEW
    enach_detail,           // ← NEW
    upload_documents,       // Status: 0/1/2
    account_aggregator,     // ← NEW
    loan_offer_accept,      // ← NEW
    remain_tab_show,        // ← NEW (boolean flag, not status 0/1/2)
  } = useSelector((state) => state?.autoCustomerJourneyDetails.journeySteps);
  
  let { lead_id } = useSelector(
    (state) => state?.autoCustomerJourneyDetails?.customerDetails
  );
  
  const customerDetails = useSelector(
    (state) => state.autoCustomerJourneyDetails.customerDetails
  );
  
  // ═══════════════════════════════════════════════════════════════════════════
  // 2️⃣ AUTO-COMPLETION WITH 7 CONDITIONS (vs 3 in regular)
  // ═══════════════════════════════════════════════════════════════════════════
  
  useEffect(() => {
    if (
      loan_quote === 1 &&
      account_aggregator === 1 &&
      personal_details === 1 &&
      banking_details === 1 &&
      sanction === 1 &&
      ekyc_detail === 1 &&
      enach_detail === 1
    ) {
      navigate("/journey/congratulations");
    }
  }, [
    loan_quote,
    personal_details,
    banking_details,
    sanction,
    ekyc_detail,
    enach_detail,
    account_aggregator,
    navigate,
  ]);
  
  // ═══════════════════════════════════════════════════════════════════════════
  // 3️⃣ TAB CONFIGURATION (9 TABS vs 3 in regular)
  // ═══════════════════════════════════════════════════════════════════════════
  
  const navLinks = [
    // TAB 1: PRE-APPROVED LOAN OFFER (loan_quote)
    {
      title: "Pre-approved Loan Offer",
      activeStatus: loan_quote == 2,
      showSuccessIcon: loan_quote == 1,
      tabContentElement:
        customerDetails?.isAuto == true &&
        customerDetails?.show_auto_loan_quote == true
          ? <AutoLoanOffer />
          : <LoanCalculator />,
      defaultShowStatus: remain_tab_show == false,  // ← Visibility controlled by flag
    },
    
    // TAB 2: EKYC (AADHAAR VERIFICATION) (ekyc_detail)
    {
      title: "Ekyc (Aadhaar Verification)",
      activeStatus: ekyc_detail == 2,
      showSuccessIcon: ekyc_detail == 1,
      tabContentElement: <AutoEkyc />,  // ← Auto component
      defaultShowStatus: remain_tab_show == false,
    },
    
    // TAB 3: PERSONAL (CURRENT RESIDENCE & SELFIE) (personal_details)
    {
      title: "Personal (Current Residence & Selfie)",
      activeStatus: personal_details == 2,
      showSuccessIcon: personal_details == 1,
      tabContentElement: <AutoPersonalInformation />,  // ← Auto component
      defaultShowStatus: remain_tab_show == false,
    },
    
    // TAB 4: DOCUMENTS UPLOAD (upload_documents)
    {
      title: "Documents Upload",
      activeStatus: upload_documents == 2,
      showSuccessIcon: upload_documents == 1,
      tabContentElement: <UploadDocument />,
      defaultShowStatus: customerDetails?.show_upload_docs == true,
    },
    
    // TAB 5: ACCOUNT AGGREGATOR (account_aggregator)
    {
      title: "Account Aggregator",
      activeStatus: account_aggregator == 2,
      showSuccessIcon: account_aggregator == 1,
      tabContentElement: <AccountAggregator />,  // ← NEW AUTO COMPONENT
      defaultShowStatus: customerDetails?.show_upload_docs == true,
    },
    
    // TAB 6: LOAN OFFER ACCEPTANCE (loan_offer_accept)
    {
      title: "Loan Offer Acceptance",
      activeStatus: loan_offer_accept == 2,
      showSuccessIcon: loan_offer_accept == 1,
      tabContentElement: <LoanOfferAcceptance />,  // ← NEW AUTO COMPONENT
      defaultShowStatus:
        remain_tab_show == true && customerDetails?.show_upload_docs == true,
      // ↑ CONDITIONAL VISIBILITY: Depends on BOTH flags
    },
    
    // TAB 7: BANK VERIFICATION (PENNY DROP) (banking_details)
    {
      title: "Bank Verification (Penny Drop)",
      activeStatus: banking_details == 2,
      showSuccessIcon: banking_details == 1,
      tabContentElement: <AutoBankDetails />,  // ← Auto component
      defaultShowStatus: remain_tab_show == true,  // ← Only shows when flag TRUE
    },
    
    // TAB 8: SANCTION & ESIGN (sanction)
    {
      title: "Sanction & eSign",
      activeStatus: sanction == 2,
      showSuccessIcon: sanction == 1,
      tabContentElement: <AutoSanction />,  // ← Auto component
      defaultShowStatus: remain_tab_show == true,
    },
    
    // TAB 9: ENACH MANDATE (enach_detail)
    {
      title: "Enach Mandate",
      activeStatus: enach_detail == 2,
      showSuccessIcon: enach_detail == 1,
      tabContentElement: <AutoEnach />,  // ← Auto component
      defaultShowStatus: remain_tab_show == true,
    },
  ];
  
  // ═══════════════════════════════════════════════════════════════════════════
  // 4️⃣ RENDERING LOGIC
  // ═══════════════════════════════════════════════════════════════════════════
  
  return (
    <div>
      {/* Render tabs only if defaultShowStatus is true */}
      {navLinks.map((step) => (
        step.defaultShowStatus == true && (  // ← Visibility gate
          <div key={step.id} className="nav-link">
            {step.activeStatus && <span>Active</span>}
            {step.showSuccessIcon && <CheckCircleIcon />}
            {step.title}
          </div>
        )
      ))}
      
      {/* Tab content */}
      {navLinks.map((tabPanes) => (
        tabPanes.defaultShowStatus &&
        tabPanes.activeStatus && (
          <div key={tabPanes.tabContentId} className="tab-pane">
            {tabPanes.tabContentElement}
          </div>
        )
      ))}
    </div>
  );
}
```

---

## PART 4: KEY DIFFERENCES - SIDE BY SIDE

### Tab Structure Comparison

```
┌────────────────────────────────────────────────────────────────────────────┐
│                         TAB STRUCTURE COMPARISON                           │
├────────────────────────────────────────────────────────────────────────────┤
│ REGULAR JOURNEY          │ AUTO JOURNEY                                    │
├──────────────────────────┼─────────────────────────────────────────────────┤
│ Tab 1: Loan Calculator   │ Tab 1: Pre-approved Loan Offer                 │
│         (loan_quote)     │         (loan_quote)                           │
│         ↓                 │         + Conditional component                │
│         PanDetails       │         (show_auto_loan_quote check)            │
│                          │                                                 │
│ Tab 2: Personal Details  │ Tab 2: eKYC (Aadhaar Verification)             │
│         (personal_details)│        (ekyc_detail)                          │
│                          │        + AutoEkyc component                    │
│                          │        + Aadhaar verification logic             │
│                          │                                                 │
│ Tab 3: Documents Upload  │ Tab 3: Personal (Current Residence & Selfie)  │
│         (upload_documents)│        (personal_details)                     │
│                          │        + Selfie capture                        │
│                          │        + Location-based verification           │
│                          │                                                 │
│                          │ Tab 4: Documents Upload                        │
│                          │        (upload_documents)                      │
│                          │                                                 │
│                          │ Tab 5: Account Aggregator ← NEW                │
│                          │        (account_aggregator)                    │
│                          │        + Bank account linking                  │
│                          │                                                 │
│                          │ Tab 6: Loan Offer Acceptance ← NEW             │
│                          │        (loan_offer_accept)                     │
│                          │        + Conditional visibility                │
│                          │        (remain_tab_show == true)               │
│                          │                                                 │
│                          │ Tab 7: Bank Verification (Penny Drop) ← NEW    │
│                          │        (banking_details)                       │
│                          │        + Penny drop verification               │
│                          │        + (remain_tab_show == true)             │
│                          │                                                 │
│                          │ Tab 8: Sanction & eSign ← NEW                  │
│                          │        (sanction)                              │
│                          │        + Redirect to sanction URL              │
│                          │        + eSign process                         │
│                          │        + (remain_tab_show == true)             │
│                          │                                                 │
│                          │ Tab 9: eNACH Mandate ← NEW                     │
│                          │        (enach_detail)                          │
│                          │        + Auto-debit mandate setup              │
│                          │        + (remain_tab_show == true)             │
└──────────────────────────┴─────────────────────────────────────────────────┘

VISIBILITY LOGIC:
- remain_tab_show == false  → Early tabs show (1-5)
- remain_tab_show == true   → Later tabs show (6-9)
```

### Auto-Completion Trigger Comparison

```
REGULAR JOURNEY:
┌─────────────┐   ┌──────────────┐   ┌──────────────────┐
│ loan_quote  │   │ personal_    │   │ upload_          │
│    == 1     │ + │ details == 1 │ + │ documents == 1   │
└─────────────┘   └──────────────┘   └──────────────────┘
        ↓                 ↓                      ↓
        ALL MUST BE 1 FOR COMPLETION ✅


AUTO JOURNEY:
┌─────────────┐   ┌──────────────┐   ┌──────────────────┐
│ loan_quote  │   │ account_     │   │ personal_        │
│    == 1     │ + │ aggregator   │ + │ details == 1     │
└─────────────┘   └──────────────┘   └──────────────────┘
        ↓                 ↓                      ↓
┌─────────────────────────────────────────────────────────┐
│ banking_    │ + │ sanction │ + │ ekyc_   │ + │ enach_  │
│ details == 1│   │   == 1   │   │ detail==1│   │detail==1│
└─────────────────────────────────────────────────────────┘
   7 CONDITIONS ALL MUST BE 1 FOR COMPLETION ✅
```

---

## PART 5: MAJOR FLAGS IN AUTO JOURNEY

### Customer Detail Flags (Auto-specific)

| Flag | Type | Values | Usage |
|------|------|--------|-------|
| `isAuto` | Boolean | true/false | Gate: Only enters AutoMyJourney if TRUE |
| `show_auto_loan_quote` | Boolean | true/false | Controls Tab 1 component (AutoLoanOffer vs LoanCalculator) |
| `show_upload_docs` | Boolean | true/false | Controls Tab 4 visibility + Tab 5 visibility |
| `enach_url` | String | URL or null | Redirect link for eNACH mandate (Tab 9) |
| `lead_id` | String | ID | Used for sanction/eSign API calls |

### Journey Steps Flags (Auto-specific)

| Flag | Type | Values | Meaning |
|------|------|--------|---------|
| `remain_tab_show` | Boolean | true/false | **Master flag** that toggles between early tabs (1-5) and later tabs (6-9) |
| `account_aggregator` | Number | 0/1/2 | Account aggregator linking status |
| `ekyc_detail` | Number | 0/1/2 | Aadhaar eKYC completion status |
| `sanction` | Number | 0/1/2 | Sanction letter & eSign status |
| `enach_detail` | Number | 0/1/2 | eNACH mandate status |
| `loan_offer_accept` | Number | 0/1/2 | Loan offer acceptance status |
| `banking_details` | Number | 0/1/2 | Bank verification (penny drop) status |

### The Critical `remain_tab_show` Flag

```js
// EARLY TABS (remain_tab_show == false)
Tab 1: Loan Offer          → defaultShowStatus: remain_tab_show == false
Tab 2: eKYC               → defaultShowStatus: remain_tab_show == false
Tab 3: Personal           → defaultShowStatus: remain_tab_show == false
Tab 4: Documents          → defaultShowStatus: customerDetails?.show_upload_docs == true
Tab 5: Account Aggregator → defaultShowStatus: customerDetails?.show_upload_docs == true

// LATER TABS (remain_tab_show == true)
Tab 6: Loan Offer Acceptance → defaultShowStatus: remain_tab_show == true && show_upload_docs == true
Tab 7: Bank Verification     → defaultShowStatus: remain_tab_show == true
Tab 8: Sanction & eSign      → defaultShowStatus: remain_tab_show == true
Tab 9: eNACH Mandate         → defaultShowStatus: remain_tab_show == true

// TRIGGER: When is remain_tab_show set to true?
- In AutoPersonalInformation.jsx, after successful personal details submission:
  dispatch(updateAutoJourneyEvents({
    remain_tab_show: response.validationStatus  // From backend
  }))
```

---

## PART 6: AUTO JOURNEY COMPONENT DETAILS

### Tab 2: AutoEkyc (Aadhaar Verification)

```jsx
// File: src/journey/Pages/AutoEkyc.jsx

export default function AutoEkyc() {
  const customerDetails = useSelector(
    (state) => state?.autoCustomerJourneyDetails?.customerDetails
  );
  const leadId = customerDetails?.lead_id;
  
  const [searchParams] = useSearchParams();
  
  useEffect(() => {
    // Check if returning from Aadhaar verification
    if (searchParams.get('status') === 'success') {
      // Process eKYC success
      const ekycResponse = {...};
      
      if (ekycResponse?.data?.Status === 1) {
        // eKYC successful
        dispatch(updateAutoJourneyEvents({ ekyc_detail: 1 }));
        // Move to next tab
      }
    }
  }, [searchParams]);
  
  // Redirects to external Aadhaar verification service
  return <div>eKYC verification in progress...</div>;
}
```

**Flow:**
- User clicks Tab 2 (eKYC)
- Redirected to Aadhaar verification portal
- Portal verifies Aadhaar against PAN
- Returns with status in URL params
- If success: Updates ekyc_detail = 1
- User can proceed to Tab 3

### Tab 3: AutoPersonalInformation (Selfie + Marital Status)

```jsx
// File: src/journey/Pages/AutoPersonalInformation.jsx

export default function AutoPersonalInformation() {
  const [maritalStatus, setMaritalStatus] = useState('1');
  const dispatch = useDispatch();
  
  const handleSubmit = async () => {
    // Collect data:
    // 1. Current residence (address)
    // 2. Selfie image (camera capture)
    // 3. Marital status (dropdown)
    
    const response = await getPersonalDetailAuto(formData);
    
    if (response?.apiStatus === 1) {
      // Update personal_details = 1
      dispatch(updateAutoJourneyEvents({
        personal_details: 1,
        remain_tab_show: response.validationStatus  // ← CRITICAL!
      }));
      
      // If validationStatus == true:
      //   → remain_tab_show becomes TRUE
      //   → Tabs 6-9 become visible
      // If validationStatus == false:
      //   → remain_tab_show stays FALSE
      //   → Tabs 6-9 hidden
    }
  };
  
  return (
    <div>
      {/* Address input */}
      {/* Selfie camera capture */}
      {/* Marital status dropdown */}
      <Button onClick={handleSubmit}>Submit</Button>
    </div>
  );
}
```

**Key Logic:**
- After submission, backend validates all collected data
- Returns `validationStatus: true/false`
- If true → `remain_tab_show = true` → Unlock later tabs
- If false → Error, retry

### Tab 5: AccountAggregator (Bank Account Linking)

```jsx
// File: src/journey/Pages/AccountAggregator.jsx

// Integrates with Sahamati Account Aggregator
// User links their bank accounts for instant financial verification
// Shows: Linking banks → Authorization → Success
```

### Tab 6: LoanOfferAcceptance (Conditional Tab)

```jsx
// File: src/journey/Pages/LoanOfferAcceptance.jsx

// Shows loan offer terms
// User accepts/rejects
// Triggers: loan_offer_accept = 1 when accepted

const handleAccept = async () => {
  dispatch(updateAutoJourneyEvents({ loan_offer_accept: 1 }));
  // Proceeds to Tab 7
};
```

### Tab 7: AutoBankDetails (Penny Drop Verification)

```jsx
// File: src/journey/Pages/AutoBankDetails.jsx

// User provides bank account details:
// - Account number
// - IFSC code
// - Account holder name
// - Marital status (for joint accounts)

// Penny drop verification:
// - Small amount (like ₹1) deposited
// - User confirms receipt
// - Account verified
// - banking_details = 1
```

### Tab 8: AutoSanction (Sanction Letter + eSign)

```jsx
// File: src/journey/Pages/AutoSanction.jsx

export default function AutoSanction() {
  const customerDetails = useSelector(
    (state) => state?.autoCustomerJourneyDetails?.customerDetails
  );
  const leadId = customerDetails?.lead_id;
  
  const submit = async () => {
    const res = await getSanctionDetail({ leadId });
    
    if (res?.data?.data?.sanction_url) {
      // Redirect to eSign portal
      window.location.href = res.data.data.sanction_url;
      
      // User:
      // 1. Views sanction letter (loan amount, rate, tenure)
      // 2. Does eSign (digital signature)
      // 3. Returns with status in URL
      
      // On return (in useEffect):
      // if (sanctionStatus === 'success') {
      //   dispatch(updateAutoJourneyEvents({ sanction: 1 }));
      // }
    }
  };
  
  return (
    <div>
      <h3>Review & eSign Your Sanction Letter</h3>
      <Button onClick={submit}>Sign Document</Button>
    </div>
  );
}
```

**Flow:**
- User clicks "Sign Document"
- Redirected to eSign portal (external service like eSignal, DigiLocker)
- Views sanction letter with loan terms
- Signs digitally with OTP or eSign platform
- Returns with success status
- Backend marks sanction = 1

### Tab 9: AutoEnach (eNACH Mandate)

```jsx
// File: src/journey/Pages/AutoEnach.jsx

export default function AutoEnach() {
  const customerDetails = useSelector(
    (state) => state?.autoCustomerJourneyDetails?.customerDetails
  );
  
  const submit = () => {
    // Redirect to eNACH authorization URL
    const url = customerDetails.enach_url;
    window.location.href = url;
    
    // eNACH is NPCI's automated clearing system
    // User authorizes bank to deduct EMI automatically
    
    // On return:
    // if (searchParams.get('msg') === '0300') {
    //   SUCCESS → enach_detail = 1
    //   dispatch(updateAutoJourneyEvents({ enach_detail: 1 }));
    //   navigate("/journey/congratulations");
    // }
  };
  
  return (
    <div>
      <h3>Set Up Automatic EMI Deduction</h3>
      <p>Paperless & secure auto-debit via eNACH</p>
      <Button onClick={submit}>Mandate e-NACH</Button>
    </div>
  );
}
```

**eNACH Details:**
- eNACH = electronic National Automated Clearing House
- User authorizes bank to automatically deduct EMI
- NPCI regulated (RBI compliant)
- No paper forms or cheques
- After success: enach_detail = 1
- All 7 conditions met → Auto-navigate to congratulations

---

## PART 7: FULL AUTO JOURNEY FLOW DIAGRAM

```
┌──────────────────────────────────────────────────────────────────────┐
│                   AUTO JOURNEY COMPLETE FLOW                         │
└──────────────────────────────────────────────────────────────────────┘

USER ENTRY
  ↓
RedirectToJourney (with encId)
  ↓
Backend returns isAuto: true
  ↓
navigate('/auto-journey')
  ↓
Layout checks token ✅
  ↓
AutoJourney → AutoMyJourney
  ↓
Check: isAutoJourney == true? ✅
  ↓
└─ If FALSE → navigate('/journey') ← Regular flow
  │
  └─ If TRUE → Proceed with auto flow
     │
     └─ Fetch auto journey data
        │
        └─ check_eligibility == 0?
           │
           ├─ YES: Show PanDetails
           │       │
           │       └─ User enters PAN + income
           │           │
           │           └─ getPanVerify() API
           │               │
           │               └─ Success → check_eligibility = 1 (from backend)
           │                   │
           │                   └─ MyJourney re-renders
           │
           └─ NO (check_eligibility == 1): Show AutoApplicationStep
               │
               └─ remain_tab_show == false?
                  │
                  ├─ YES (Initial state):
                  │  ├─ Tab 1: Loan Offer (loan_quote: 0/1/2)
                  │  │  └─ AutoLoanOffer component
                  │  │      └─ Select offer → loan_quote = 1
                  │  │
                  │  ├─ Tab 2: eKYC (ekyc_detail: 0/1/2)
                  │  │  └─ AutoEkyc component
                  │  │      └─ Redirect to Aadhaar verification
                  │  │          └─ Success → ekyc_detail = 1
                  │  │
                  │  ├─ Tab 3: Personal Info (personal_details: 0/1/2)
                  │  │  └─ AutoPersonalInformation component
                  │  │      ├─ Address input
                  │  │      ├─ Selfie capture
                  │  │      ├─ Marital status
                  │  │      └─ Submit → Validation
                  │  │          └─ Success:
                  │  │              ├─ personal_details = 1
                  │  │              └─ remain_tab_show = true ← MASTER SWITCH!
                  │  │
                  │  ├─ Tab 4: Documents (upload_documents: 0/1/2)
                  │  │  └─ UploadDocument component (shared)
                  │  │      └─ Upload → upload_documents = 1
                  │  │
                  │  └─ Tab 5: Account Aggregator (account_aggregator: 0/1/2)
                  │     └─ AccountAggregator component
                  │         └─ Link bank accounts
                  │             └─ Success → account_aggregator = 1
                  │
                  └─ NO (remain_tab_show == true):
                     ├─ Tab 6: Loan Offer Acceptance (loan_offer_accept: 0/1/2)
                     │  └─ Accept offer → loan_offer_accept = 1
                     │
                     ├─ Tab 7: Bank Verification (banking_details: 0/1/2)
                     │  └─ Penny drop verification
                     │      └─ Verify account → banking_details = 1
                     │
                     ├─ Tab 8: Sanction & eSign (sanction: 0/1/2)
                     │  └─ Redirect to eSign portal
                     │      └─ Sign document → sanction = 1
                     │
                     └─ Tab 9: eNACH (enach_detail: 0/1/2)
                        └─ Redirect to eNACH portal
                            └─ Authorize mandate → enach_detail = 1
                                │
                                └─ All 7 conditions == 1? ✅
                                    │
                                    └─ useEffect detects completion
                                        │
                                        └─ navigate("/journey/congratulations") 🎉

COMPLETION ✅
  ↓
Display ThankYou component
  ↓
Track analytics event
```

---

## PART 8: STATUS FLOW EXAMPLE - STEP BY STEP

### INITIAL STATE (After PAN verification)
```js
{
  check_eligibility: 1,      // ← PAN verified
  loan_quote: 0,             // Not started
  ekyc_detail: 0,
  personal_details: 0,
  upload_documents: 0,
  account_aggregator: 0,
  banking_details: 0,
  sanction: 0,
  enach_detail: 0,
  loan_offer_accept: 0,
  remain_tab_show: false     // ← Early tabs visible
}
```

### AFTER TAB 1 (Loan Offer) - User selects offer
```js
{
  check_eligibility: 1,
  loan_quote: 1,             // ✅ COMPLETED
  ekyc_detail: 0,
  personal_details: 0,
  upload_documents: 0,
  account_aggregator: 0,
  banking_details: 0,
  sanction: 0,
  enach_detail: 0,
  loan_offer_accept: 0,
  remain_tab_show: false
}
```

### AFTER TAB 2 (eKYC) - Aadhaar verified
```js
{
  check_eligibility: 1,
  loan_quote: 1,
  ekyc_detail: 1,            // ✅ COMPLETED
  personal_details: 0,
  upload_documents: 0,
  account_aggregator: 0,
  banking_details: 0,
  sanction: 0,
  enach_detail: 0,
  loan_offer_accept: 0,
  remain_tab_show: false
}
```

### AFTER TAB 3 (Personal) - Validation passes
```js
{
  check_eligibility: 1,
  loan_quote: 1,
  ekyc_detail: 1,
  personal_details: 1,       // ✅ COMPLETED
  upload_documents: 0,
  account_aggregator: 0,
  banking_details: 0,
  sanction: 0,
  enach_detail: 0,
  loan_offer_accept: 0,
  remain_tab_show: true      // ← 🔑 MASTER SWITCH ACTIVATED! Tabs 6-9 now visible
}
```

### AFTER TAB 4 (Documents) - Files uploaded
```js
{
  check_eligibility: 1,
  loan_quote: 1,
  ekyc_detail: 1,
  personal_details: 1,
  upload_documents: 1,       // ✅ COMPLETED
  account_aggregator: 0,
  banking_details: 0,
  sanction: 0,
  enach_detail: 0,
  loan_offer_accept: 0,
  remain_tab_show: true
}
```

### AFTER TAB 5 (Account Aggregator) - Banks linked
```js
{
  check_eligibility: 1,
  loan_quote: 1,
  ekyc_detail: 1,
  personal_details: 1,
  upload_documents: 1,
  account_aggregator: 1,     // ✅ COMPLETED
  banking_details: 0,
  sanction: 0,
  enach_detail: 0,
  loan_offer_accept: 0,
  remain_tab_show: true      // ← remain_tab_show still TRUE → Later tabs visible
}
```

### AFTER TAB 6 (Offer Acceptance) - Loan offer accepted
```js
{
  check_eligibility: 1,
  loan_quote: 1,
  ekyc_detail: 1,
  personal_details: 1,
  upload_documents: 1,
  account_aggregator: 1,
  banking_details: 0,
  sanction: 0,
  enach_detail: 0,
  loan_offer_accept: 1,      // ✅ COMPLETED (not checked in completion condition)
  remain_tab_show: true
}
```

### AFTER TAB 7 (Bank Verification) - Penny drop success
```js
{
  check_eligibility: 1,
  loan_quote: 1,
  ekyc_detail: 1,
  personal_details: 1,
  upload_documents: 1,
  account_aggregator: 1,
  banking_details: 1,        // ✅ COMPLETED
  sanction: 0,
  enach_detail: 0,
  loan_offer_accept: 1,
  remain_tab_show: true
}
```

### AFTER TAB 8 (Sanction & eSign) - Document signed
```js
{
  check_eligibility: 1,
  loan_quote: 1,
  ekyc_detail: 1,
  personal_details: 1,
  upload_documents: 1,
  account_aggregator: 1,
  banking_details: 1,
  sanction: 1,               // ✅ COMPLETED
  enach_detail: 0,
  loan_offer_accept: 1,
  remain_tab_show: true
}
```

### AFTER TAB 9 (eNACH) - Mandate authorized
```js
{
  check_eligibility: 1,
  loan_quote: 1,
  ekyc_detail: 1,
  personal_details: 1,
  upload_documents: 1,
  account_aggregator: 1,
  banking_details: 1,
  sanction: 1,
  enach_detail: 1,           // ✅ COMPLETED
  loan_offer_accept: 1,
  remain_tab_show: true
}

// useEffect DETECTS:
if (
  loan_quote === 1 &&
  account_aggregator === 1 &&
  personal_details === 1 &&
  banking_details === 1 &&
  sanction === 1 &&
  ekyc_detail === 1 &&
  enach_detail === 1
) {
  navigate("/journey/congratulations"); 🎉
}
```

---

## PART 9: QUICK REFERENCE - REGULAR VS AUTO

### Entry Guard Logic

**Regular Journey:**
```js
if(isAutoJourney){  // If TRUE
  navigate('/auto-journey');  // Redirect OUT
}
```

**Auto Journey:**
```js
if(!isAutoJourney){  // If FALSE
  navigate('/journey');  // Redirect OUT
}
```

### Redux State Usage

| Aspect | Regular | Auto |
|--------|---------|------|
| State Location | `state.customerJourneyDetails` | `state.autoCustomerJourneyDetails` |
| Journey Steps Count | 4 main steps | 9 steps + 1 flag |
| Completion Conditions | 3 = 1 | 7 = 1 |
| Cross-sync | No | Yes (both states updated) |

### Tab Visibility Logic

**Regular:**
```js
All tabs show by default (no conditional visibility)
```

**Auto:**
```js
remain_tab_show == false  → Tabs 1-5 show
remain_tab_show == true   → Tabs 6-9 show
PLUS additional flags for specific tabs
```

### Component Differences

| Feature | Regular | Auto |
|---------|---------|------|
| PAN Step | PanDetails | PanDetails (same) |
| Main Form | ApplicationStep | AutoApplicationStep (9 tabs vs 3) |
| Loan Quote | LoanCalculator | AutoLoanOffer + conditional rendering |
| Personal Details | PersonalInformation | AutoPersonalInformation + selfie + marital status |
| New Features | N/A | eKYC, Penny Drop, Account Aggregator, Sanction, eNACH |

### Key Flags Summary

| Flag | Regular | Auto |
|------|---------|------|
| `isAuto` | N/A | **Critical** (controls flow) |
| `remain_tab_show` | N/A | **Master switch** (controls tab visibility) |
| `show_auto_loan_quote` | N/A | Component selection |
| `show_upload_docs` | N/A | Tab 4-5 visibility |
| Tabs Hidden Behind Flags | 0 | 4+ tabs have conditional visibility |

---

## PART 10: WHY THE AUTO JOURNEY EXISTS

### Business Logic

```
REGULAR JOURNEY (Manual Process):
1. User fills form manually
2. HR verifies documents
3. HR approves/rejects
4. Loan generated
⏱️ Takes 5-7 business days

AUTO JOURNEY (Automated Process):
1. System auto-verifies Aadhaar (eKYC)
2. System accesses bank accounts (AA)
3. System auto-verifies income (Penny drop)
4. System auto-generates loan (instant)
5. eSign mandate → Instant disbursement
⏱️ Takes 1-2 hours
```

### Technical Rationale

- **eKYC**: Real-time Aadhaar verification
- **Account Aggregator**: Direct bank data access (RBI mandated)
- **Penny Drop**: Instant account verification (₹1 test transfer)
- **eSign**: Digital signature (legally binding)
- **eNACH**: Automatic EMI deduction (no manual collection)

All combined for **instant personal loan approval and disbursement**.

---

## SUMMARY TABLE: RENDERING STEPS AND FLAGS

| Step | Component | Status Flags | Control Flags | Tab Count |
|------|-----------|--------------|---------------|-----------|
| 1. PanDetails | PanDetails | check_eligibility | N/A | N/A |
| 2. Regular | ApplicationStep | 3 (LQ, PD, UD) | 0 | 3 |
| 2. Auto | AutoApplicationStep | 7 + 1 master | remain_tab_show | 9 |
| 3. Complete | UserDashboard | N/A | Various flags | N/A |

Legend:
- LQ = loan_quote
- PD = personal_details
- UD = upload_documents
- Status flags values: 0/1/2
- Master flag: remain_tab_show = true/false

---

## KEY TAKEAWAYS

✅ **Dual Redux states** - Regular + Auto tracked separately but cross-synced
✅ **9 vs 3 steps** - Auto journey has 6 additional automated steps
✅ **Master flag control** - `remain_tab_show` toggles early/late tabs
✅ **7 completion conditions** - More complex than regular 3-condition check
✅ **Conditional components** - Auto tabs use specialized components (AutoEkyc, AutoBankDetails, etc.)
✅ **External redirects** - eKYC, eSign, eNACH all redirect to external portals
✅ **Guard logic reversed** - Auto journey kicks out non-auto users
✅ **Instant processing** - Auto journey designed for sub-2-hour loan approval
