import { useNavigate } from "react-router-dom";
import { React } from "react";
import { redirectToJourney } from "../../Utils/api";
import { useDispatch } from "react-redux";
import { updateCustomerDetails } from "../../CustomerJourneyDetails/CustomerJourneyDetails";

function RedirectToJourney() {
    const navigate = useNavigate();

    // Extract UTM parameters from the UR
    const encId = (window.location.href).split("?encId=")[1];
    const dispatch = useDispatch();

    const callRedirectionApi = async () => {

        try {
            const resp = await redirectToJourney(encId);
            if (resp?.data?.status && resp?.data?.apiStatus == 1) {
                dispatch(updateCustomerDetails({
                    profileId: resp?.data?.data?.profileId,
                    mobile: resp?.data?.data?.mobile,
                    token: resp?.data?.data?.token
                }));

                if (resp?.data?.data?.journeyCompletedFlag === 1) {
                    dispatch(updateCustomerDetails({ journeyCompletedFlag: 1 }));
                    window.location.href = '/journey/dashboard';
                } else {
                    navigate('/journey');
                }
            } else {
                let msg = resp?.data?.message || "An error occurred";
                alert(msg);
                window.location.href = '/apply-now';
            }
        } catch (err) {
            alert("some error occured");
            window.location.href = '/apply-now';
        }
    };

    if (encId) {
        // console.log(encId);
        callRedirectionApi();
    } else {
        alert("not working");
        window.location.href = '/apply-now';
    }

    return (
        <>

        </>
    );
}

export default RedirectToJourney;
