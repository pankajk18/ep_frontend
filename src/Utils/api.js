import Request from "./Request";
import urls from "./urls";
import store from '../store/store';

const apiRequest = new Request(
  () => {},
  () => {},
  () => {}
);


	


export const login =(params)=>{
	return apiRequest.post(`${urls.BASE_API_URL}${urls.loan.LOGIN}`,params);
}

export const otpVerify =(params)=>{
	return apiRequest.post(`${urls.BASE_API_URL}${urls.loan.OTP_VERIFY}`,params);
}

export const resendOtp =(params)=>{
	return apiRequest.post(`${urls.BASE_API_URL}${urls.loan.RESEND_OTP}`,params);
}

export const getCustomerDetails =(params)=>{
	return apiRequest.post(`${urls.BASE_API_URL}${urls.loan.CUSTOMER_DETAILS}`,params);
}

export const getPanVerify =(params)=>{
	return apiRequest.post(`${urls.BASE_API_URL}${urls.loan.PAN_VERIFICATION}`,params);
}

export const getEligibility =(params)=>{
	return apiRequest.post(`${urls.BASE_API_URL}${urls.loan.ELIGIBILITY_CHECK}`,params);
}

export const getLoanQuote =(params)=>{
	return apiRequest.post(`${urls.BASE_API_URL}${urls.loan.LOAN_QUOTE}`,params);
}

export const getGenerateLoan =(params)=>{
	return apiRequest.post(`${urls.BASE_API_URL}${urls.loan.LOAN_GENERATE}`,params);
}


export const getPersonalDetail =async (params)=>{
	return apiRequest.post(`${urls.BASE_API_URL}${urls.loan.DETAILS_PERSONAL}`,params);

	}

export const getPersonalDetailAuto =async (params)=>{
	const state = store.getState();
	const token = state.customerJourneyDetails?.customerDetails?.token || null;
	return (await fetch(`${urls.BASE_API_URL}${urls.loan.DETAILS_PERSONAL}`, {
		 method: "POST",
   		 headers: {
			Authorization: `Bearer ${token}`,   
			// 'Content-Type': 'multipart/form-data' 
		},
    	body: params, // FormData or JSON
	}).then(response => response.json()));
}


export const getEmployeeDetail =(params)=>{
	return apiRequest.post(`${urls.BASE_API_URL}${urls.loan.EMPLOYMENT_DETAILS}`,params);
}


export const getBankVerify =(params)=>{
	return apiRequest.post(`${urls.BASE_API_URL}${urls.loan.BANK_VERIFY}`,params);
}

export const getLeadList =(params)=>{
	return apiRequest.post(`${urls.BASE_API_URL}${urls.loan.LEAD_LIST}`,params);
}

export const getLeadHistory =(params)=>{
	return apiRequest.post(`${urls.BASE_API_URL}${urls.loan.LEAD_DETAIL}`,params);
}

export const getRequiredDocs =(params)=>{
	return apiRequest.post(`${urls.BASE_API_URL}${urls.loan.REQUIRED_DOCS}`,params);
}

export const getDocsUpload = async (formData) => {

	const state = store.getState();
	const token = state.customerJourneyDetails?.customerDetails?.token || null;
  return (await fetch(`${urls.BASE_API_URL}${urls.loan.UPLOAD_DOCS}`, {
	authorization:token,
    method: "POST",
    body: formData,
  }).then(response => response.json()));
};


// loan history
export const getLoanHistory =(profileId)=>{
	return apiRequest.post(`${urls.BASE_API_URL}${urls.loan.LOAN_HISTORY}`,{profileId:profileId});
}

export const getRazorpayOrderId =(params)=>{
	return apiRequest.post(`${urls.BASE_API_URL}${urls.loan.RAZORPAY_ORDER_ID}`,{params});
}

export const redirectToJourney = (encId) => {
	return apiRequest.post(`${urls.BASE_API_URL}${urls.loan.REDIRECT_TO_JOURNEY}`, { encId: encId });
};

export const getCredeauApiCall = (params) => {
	return apiRequest.post(`${urls.BASE_API_URL}${urls.loan.CREDEAU_API_CALL}`, params);
}

export const initiateEkyc = (params) => {
	return apiRequest.post(`${urls.BASE_API_URL}${urls.loan.EKYC_INITIATE}`, params);
}

export const getEkycResponse = (params) => {
	return apiRequest.post(`${urls.LMS_API_URL}${urls.loan.EKYC_RESPONSE}`, params);
}

export const getEnachResponse = (params) => {
	return apiRequest.post(`${urls.LMS_API_URL}${urls.loan.ENACH_RESPONSE}`, params);
}

export const getSanctionDetail = (params) => {
	return apiRequest.post(`${urls.BASE_API_URL}${urls.loan.SANCTION_RESPONSE}`, params);
}

export const updateCustomerJourneyEvent = (params) => {
	return apiRequest.post(`${urls.BASE_API_URL}${urls.loan.UPDATE_CUSTOMER_JOURNEY}`, params);
}

export const getMobileToPhone = (params) => {
	return apiRequest.post(`${urls.BASE_API_URL}${urls.loan.MOBILE_TO_PAN}`, params);
}

export const updateAutoJourneyStatus = (params) => {
	return apiRequest.post(`${urls.BASE_API_URL}${urls.loan.UPDATE_AUTO_JOURNEY}`, params);
}

export const initiateAccountAggregator = (params) => {
	return apiRequest.post(`${urls.BASE_API_URL}${urls.loan.ACCOUNT_AGGREGATOR}`, params);
}


export const getAggregatorResponse = (params) => {
	return apiRequest.post(`${urls.LMS_API_URL}${urls.loan.AGGREGATOR_RESPONSE}`, params);
}

export const getEnhancedOffer = (params) => {
	return apiRequest.post(`${urls.BASE_API_URL}${urls.loan.ENHANCED_OFFER}`, params);
}

export const getAcceptedEnhancedOffer = (params) => {
	return apiRequest.post(`${urls.BASE_API_URL}${urls.loan.ACCEPT_ENHANCED_OFFER}`, params);
}