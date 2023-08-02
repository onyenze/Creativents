import React, { useEffect, useState } from 'react'
import { BiShow, BiHide, BiArrowBack } from 'react-icons/bi'
import './LogIn.css'
import './LogInMobile.css'
import axios from'axios'
import { useNavigate } from 'react-router-dom'

function LogIn() {
  const nav = useNavigate()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [passwordShow, setPasswordShow] = useState(false)

    const userLogInData ={email, password}

  const url = "https://creativents-on-boarding.onrender.com/api/login"
 const userLogIn = (e) => {
  e.preventDefault()
  axios.post(url, userLogInData)
    .then(res=>{console.log(res)
    nav('/landingpage')
    })
    .catch(err=>console.log(err))
 }
  useEffect(()=>{
    
  },[])

  return (
      <div className='logIn'>
        <section className='input_LogIn'>
          <div className='logo'>
            <BiArrowBack className='back_Arrow'/>
            <img src="./src/assets/LogoC.png" alt="" />
            <span>Register</span>
          </div>
           <div className='user_Auth'>
             <div className='user_Auth_wrapper'>
               <h1>Log  <span> in</span> to your account</h1>
               <form className="Input_auth">
                   <label className='labels'>Email</label>
                   <input type="text" placeholder='Input your email' value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
                   
                   <label className='labels'>Password</label>
                   <input type={passwordShow?"password":"text"} placeholder='Input your password' value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
                   {
                   passwordShow? <BiShow  className='password_Visibility' onClick={()=>setPasswordShow(!passwordShow)}/>
                   :<BiHide  className='password_Visibility' onClick={()=>setPasswordShow(!passwordShow)}/>
                   }
                 <div className='auth_Action'>
                  <p onClick={()=>nav('/forgetpassword')}>Forgot password?</p>
                  <button className='login_Btn' onClick={userLogIn}>Log in</button>
                  <span>Don't have an account? <a onClick={()=>nav('/signup')}>sign up</a></span>
                 </div>
               </form>
             </div>
           </div>
        </section>
        <section className='image_LogIn'>
        </section>
     </div>
  )
}

export default LogIn