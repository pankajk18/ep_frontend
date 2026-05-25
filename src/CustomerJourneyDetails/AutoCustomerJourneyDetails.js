import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getCustomerDetails } from "../Utils/api";

export const autoCustomerDetailsApiCall = createAsyncThunk(
    "autoCustomerJourneyDetails/customerDetailsApiCall", //  Updated to match slice name
    async (params) => {
        try {
            const response = await getCustomerDetails(params);
            localStorage.setItem('autoCustomerDetails', JSON.stringify(response?.data || {}));
            return response;
        } catch (e) {
            throw new Error("Error fetching customer data: " + e.message);
        }
    }
);

const initialState = {
    customerDetails: {},
    journeySteps: {
        check_eligibility: 0,
        loan_quote: 0,
        personal_details: 0,
        banking_details: 0,
        ekyc: 0,
        sanction: 0,
        enach: 0,
        thank_you: 0,
        remain_tab_show:false    
    },
    error: null
};

export const autoCustomerJourneyDetailsSlice = createSlice({
    name: 'autoCustomerJourneyDetails',
    initialState,
    reducers: {
        updateAutoJourneyEvents: (state, action) => { // ✅ Added "Auto" prefix
            state.journeySteps = { ...state.journeySteps, ...action.payload };
        },
        updateAutoCustomerDetails: (state, action) => { // ✅ Added "Auto" prefix
            state.customerDetails = { ...state.customerDetails, ...action.payload };
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(autoCustomerDetailsApiCall.pending, (state) => {
                state.error = null;
            })
            .addCase(autoCustomerDetailsApiCall.fulfilled, (state, action) => {
                state.customerDetails = { 
                    ...state.customerDetails, 
                    ...action?.payload?.data?.customer_details 
                };
                state.journeySteps = { 
                    ...state.journeySteps, 
                    ...action?.payload?.data?.screen_details 
                };
            })
            .addCase(autoCustomerDetailsApiCall.rejected, (state, action) => {
                state.error = action.error.message;
            })
            .addCase("LOGOUT", () => initialState);
    }
});

export const autoCustomerJourneyDetailsReducer = autoCustomerJourneyDetailsSlice.reducer;
export const { updateAutoJourneyEvents, updateAutoCustomerDetails } = autoCustomerJourneyDetailsSlice.actions;