import { useState } from 'react'
import{ AiOutlineMenu } from 'react-icons/ai'
import {TiDelete} from 'react-icons/ti'
import {NavLink, useNavigate} from "react-router-dom"
function Header (){
    const nav = useNavigate()
    const [popUp, setPopUp] =useState(false)

    const ShowPop = ()=>{
        setPopUp(!popUp)
    }

    const hidePop = ()=>{
        setPopUp(false)
    }

    return(
    
      <div className="header">
        <div className="topheader">
            <div className="one">
             <div className="image">
             <img src="./src/image/devicon-plain_c.png" alt=""></img>
             </div>
             <h1>reativent</h1>
            </div>
            <div className="two">
                <ul>
                    <li>Find Event</li>

                    <NavLink to={'/about'}>
                    <li>About us</li>
                    </NavLink>

                    <NavLink to={'/upload'}>
                    <li>Create Event</li>
                    </NavLink>
                </ul>
            </div>
            <div className="three">
                <button className="btn-one" onClick={()=>nav('/login')}>Log in</button>
                <button className="btn-two" onClick={()=>nav('/signup')}>Sign up</button>
            </div>
            <div>
                <div className='menu-dash'>
                    <AiOutlineMenu className='menu' onClick={ShowPop}/>
                    </div>
            </div>

            {
                popUp?
                <section className='pop-up'>
                <div className='list'>
                    <h6>Log in</h6>
                    <h6>Sign up</h6>
                    <h6>Find Event</h6>
                    <h6>About us</h6>
                    <h6>Create Event</h6>
                </div>
                <TiDelete className='delete' onClick={hidePop}/>
            </section>: null
            }     
        </div>

      </div>
    )   
  }
  
  export default Header