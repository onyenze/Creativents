import React, { useRef, useState } from "react"
import './Upload.css'
import './UploadMobile.css'
import axios from "axios"
import {AiOutlinePlus} from 'react-icons/ai'
import { useSelector } from 'react-redux'
// import Category from "../Landing-page/category"
import LogoC from "../../assets/LogoC.png"


function Upload() {
    const inputRef =useRef(null);
    const userOnLoggedIn = useSelector(state=>state.events.user)
    const upload = useRef(null);
    const [eventName, setEventName] =useState ("")
    const [eventDescription, setEventDescription] =useState ("")
    const [eventPrice, setEventPrice] =useState ("")
    const [eventLocation, setEventLocation] =useState ("")
    const [eventVenue, setEventVenue] =useState ("")
    const [availableTickets, setAvailableTickets] =useState (0)
    const [eventCategory, setEventCategory] =useState ("")
    const [eventDate, setEventDate] =useState ("")
    const [eventTime, setEventTime] =useState ("")
    const [eventImages, setEventImages] =useState ("")
    // const [eventImages, setEventImages] = useState ({imgCollection: ""})
    const [image, setImage] =useState ("")
    // const [avatar, setAvatar] =useState (null)
    const [display, setDisplay] =useState(true)
    const [imagecreate, setImageUpload] = useState ("")

    
    const url = "https://creativents-on-boarding.onrender.com/api/events"

    const token = userOnLoggedIn.token
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
         Authorization: `Bearer ${token}`
      },
    };

    // const handleImage = (event) => {
    //     const file = event.target.files[0];
    //     setProfile({ ...profile, schoolImage: file });
    // //   };

    // const File = (e)=>{
    //     const file = e.target.files[0];
    //     setEventImages(file);
    // }

    const File = (e)=>{
        const files = e.target.files[0];
        // const image =  Array.from(e.target.files)
        // const imageFiles = Array.from(files);
        setEventImages(files);
        // console.log("files",files)
    }
    
    
    // const eventUpload = {eventName, eventDescription, eventPrice, eventLocation, eventVenue,
    //                      availableTickets, eventCategory, eventDate, eventTime, eventImages

    //                     }
    const handleCreateButtonClick = () => {
        setImageUpload(image)

        const formData = new FormData()
        formData.append("eventName", eventName)
        formData.append("eventDescription", eventDescription)
        formData.append("eventPrice", eventPrice)
        formData.append("eventLocation", eventLocation)
        formData.append("eventVenue", eventVenue)
        formData.append("availableTickets", availableTickets)
        formData.append("eventCategory", eventCategory)
        formData.append("eventDate", eventDate)
        formData.append("eventTime", eventTime)
        formData.append('eventImages', eventImages);

        // eventImages.forEach((image) => {
        //     formData.append('eventImages', image);
        //     console.log(image);
        //   })

        axios.post(url, formData, config)
        .then(res=>{
            console.log(res)
        })
        .catch(err=>{
            console.log(err);
        })

    }
    
    // console.log(eventUpload);

    const removedisplay = ()=>{
        setDisplay(false)
    }

        const handleimageClick =()=>{
          inputRef.current.click();
         }
        
        const handleimageChange =(event)=>{
          const file =event.target.files[0];
          console.log(file);
         setImage(event.target.files[0]);
        }


        const handleimageCreate =()=>{
            upload.current.click();
        }

        // const handleimageCreateUpload =(event)=>{
        //     const set =event.target.files[0];
        //     console.log(set);
        //     setImageUpload(event.target.files[0])
        // }


    return(
        <>
        <div className="CreateMain">
          <div className="createheader">
            <div className="image4">
            <img src={LogoC} alt=""></img>
            <h1>reaivent</h1>
            </div>

            <div className="profile" onClick={handleimageClick}>
                {image ?(
                    <div className="circle" ><img src={URL.createObjectURL(image)}alt="" style={{width: "100%", height: "100%", borderRadius: "40px"}}/></div>

                ):(
                    <div className="circle"></div>
                )
            }
                
                <h1>mary</h1>
                <input type="file" ref={inputRef} onChange={handleimageChange} style={{display:"none"}}/>
            </div>
          </div>

          <div className='eventname'>

            <div className="eventnameinput">
                <h4>Event Name</h4>
                <input type="text" value={eventName} onChange={(e)=>{setEventName(e.target.value)}}/>
            </div>

            <div className="eventdiscription">
                <h4>Event Description</h4>
                <input type="text" value={eventDescription} onChange={(e)=>{setEventDescription(e.target.value)}}/>
            </div> 

          </div>


          <div className="timedate">
            <div className="datetimecategory">

                <div className="holdersone">
                    <h4>Date</h4>
                    <input type="date" value={eventDate} onChange={(e)=>{setEventDate(e.target.value)}}/>
                </div>

                <div className="holderstwo">
                <h4>Available Tickets</h4>
                <input type="number" id="quantity" name="quantity" min="1" max="5" 
                value={availableTickets} onChange={(e)=>{setAvailableTickets(e.target.value)}}
                ></input>
                </div>
                
                <div className="holdersthree">
                <h4>Time</h4>
                <input type="time" value={eventTime} onChange={(e)=>{setEventTime(e.target.value)}}/>
                </div>
            </div>

            <div className="Venuecategory">

            <div className="holdersfour">
                <h4>Venue</h4>
                <input type="text" value={eventVenue} onChange={(e)=>{setEventVenue(e.target.value)}}/>
            </div>

            <div className="holdersfive">
                <h4>Category</h4>
                <select name="cars" id="cars" value={eventCategory} onChange={(e)=>{setEventCategory(e.target.value)}}>
                <option>Select</option>
                <option value="Music Event">Music Event</option>
                <option value="Festival Event">Festival Event</option>
                <option value="Sport Event">Sport Event</option>
                <option value="Wedding Event">Wedding Event</option>
                </select>
            </div>

            <div className="holderssix">
                <h4>Price</h4>
                <input type="price" value={eventPrice} onChange={(e)=>{setEventPrice(e.target.value)}}/>
            </div>
            </div>
          </div>

          <div className="imageUpload" onClick={handleimageCreate}>
            {
                imagecreate ?(      
               <div className="putimage">
                <img src={URL.createObjectURL(imagecreate)} alt="" style={{width: "100%", height: "100%" ,borderRadius: "10px"}}/>
                {display && (
                    <AiOutlinePlus onClick={removedisplay}/>
                )}
               
              </div>
                ):(    
                    <div className="putimage">
                     <AiOutlinePlus onClick={removedisplay}/>
                     </div>
                )
            }

         <input type="file" ref={upload} multiple onChange={File}  style={{display:"none"}} />
          </div>
          <div className="holderseight">
          <h4>Location</h4>
          <input type="text" value={eventLocation} onChange={(e)=>{setEventLocation(e.target.value)}}/>
          </div>
          
          <div className="createpart">
          <button className="create" onClick={handleCreateButtonClick}>Create</button>
          </div>
        </div>
        {/* <Category image={imagecreate} /> */}
        </>
    )
}

export default Upload