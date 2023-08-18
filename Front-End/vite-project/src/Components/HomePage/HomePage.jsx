import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './HomePage.css'
import './HomePageResponsive.css'
import { BiSearch } from 'react-icons/bi'
import { NavLink, useNavigate, useParams } from 'react-router-dom'
import { AiOutlineHeart } from 'react-icons/ai'
import { SlOptionsVertical } from 'react-icons/sl'
import { BiArrowBack } from 'react-icons/bi'
import { MdLocationPin } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import LogoC from "../../assets/LogoC.png"
import Cat1 from "../../assets/Cat1.png"
import Cat2 from "../../assets/Cat2.png"
import Cat3 from "../../assets/Cat3.png"
import Cat4 from "../../assets/Cat4.png"
import Upcoming1 from "../../assets/Upcoming1.png"
import Upcoming2 from "../../assets/Upcoming2.png"
import Upcoming3 from "../../assets/Upcoming3.png"
import Footer from '../LandingPage/Footer'
import {BsFillSuitHeartFill} from 'react-icons/bs';
import {CiMenuKebab} from 'react-icons/ci';
import {CiCalendarDate} from 'react-icons/ci'
import {BiMoney} from 'react-icons/bi'



function HomePage() {
        const [uploadedEvent, setUploadEvent] = useState([])
        // const [imageRoll, setImageRoll] = useState(0)
    
        const url = "https://creativents-on-boarding.onrender.com/api/events"
       const eventUploaded = () => {
        axios.get(url)
        .then(res=>{
            console.log(res.data.data);
            setUploadEvent(res.data.data)
        })
        .catch(err=>{
            console.log(err)
        })
       }
    
       useEffect(()=>{
        eventUploaded()
       },[])




  const userOnLoggedIn = useSelector(state=>state.events.user)
  const [popUp, setPopUp] = useState(false)
  const [settingPopUp, setSettingPopUp] = useState(false)
  // const userSignUpData = useSelector(state=>state.events.userRes)
  const nav = useNavigate()
  console.log(userOnLoggedIn);
  const id = userOnLoggedIn.id
  const profile = userOnLoggedIn.profilePicture

  const signOut = () => {
    // axios.get("https://creativents-on-boarding.onrender.com/api/allusers")
    // .then(res=>{
    //   console.log(res.data.data[0]._id)
    //   console.log(res.data.data[0].token)
    //   Dispatch(userResData(res.data.data[0].token))
    //   const id = res.data.data[1]._id
      console.log(id);
      nav(`/api/logout/${id}`)
    // })
  }

  const changeUserPassword = () => {
  //   // axios.get("https://creativents-on-boarding.onrender.com/api/allusers")
  //   // .then(res=>{
  //   //   console.log(res.data.data[1]._id)
  //   //   console.log(res.data.data[0].token)
  //   //   Dispatch(userResData(res.data.data[1].token))
  //   //   const id2 = res.data.data[1]._id
      console.log(id);
      nav(`/api/changepasswordlogged/${id}`)
  //   // })
  }

  const changeUserProfilePicture = () => {
    console.log(id);
    nav(`/api/add-profile-image/${id}`)
  }

  const checkUserEventProfile = () => {
    console.log(id);
    nav(`/api/getUserWithLinks/${id}`)
  }
  

  
  

    const ShowPopUp = () => {
      setPopUp(!popUp)
    }

    const hidePopUp = () => {
      setPopUp(!popUp)
    }

    const showSettings = () => {
      setSettingPopUp(!settingPopUp)
      setPopUp(!popUp)
    }

    const hideSettings = () => {
      setSettingPopUp(!settingPopUp)
      setPopUp(!popUp)
    }
   
  const category = [
    {
    name:"Music",
    image:Cat1
    },
    {
      name:"Sport",
      image:Cat2
    },
    {
      name:"Festival",
      image:Cat3
    },
    {
        name:"Wedding",
        image:Cat4
    },
    {
      name:"Wedding",
      image:Cat4
  },
  {
    name:"Wedding",
    image:Cat4
}
]



  return (
    <div className='HomePage'>
    <section className='HomePage_Header'>
      <div className='HomePage_HeaderWrapper'>
        <div className='HeaderLogo'>
        <img src={LogoC} alt="" />
        </div>
        <BiSearch className='Search_Icons'/>
        <input type='text' placeholder='Search for events' className='Search_Bar'/>
        <div style={{display:popUp?"none":null}} className='Pages_Profile'>
          <nav className='Header_Pages'>
            <ul>
              <NavLink to={'/upload'}>
              <li>Create Event</li>
              </NavLink>
              <li>Find Event</li>
              <NavLink to={'/about'}>
              <li>About Us</li>
              </NavLink>
            </ul>
          </nav>
        </div>
        <div style={{display:popUp?"none":null}} className='Header_Profile'  >
          <h3>{userOnLoggedIn.name}</h3>
          <div className='Profile_Image' onMouseOver={ShowPopUp} >
            <img src={profile} alt="" />

          </div>
        </div>
      </div>
    </section>
    {
      popUp?<div className='PopUp_Desktop' onMouseLeave={hidePopUp}>
            <ul>
              <li  onClick={()=>nav('/upload')}>Create Event</li>
              <NavLink to={'/about'}>
              <li>About Us</li>
              </NavLink>
              <NavLink to={'/saved'}>
              <li>My Tickets</li>
              </NavLink>
              <li onClick={()=>nav('/saved')}>Saved</li>
              <li onClick={showSettings}>Settings</li>
              <li onClick={signOut}>Log out</li>
            </ul>
      </div>:null
    }

{
      settingPopUp?<div className='SettingsPopUp_Desktop' onMouseLeave={hidePopUp}>
        <BiArrowBack style={{fontSize:"19px", cursor:"pointer", marginTop:"19px", }} onClick={hideSettings}/>
            <ul>
              <li onClick={changeUserPassword}>Change Password</li>
              <li onClick={changeUserProfilePicture}>Change Profile Picture</li>
              <li>Dark Mode</li>
              <li onClick={checkUserEventProfile}>My Events</li>
            </ul>
      </div>:null
    }
     
    <section className='HomePage_Main'>
      <div className='HomePage_Events'>
        <img src="./src/assets/HomeImage.png" alt="" />
      </div>
      <div className='Home_EventDesc'>
        <h2>Sunday, September 31st 2023</h2>
        <h1>Pastor Frank 7th Spiritual Journey Session</h1>
      </div>
    </section>

    <section className='Header_Category'>
      <div className='Header_CategoryContent'>
        <h4>Categories</h4> 
        {/* <span className='CatArrow'><TbMathGreater  /></span>  */}
      </div>
      <div className='Header_CategoryContent_Cards'> 
      {
        category.map((e)=>(
          <>
          <div className='Category_card'>
            <img src={e.image} alt="" />  
          <h4 style={{color:'white'}}>{e.name}</h4>

          </div>
          </>
        ))
      } 
      </div>
    </section>

    <h4 style={{marginBottom:"3vh", display:"flex", alignSelf:"flex-start", marginLeft:"5%"}}>Upcoming Events</h4>
    <section className='Upcoming_Events'>
      <div className='Upcoming_EventsWrapper'>
      {
      uploadedEvent.map((e)=>(
        <div className='Upcoming_EventsDetails' onClick={()=>{
          nav(`/api/events/${e._id}`)
      }}>
          <div className='Upcoming_EventImage'>
            <img src={e.eventImages} alt="" />
          </div>
          <div className='Upcoming_EventDesc'>
            <h3>{e.eventName}</h3>
            <h4>{e.eventDescription}</h4>
            <div className='Upcoming_LocationDiv'>
            <MdLocationPin className='Upcoming_Location'/>
            <span>{e.eventVenue}</span>
            </div>
            <span>{e.eventDate}</span>
          </div>
        </div>
      ))
    }

      </div>
    </section>

    <section className='Home_Tickets'>
        <div className='Ticket_Header'>
          <div className='Ticket_Line'></div>
          <h4>Tickets</h4>
          <div className='Ticket_Line'></div>
        </div>

        <div className='Event_Tickets' style={{justifyContent:"center"}}>
        {
            uploadedEvent.map((e)=>(
                <div className="main-category" onClick={()=>{
                    nav(`/api/events/${e._id}`)
                }}>
                <div className="category-image" key={e._id}>
                <img src={e.eventImages} alt="" />
                    <div className='love'>
                    {/* onClick={handleLiked} :liked ? */}
                    <BsFillSuitHeartFill style={{color:
                     "lightgrey"}}/>
                    </div>
                    <div className='love2'>
                    <CiMenuKebab/>
                    </div>
                    
                </div>
                <div className="category-discription">
                    <div className='locationandeventname'>
                        {/* <h4>The curve Cohort 2 Graduation Day 2023.</h4> */}
                        <h4>{e.eventName}</h4>
                        {/* <h4>180 Freedom Way, Lekki Phase 1 Lagos State.</h4> */}
                        <h4>{e.eventVenue}</h4>

<div class="rating">
<input value="5" name="rating" id="star5" type="radio"/>
<label for="star5"></label>
<input value="4" name="rating" id="star4" type="radio"/>
<label for="star4"></label>
<input value="3" name="rating" id="star3" type="radio"/>
<label for="star3"></label>
<input value="2" name="rating" id="star2" type="radio"/>
<label for="star2"></label>
<input value="1" name="rating" id="star1" type="radio"/>
<label for="star1"></label>
</div>
                    </div>
                <div className='dateandprice'>
                        <div className='thedate'>
                            <CiCalendarDate/>
                            <h5>{e.eventDate}</h5>
                            {/* <h5>26 july 2023</h5> */}
                        </div>
                        <div className='theprice'>
                            <BiMoney/>
                            <h5>#{e.eventPrice}</h5>
                            {/* <h5>#2000</h5> */}
                        </div>
                    </div>
                </div>
            </div>

            ))
           }

        </div>
    </section>

    <Footer />

  </div>
  )
}

export default HomePage