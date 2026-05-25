import React, { use, useEffect, useRef, useState } from 'react'
import LibraryAddCheckIcon from '@mui/icons-material/LibraryAddCheck';
import { Button } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { updateAutoJourneyEvents, updateAutoCustomerDetails } from '../../CustomerJourneyDetails/AutoCustomerJourneyDetails';
import { useDispatch, useSelector } from 'react-redux';
import { getSanctionDetail, updateCustomerJourneyEvent } from '../../Utils/api';
import { useParams,useSearchParams  } from 'react-router-dom';
import { toast } from 'react-toastify';
import bgBank from '../assets-crm/approve-bg.jpg';




export default function AutoSanction() {
        const dispatch = useDispatch();
        const params = useParams();
        const [searchParams] = useSearchParams();
        const [sanctionResponse, setSanctionResponse] = useState(null);
        const [loader, setLoader] = useState(false);
        const customerDetails  = useSelector((state) => state?.autoCustomerJourneyDetails?.customerDetails);
        const customerJourneyDetails  = useSelector((state) => state?.autoCustomerJourneyDetails?.journeySteps);

        //  let autoCustomerDetails = localStorage.getItem('autoCustomerDetails');
        // // console.log("autoCustomerDetails--->>>",autoCustomerDetails);
        // autoCustomerDetails = JSON.parse(autoCustomerDetails || '{}');
        // // check ekyc completed then call sanction detail 
        // // console.log("autoCustomerDetails--",autoCustomerDetails?.data?.customer_details?.lead_id);
        // const leadId = autoCustomerDetails?.data?.lead_details?.lead_id;
        //  let credeoResLatest = localStorage.getItem('credeoResLatest');
        //  credeoResLatest = JSON.parse(credeoResLatest)  || {};

       const leadId =  customerDetails.lead_id;
          console.log("leadId===================", customerDetails.lead_id);
      //    const sanctionResponse = getSanctionDetail({ leadId: leadId });


     //    console.log("leadId-- new ===>",customerDetails.lead_id);

      // let leadId = customerDetails.lead_id;
     
        //  const hasCalledApi = useRef(false); //  Prevent multiple calls

        useEffect(() => {
            if (!leadId) return;

            // if (hasCalledApi.current) return; //  Already called

            // hasCalledApi.current = true;
            // alert(customerJourneyDetails.sanction );

            //if(customerJourneyDetails.sanction == 2){
                //  getSanctionDetail({ leadId }).then((response) => {
                //     console.log("sanction detail response--", response.data);
                //     setSanctionResponse(response.data);
                // });
            //}

           
        }, [leadId, dispatch]);
                console.log("sanctionResponse--  >>>", sanctionResponse);

       const submit=async()=>{
            setLoader(true);
          
             const res = await getSanctionDetail({ leadId });
             setSanctionResponse(res);
             console.log("res pradeep ====>", res.data.data.sanction_url,leadId);
            if( res?.data?.data?.sanction_url){
            window.location.href = res.data.data.sanction_url;

            } else{
                toast.error(`esign link not generated yet...`);
                setLoader(false);
            }
        }

        //response after sanction and esign
        useEffect(() => {
            // console.log("window.location.search--",params.id);
            if(params.id == "esign-success"){
                toast.success(searchParams.get('msg'));
                //  updateCustomerJourneyEvent({
                //             leadId: leadId,
                //             type: 'lje_sanction_esign', 
                //         });
                   dispatch(updateAutoJourneyEvents({
                      sanction: 1,
                      enach_detail: 2
            
                    }));

            }
            const queryParams = new URLSearchParams(window.location.search);
            const sanctionStatus = queryParams.get('sanctionStatus');
            const eSignStatus = queryParams.get('eSignStatus');
            console.log("sanctionStatus--",sanctionStatus);
        },[window.location.search,params,leadId]);
    return (
        <>
           <div className='box-height bg-approval' style={{backgroundImage: `url(${bgBank})`,
    }} >
                <div className='wraper-right-box' style={{paddingBottom:'19%'}}>
                    <div className='row'>
                        <h3 className='pl-5 fontstyle'>Sanction & e-Sign</h3>
                        <h6 className='opacity-75' style={{ lineHeight: '30px' }}>Your loan application has been approved. Please review the sanctioned loan details and complete the digital signing process to proceed with disbursal.</h6>

                        <h5 className='fw-medium fs-5 pt-5'>e-Sign Loan Agreement</h5>
                        <div className='topic'>
                            <ul style={{ listStyle: 'none', paddingLeft: '0', marginLeft: '0', lineHeight: '40px' }}>
                                <li> <LibraryAddCheckIcon className='ms-text-primary' /> &nbsp; Review and confirm all loan terms</li>
                                <li> <LibraryAddCheckIcon className='ms-text-primary' /> &nbsp; Sign securely using OTP-based e-Sign</li>
                                <li> <LibraryAddCheckIcon className='ms-text-primary' /> &nbsp; Paperless, fast, and legally valid</li>
                               
                            </ul>
                            <p className='fw-medium small'>Once e-Sign is completed, your loan will be processed for next step.</p>
                        </div>

                        <Button
                            variant='contained'
                            className='mt-4 fw-bolder ms-bg-secondary'
                            size='large'
                            style={{ width: '250px' }}
                            onClick={submit}
                            disabled={loader}
                        >
                            {loader ? 'Processing to e-Sign..' : 'Process to e-Sign'} &nbsp; <SendIcon />

                        
                        </Button>
                    </div>
                </div>
            </div>
        </>
    )
}
