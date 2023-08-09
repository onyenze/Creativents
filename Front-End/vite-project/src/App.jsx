import React from 'react'
import './App.css'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import LogIn from './Components/Auth/LogIn'
import SignUp from './Components/Auth/SignUp'
import LogOut from './Components/LogOut/LogOut'
import MainPage from './Components/LandingPage/MainPage'
import HomePage from './Components/HomePage/HomePage'
import About from './Components/About/About'
import NewPassword from './Components/NewPassword/NewPassword'
import EmailVerification from './Components/EmailLink/EmailVerification'
import CheckPassword from './Components/NewPassword/CheckPassword'
import ForgotPassword from './Components/ForgotPassword/ForgotPassword'
import ChangePassword from './Components/ChangePassword/ChangePassword'
import Upload from './Components/CreateEvent/Upload'
import SavedTickets from './Components/SavedTickets/SavedTickets'

function App() {
  return (
    <>
      <Router>
          <Routes>
              <Route path ='/login' element = {<LogIn />} />
              <Route path ='/signup' element = {<SignUp />} />
              <Route path ="/api/logout/:id" element = {<LogOut />} />
              <Route path ='/' element = {<MainPage />} />
              <Route path ='/homepage' element = {<HomePage />} />
              <Route path ='/upload' element = {<Upload />} />
              <Route path ='/about' element = {<About />} />
              <Route path ='/forgotpassword' element = {<ForgotPassword />} />
              <Route path ='/api/changepassword/:id/:token' element = {<NewPassword />} /> 
              <Route path="/api/verify" element={<EmailVerification />} />
              <Route path="/checkpassword" element={<CheckPassword />} />
              <Route path="/saved" element={<SavedTickets />} />
              <Route path="/api/changepasswordlogged/:id" element={<ChangePassword />} />
              
          </Routes>
      </Router>
    </>
  )
}

export default App