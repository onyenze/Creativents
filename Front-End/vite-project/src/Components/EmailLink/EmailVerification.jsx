import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function EmailVerification() {
  const { id, token } = useParams()
  const nav = useNavigate()
  const [verificationStatus, setVerificationStatus] = useState('Verifying...');

  useEffect(() => {
    // fetch(`/api/verify/${id}/${token}`)
    axios.put(`https://creativents-on-boarding.onrender.com/api/verify/${id}/${token}`)
      // .then((res) => response.json())
      .then((res) => {
        // if (data.success) {
          console.log('verification successful', res);
          setVerificationStatus('Verification successful!')
          // Redirect the user to the homepage after successful verification
          // nav('/')
        // } else {
          // setVerificationStatus('Verification failed!');
        // }
      })
      .catch((err) => {
        console.error('Error verifying:', err);
        setVerificationStatus('Error verifying, please try again later.');
      });
  }, [id, token, nav]);


  return (
    <div className='Email_VerificationPage'>
      <h1></h1>
      <h1>{verificationStatus}</h1>
    </div>
  );
}

export default EmailVerification;
































// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';

// function EmailVerification() {
//   const { token } = useParams();
  
//   const [verificationStatus, setVerificationStatus] = useState('Verifying...');

//   useEffect(() => {
//     // Send a request to the server to verify the email using the provided token
    
//       axios.put(`https://creativents-on-boarding.onrender.com/api/verify/:id/${token}`)
//       .then((res) => {
//         console.log(res)
//         setVerificationStatus('Email verified successfully!');
//       })
//       .catch((err) => {
//         console.log(err);
//         setVerificationStatus('Cannot Verify Email Address.')
//       });
//   }, [token]);

//   return (
//     <div>
//       <h1>Email Verification</h1>
//       <p>{verificationStatus}</p>
//     </div>
//   );
// }

// export default EmailVerification;
