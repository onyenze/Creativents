import React from 'react'
import './HomePage.css'
// import './HomePageMobile.css'
import { BiSearch } from 'react-icons/bi'
import { TbMathGreater } from 'react-icons/tb'
import { MdLocationPin } from 'react-icons/md'

function HomePage() {

  const category = [
    {
    name:"Music",
    image:"./src/assets/Cat1.png"
    },
    {
      name:"Sport",
      image:"./src/assets/Cat2.png"
    },
    {
      name:"Festival",
      image:"./src/assets/Cat3.png"
    },
    {
        name:"Wedding",
        image:"./src/assets/Cat4.png"
    },
    {
      name:"Wedding",
      image:"./src/assets/Cat4.png"
  },
  {
    name:"Wedding",
    image:"./src/assets/Cat4.png"
}
]

const UpEvents = [
  {
  name:"The Curve Africa",
  des:"Cohort 2  HackAthon Presentation",
  image:"./src/assets/Upcoming1.png",
  address:"157 Muyibi Str Olodi-Apapa Lagos",
  date:"Thur, August 16, 2023,   10:00AM",
  },
  {
    name:"The Curve Africa",
    des:"Cohort 2  Graduation Party",
    image:"./src/assets/Upcoming2.png",
    address:"111 Franks Estate , Lekki, Lagos  ",
    date:"Thur, August 18, 2023,   12:00AM",
  },
  {
    name:"Kareem’s  Birthday",
    des:"Pool and Other things Party ",
    image:"./src/assets/Upcoming3.png",
    address:"56, Alakija Estate Gberigbe , Ikorodu, Lagos  ",
    date:"Thur, August 25, 2023,   10:00AM",
  },
  {
    name:"The Curve Africa",
    des:"Cohort 2  HackAthon Presentation",
    image:"./src/assets/Upcoming1.png",
    address:"157 Muyibi Str Olodi-Apapa Lagos",
    date:"Thur, August 16, 2023,   10:00AM",
    },
    {
      name:"The Curve Africa",
      des:"Cohort 2  Graduation Party",
      image:"./src/assets/Upcoming2.png",
      address:"111 Franks Estate , Lekki, Lagos  ",
      date:"Thur, August 18, 2023,   12:00AM",
    },
    {
      name:"Kareem’s  Birthday",
      des:"Pool and Other things Party ",
      image:"./src/assets/Upcoming3.png",
      address:"56, Alakija Estate Gberigbe , Ikorodu, Lagos  ",
      date:"Thur, August 25, 2023,   10:00AM",
    }
]

  return (
    <div className='HomePage'>
    <section className='HomePage_Header'>
      <div className='HomePage_HeaderWrapper'>
        <div className='HeaderLogo'>
        <img src="./src/assets/LogoC.png" alt="" />
        </div>
        <BiSearch className='Search_Icons'/>
        <input type='text' placeholder='Search for events' className='Search_Bar'/>
        <div className='Pages_Profile'>
          <nav className='Header_Pages'>
            <ul>
              <li>Create Event</li>
              <li>Find Event</li>
              <li>About Us</li>
            </ul>
          </nav>
        </div>
        <div className='Header_Profile'>
          <h3>Mary</h3>
          <div className='Profile_Image'></div>
        </div>
      </div>
    </section>

    <section className='HomePage_Main'>
      <div className='HomePage_Events'>
      </div>
      <div className='Home_EventDesc'></div>
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
          UpEvents.map((e)=>(
            <div className='Upcoming_EventsDetails'>
          <div className='Upcoming_EventImage'>
            <img src={e.image} alt="" />
          </div>
          <div className='Upcoming_EventDesc'>
            <h2>{e.name}</h2>
            <h4>{e.des}</h4>
            <div className='Upcoming_LocationDiv'>
            <MdLocationPin className='Upcoming_Location'/>
            <span>{e.address}</span>
            </div>
            <span>{e.date}</span>
          </div>
        </div>
          ))
        }

      </div>
    </section>

    <section>
      
    </section>
  </div>
  )
}

export default HomePage