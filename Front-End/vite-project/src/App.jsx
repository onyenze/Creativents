import React from 'react'
import './App.css'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import LogIn from './Components/Auth/LogIn'
import SignUp from './Components/Auth/SignUp'
import LandingPage from './Components/LandingPage/LandingPage'
import ForgetPassword from './Components/RetAuth/ForgetPassword'
import NewPassword from './Components/RetAuth/NewPassword'
import HomePage from './Components/HomePage/HomePage'
import About from './Components/About/About'
import NotFound from './Components/NotFound/NotFound'
import EmailVerification from './Components/EmailLink/EmailVerification'

function App() {
  return (
    <>
      <Router>
          <Routes>
              <Route path ='/login' element = {<LogIn />} />
              <Route path ='/signup' element = {<SignUp />} />
              <Route path ='/' element = {<LandingPage />} />
              <Route path ='/homepage' element = {<HomePage />} />
              <Route path ='/landingpage' element = {<LandingPage />} />
              <Route path ='/about' element = {<About />} />
              <Route path ='/forgetpassword' element = {<ForgetPassword />} />
              <Route path ='/newpassword' element = {<NewPassword />} />
              <Route path ='/emailredirect/:id' element = {<EmailVerification />} />
              <Route element = {<NotFound />} />
          </Routes>
      </Router>
    </>
  )
}

export default App