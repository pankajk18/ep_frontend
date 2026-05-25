# REGULAR VS AUTO JOURNEY - CODE COMPARISON

## 1. ENTRY POINT COMPARISON

### Regular Journey Entry (MyJourney)

```jsx
// File: src/journey/Pages/MyJourney.jsx

export default function MyJourney() {
  const customerStep = useSelector((state) => 
    state?.customerJourneyDetails?.journeySteps
  );
  const customerDetails = useSelector((state) => 
    state?.customerJourneyDetails?.customerDetails
  );
  const isAutoJourney = useSelector((state) => 
    state?.customerJourneyDetails?.customerDetails?.isAuto
  );
  
  useEffect(() => {
    fetchCustomerDetails();
    
    // 🔴 CHECK: Is this actually an auto journey?
    if(isAutoJourney){
      // YES → Redirect OUT to auto flow
      navigate('/auto-journey');
      return;
    }
  }, [customerStep?.check_eligibility]);
  
  return (
    <div>
      {(journeyComplete == 1) ? 
        <UserDashboard /> 
      : 
        (customerStep.check_eligibility == 1) ? 
          <ApplicationStep />      // Regular 3-tab form
        : 
          <PanDetails />           // Initial PAN
      }
    </div>
  );
}
```

### Auto Journey Entry (AutoMyJourney)

```jsx
// File: src/journey/Pages/AutoMyJourney.jsx

export default function AutoMyJourney() {
  const customerStep = useSelector((state) => 
    state?.autoCustomerJourneyDetails?.journeySteps
  );
  const customerDetails = useSelector((state) => 
    state?.autoCustomerJourneyDetails?.customerDetails
  );
  const isAutoJourney = useSelector((state) => 
    state?.autoCustomerJourneyDetails?.customerDetails?.isAuto
  );
  
  // Fallback to manual journey for profileId
  const customerDetailsmanual = useSelector((state) => 
    state?.customerJourneyDetails?.customerDetails
  );
  
  useEffect(() => {
    fetchCustomerDetails();
    
    // 🔴 CHECK: Is this NOT an auto journey?
    if(!isAutoJourney){
      // NO → Redirect OUT to regular flow
      navigate('/journey');
      return;
    }
  }, [customerStep?.check_eligibility]);
  
  return (
    <div>
      {(journeyComplete == 1) ? 
        <UserDashboard /> 
      : 
        (customerStep.check_eligibility == 1) ? 
          <AutoApplicationStep />  // Auto 9-tab form
        : 
          <PanDetails />           // Initial PAN (same)
      }
    </div>
  );
}
```

### Key Differences

| Aspect | Regular | Auto |
|--------|---------|------|
| Redux State | `customerJourneyDetails` | `autoCustomerJourneyDetails` |
| Guard Condition | `if(isAutoJourney) navigate('/auto-journey')` | `if(!isAutoJourney) navigate('/journey')` |
| Logic | "If auto → kick out" | "If not auto → kick out" |
| Main Component | `<ApplicationStep />` | `<AutoApplicationStep />` |
| Fallback State | Direct use | Also reads manual journey state |

---

## 2. REDUX STATE STRUCTURE COMPARISON

### Regular Journey Redux State

```js
// File: src/CustomerJourneyDetails/CustomerJourneyDetails.js

const initialState = {
  customerDetails: {
    profileId: "PROF_12345",
    token: "jwt_abc123xyz",
    full_name: null,
    dob: null,
    pancard: null,
    monthly_income: null,
    is_journey_completed: 0,
    isAuto: false,
    applicationStatus: "PENDING"
  },
  journeySteps: {
    check_eligibility: 0,
    loan_quote: 0,
    personal_details: 0,
    employment_details: 0,
    upload_documents: 0,
    aadhaar_upload: 0,
    pan_upload: 0,
    pay_slip_upload: 0,
    bank_statement_upload: 0,
    residence_proof_upload: 0,
    banking_details: 0,
    thank_you: 0
  }
};
```

### Auto Journey Redux State

```js
// File: src/CustomerJourneyDetails/AutoCustomerJourneyDetails.js

const initialState = {
  customerDetails: {
    profileId: "PROF_12345",
    token: "jwt_abc123xyz",
    full_name: null,
    dob: null,
    pancard: null,
    monthly_income: null,
    is_journey_completed: 0,
    isAuto: true,  // ← Different!
    lead_id: null,
    show_auto_loan_quote: false,
    show_upload_docs: false,
    enach_url: null
  },
  journeySteps: {
    check_eligibility: 0,
    loan_quote: 0,
    personal_details: 0,
    
    // EXTRA STEPS IN AUTO
    banking_details: 0,      // ← New
    ekyc_detail: 0,         // ← New
    sanction: 0,            // ← New
    enach_detail: 0,        // ← New
    account_aggregator: 0,  // ← New
    loan_offer_accept: 0,   // ← New
    
    upload_documents: 0,
    remain_tab_show: false  // ← New flag
  }
};
```

### Comparison Table

| Step | Regular | Auto |
|------|---------|------|
| check_eligibility | ✓ | ✓ |
| loan_quote | ✓ | ✓ |
| personal_details | ✓ | ✓ |
| upload_documents | ✓ | ✓ |
| **account_aggregator** | ✗ | ✓ NEW |
| **banking_details** | ✗ | ✓ NEW |
| **ekyc_detail** | ✗ | ✓ NEW |
| **sanction** | ✗ | ✓ NEW |
| **enach_detail** | ✗ | ✓ NEW |
| **loan_offer_accept** | ✗ | ✓ NEW |
| **remain_tab_show** | ✗ | ✓ NEW MASTER FLAG |

---

## 3. AUTO-COMPLETION LOGIC COMPARISON

### Regular Journey - Auto-completion

```jsx
// File: src/journey/Pages/ApplicationStep.jsx

useEffect(() => {
  // 3 conditions
  if (
    loan_quote === 1 &&           // Tab 1 done
    personal_details === 1 &&     // Tab 2 done
    upload_documents === 1        // Tab 3 done
  ) {
    navigate("/journey/congratulations");
  }
}, [loan_quote, personal_details, upload_documents, navigate]);
```

**Dependency array:** 3 items
**Completion logic:** 3 AND conditions
**Tabs to complete:** 3

### Auto Journey - Auto-completion

```jsx
// File: src/journey/Pages/AutoApplicationStep.jsx

useEffect(() => {
  // 7 conditions (vs 3)
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
```

**Dependency array:** 7 items
**Completion logic:** 7 AND conditions
**Tabs to complete:** 9 (but only 7 tracked as completion conditions)

### Why Different?

```
REGULAR:
- 3 main steps
- All must be done = 1
- Quick approval (~7 days)

AUTO:
- 9 total tabs but 7 are critical
- All 7 critical steps must be done = 1
- Instant approval (~2 hours)
- NOT REQUIRED: loan_offer_accept (Tab 6)
```

---

## 4. TAB CONFIGURATION COMPARISON

### Regular Journey Tabs

```jsx
// File: src/journey/Pages/ApplicationStep.jsx

const navLinks = [
  {
    title: "Loan calculator",
    activeStatus: loan_quote == 2,
    showSuccessIcon: loan_quote == 1,
    tabContentElement: <LoanCalculator />,
    // No defaultShowStatus → Always visible
  },
  {
    title: "Personal Details",
    activeStatus: personal_details == 2,
    showSuccessIcon: personal_details == 1,
    tabContentElement: <PersonalInformation />,
    // No defaultShowStatus → Always visible
  },
  {
    title: "Documents Upload",
    activeStatus: upload_documents == 2,
    showSuccessIcon: upload_documents == 1,
    tabContentElement: <UploadDocument />,
    // No defaultShowStatus → Always visible
  }
];
```

### Auto Journey Tabs

```jsx
// File: src/journey/Pages/AutoApplicationStep.jsx

const navLinks = [
  {
    title: "Pre-approved Loan Offer",
    activeStatus: loan_quote == 2,
    showSuccessIcon: loan_quote == 1,
    tabContentElement:
      customerDetails?.isAuto == true &&
      customerDetails?.show_auto_loan_quote == true
        ? <AutoLoanOffer />
        : <LoanCalculator />,
    defaultShowStatus: remain_tab_show == false,  // ← Conditional!
  },
  {
    title: "Ekyc (Aadhaar Verification)",
    activeStatus: ekyc_detail == 2,
    showSuccessIcon: ekyc_detail == 1,
    tabContentElement: <AutoEkyc />,
    defaultShowStatus: remain_tab_show == false,  // ← Conditional!
  },
  // ... 7 more tabs with defaultShowStatus controls
  {
    title: "Bank Verification (Penny Drop)",
    activeStatus: banking_details == 2,
    showSuccessIcon: banking_details == 1,
    tabContentElement: <AutoBankDetails />,
    defaultShowStatus: remain_tab_show == true,  // ← Shows ONLY when true
  },
  {
    title: "Sanction & eSign",
    activeStatus: sanction == 2,
    showSuccessIcon: sanction == 1,
    tabContentElement: <AutoSanction />,
    defaultShowStatus: remain_tab_show == true,  // ← Shows ONLY when true
  },
  {
    title: "Enach Mandate",
    activeStatus: enach_detail == 2,
    showSuccessIcon: enach_detail == 1,
    tabContentElement: <AutoEnach />,
    defaultShowStatus: remain_tab_show == true,  // ← Shows ONLY when true
  }
];
```

### Key Differences

| Feature | Regular | Auto |
|---------|---------|------|
| Tab Count | 3 | 9 |
| defaultShowStatus | None (all visible) | Yes (conditional) |
| Component Variance | Fixed components | Conditional (AutoLoanOffer vs LoanCalculator) |
| Visibility Logic | Always visible | Controlled by `remain_tab_show` flag |

---

## 5. DATA FETCHING COMPARISON

### Regular Journey Fetch

```jsx
// File: src/journey/Pages/MyJourney.jsx

async function fetchCustomerDetails() {
  if (params.profileId) {
    let { payload } = await dispatch(
      customerDetailsApiCall(params)  // ← Regular API call
    );
    
    if (payload?.data?.apiStatus == 1) {
      // UPDATE REGULAR STATE ONLY
      dispatch(updateCustomerDetails(payload?.data?.data?.customer_details));
      dispatch(updateJourneyEvents(payload?.data?.data?.screen_details));
      
      // Also update auto state (for dual sync)
      dispatch(updateAutoCustomerDetails(payload?.data?.data?.customer_details));
      dispatch(updateAutoJourneyEvents(payload?.data?.data?.screen_details));
    }
  }
}
```

### Auto Journey Fetch

```jsx
// File: src/journey/Pages/AutoMyJourney.jsx

async function fetchCustomerDetails() {
  params.profileId = customerDetailsmanual?.profileId;  // ← Fallback!
  
  if (params.profileId) {
    let { payload } = await dispatch(
      autoCustomerDetailsApiCall(params)  // ← Auto API call
    );
    
    if (payload?.data?.apiStatus == 1) {
      // UPDATE BOTH STATES (dual sync)
      dispatch(updateAutoCustomerDetails(
        payload?.data?.data?.customer_details
      ));
      dispatch(updateAutoJourneyEvents(
        payload?.data?.data?.screen_details
      ));
      
      // ALSO update regular state (cross-sync)
      dispatch(updateCustomerDetails(
        payload?.data?.data?.customer_details
      ));
      dispatch(updateJourneyEvents(
        payload?.data?.data?.screen_details
      ));
    }
  }
}
```

### Key Differences

| Aspect | Regular | Auto |
|--------|---------|------|
| ProfileId Source | Direct from state | Fallback from manual state |
| API Call | `customerDetailsApiCall` | `autoCustomerDetailsApiCall` |
| State Updates | Single + auto sync | Dual sync (both states) |
| Cross-sync | One way | Two way |

---

## 6. RENDERING STEPS COMPARISON

### Regular Journey Rendering Steps

```jsx
return (
  <div style={{ minHeight: '80vh' }}>
    {(journeyComplete == 1) ? 
      <UserDashboard />           // Step 1: Check completion
    : 
      (customerStep.check_eligibility == 1) ? 
        <ApplicationStep />         // Step 2: Check eligibility
      : 
        <PanDetails />              // Step 3: Initial stage
    }
  </div>
);

/*
RENDERING LOGIC (3-way branch):
  ├─ journeyComplete == 1?
  │   ├─ YES → UserDashboard
  │   └─ NO ↓
  ├─ check_eligibility == 1?
  │   ├─ YES → ApplicationStep
  │   └─ NO → PanDetails
*/
```

### Auto Journey Rendering Steps

```jsx
return (
  <div style={{ minHeight: '80vh' }}>
    {(journeyComplete == 1) ? 
      <UserDashboard />           // Step 1: Check completion
    : 
      (customerStep.check_eligibility == 1) ? 
        <AutoApplicationStep />     // Step 2: Check eligibility
      : 
        <PanDetails />              // Step 3: Initial stage (same)
    }
  </div>
);

/*
RENDERING LOGIC (3-way branch, almost identical):
  ├─ journeyComplete == 1?
  │   ├─ YES → UserDashboard
  │   └─ NO ↓
  ├─ check_eligibility == 1?
  │   ├─ YES → AutoApplicationStep  (← Only difference)
  │   └─ NO → PanDetails
*/
```

### Difference

```
Regular: Shows ApplicationStep (3 tabs)
Auto:    Shows AutoApplicationStep (9 tabs)
PAN:     Same PanDetails component
Completion: Same UserDashboard
```

---

## 7. CRITICAL FLAGS COMPARISON

### Regular Journey Critical Flags

```js
// In Redux state.customerJourneyDetails.customerDetails:

isAuto: false                    // ← Gate flag
is_journey_completed: 0 or 1     // ← Completion flag

// In Redux state.customerJourneyDetails.journeySteps:

check_eligibility: 0/1/2         // ← Master progress flag
loan_quote: 0/1/2
personal_details: 0/1/2
upload_documents: 0/1/2
```

### Auto Journey Critical Flags

```js
// In Redux state.autoCustomerJourneyDetails.customerDetails:

isAuto: true                     // ← Gate flag (must be TRUE)
is_journey_completed: 0 or 1     // ← Completion flag
lead_id: "lead_123"              // ← For API calls
show_auto_loan_quote: true/false // ← Component selector
show_upload_docs: true/false     // ← Tab visibility
enach_url: "https://..."         // ← eNACH redirect link

// In Redux state.autoCustomerJourneyDetails.journeySteps:

check_eligibility: 0/1/2         // ← Master progress flag (same)
loan_quote: 0/1/2
personal_details: 0/1/2
upload_documents: 0/1/2

// NEW FLAGS (Auto only):
remain_tab_show: true/false      // ← MASTER SWITCH (early/late tabs)
ekyc_detail: 0/1/2               // ← eKYC status
sanction: 0/1/2                  // ← eSign status
enach_detail: 0/1/2              // ← eNACH status
banking_details: 0/1/2           // ← Penny drop status
account_aggregator: 0/1/2        // ← Account linking status
loan_offer_accept: 0/1/2         // ← Offer acceptance status
```

### Flag Usage Comparison

| Flag | Regular | Auto | Purpose |
|------|---------|------|---------|
| `isAuto` | false | **true** | Route guard |
| `is_journey_completed` | 0/1 | 0/1 | Completion marker |
| `check_eligibility` | 0/1/2 | 0/1/2 | Progress control |
| `remain_tab_show` | N/A | true/false | **Master tab visibility** |
| `show_auto_loan_quote` | N/A | true/false | Component selector |
| `show_upload_docs` | N/A | true/false | Tab visibility |
| `lead_id` | N/A | ID | API param |
| `enach_url` | N/A | URL | Redirect link |

---

## 8. COMPONENT CHAIN COMPARISON

### Regular Journey Component Chain

```
App.js (route)
  ↓
Layout (guards with token)
  ↓
NewDashboard (wrapper)
  ↓
MyJourney (controller)
  ├─ journeyComplete == 1
  │   └─ UserDashboard
  │
  └─ check_eligibility == 1
      └─ ApplicationStep (3 tabs)
          ├─ Tab 1: LoanCalculator
          ├─ Tab 2: PersonalInformation
          └─ Tab 3: UploadDocument
      
      OR
      
      └─ PanDetails (0 checks)
          └─ getPanVerify() API
```

### Auto Journey Component Chain

```
App.js (route)
  ↓
Layout (guards with token)
  ↓
AutoJourney (wrapper)
  ↓
AutoMyJourney (controller)
  ├─ journeyComplete == 1
  │   └─ UserDashboard
  │
  └─ check_eligibility == 1
      └─ AutoApplicationStep (9 tabs)
          ├─ Tab 1: AutoLoanOffer (conditional)
          ├─ Tab 2: AutoEkyc (redirect)
          ├─ Tab 3: AutoPersonalInformation (selfie + marital)
          ├─ Tab 4: UploadDocument (shared)
          ├─ Tab 5: AccountAggregator (redirect)
          ├─ Tab 6: LoanOfferAcceptance (conditional)
          ├─ Tab 7: AutoBankDetails (penny drop)
          ├─ Tab 8: AutoSanction (eSign redirect)
          └─ Tab 9: AutoEnach (eNACH redirect)
      
      OR
      
      └─ PanDetails (0 checks)
          └─ getPanVerify() API
```

---

## 9. EXTERNAL REDIRECTS COMPARISON

### Regular Journey Redirects

```
NONE - All steps handled internally
```

### Auto Journey Redirects

```
Tab 2: AutoEkyc
  └─ window.location.href = ekyc_service_url
     ├─ User: Aadhaar verification
     └─ Returns: with ?status=success

Tab 8: AutoSanction
  └─ window.location.href = sanction_url (from API)
     ├─ User: Views sanction letter
     ├─ User: eSign document
     └─ Returns: with ?sanctionStatus=success

Tab 9: AutoEnach
  └─ window.location.href = enach_url (from Redux)
     ├─ User: Authorizes eNACH mandate
     └─ Returns: with ?msg=0300 (success)
```

---

## 10. VALIDATION & SUBMISSION COMPARISON

### Regular Journey - Personal Details Validation

```jsx
// File: src/journey/Pages/PersonalInformation.jsx

const handleSubmit = async () => {
  const response = await getPersonalDetail({
    name, email, phone, address, ...
  });
  
  if (response?.apiStatus === 1) {
    // Simple: Update Redux
    dispatch(updateCustomerDetails({ ... }));
    // personal_details status updates from backend
  }
};
```

### Auto Journey - Personal Details Validation

```jsx
// File: src/journey/Pages/AutoPersonalInformation.jsx

const handleSubmit = async () => {
  const formData = new FormData();
  formData.append("name", name);
  formData.append("selfie", selfieFile);        // ← NEW
  formData.append("currentResidence", address); // ← NEW
  formData.append("maritalStatus", maritalStatus); // ← NEW
  
  const response = await getPersonalDetailAuto(formData);
  
  if (response?.apiStatus === 1) {
    dispatch(updateAutoJourneyEvents({
      personal_details: 1,
      remain_tab_show: response.validationStatus  // ← CRITICAL!
    }));
    
    // If validationStatus == true:
    //   → remain_tab_show = true
    //   → Tabs 6-9 become visible (master switch activation)
    // If validationStatus == false:
    //   → Error, retry required
    //   → remain_tab_show stays false
  }
};
```

### Key Differences

| Aspect | Regular | Auto |
|--------|---------|------|
| Fields | name, email, phone | name, **selfie**, address, **maritalStatus** |
| Validation | Simple backend check | Advanced validation + master flag control |
| State Update | Basic | **Dual**: personal_details + remain_tab_show |
| Impact | Tab completion | Tab completion + Gate for later tabs |

---

## SUMMARY COMPARISON TABLE

```
┌─────────────────────────────────────────────────────────────────┐
│            REGULAR JOURNEY vs AUTO JOURNEY                      │
├─────────────────────────────────────────────────────────────────┤
│ ASPECT                  │ REGULAR      │ AUTO                   │
├─────────────────────────┼──────────────┼────────────────────────┤
│ File Names              │ MyJourney    │ AutoMyJourney          │
│                         │ Application  │ AutoApplication        │
│                         │ Step         │ Step                   │
├─────────────────────────┼──────────────┼────────────────────────┤
│ Redux State             │ customerJ    │ autoCustomerJ          │
│                         │ ourneyDetails│ ourneyDetails          │
├─────────────────────────┼──────────────┼────────────────────────┤
│ Journey Steps           │ 4            │ 9 + 1 master flag      │
├─────────────────────────┼──────────────┼────────────────────────┤
│ Main Tabs               │ 3            │ 9                      │
├─────────────────────────┼──────────────┼────────────────────────┤
│ Completion Conditions   │ 3            │ 7                      │
├─────────────────────────┼──────────────┼────────────────────────┤
│ Auto Components         │ 0            │ 5+ (Auto*)             │
├─────────────────────────┼──────────────┼────────────────────────┤
│ External Redirects      │ 0            │ 3 (eKYC, Sanction,eN)  │
├─────────────────────────┼──────────────┼────────────────────────┤
│ Conditional Visibility  │ No           │ Yes (remain_tab_show)  │
├─────────────────────────┼──────────────┼────────────────────────┤
│ Guard Logic             │ If auto→kick │ If not auto→kick out   │
│                         │ out          │                        │
├─────────────────────────┼──────────────┼────────────────────────┤
│ Approval Time           │ 5-7 days     │ 1-2 hours              │
├─────────────────────────┼──────────────┼────────────────────────┤
│ Process                 │ Manual + HR  │ Fully automated         │
│                         │ review       │                        │
└─────────────────────────┴──────────────┴────────────────────────┘
```

---

## CODE FLOW: DECISION TREE

### Regular Journey Decision Tree

```
User enters /journey (with token)
  ↓
isAutoJourney == true?
  ├─ YES: navigate('/auto-journey') ← EXIT to auto flow
  └─ NO: Continue
      ↓
      journeyComplete == 1?
        ├─ YES: Show UserDashboard
        └─ NO: Continue
            ↓
            check_eligibility == 1?
              ├─ YES: Show ApplicationStep (3 tabs)
              └─ NO: Show PanDetails
                    ↓
                    [User fills PAN]
                    ↓
                    getPanVerify() API
                    ↓
                    [Backend sets check_eligibility = 1]
                    ↓
                    useEffect triggers → MyJourney re-renders
                    ↓
                    ApplicationStep becomes visible
                    ↓
                    [3 tabs progress through 0→1→2→1 cycle]
                    ↓
                    All 3 tabs == 1?
                      ├─ YES: useEffect → navigate(/journey/congratulations)
                      └─ NO: Stay on ApplicationStep
```

### Auto Journey Decision Tree

```
User enters /auto-journey (with token)
  ↓
isAutoJourney == true? (must be TRUE)
  ├─ NO: navigate('/journey') ← EXIT to regular flow
  └─ YES: Continue
      ↓
      journeyComplete == 1?
        ├─ YES: Show UserDashboard
        └─ NO: Continue
            ↓
            check_eligibility == 1?
              ├─ YES: Show AutoApplicationStep (9 tabs)
              └─ NO: Show PanDetails
                    ↓
                    [User fills PAN]
                    ↓
                    getPanVerify() API
                    ↓
                    [Backend sets check_eligibility = 1]
                    ↓
                    useEffect triggers → AutoMyJourney re-renders
                    ↓
                    AutoApplicationStep becomes visible
                    ↓
                    remain_tab_show == false?
                      ├─ YES: Show Tabs 1-5 (early tabs)
                      └─ NO: Show Tabs 6-9 (later tabs)
                    ↓
                    [Tab 3 AutoPersonalInformation validation]
                    ↓
                    validationStatus == true?
                      ├─ YES: remain_tab_show = true (unlock later tabs)
                      └─ NO: Error, retry
                    ↓
                    [9 tabs progress through 0→1→2→1 cycle]
                    ↓
                    All 7 critical tabs == 1?
                      ├─ YES: useEffect → navigate(/journey/congratulations)
                      └─ NO: Stay on AutoApplicationStep
```

---

## KEY INSIGHTS

1. **Guard Logic is Opposite**
   - Regular: Redirects OUT if auto
   - Auto: Redirects OUT if not auto

2. **Same Starting Point**
   - Both use same PanDetails component
   - Both start from check_eligibility = 0

3. **Tab Visibility Control**
   - Regular: All tabs always visible
   - Auto: Tabs controlled by `remain_tab_show` flag

4. **Completion Requirements**
   - Regular: 3 conditions
   - Auto: 7 conditions

5. **External Integrations**
   - Regular: Fully internal process
   - Auto: 3 external redirects (eKYC, Sanction, eNACH)

6. **State Management**
   - Regular: Single state focus
   - Auto: Dual state sync (both journeyDetails tracked)

7. **Approval Speed**
   - Regular: 5-7 business days
   - Auto: 1-2 hours (instant processing)

8. **Component Reuse**
   - PanDetails: Reused in both
   - PersonalInformation: Separate implementations
   - UploadDocument: Reused
   - LoanCalculator: Conditional reuse
