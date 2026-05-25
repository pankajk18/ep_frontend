# AUTO JOURNEY - QUICK REFERENCE GUIDE

---

## 1. ENTRY GUARD LOGIC AT A GLANCE

```
┌──────────────────────────────────────────────────────────────┐
│                    JOURNEY TYPE GATE                         │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  User visits /journey                                       │
│        ↓                                                     │
│   MyJourney loads                                           │
│        ↓                                                     │
│   Check: isAutoJourney?                                    │
│        ├─ YES → navigate('/auto-journey')                  │
│        └─ NO → Continue in MyJourney                       │
│                                                              │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  User visits /auto-journey                                 │
│        ↓                                                     │
│   AutoMyJourney loads                                       │
│        ↓                                                     │
│   Check: NOT isAutoJourney?                                │
│        ├─ YES → navigate('/journey')                       │
│        └─ NO → Continue in AutoMyJourney                   │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

---

## 2. REDUX STATE AT GLANCE

```
┌─────────────────────────────────────────────────────────────────┐
│                    REDUX STATE STRUCTURE                        │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│ state.customerJourneyDetails (REGULAR JOURNEY)                │
│   ├─ customerDetails: { isAuto: false, ... }                 │
│   └─ journeySteps: {                                          │
│       ├─ check_eligibility: 0/1/2                            │
│       ├─ loan_quote: 0/1/2                                   │
│       ├─ personal_details: 0/1/2                             │
│       └─ upload_documents: 0/1/2                             │
│   }                                                            │
│                                                                 │
│ state.autoCustomerJourneyDetails (AUTO JOURNEY)               │
│   ├─ customerDetails: {                                        │
│   │   ├─ isAuto: true                                        │
│   │   ├─ lead_id: "abc123"                                   │
│   │   └─ enach_url: "https://..."                            │
│   │   }                                                        │
│   └─ journeySteps: {                                          │
│       ├─ check_eligibility: 0/1/2                            │
│       ├─ loan_quote: 0/1/2                                   │
│       ├─ personal_details: 0/1/2                             │
│       ├─ upload_documents: 0/1/2                             │
│       ├─ account_aggregator: 0/1/2 ← NEW                    │
│       ├─ banking_details: 0/1/2 ← NEW                       │
│       ├─ ekyc_detail: 0/1/2 ← NEW                           │
│       ├─ sanction: 0/1/2 ← NEW                              │
│       ├─ enach_detail: 0/1/2 ← NEW                          │
│       ├─ loan_offer_accept: 0/1/2 ← NEW                     │
│       └─ remain_tab_show: true/false ← MASTER FLAG          │
│   }                                                            │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## 3. TAB PROGRESSION AT GLANCE

```
REGULAR JOURNEY (3 TABS)

┌──────────────────┐
│ Tab 1: Loan Calc │ ← All always visible
├──────────────────┤
│ Tab 2: Personal  │
├──────────────────┤
│ Tab 3: Docs      │
└──────────────────┘

AUTO JOURNEY (9 TABS)

remain_tab_show == false            remain_tab_show == true
(Initial - after PAN verify)        (After Personal Info validation)

┌──────────────────────────────┐   ┌──────────────────────────────┐
│ Tab 1: Loan Offer            │   │ Tab 6: Offer Acceptance      │
│ Tab 2: eKYC                  │   │ Tab 7: Bank Verification     │
│ Tab 3: Personal (selfie)     │   │ Tab 8: Sanction & eSign      │
│ Tab 4: Documents             │   │ Tab 9: eNACH Mandate         │
│ Tab 5: Account Aggregator    │   └──────────────────────────────┘
└──────────────────────────────┘
       ↑                                    ↑
  remain_tab_show                   remain_tab_show
      = false                           = true
  (Visible)                         (Visible)
```

---

## 4. STATUS FLAGS AT GLANCE

```
┌──────────────────────────────────────────────────────────────────┐
│              STATUS FLAGS (0/1/2 values)                         │
├──────────────────────────────────────────────────────────────────┤
│                                                                  │
│ 0 = NOT STARTED / LOCKED / INCOMPLETE                           │
│ 1 = COMPLETED ✅                                                 │
│ 2 = ACTIVE / IN PROGRESS / EDITABLE                             │
│                                                                  │
│ Example progression for each tab:                               │
│                                                                  │
│ Tab 1 (Initial):     0 → User can't click                       │
│ Tab 1 (Unlocked):    2 → User clicking/editing                  │
│ Tab 1 (Submitted):   1 → Shows checkmark, locked                │
│ Tab 2 (Auto-unlock): 2 → Now this becomes editable              │
│                                                                  │
└──────────────────────────────────────────────────────────────────┘
```

---

## 5. COMPLETION CHECKLIST COMPARISON

```
REGULAR JOURNEY - 3 STEPS ✅

✓ loan_quote == 1
✓ personal_details == 1
✓ upload_documents == 1
─────────────────────────
→ navigate("/journey/congratulations")


AUTO JOURNEY - 7 STEPS ✅

✓ loan_quote == 1
✓ account_aggregator == 1
✓ personal_details == 1
✓ banking_details == 1
✓ sanction == 1
✓ ekyc_detail == 1
✓ enach_detail == 1
─────────────────────────────────────
→ navigate("/journey/congratulations")

NOTE: loan_offer_accept NOT in completion check
      (Tab 6 not required for congratulations)
```

---

## 6. RENDER FLOW AT GLANCE

```
┌─────────────────────────────────────────────────────────────┐
│                  RENDERING DECISION TREE                    │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│ journeyComplete == 1?                                      │
│   YES → <UserDashboard />                                  │
│   NO ↓                                                      │
│       check_eligibility == 1?                              │
│         YES → <ApplicationStep /> (Regular)                │
│              OR                                            │
│              <AutoApplicationStep /> (Auto)                │
│         NO → <PanDetails /> (both)                         │
│                                                             │
│ Decision point:                                            │
│   • journeyComplete: 0 or 1                                │
│   • check_eligibility: 0 or 1                              │
│   • Both use same PanDetails component                     │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## 7. KEY FLAGS SUMMARY TABLE

```
┌─────────────────────────────────────────────────────────────────┐
│              FLAG NAME & PURPOSE AT A GLANCE                    │
├─────────────────┬───────────┬──────────────────────────────────┤
│ FLAG NAME       │ TYPE      │ PURPOSE                          │
├─────────────────┼───────────┼──────────────────────────────────┤
│ isAuto          │ Boolean   │ Route gate (must be TRUE for     │
│                 │ true/     │ auto journey)                    │
│                 │ false     │                                  │
├─────────────────┼───────────┼──────────────────────────────────┤
│ remain_tab_show │ Boolean   │ MASTER SWITCH - controls which   │
│                 │ true/     │ tabs visible (early/late)        │
│                 │ false     │                                  │
├─────────────────┼───────────┼──────────────────────────────────┤
│ check_          │ Number    │ Progress gate - must be 1 to     │
│ eligibility     │ 0/1/2     │ enter application steps          │
├─────────────────┼───────────┼──────────────────────────────────┤
│ is_journey_     │ Number    │ Completion marker - shows        │
│ completed       │ 0 or 1    │ UserDashboard when 1            │
├─────────────────┼───────────┼──────────────────────────────────┤
│ show_auto_loan_ │ Boolean   │ Component selector for Tab 1     │
│ quote           │ true/     │ (AutoLoanOffer vs                │
│                 │ false     │ LoanCalculator)                  │
├─────────────────┼───────────┼──────────────────────────────────┤
│ show_upload_    │ Boolean   │ Visibility gate for Tabs 4-5 &   │
│ docs            │ true/     │ Tab 6                            │
│                 │ false     │                                  │
├─────────────────┼───────────┼──────────────────────────────────┤
│ lead_id         │ String    │ ID for API calls (sanction,      │
│                 │ ID        │ eSign)                           │
├─────────────────┼───────────┼──────────────────────────────────┤
│ enach_url       │ String    │ Redirect link for Tab 9 (eNACH   │
│                 │ URL       │ mandate)                         │
└─────────────────┴───────────┴──────────────────────────────────┘
```

---

## 8. COMPONENT MAPPING AT GLANCE

```
REGULAR JOURNEY COMPONENTS

MyJourney (Controller)
  ├─ PanDetails (step: check_eligibility = 0)
  ├─ ApplicationStep (step: check_eligibility = 1)
  │   ├─ Tab 1: LoanCalculator
  │   ├─ Tab 2: PersonalInformation
  │   └─ Tab 3: UploadDocument
  └─ UserDashboard (completed)


AUTO JOURNEY COMPONENTS

AutoMyJourney (Controller)
  ├─ PanDetails (step: check_eligibility = 0) ← Same
  ├─ AutoApplicationStep (step: check_eligibility = 1)
  │   ├─ Tab 1: AutoLoanOffer (conditional) ← Different
  │   ├─ Tab 2: AutoEkyc ← New
  │   ├─ Tab 3: AutoPersonalInformation ← Different
  │   ├─ Tab 4: UploadDocument ← Reused
  │   ├─ Tab 5: AccountAggregator ← New
  │   ├─ Tab 6: LoanOfferAcceptance ← New
  │   ├─ Tab 7: AutoBankDetails ← New
  │   ├─ Tab 8: AutoSanction ← New
  │   └─ Tab 9: AutoEnach ← New
  └─ UserDashboard (completed) ← Same
```

---

## 9. API REDIRECT FLOW AT GLANCE

```
REGULAR JOURNEY
├─ All internal processing
└─ No external redirects


AUTO JOURNEY
├─ Tab 2: AutoEkyc
│   └─ window.location.href = ekyc_service_url
│       └─ User verifies Aadhaar
│           └─ Returns with status in URL
│
├─ Tab 8: AutoSanction
│   └─ window.location.href = sanction_url
│       └─ User views & signs sanction letter
│           └─ Returns with sanction status
│
└─ Tab 9: AutoEnach
    └─ window.location.href = enach_url
        └─ User authorizes eNACH mandate
            └─ Returns with mandate status
```

---

## 10. APPROVAL TIMELINE COMPARISON

```
REGULAR JOURNEY - 5-7 BUSINESS DAYS

Day 1: User applies → PAN verification
Day 2-3: HR reviews documents
Day 4-5: Credit check, income verification
Day 6-7: Approval decision
Day 8: Disbursal


AUTO JOURNEY - 1-2 HOURS

Hour 0:00 - User enters /auto-journey with encId
Hour 0:15 - PAN verification (instant)
Hour 0:30 - eKYC (Aadhaar verification - instant)
Hour 0:45 - Personal info + selfie validation
Hour 1:00 - Account Aggregator linking (1 min)
Hour 1:05 - Bank verification (penny drop)
Hour 1:15 - Loan offer acceptance
Hour 1:20 - Sanction + eSign (2-5 mins)
Hour 1:30 - eNACH mandate setup (1 min)
Hour 1:40 - APPROVED → Instant disbursal
```

---

## 11. CONDITIONAL RENDERING AT GLANCE

```
REGULAR JOURNEY - Simple Linear Progression

┌─────────────────────┐
│  PanDetails         │  ← Always shown (status 0)
├─────────────────────┤
│  ApplicationStep    │  ← Always shown (status 1)
│  - Tab 1 (always)   │  ← Always visible
│  - Tab 2 (always)   │  ← Always visible
│  - Tab 3 (always)   │  ← Always visible
├─────────────────────┤
│  UserDashboard      │  ← Always shown (complete)
└─────────────────────┘


AUTO JOURNEY - Conditional Gate-controlled

┌─────────────────────────────────────────┐
│  PanDetails                             │  ← Always shown (status 0)
├─────────────────────────────────────────┤
│  AutoApplicationStep                    │  ← Always shown (status 1)
│  ├─ If remain_tab_show == false:        │
│  │  ├─ Tab 1: Loan Offer (visible)      │  ← Conditional
│  │  ├─ Tab 2: eKYC (visible)            │  ← Conditional
│  │  ├─ Tab 3: Personal (visible)        │  ← Conditional
│  │  ├─ Tab 4: Docs (visible)            │  ← Conditional
│  │  └─ Tab 5: Aggregator (visible)      │  ← Conditional
│  │                                       │
│  └─ If remain_tab_show == true:         │
│     ├─ Tab 6: Offer Accept (visible)    │  ← Conditional
│     ├─ Tab 7: Bank Verification (visible)│ ← Conditional
│     ├─ Tab 8: Sanction (visible)        │  ← Conditional
│     └─ Tab 9: eNACH (visible)           │  ← Conditional
├─────────────────────────────────────────┤
│  UserDashboard                          │  ← Always shown (complete)
└─────────────────────────────────────────┘

Gate Logic:
After Tab 3 (Personal Info) validation:
  validationStatus == true → remain_tab_show = true
  validationStatus == false → Error, retry
```

---

## 12. RENDERING CONDITIONS CHECKLIST

```
WHEN DOES AUTO JOURNEY RENDER WHAT?

✓ MyJourney Check:
  if (isAutoJourney === true)
    → navigate('/auto-journey') EXIT

✓ AutoMyJourney Check:
  if (isAutoJourney !== true)
    → navigate('/journey') EXIT

✓ Component Selection:
  if (journeyComplete === 1)
    → Render <UserDashboard />
  else if (check_eligibility === 1)
    → Render <AutoApplicationStep />
  else
    → Render <PanDetails />

✓ Tab Visibility:
  for each tab in navLinks:
    if (tab.defaultShowStatus === true)
      → Show tab
    else
      → Hide tab

✓ defaultShowStatus values:
  - Tab 1: remain_tab_show == false (only early)
  - Tab 2: remain_tab_show == false (only early)
  - Tab 3: remain_tab_show == false (only early)
  - Tab 4: show_upload_docs == true (early/always)
  - Tab 5: show_upload_docs == true (early/always)
  - Tab 6: remain_tab_show == true && show_upload_docs == true
  - Tab 7: remain_tab_show == true (only late)
  - Tab 8: remain_tab_show == true (only late)
  - Tab 9: remain_tab_show == true (only late)
```

---

## 13. MAJOR DIFFERENCES QUICK LIST

```
TOP 10 DIFFERENCES

1. Route guard: opposite logic
   Regular: if(isAuto) exit
   Auto: if(!isAuto) exit

2. Redux state: separate but synced
   Regular: customerJourneyDetails only
   Auto: autoCustomerJourneyDetails + sync

3. Tabs count: 3 vs 9
   Regular: 3 total
   Auto: 9 total

4. Completion: 3 vs 7 conditions
   Regular: 3 AND conditions
   Auto: 7 AND conditions

5. Master flag: new in auto
   Regular: none
   Auto: remain_tab_show (controls visibility)

6. External redirects: 0 vs 3
   Regular: 0 redirects
   Auto: 3 redirects (eKYC, sanction, eNACH)

7. Tab visibility: static vs dynamic
   Regular: all always visible
   Auto: controlled by remain_tab_show

8. Components: new auto components
   Regular: 3 components
   Auto: 9 components (5 new)

9. Approval time: 5-7 days vs 1-2 hours
   Regular: manual review
   Auto: instant processing

10. Validation: simple vs complex
    Regular: basic form validation
    Auto: selfie, Aadhaar, income verification
```

---

## 14. DECISION FLOWCHART

```
START: User redirected with encId
  ↓
Is isAuto == true?
  ├─ YES: Go to /auto-journey
  │   ↓
  │   Load AutoMyJourney
  │   ↓
  │   Check again: isAuto == true?
  │     ├─ NO: navigate('/journey')
  │     └─ YES: Continue
  │         ↓
  │         Check: journeyComplete == 1?
  │           ├─ YES: Show UserDashboard
  │           └─ NO: Check check_eligibility
  │               ├─ YES: Show AutoApplicationStep
  │               │   ├─ remain_tab_show == false?
  │               │   │   ├─ YES: Show Tabs 1-5
  │               │   │   └─ NO: Show Tabs 6-9
  │               │   └─ [Tab progression through 0/1/2]
  │               └─ NO: Show PanDetails
  │
  └─ NO: Go to /journey
      ↓
      Load MyJourney
      ↓
      Check again: isAuto == true?
        ├─ YES: navigate('/auto-journey')
        └─ NO: Continue
            ↓
            Check: journeyComplete == 1?
              ├─ YES: Show UserDashboard
              └─ NO: Check check_eligibility
                  ├─ YES: Show ApplicationStep
                  │   └─ [3 tabs, all visible]
                  └─ NO: Show PanDetails
```

---

## 15. STATE FLOW EXAMPLE: ONE TAB AT A TIME

```
USER FILLS TAB 3 (Personal Info) IN AUTO JOURNEY:

BEFORE Submission:
{
  personal_details: 0,     (0 = not started)
  remain_tab_show: false   (false = only early tabs)
}

AFTER Clicking "Submit":
  ↓
[Frontend validation] ✓
  ↓
[API call] getPersonalDetailAuto(formData)
  ↓
[Backend processes] ✓
  ↓
[Backend validation] response.validationStatus = true
  ↓
[API response received]
  ↓
dispatch(updateAutoJourneyEvents({
  personal_details: 1,           ← Marks as complete
  remain_tab_show: true          ← MASTER SWITCH to ON!
}))
  ↓
AFTER Submission:
{
  personal_details: 1,     (1 = completed)
  remain_tab_show: true    (true = unlock later tabs!)
}
  ↓
[useEffect in AutoApplicationStep detects change]
  ↓
[Tabs 6-9 become visible]
  ↓
User can now scroll to see "Bank Verification" tab
```

---

## FINAL CHECKLIST: IS IT AUTO JOURNEY?

```
HOW TO IDENTIFY AUTO JOURNEY IN CODE:

☑ Reading from state.autoCustomerJourneyDetails
☑ Component name starts with "Auto" (AutoApplicationStep, AutoEkyc, etc.)
☑ File location includes "journey/Pages/Auto*"
☑ Has external redirects (window.location.href)
☑ Uses remain_tab_show flag
☑ More than 3 tabs/steps
☑ Checks isAuto flag before proceeding
☑ Has lead_id and enach_url in state
☑ Uses getPersonalDetailAuto API (not getPersonalDetail)
☑ Includes selfie capture and Aadhaar verification
```
