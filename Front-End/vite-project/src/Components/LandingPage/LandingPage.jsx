import React from 'react'
import { useNavigate } from 'react-router-dom'
import './LandingPage.css'

function LandingPage() {
  const nav = useNavigate()

  return (
    <div className='LandingPage'>
      <section className='landingPage_Header'>
        Landing page
        <button onClick={()=>{nav('/login')}}>login</button>
        <button onClick={()=>{nav('/signup')}}>signup</button>
      </section>
    </div>
  )
}

export default LandingPage