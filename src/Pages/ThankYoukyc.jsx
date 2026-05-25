import React from 'react'

export default function ThankYoukyc() {
  return (
    <div style={{display:'flex',justifyContent:'center',alignItems:'center',height:'100vh'}}>
    <div className="thank-you-container" style={{textAlign: 'center', padding: '20px', border: '1px solid #ddd', borderRadius: '10px', boxShadow: '0 0 10px rgba(0,0,0,0.1)'}}>
      <div className="thank-you-content">


        <div 
          className="icon" 
          style={{ 
            width: '80px', 
            height: '80px', 
            margin: '0 auto 20px', 
            backgroundColor: '#8cd9a2',  // Green for success
            borderRadius: '50%', 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center' 
          }}
        >
          {/* Success icon */}
          <img 
            src="https://img.icons8.com/ios-filled/100/ffffff/checked--v1.png" 
            alt="Success Icon" 
            style={{ width: '50%' }} 
          />
        </div>
        <div className="thank-you-message">
          {/* Thank You message */}
          <h2>Thank You!</h2>
          <p>Your Video KYC has been completed successfully.</p>
        </div>
        <a href="/" className="thank-you-button" style={{ padding: '10px 20px', backgroundColor: '#4CAF50', color: 'white', textDecoration: 'none', borderRadius: '5px' }}>
          Go to Dashboard
        </a>
      </div>
    </div>
    </div>
  )
}







