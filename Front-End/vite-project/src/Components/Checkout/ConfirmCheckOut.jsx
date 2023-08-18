import axios from 'axios'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
function ConfirmCheckOut() {
const { id } = useParams()
const ticketQuantity = useSelector((state)=>state.events.ticketQty)
const [email, setEmail] = useState("")
const [DOB, setDOB] = useState("")

const UserDetails = {email, ticketQuantity, DOB}
console.log(ticketQuantity);
console.log(id);
// console.log(UserDetails);

const url = `https://creativents-on-boarding.onrender.com/api/tickets/${id}`
const BookEvent = () => {
    axios.post(url, UserDetails)
    .then(res=>{
        console.log(res);
        if(res){
            console.log("response sent");
        }
        else{
            console.log("error sending response");
        }
    })
    .catch(err=>{
        console.log(err);
    })
}
    

  return (
    <div className='Checkout_PopUp'>
                    <div style={{background:success?"white":null, gap:success?"10px":null}} className='CheckOut_Content'>

                {
                    success?
                    <>
                        <h2>Ticket Purchased Successfully</h2>
                        <h4>Check Your mail for your Ticket Details</h4>
                        <GiConfirmed style={{fontSize:"100px", color:"green"}}/>
                        <button className='Purchase_ContBtn' onClick={()=>nav(`/api/events/${id}`)}>Continue</button>

                    </>
                    :
                    <>
                        <h4>Please input your email and Date of Birth for purchase</h4>
                    <input className='CheckOut_Input' placeholder='Email' type="email" onChange={(e)=>setEmail(e.target.value)}/>
                    <input className='CheckOut_Input' placeholder='Date of Birth' type="date" onChange={(e)=>setDOB(e.target.value)}/>
                    <div className='CheckOut_Btns'>
                        <button className='CheckOut_CancelBtn'>Cancel</button>
                        <button className='CheckOut_ConfirmBtn' onClick={BookEvent}>Confirm Book</button>
                    </div>
                    </>
                }
                </div>
            </div>
  )
}

export default ConfirmCheckOut