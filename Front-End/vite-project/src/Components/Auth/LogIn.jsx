import React, { useEffect, useState } from 'react'
import { BiShow, BiHide, BiArrowBack } from 'react-icons/bi'
import './LogIn.css'
import './LogInMobile.css'
import axios from'axios'
import { NavLink } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { userStoreData } from '../Redux/State'
import { useDispatch, useSelector } from 'react-redux'

function LogIn() {
  const Dispatch = useDispatch()
  const userOnLoggedIn = useSelector(state=>state.events.user)
  const nav = useNavigate()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [passwordShow, setPasswordShow] = useState(false)
  const [loading, setLoading] = useState(false)
  const [profileName, setProfileName] = useState("")
    const userLogInData ={email, password}

  const url = "https://creativents-on-boarding.onrender.com/api/login"
 const userLogIn = (e) => {
  setLoading(true)
  e.preventDefault()
  axios.post(url, userLogInData)
    .then(res=>{console.log(res)
      Dispatch(userStoreData({email:res.data.data.email, id:res.data.data._id, token:res.data.data.token,name:res.data.data.lastname}))
    nav('/homepage')

    })
    .catch(err=>{
      console.log(err)
      setError(err.response.data.message)
      setLoading(false) 
    })
 }

 console.log(userOnLoggedIn)
  useEffect(()=>{
    
  },[])

  return (
      <div className='logIn'>
        <section className='input_LogIn'>
          <div className='LogIn_logo'>
            {/* <BiArrowBack className='back_Arrow'/> */}
            <img src="./src/assets/LogoC.png" alt="" />
              <NavLink to={'/signup'}>
              <span className='Reg_Route'>Register</span>
              </NavLink>
          </div>
           <div className='user_Auth'>
             <div className='user_Auth_wrapper'>
               <h1>Log  <span> in</span> to your account</h1>
               <form className="Input_auth">
                   <label className='labels'>Email</label>
                   <input type="text" placeholder='Input your email' value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
                   
                   <label className='labels'>Password</label>
                   <input type={passwordShow?"text":"password"} placeholder='Input your password' value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
                   <span>{error}</span>
                   {
                   passwordShow? <BiHide  className='password_Visibility' onClick={()=>setPasswordShow(!passwordShow)}/>
                   :<BiShow  className='password_Visibility' onClick={()=>setPasswordShow(!passwordShow)}/>
                   }
                 <div className='auth_Action'>
                  <p onClick={()=>nav('/forgotpassword')}>Forgot password?</p>
                  <button className='login_Btn' style={{backgroundColor:loading?"rgb(182, 132, 32)":null}} onClick={userLogIn} disabled={loading} >Log in</button>
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