import {AiOutlineArrowDown} from 'react-icons/ai'
import axios from 'axios'
import { useEffect, useState } from 'react'
// import axios from 'axios'
import { useNavigate } from 'react-router-dom'
function Category (){
    const nav = useNavigate()
    const [uploadedEvent, setUploadEvent] = useState([])
    // const { image } = useImage();
    const [imageRoll, setImageRoll] = useState(0)

    const url = "https://creativents-on-boarding.onrender.com/api/events"
    axios.get(url)
    .then(res=>{
        // console.log(res.data.data);
        setUploadEvent(res.data.data)
    })
    .catch(err=>{
        console.log(err)
    })

    const getEvent = () => {
        
    }
    // useEffect(()=>{
    //     setInterval(() => {
    //         setImageRoll(prev=>prev + 1) 
    //      }, 500);
    // }, [])
    
    return(
        <div className="our-category">

           <div className="category-div">
            <h2>Find your interest</h2>
            <AiOutlineArrowDown className='arrow-down'/>
            </div>
           <div className='holder2'>
            <div className='inner-holder2'>
            
            <div className="category-containers">           

                {
                    uploadedEvent.map((e)=>(
                        <div className="main-category" key={e._id} onClick={()=>{
                            nav(`/events/${e._id}`)
                        }}>
                    <div className="category-image" onClick={()=>setImageRoll(prev=>prev + 1)}>
                        <img src={e.eventImages[imageRoll % e.eventImages.length]} alt="" />
                    </div>
                    <div className="category-discription">
                        <p>{e.eventCategory}</p>
                    </div>
                    </div>
                    ))
                }

            </div>
            </div>
           </div>
            
           

        </div>
    )
}

export default Category