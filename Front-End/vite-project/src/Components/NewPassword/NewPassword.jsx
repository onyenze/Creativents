import React, { useState } from 'react'
import './NewPassword.css'
import './NewPasswordMobile.css'
import { useParams } from 'react-router-dom'
import axios from 'axios'
function NewPassword() {
 const { id, token } = useParams()
 const [newPassword, setNewPassword] = useState("")
 const [confirmPassword, setConfirmPassword] = useState("")
 const [message, setMessage] = useState("")
 const [showMessage, setShowMessage] = useState(false)
  const url =`https://creativents-on-boarding.onrender.com/api/changepassword/${id}/${token}`
  console.log({newPassword, confirmPassword});
  const ConfirmNewPassord = () => {
     axios.post(url, {password: newPassword, confirmPassword})
    .then(res=>{
    console.log(res)
    setMessage(res.data)
    setShowMessage(true)


   })
    .catch(err=>{
      console.log(err)
    setMessage("Failed to change password, Please try again ")
   })
   }
  return (
    <>
    <div className="ResetMainHolder">
        <div className="ResetHolder">
            <div className="ResetLogo">
                <img src="./src/assets/Vent.png" alt="Vent" className="ResetImage" />
            </div>
            <div className="ResetInputAndButtonHolder">
                <h2 className="ResetPassword">Reset Your Password</h2>
                <div className="NewPasswordAndTextHolder">
                <h3 className="ResetnewPassword">New Password</h3>
                <input type="text" className="ResetInputt" value={newPassword} onChange={(e)=>{setNewPassword(e.target.value)}}/>
                </div>
                <div className="NewPasswordAndTextHolder">
                <h3 className="ResetnewPassword">Confirm New Password</h3>
                <input type="text" className="ResetInputt"  value={confirmPassword} onChange={(e)=>{setConfirmPassword(e.target.value)}}/>
                </div>
                <button className="ResetButton" onClick={ConfirmNewPassord}>Continue</button>
            </div>
        </div>
    </div>
    {
      showMessage?<div className="Pass_Container">
    <h1>{message}</h1>
   </div>:null
    }
    </>
  )
}

export default NewPassword

