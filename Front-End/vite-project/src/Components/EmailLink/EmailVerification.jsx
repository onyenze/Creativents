import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function EmailVerification() {
  const { token } = useParams();
  const [verificationStatus, setVerificationStatus] = useState('Verifying...');

  useEffect(() => {
    // Send a request to the server to verify the email using the provided token
    
      axios.put(`https://creativents-on-boarding.onrender.com/api/verify?token=${token}`)
      .then((res) => {
        console.log(res),
        setVerificationStatus('Email verified successfully!');
      })
      .catch((err) => {
        console.log(err);
        setVerificationStatus('Error verifying email.')
      });
  }, [token]);

  return (
    <div>
      <h1>Email Verification</h1>
      <p>{verificationStatus}</p>
    </div>
  );
}

export default EmailVerification;
