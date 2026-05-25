import React, { useEffect } from "react";
import PanDetails from "./PanDetails";
import { useSelector, useDispatch } from "react-redux";
import {
  updateCustomerDetails,
  updateJourneyEvents,
} from "../../CustomerJourneyDetails/CustomerJourneyDetails";

import {
  updateAutoCustomerDetails,
  updateAutoJourneyEvents,
  autoCustomerDetailsApiCall,
} from "../../CustomerJourneyDetails/AutoCustomerJourneyDetails";
import ApplicationStep from "./ApplicationStep";
import UserDashaboard from "./UserDashboard";
import AutoApplicationStep from "./AutoApplicationStep";
import { useNavigate } from "react-router-dom";

export default function AutoMyJourney() {
  const customerStep = useSelector(
    (state) => state?.autoCustomerJourneyDetails?.journeySteps,
  );
  const customerDetails = useSelector(
    (state) => state?.autoCustomerJourneyDetails?.customerDetails,
  );
  const journeyComplete = useSelector(
    (state) =>
      state?.autoCustomerJourneyDetails?.customerDetails?.is_journey_completed,
  );
  const isAutoJourney = useSelector(
    (state) => state?.autoCustomerJourneyDetails?.customerDetails?.isAuto,
  );
  const customerDetailsmanual = useSelector(
    (state) => state?.customerJourneyDetails?.customerDetails,
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const params = {
    profileId: customerDetails?.profileId,
  };

  async function fetchCustomerDetails() {
    params.profileId = customerDetailsmanual?.profileId;
    if (params.profileId) {
      let { payload } = await dispatch(autoCustomerDetailsApiCall(params));
      if (payload?.data?.apiStatus == 1) {
        dispatch(
          updateAutoCustomerDetails(payload?.data?.data?.customer_details),
        );
        dispatch(updateAutoJourneyEvents(payload?.data?.data?.screen_details));
        dispatch(updateCustomerDetails(payload?.data?.data?.customer_details));
        dispatch(updateJourneyEvents(payload?.data?.data?.screen_details));
      }
    }
  }

  useEffect(() => {
    fetchCustomerDetails();

    if (!isAutoJourney) {
      navigate("/journey");
    }

    // handleLogout();
  }, [customerStep?.check_eligibility]);

  return (
    <div style={{ minHeight: "80vh" }}>
      {journeyComplete == 1 ? (
        <UserDashaboard />
      ) : customerStep.check_eligibility == 1 ? (
        <AutoApplicationStep />
      ) : (
        <PanDetails />
      )}
    </div>
  );
}
