import React, { use, useEffect, useState } from 'react'
import LibraryAddCheckIcon from '@mui/icons-material/LibraryAddCheck';
import { Button } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { useDispatch, useSelector } from 'react-redux';
import { updateAutoJourneyEvents } from '../../CustomerJourneyDetails/AutoCustomerJourneyDetails';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { getEnachResponse } from '../../Utils/api';
import { toast } from 'react-toastify';
import ekycBg from '../assets-crm/ekyc.jpg';



export default function AutoEnach() {
  const dispatch = useDispatch();
  const navigator = useNavigate();
  const param = useParams();
  const [searchParams] = useSearchParams();
  const [loader, setLoader] = useState(false);
  const customerDetails  = useSelector((state) => state?.autoCustomerJourneyDetails?.customerDetails);


    const submit=()=>{
        setLoader(true); 
        const url =  customerDetails.enach_url;
        window.location.href = url;
    }

    useEffect(() => {
        if(param.id){

        console.log("param id--",param.id);
        }
    //if (param.id) {
        // console.log("eKYC process started with id === " + param.id);
        if( searchParams.get('msg') == '0300' &&  searchParams.get('code') != ''){
            toast.success(" You have successfully completed the enach process");
            navigator("/journey/congratulations")
        } else {
            if(searchParams.get('msg') == "0399" || searchParams.get('msg') =="0392"){
                toast.error("Enanch Mandate fail, please try agian!");
            }

        }          
    //  }   
    }, [param.id]);
              
  return (
    <>
       <div className='box-height bg-enach'  style={{backgroundImage: `url(${ekycBg})`}}>
                <div className='wraper-right-box'>
                    <div className='row'>
                        <h3 className='pl-5 fontstyle'>e-NACH Mandate</h3>
                        <h6 className='opacity-75' style={{ lineHeight: '30px' }}>It’s a digital system used in India to automatically collect recurring payments from a bank account—without using paper forms or cheques.</h6>

                        <h5 className='fw-medium fs-5 pt-5'>Advantages of eNACH</h5>
                        <div className='topic'>
                            <ul style={{ listStyle: 'none', paddingLeft: '0', marginLeft: '0', lineHeight: '40px' }}>
                                <li> <LibraryAddCheckIcon className='ms-text-primary'  /> &nbsp; Paperless & fast</li>
                                <li> <LibraryAddCheckIcon className='ms-text-primary'  /> &nbsp; No missed payments</li>
                                <li> <LibraryAddCheckIcon className='ms-text-primary'  /> &nbsp; Safe and RBI-regulated</li>                               
                            </ul>
                            
                        </div>

                        <Button
                            variant='contained'
                            className='mt-2 ms-bg-secondary'
                            size='large'
                            style={{ width: '255px' }}
                            onClick={submit}
                            disabled={loader}

                        >
                            {loader ? 'Mandating e-NACH ..' : 'Mandate e-NACH'} &nbsp; <SendIcon />
                        </Button>
                    </div>
                </div>
            </div>
    </>
  )
}
