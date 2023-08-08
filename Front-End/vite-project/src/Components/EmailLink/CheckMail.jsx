import React from 'react'
import './EmailVerification.css'

function CheckMail() {
  return (
<div className="holder">
    <h1>Please  check your email for verification</h1>
    <p>Didn’t recieve any link?</p>
    <button className='ContinueBtn'>Resend link</button>
 </div>
  )
}

export default CheckMail