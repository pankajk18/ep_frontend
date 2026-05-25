/* global gtag */
/* global fbq */


import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import SendIcon from '@mui/icons-material/Send';
import { Button } from '@mui/material';
import { getCustomerDetails, getDocsUpload, getRequiredDocs } from "../../Utils/api";
import { toast } from "react-toastify";
import { updateCustomerDetails, updateJourneyEvents } from "../../CustomerJourneyDetails/CustomerJourneyDetails";
import { useNavigate } from "react-router-dom";
import { updateAutoCustomerDetails, updateAutoJourneyEvents } from "../../CustomerJourneyDetails/AutoCustomerJourneyDetails";

export default function UploadDocument() {
  const journeySteps = useSelector((state) => state.customerJourneyDetails.journeySteps);
  const dispatch = useDispatch();
  const autocustomerDetails = useSelector((state) => state.autoCustomerJourneyDetails.customerDetails);
  const customerDetails = useSelector((state) => state.customerJourneyDetails.customerDetails);
  const navigate = useNavigate();

  const [selectedFiles, setSelectedFiles] = useState({});
  const [fileSizeErrors, setFileSizeErrors] = useState({});
  const [selfieBlob, setSelfieBlob] = useState(null);
  const [selfiePreviewUrl, setSelfiePreviewUrl] = useState(null);
  const [showCamera, setShowCamera] = useState(false);
  const [loader, setLoader] = useState(false);
  const [isLoadingDocs, setIsLoadingDocs] = useState(false);
  const [documentsRequired, setDocumentsRequired] = useState([]);


  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const fileInputRefs = {
    aadhaar_front: useRef(null),
    aadhaar_rear: useRef(null),
    pan: useRef(null),
    pay_slip: useRef(null),
    bank_statement: useRef(null),
    residence_proof: useRef(null),
  };

  const docIdToKeyMap = {
    1: "aadhaar_front",
    2: "aadhaar_rear",
    4: "pan",
    6: "bank_statement",
    8: "residence_proof",
    16: "pay_slip",
  };

  const docTypeIdMap = {
    aadhaar_front: 1,
    aadhaar_rear: 2,
    pan: 4,
    bank_statement: 6,
    residence_proof: 8,
    pay_slip: 16,
    selfie: 18,
  };


  const fetchDocuments = async () => {
    setIsLoadingDocs(true);
    const params = { leadId: customerDetails?.lead_id || autocustomerDetails?.lead_id };

    try {
      const resp = await getRequiredDocs(params);
      if (resp?.data?.status === 1) {
        setDocumentsRequired(resp?.data?.data );
      } else {
        console.error(resp?.data?.message || "Failed to fetch required documents.");
      }
    } catch (error) {
      console.error("Failed to fetch required documents.");
    } finally {
      setIsLoadingDocs(false);
    }
  };

  useEffect(() => {
    fetchDocuments();
  }, []);

  const handleClick = (docType) => {
    fileInputRefs[docType]?.current?.click();
  };

  const handleChange = (event, docType) => {
    const file = event.target.files[0];
    const maxSizeInBytes = 5 * 1024 * 1024;

    if (file) {
      if (file.size > maxSizeInBytes) {
        setFileSizeErrors((prev) => ({ ...prev, [docType]: "File size should be less than 5MB." }));
        toast.error("File size should be less than 5MB.");
        return;
      }

      setFileSizeErrors((prev) => ({ ...prev, [docType]: null }));
      setSelectedFiles((prev) => ({ ...prev, [docType]: file }));
    }
  };

  const openCamera = async () => {
    setShowCamera(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
    } catch (err) {
      toast.error("Unable to access camera.");
      console.error(err);
    }
  };

  const captureSelfie = () => {
    const context = canvasRef.current.getContext("2d");
    context.drawImage(videoRef.current, 0, 0, 250, 150);

    canvasRef.current.toBlob((blob) => {
      if (blob.size > 2 * 1024 * 1024) {
        toast.error("Selfie size should be less than 2MB.");
        return;
      }

      const selfieFile = new File([blob], "selfie.jpg", { type: "image/jpeg" });
      setSelfieBlob(selfieFile);

      const previewUrl = URL.createObjectURL(selfieFile);
      setSelfiePreviewUrl(previewUrl);
    }, "image/jpeg");

    const stream = videoRef.current.srcObject;
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
    }

    setShowCamera(false);
  };

  useEffect(() => {
    return () => {
      if (selfiePreviewUrl) {
        URL.revokeObjectURL(selfiePreviewUrl);
      }
    };
  }, [selfiePreviewUrl]);

  const renderUploadBlock = (label, docType) => {
    const isPdfOnly = docType === "bank_statement" || docType === "pay_slip";
    const acceptTypes = isPdfOnly ? "application/pdf" : "image/jpeg, image/png";

    return (
      <li className="mt-2" key={docType}>
        <div className="drop-container" onClick={() => handleClick(docType)}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <AddCircleOutlineIcon style={{ fontSize: '40px' }} />
            <span className="drop-title">{label}</span>
          </div>

          <div className="docinput-wrap">
            <input
              type="file"
              className="form-control"
              ref={fileInputRefs[docType]}
              onChange={(e) => handleChange(e, docType)}
              accept={acceptTypes}
              style={{ display: 'none' }}
            />
            {selectedFiles[docType] && (
              <div style={{ fontSize: '12px' }}>{selectedFiles[docType].name}</div>
            )}
          </div>

          {fileSizeErrors[docType] && (
            <div style={{ color: 'red', fontSize: '12px', marginTop: '4px' }}>
              {fileSizeErrors[docType]}
            </div>
          )}
        </div>
      </li>
    );
  };

  const submit = async () => {
    if (loader) return;

    setLoader(true);

    try {
      const requiredDocs = documentsRequired
        .map((doc) => docIdToKeyMap[doc.id])
        .filter(Boolean);
      const missingDocs = requiredDocs.filter(
        (doc) => !selectedFiles[doc] && journeySteps[`${doc}_upload`] !== 1
      );

      if (missingDocs.length > 0) {
        toast.error("Please upload all required documents before continuing.");
        setLoader(false);
        return;
      }

      if (customerDetails?.isAuto==false) {

        if (!selfieBlob && journeySteps.selfie_upload !== 1) {
          toast.error("Please capture a selfie before continuing.");
          setLoader(false);
          return;
        }
      }

      let uploadedDocTypes = {};
      let response;

      for (const [docType, file] of Object.entries(selectedFiles)) {
        if (journeySteps[`${docType}_upload`] === 1) continue;

        const formData = new FormData();
        formData.append("profileId", customerDetails?.profileId);
        formData.append("docTypeId", docTypeIdMap[docType]);
        formData.append("paySlip", file);

        response = await getDocsUpload(formData);

        if (response?.apiStatus === 1) {
          toast.success(`${docType} uploaded successfully.`);
          uploadedDocTypes[docType] = true;
        } else {
          toast.error(`${docType} upload failed: ${response?.message || 'Something went wrong'}`);
          setLoader(false);
          return;
        }
      }

      if (!journeySteps.selfie_upload && selfieBlob) {
        const selfieFormData = new FormData();
        selfieFormData.append("profileId", customerDetails?.profileId);
        selfieFormData.append("docTypeId", docTypeIdMap.selfie);
        selfieFormData.append("paySlip", selfieBlob);

        const selfieResponse = await getDocsUpload(selfieFormData);

        if (selfieResponse?.apiStatus === 1) {
          toast.success("Selfie uploaded successfully.");
          uploadedDocTypes["selfie"] = true;
        } else {
          toast.error(`Selfie upload failed: ${selfieResponse?.message || 'Something went wrong'}`);
          setLoader(false);
          return;
        }
      }

      const updatedState = {};

      if (uploadedDocTypes.pan) {
        updatedState.aadhaar_upload = 1;
      }
      if (uploadedDocTypes.pan) updatedState.pan_upload = 1;
      if (uploadedDocTypes.pan) updatedState.pay_slip_upload = 1;
      if (uploadedDocTypes.bank_statement) updatedState.bank_statement_upload = 1;
      if (uploadedDocTypes.residence_proof) updatedState.residence_proof_upload = 1;
      if (uploadedDocTypes.selfie) updatedState.selfie_upload = 1;

      if (Object.keys(updatedState).length > 0) {
        updatedState.upload_documents = 1;
        dispatch(updateJourneyEvents(updatedState));
      }

      // Pixel
      gtag('event', 'conversion', {
        send_to: 'AW-17536367897/uH7zCJaV3aUbEJn6_qlB'
      });


      gtag('event', 'conversion', {
        'send_to': 'AW-17631961031/H9d1COqH8akbEMe_yddB',
        'value': 1.0,
        'currency': 'INR'
      });


      // Facebook Pixel event tracking
      fbq('track', 'SubmitApplication');

      if (autocustomerDetails?.isAuto == true && autocustomerDetails?.leadProcessMode == 3 ) {

        async function fetchCustomerDetails() {
              
          const params = { 
            profileId: autocustomerDetails?.profileId
          }
              
              const response = await getCustomerDetails(params);
              if (response?.data?.apiStatus == 1) {
                dispatch(updateCustomerDetails(response?.data?.data?.customer_details));
                dispatch(updateJourneyEvents(response?.data?.data?.screen_details));
                dispatch(updateAutoCustomerDetails(response?.data?.data?.customer_details));
                dispatch(updateAutoJourneyEvents(response?.data?.data?.screen_details));
        
              }
            
          }

        fetchCustomerDetails();
        // dispatch(updateAutoJourneyEvents({
        //   upload_documents: 1,
        //   // banking_details: 2,
        //   account_aggregator: 2
        // }));

      } else {


        navigate('/journey/congratulations');
      }
    } catch (error) {
      console.error("Error submitting documents:", error);
      toast.error("Error submitting documents");
    } finally {
      setLoader(false); // Stop loading at end of try or catch
    }
  };


  return (
    <>
      {/* {journeySteps.upload_documents === 2 && ( */}
      <div className='box-height' style={{ display: 'flex', alignItems: 'start', justifyContent: 'center', width: '100%' }}>
        <div className="wraper-right-box" style={{ width: '100%' }}>

          <ul className="upload-doc-wraper">
            {!isLoadingDocs && documentsRequired.map((doc) => {
              const docKey = docIdToKeyMap[doc.id];

              // skip if mapping not found
              if (!docKey) return null;

              // skip if already uploaded
              if (journeySteps[`${docKey}_upload`] === 1) return null;

              return renderUploadBlock(doc.name, docKey);
            })}
          </ul>

          {customerDetails?.isAuto==false && (
            <div className="Upload_selfi mt-3 p-4 d-flex align-items-center rounded-2 justify-content-center gap-4">

              {/* Selfie Section */}

              {showCamera ? (
                <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                  <video ref={videoRef} width="250" height="150" />
                  <Button className="mt-3" onClick={captureSelfie} variant="contained" color="primary">
                    Capture Selfie
                  </Button>
                  <canvas ref={canvasRef} width="250" height="150" style={{ display: 'none' }} />
                </div>
              ) : (
                <>
                  <div className="card-Pic" onClick={openCamera}>
                    <div className="drop-container">
                      {selfiePreviewUrl ? (
                        <img
                          src={selfiePreviewUrl}
                          alt="Selfie Preview"
                          style={{ objectFit: 'contain', borderRadius: "8px", height: '100%', width: '100%' }}
                        />
                      ) : (
                        <>
                          <AddCircleOutlineIcon style={{ fontSize: '40px' }} />
                          <span className="drop-title" style={{ textAlign: 'center' }}>
                            No selfie taken
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                </>
              )}
            </div>
          )}

          <Button
            type="submit"
            variant='contained'
            onClick={submit}
            className='mt-5 fw-bold ms-bg-secondary'
            size='large'

            disabled={loader}
          >
            {loader ? 'Continuing...' : 'Continue'}  &nbsp;&nbsp;&nbsp;&nbsp;
            <SendIcon />
          </Button>
        </div>
      </div>
      {/* )} */}
    </>
  );
}
