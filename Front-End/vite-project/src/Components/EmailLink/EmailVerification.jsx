import './EmailVerification.css'
import CheckMail from './CheckMail';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function EmailVerification() {
  const location = useLocation();
  const userDatas = useSelector(state=>state.events.user)
  const searchParams = new URLSearchParams(location.search);
  const token = searchParams.get("token")
  const nav = useNavigate()
  const [verificationStatus, setVerificationStatus] = useState('');


    useEffect(() => {

    if (token) {

      EmailVerified(token);
    }
  }, [token]);

   const EmailVerified = (token) =>{
    axios
      .put(`https://creativents-on-boarding.onrender.com/api/verify/${token}`)
    .then((res) => {
      console.log('verification successful', res);
      setVerificationStatus('Verification successful!');
      // Redirect the user to the homepage after successful verification
    })
    .catch((err) => {
      console.log('Error verifying:', err);
      setVerificationStatus('Error verifying, please try again later.');
    })
   }       
const ResendVerification = () => {
    axios
    .put("https://creativents-on-boarding.onrender.com/api/re-verify", {
      email:userDatas.email})
    .then(res=>{
      console.log(res)

    })
    .catch(err=>{
      console.log(err);
    })
}

console.log(userDatas.email);

   

  return (
    <div className="container">
    {
      verificationStatus === 'Verification successful!'?
      <div className="holder">
    <h1>Email verification successful</h1>
    <p>Click the button below to go Login</p>
    <button className='ContinueBtn' onClick={()=>nav('/login')}>Continue</button>
   </div>
      : verificationStatus === 'Error verifying, please try again later.'?
      <div className="holder">
    <h1>Error verifying, please try again later</h1>
    <p> please try again later</p>
    <button className='ContinueBtn' >Back</button>
   </div>
    : 
    <CheckMail />
    }
   </div>
      )
}

export default EmailVerification

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useLocation, useNavigate, useParams } from 'react-router-dom';

// function EmailVerification() {
//   const { token } = useParams();
//   const location = useLocation();
//   const nav = useNavigate();
//   const [verificationStatus, setVerificationStatus] = useState('Verifying...');

//   useEffect(() => {
//     const searchParams = new URLSearchParams(location.search);
//     const tokens = searchParams.get("token");

//     if (tokens) {
//       // Call the function to verify the email with the token
//       EmailVerified(token);
//     }
//   }, [token, location.search]);

//   const EmailVerified = (token) => {
//     axios
//       .put(`https://creativents-on-boarding.onrender.com/api/verify/${token}`)
//       .then((res) => {
//         console.log('verification successful', res);
//         setVerificationStatus('Verification successful!');
//         // Redirect the user to the login page after successful verification
//         nav('/login');
//       })
//       .catch((err) => {
//         console.log('Error verifying:', err);
//         setVerificationStatus('Error verifying, please try again later.');
//       });
//   };

//   return (
//     <div>
//       <h2>Email Verification Status</h2>
//       <p>{verificationStatus}</p>
//     </div>
//   );
// }

// export default EmailVerification;


























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
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useParams } from 'react-router-dom';
// import { useNavigate } from 'react-router-dom';

// function EmailVerification() {
//   const { id, token } = useParams()
//   const nav = useNavigate()
//   const [verificationStatus, setVerificationStatus] = useState('Verifying...');

//   useEffect(() => {
//     // fetch(`/api/verify/${id}/${token}`)
//     if(token){
//       axios
//       .put(`https://creativents-on-boarding.onrender.com/api/verify/${token}`)
//         // .then((res) => response.json())
//         .then((res) => {
//           // if (data.success) {
//             console.log('verification successful', res);
//             setVerificationStatus('Verification successful!')
//             // Redirect the user to the homepage after successful verification
//             nav('/')
//           // } else {
//             // setVerificationStatus('Verification failed!');
//           // }
//         })
//         .catch((err) => {
//           console.error('Error verifying:', err);
//           setVerificationStatus('Error verifying, please try again later.');
//         })
//     }
//   }, []);
// import { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useLocation, useNavigate, useParams } from 'react-router-dom';

// function EmailVerification() {
//   // const {id} = useParams()
//   const location = useLocation();
//   const nav = useNavigate();
//   const [verificationStatus, setVerificationStatus] = useState('Verifying...');

//   useEffect(() => {
//     // Extract the token from the URL using URLSearchParams
//     const searchParams = new URLSearchParams(location.search);
//     const token = searchParams.get('token');

//     // Make the API call to verify the email using the token
//     axios
//     .put(`https://creativents-on-boarding.onrender.com/api/verify/${token}`)
//       .then((res) => {
//        console.log('verification successful', res);
//         setVerificationStatus('Verification successful!');
//       // Redirect the user to the homepage after successful verification
//       nav('/');
//     })
//       .catch((err) => {
//         console.error('Error verifying:', err);
//         setVerificationStatus('Error verifying, please try again later.');
//       });
//   }, [location, nav]);

//   // Rest of your code}


//   return (
//     <div className='Email_VerificationPage'>
//       <h1>hi</h1>
//       <h1>{verificationStatus}</h1>
//     </div>
//   )
// }

// export default EmailVerification;

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useParams } from 'react-router-dom';
// import { useNavigate } from 'react-router-dom';

// function EmailVerification() {
//   const { id, token } = useParams()
//   const nav = useNavigate()
//   const [verificationStatus, setVerificationStatus] = useState('Verifying...');

//   useEffect(() => {
//     // fetch(`/api/verify/${id}/${token}`)
//     axios.put(`https://creativents-on-boarding.onrender.com/api/verify/${id}/${token}`)
//       // .then((res) => response.json())
//       .then((res) => {
//         // if (data.success) {
//           console.log('verification successful', res);
//           setVerificationStatus('Verification successful!')
//           // Redirect the user to the homepage after successful verification
//           nav('/')
//         // } else {
//           // setVerificationStatus('Verification failed!');
//         // }
//       })
//       .catch((err) => {
//         console.error('Error verifying:', err);
//         setVerificationStatus('Error verifying, please try again later.');
//       });
//   }, []);


//   return (
//     <div className='Email_VerificationPage'>
//       <h1></h1>
//       <h1>{verificationStatus}</h1>
//     </div>
//   );
// }

// export default EmailVerification;

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useSelector } from 'react-redux'
// import { useLocation, useNavigate, useParams } from 'react-router-dom';

// function EmailVerification() {
//   const nav = useNavigate();
//   const {id, token} = useParams()
//   const userSignUpData = useSelector(state=>state.events.userRes)
//   const location = useLocation();
//   const [verificationStatus, setVerificationStatus] = useState('Verifying...');

//   useEffect(() => {
    
//     // Get the query parameters from the URL
//     const searchParams = new URLSearchParams(location.search);
//     const id = searchParams.get('id');
//     const tokens = searchParams.get('token');
//  if (tokens){
//   axios.put(`https://creativents-on-boarding.onrender.com/api/verify/${id}/${token}`)
//   .then((res) => {
//     console.log('verification successful', res);
//     setVerificationStatus('Verification successful!');
//     // Redirect the user to the homepage after successful verification
//     nav('/');
//   })
//   .catch((err) => {
//     console.error('Error verifying:', err);
//     setVerificationStatus('Error verifying, please try again later.');
//   });
//  }
//     // Make an API call to your backend endpoint to verify the email
    
//   }, [id.token, nav]);
//   console.log(userSignUpData);
//   return (
//     <div>
//       <h2>Email Verification Status</h2>
//       <p>{verificationStatus}</p>
//     </div>
//   );
// }

// export default EmailVerification;

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useSelector } from 'react-redux';
// import { useLocation, useNavigate, useParams } from 'react-router-dom';

// function EmailVerification() {
//   const nav = useNavigate();
//   const { id, token } = useParams();
//   const userSignUpData = useSelector(state => state.events.userRes);
//   const [verificationStatus, setVerificationStatus] = useState('Verifying...');

//   useEffect(() => {
//     if (token && userSignUpData) {
//       axios.put(`https://creativents-on-boarding.onrender.com/api/verify/${id}/${token}`)
//         .then((res) => {
//           console.log('verification successful', res);
//           setVerificationStatus('Verification successful!');
//           // Redirect the user to the homepage after successful verification
//           nav('/');
//         })
//         .catch((err) => {
//           console.error('Error verifying:', err);
//           setVerificationStatus('Error verifying, please try again later.');
//         });
//     }
//   }, [id, token, nav, userSignUpData]);

//   return (
//     <div>
//       <h2>Email Verification Status</h2>
//       <p>{verificationStatus}</p>
//     </div>
//   );
// }

// export default EmailVerification;


// 