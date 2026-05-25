export default {
  //  BASE_API_URL : 'https://microservices.crmpaisa.com/api/v1/', // live server

  // BASE_API_URL : 'https://microservices.sfscrm.in/api/v1/',
  // BASE_API_URL : 'http://localhost:3000/api/v1/',

  //uat
  // LMS_API_URL: "https://api.crmpaisa.com/Api/",
  // BASE_API_URL: "https://microservices.crmpaisa.in/api/v1/", //uat server.

  //live
  BASE_API_URL: "https://microservices.crmpaisa.com/api/v1/", //live server
  LMS_API_URL: "https://api.crmpaisa.com/Api/",

  //  https://api.salaryontime.in/Api/Website/RepeatInstantJourneyController/verifyEkyc
  loan: {
    LOGIN: "customer-journey/login",
    OTP_VERIFY: "customer-journey/otp-verify",
    RESEND_OTP: "customer-journey/resend-otp",
    CUSTOMER_DETAILS: "lead-service/get-customer-details",
    PAN_VERIFICATION: "customer-journey/verify-pan",
    ELIGIBILITY_CHECK: "customer-journey/check-eligibility",
    LOAN_QUOTE: "lead-service/loan-quote-decision",
    LOAN_GENERATE: "lead-service/generate-loan-quote",
    DETAILS_PERSONAL: "customer-journey/update-personal-details",
    EMPLOYMENT_DETAILS: "customer-journey/update-employment-details",
    UPLOAD_DOCS: "lead-service/pay-slip-upload",
    BANK_VERIFY: "lead-service/bank-account-verification",
    LEAD_LIST: "lead-service/get-status-lead-list",
    LEAD_DETAIL: "lead-service/get-lead-view-detail",
    RAZORPAY_ORDER_ID: "razor-pay/create-payment-order",
    REDIRECT_TO_JOURNEY: "lead-service/redirect-to-journey",
    CREDEAU_API_CALL: "auto-journey/fetch-credeau-detail",
    EKYC_INITIATE: "lead-service/initiate-ekyc",
    EKYC_RESPONSE: "Website/RepeatInstantJourneyController/verifyEkyc",
    AGGREGATOR_RESPONSE:
      "Website/RepeatInstantJourneyController/verifyAggregator",
    ENACH_RESPONSE: "CallBacks/ICICIeNachController/eMandate_callback",
    SANCTION_RESPONSE: "lead-service/sanction-lead",
    MOBILE_TO_PAN: "pan-service/extract-phone-to-pan",
    UPDATE_CUSTOMER_JOURNEY: "lead-service/update-event-journey",
    UPDATE_AUTO_JOURNEY: "customer-journey/update-lead-process-mode",
    ACCOUNT_AGGREGATOR: "lead-service/account-aggregator-initiate",
    REQUIRED_DOCS: "lead-service/required-docs",
    ENHANCED_OFFER: "lead-service/get-enhanced-loan-offer",
    ACCEPT_ENHANCED_OFFER: "lead-service/enhanced-loan-offer-decision",
  },

  BLOG: {
    GET_ALL_BLOGS: "get-blogs-data",
  },
};
