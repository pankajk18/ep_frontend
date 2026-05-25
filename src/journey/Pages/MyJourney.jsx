import React, { useEffect } from "react";
import PanDetails from "./PanDetails";
import { useSelector, useDispatch } from "react-redux";
import {
  updateCustomerDetails,
  updateJourneyEvents,
  customerDetailsApiCall,
} from "../../CustomerJourneyDetails/CustomerJourneyDetails";
import ApplicationStep from "./ApplicationStep";
import UserDashaboard from "./UserDashboard";
import {
  updateAutoCustomerDetails,
  updateAutoJourneyEvents,
} from "../../CustomerJourneyDetails/AutoCustomerJourneyDetails";
import { useNavigate } from "react-router-dom";

export default function MyJourney() {
  const customerStep = useSelector(
    (state) => state?.customerJourneyDetails?.journeySteps,
  );
  const customerDetails = useSelector(
    (state) => state?.customerJourneyDetails?.customerDetails,
  );
  const journeyComplete = useSelector(
    (state) =>
      state?.customerJourneyDetails?.customerDetails?.is_journey_completed,
  );
  const isAutoJourney = useSelector(
    (state) => state?.customerJourneyDetails?.customerDetails?.isAuto,
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const params = {
    profileId: customerDetails?.profileId,
  };

  async function fetchCustomerDetails() {
    if (params.profileId) {
      let { payload } = await dispatch(customerDetailsApiCall(params));
      if (payload?.data?.apiStatus == 1) {
        dispatch(updateCustomerDetails(payload?.data?.data?.customer_details));
        dispatch(updateJourneyEvents(payload?.data?.data?.screen_details));
        dispatch(
          updateAutoCustomerDetails(payload?.data?.data?.customer_details),
        );
        dispatch(updateAutoJourneyEvents(payload?.data?.data?.screen_details));
      }
    }
  }

  useEffect(() => {
    fetchCustomerDetails();
    if (isAutoJourney) {
      navigate("/auto-journey");
    }

    // handleLogout();
  }, [customerStep?.check_eligibility]);

  return (
    <div style={{ minHeight: "80vh" }}>
      {journeyComplete == 1 ? (
        <UserDashaboard />
      ) : customerStep.check_eligibility == 1 ? (
        <ApplicationStep />
      ) : (
        <PanDetails />
      )}
    </div>
  );
}
