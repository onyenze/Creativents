import React from 'react'

function CheckPassword() {
  return (
    <>
    <div className="VerifyHolders">
    <div className="VerifyHolder">
    <div className="VerifyEmailAndLogoHolder">
    <h1 className="VerifyEmailText">Verify Email</h1>
    <img src="./src/assets/Vent.png" alt="Vent" className="VerifyLogo" />
    </div>
    <div className="CheckYourEmailAndResend">
    <h2 className="VerificationText">Check your mail for Verification</h2>
    <button className="ResendButton">Resend  mail</button>
    </div>
    </div>
    </div>
    </>
  )
}

export default CheckPassword