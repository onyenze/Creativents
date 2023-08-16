import React from 'react'
import "./MyEvents.css"
import "./MyEventsMobile.css"
import {AiOutlineHeart} from "react-icons/ai"
import {BsBookmark, BsCart3, BsFillSuitHeartFill,BsBookmarkFill} from "react-icons/bs"
import {GiHamburgerMenu} from "react-icons/gi"
import {MdDateRange} from "react-icons/md"
import {LuTicket} from "react-icons/lu"
import {RiDeleteBin5Line} from "react-icons/ri"
import { useSelector } from 'react-redux'
// import Footer from "../Footer/Footer"
import { useEffect, useState } from "react"
import axios from "axios"

function MyEvents() {

    const [detail, setDetail] = useState(true);
    const userOnLoggedIn = useSelector(state=>state.events.user)
    const userName = userOnLoggedIn.name
    const userId = userOnLoggedIn.id
    const userEmail = userOnLoggedIn.email
    const userProfilePicture = userOnLoggedIn.profilePicture

    // const DetailPop = () =>{
    //     setDetail(!detail)
    // }
  return (
    <>
           <main className="My_EventHolder">
            <nav className="NavDetailHolder">
                <div className="DetailLogoHolder">
                    <img src="" alt="Vent" className="DetailLogo" />
                </div>
                <div className="DetailNavIcon">
                    <div className="Saved">
                    <h3 className="DetailSaved">Saved</h3>
                    <AiOutlineHeart className="ReactHeart"/>
                    </div>
                    <div className="Book">
                    <h3 className="DetailBook">BookMark</h3>
                   <BsBookmark className="ReactBook"/>
                    </div>
                  <div className="Cart">
                  <h3 className="DetailCart">My Events</h3>
                  <BsCart3 className="ReactCart"/>
                  </div>
                </div>
                <div className="Event_Profile">
                    <div className="DetailCircle">
                        <img src={userProfilePicture} alt="" />
                    </div>
                    <h3 className="DetailName">Profile</h3>
                    <GiHamburgerMenu className="DetailMenu" 
                    // onClick={DetailPop}
                    />
                </div>
               </nav>
              {/* {
                detail? <div className="DetailPopUp">
                <span className="DetailSpan" onClick={DetailPop}>x</span>
                <div className="DetailProfilee">
                     <div className="DetailCirclee"></div>
                     <h3 className="DetailNamee">Profile</h3>
                     </div>
                     <div className="Cartt">
                   <h3 className="DetailCartt">MyCart</h3>
                   <BsCart3 className="ReactCartt"/>
                   </div>
                   <div className="Bookk">
                     <h3 className="DetailBookk">BookMark</h3>
                    <BsBookmark className="ReactBookk"/>
                     </div>
                     <div className="Savedd">
                     <h3 className="DetailSavedd">Saved</h3>
                     <AiOutlineHeart className="ReactHeartt"/>
                     </div>
                </div>:null
              } */}
            <section className="Event_UserInfo">
                <div className="Events_Texts">
                    <h1 className="Events_Welcome">Hi there {userName}!!</h1>
                    <h2 className="Events_Purchased">You have Hosted (8) Events in total</h2>
                </div>
            </section>
            <div className="Hosted_Events">
            <div className="Hosted_EventsHolder">

                <div className="Hosted_EventsHolderText">
                    <h2 className="Hosted_EventsHolder">My Events</h2>
                    <div className='Event_Line'></div>
                </div>
                <div className='Host_EventOverView'>
                    <div className='My_EventPackage'>
                        <div className='Hosted_EventImg'>
                            <img src="" alt="" />
                        </div>
                        <div className='Hosted_EventDesc'>
                            <div className='Hosted_EventWhere'>
                                <h4>Event Name</h4>
                                <h5>Event Des</h5>
                                <p>Event Date</p>
                            </div>
                              <div className='Event_Reviews'>
                                <p>View Ratings and Reviews</p>
                              </div>
                            <div className='Hosted_EventBtn'>
                                <button className='EventUpdate_Btn'>Update</button>
                                <button className='EventDelete_Btn'>Delete</button>
                            </div>
                        </div>
                    </div>
                </div>
                </div>
            </div>
        </main>
                
    </>
  )
}

export default MyEvents