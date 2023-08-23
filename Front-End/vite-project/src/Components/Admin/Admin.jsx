import React, { useEffect, useState } from 'react'
import './Admin.css'
import './AdminResponsive.css'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'


function Admin() {
  const [user, setUser]  = useState(false)
  const [events, setEvents]  = useState(false)
  const [tickets, setTickets]  = useState(false)
  const [ratings, setRatings]  = useState(false)
  const [reports, setReports]  = useState(false)
  const [allUser, setAllUser] = useState([])
  const userOnLoggedIn = useSelector(state=>state.events.user)
  const token = userOnLoggedIn.token
  const id = userOnLoggedIn.id
  // const config = {
  //   headers: {
  //     Authorization: `Bearer ${token}`
  //   },
  // };
  // console.log(token);
  const url = `https://creativents-on-boarding.onrender.com/api/allusers/${id}`
  const getAllUser = () => {
    axios.get(url)
    
    .then(res=>{
      console.log(res);
      setAllUser(res.data.data)
    })
    .catch(err=>{
      console.log(err);
    })
    // console.log(config);
    
  }
  console.log(allUser);

  useEffect(()=>{
    getAllUser()
  },[])
  return (
    <div className='Admin_MainContaner'>
      <div className='Admin_MainContanerWrapper'>
            <section className='Admin_NavSection'>
              <div className='Admin_NavActions'>
                <div className='Admin_AppDesc'>
                  <h3>Creativents</h3>
                </div>
                <div className='Admin_Search'>
                <input type="text" placeholder='Search'/>
                </div>
                <div className='Admin_NavList'>
                  <nav>
                  <p onClick={()=>{
                      setUser(!user)
                      setEvents(false)
                      setTickets(false)
                      setRatings(false)
                      setReports(false)
                    }}>User Manager</p>
                 {
                  user?
                  <ul className='Admin_UserDrop'>
                  <li>All Users</li>
                  {/* <li>Users Ticket Purchases</li> */}
                  <li>Users Bookmarked Tickets</li>  
                </ul>:null
                 }
                  </nav>
                  <nav>
                  <p onClick={()=>{
                      setEvents(!events)
                      setUser(false)
                      setTickets(false)
                      setRatings(false)
                      setReports(false)
                    }}>Events Manager</p>
                  {
                    events?
                    <ul className='Admin_UserDrop'>
                    <li>All Events</li>
                    <li>Pending Delete</li>
                    <li>Promoted Events</li>  
                    {/* <li>Reported Events</li>   */}
                    <li>Canceled Events</li>  
                  </ul>:null
                  }
                  </nav>
                  <nav>
                  <p onClick={()=>{              
                      setTickets(!tickets)
                      setEvents(false)
                      setUser(false)
                      setRatings(false)
                      setReports(false)
                    }}>Ticket Manager</p>
                  {
                    tickets?
                    <ul className='Admin_UserDrop'>
                    <li>All Users</li>
                    <li>Users Ticket Purchases</li>
                    <li>Users Bookmarked Tickets</li>  
                  </ul>:null
                  }
                  </nav>
                  <nav>
                  <p onClick={()=>{
                      setRatings(!ratings)      
                      setTickets(false)
                      setEvents(false)
                      setUser(false)
                      setReports(false)
                    }}>Ratings and Reviews</p>
                    {
                      ratings?
                      <ul className='Admin_UserDrop'>
                      <li>All Ratings</li>
                      <li>All Reviews</li>
                  </ul>:null
                     }
                  </nav>
                  <nav>
                  <p onClick={()=>{
                      setReports(!reports)
                      setRatings(false)      
                      setTickets(false)
                      setEvents(false)
                      setUser(false)
                      // setReports(false)
                    }}>Reports and Complains</p>
                    {
                      reports?
                      <ul className='Admin_UserDrop'>
                      <li>Events Report</li>
                      <li>Review Reports</li>
                  </ul>:null
                     }
                  </nav>
                  <nav>
                  <p>Settings</p>
                    {/* <ul className='Admin_UserDrop'>
                    <li>All Users</li>
                    <li>Users Ticket Purchases</li>
                    <li>Users Bookmarked Tickets</li>  
                  </ul>:null */}
                  </nav>
                  <nav>
                  <p>More</p>
                    {/* <ul className='Admin_UserDrop'>
                    <li>All Users</li>
                    <li>Users Ticket Purchases</li>
                    <li>Users Bookmarked Tickets</li>  
                  </ul>:null */}
                  </nav>
                  

                </div>

                <div className='Admin_Profile'>
                  <div className='Admin_ProfilePic'>
                    <img src="" alt="" />
                  </div>
                  <div className='Admin_ProfileDetails'>
                    <h5>Email</h5>
                    <p>Admin_UserName</p>
                  </div>
                </div>
              </div>
            </section>
            <section className='Admin_ContentSection'>
              <div className='Admin_ContentSectionContainer'>
                <div className='Content_Title'>
                  <h4>All Users</h4>
                </div>
                <div className='Admin_ContentManager'>
                  <section className='Admin_AllUsers'>
                    {
                      allUser.map((e)=>(
                        <div className='GetAll_User'>

                      <div className='UserImage_Profile'>
                        {
                          !e.profilePicture?<div className='AllUser_ProfileName'><h1>{e.firstname.charAt(0).toUpperCase()}{e.lastname.charAt(0).toUpperCase()}</h1> </div>
                          :<img src={e.profilePicture} alt="" />
                        }
                        <div className='User_NameInfo'>
                          <h5>{e.firstname} {e.lastname}</h5>
                          <h6>{e.email}</h6>
                        </div>
                      </div>

                      <div className='UserData_Profile'>
                        <article>
                          <h5>Created at: {e.createdAt} </h5>
                        </article>
                        <article>
                          <h5>Active status: </h5>
                        </article>
                        <article>
                          <h5>Verified Satus: </h5>
                        </article>
                        <article>
                          <h5>Ticket Purchased: </h5>
                        </article>
                        <article>
                          <h5>Events Hosted: </h5>
                        </article>
                        <article>
                          <h5>Ticket Sold: </h5>
                        </article>
                        <article>
                          <h5>Events Deleted: </h5>
                        </article>
                      </div>
                    </div>
                      ))
                    }
                  </section>
                </div>
              </div>
            </section>
      </div>
    </div>
  )
}

export default Admin