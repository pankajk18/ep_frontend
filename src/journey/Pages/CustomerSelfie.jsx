import React, { use, useRef, useState, useEffect } from 'react'
import LibraryAddCheckIcon from '@mui/icons-material/LibraryAddCheck';
import { Button } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

export default function CustomerSelfie({ onCapture }) {
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const streamRef = useRef(null);

    const [photo, setPhoto] = useState(null);

    const openCamera = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                video: { facingMode: "user" }, // front camera
            });
            streamRef.current = stream;
            videoRef.current.srcObject = stream;
        } catch (error) {
            console.error("Error accessing camera:", error);
        }
    }

    // const captureSelfie = () => {
    //     const video = videoRef.current;
    //     const canvas = canvasRef.current;

    //     canvas.width = video.videoWidth;
    //     canvas.height = video.videoHeight;

    //     canvas.getContext("2d").drawImage(video, 0, 0);
    //     const image = canvas.toDataURL("image/jpeg");
    //     setPhoto(image);

    //     // ✅ Stop camera
    //     streamRef.current.getTracks().forEach(track => track.stop());
    //     videoRef.current.srcObject = null;
    // }


const captureSelfieOld = () => {
  const video = videoRef.current;
  const canvas = canvasRef.current;

  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;

  const ctx = canvas.getContext("2d");
  ctx.drawImage(video, 0, 0);

  const image = canvas.toDataURL("image/jpeg", 0.7);

  setPhoto(image);
  onCapture(image);

  // stop camera
  streamRef.current.getTracks().forEach(track => track.stop());
  videoRef.current.srcObject = null;
  
  // ✅ Detach stream from video element
  video.pause();
  video.srcObject = null;

  // ✅ Release reference
  streamRef.current = null;
};



const captureSelfie = () => {
  const video = videoRef.current;
  const canvas = canvasRef.current;

  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;

  const ctx = canvas.getContext("2d");
  ctx.drawImage(video, 0, 0);

  canvas.toBlob((blob) => {
    if (!blob) return;

    // const file = new File([blob], "selfie.jpg", {
    //   type: "image/jpeg",
    // });

    const previewUrl = URL.createObjectURL(blob);
    const selfieFile = new File([blob], "selfie.jpg", { type: "image/jpeg" });
    //  setSelfieBlob(selfieFile);
    // ✅ send BOTH
    onCapture(selfieFile);
    setPhoto(previewUrl);
    // selfieImage(file);

    // stop camera
    streamRef.current?.getTracks().forEach(t => t.stop());
    video.srcObject = null;
  }, "image/jpeg", 0.7);
};






    return (
        <>
            <div className='bg-selfie mt-4'>
                <div className='wraper-right-box-1'>
                    <div className='row'>                      
                        
                        <div className='d-flex justify-content-between align-items-center position-relative'>
                           
                            <div className='selfie-wrapper' style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <div className='selfie-box' style={{ width: '300px', height: '200px', border: '1px solid #ddd', borderRadius: '5px',  display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                    No Selfie taken
                                </div>
                                  {!photo && (
                                <>
                                    <div className='d-flex justify-content-start gap-3'>
                                        <Button variant='contained' onClick={openCamera} className='mt-4'>Open Camera</Button>
                                        <Button variant='outlined' onClick={captureSelfie} className='mt-4'>Take Selfie</Button>
                                    </div>

                                    <video
                                        ref={videoRef}
                                        autoPlay
                                        playsInline  
                                        width="310"   
                                        style={{ position:'absolute', top: '0%', borderRadius:'10px', left: '10px', padding:'10px', overflow:'hidden' }}
                                       
                                    />
                                    
                                </>
                            )}
                            </div>

                            {/* camra start */}
                          

                            <canvas ref={canvasRef} style={{ display: "none" }} />

                            {photo && (
                                <div style={{ position: 'absolute', top: '0%', left: '15px' }}>

                                    <img src={photo} alt="Selfie" width="295" height="200" style={{ borderRadius: '10px', border: '5px solid #ddd ' }} />
                                </div>
                            )}
                            {/* camra end */}
                        </div>
                        
                    </div>
                </div>
            </div>
        </>
    )
}
