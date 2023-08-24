
import './Checkout.css'
import './CheckoutMobile.css'
import{CiLocationOn} from 'react-icons/ci'
import{BiTimeFive} from 'react-icons/bi'
import {AiOutlinePlus, AiFillHome} from 'react-icons/ai'
import {MdCreateNewFolder} from 'react-icons/md'
import {BsFillCheckSquareFill} from 'react-icons/bs'
import{BsCalendarDate} from 'react-icons/bs'
import { useParams, useNavigate } from 'react-router-dom'
import LogoC from "../../assets/LogoC.png"
import axios from 'axios'
import { eventData, checkoutTicketQty, checkoutTicketPrice } from '../Redux/State'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { SpinnerDotted } from 'spinners-react'
import {AiFillStar, AiFillDislike, AiFillLike} from 'react-icons/ai'
import Todo from '../CreateEvent/RateTodo'


const Checkout = () =>{
    const Dispatch = useDispatch()
    const userOnLoggedIn = useSelector(state=>state.events.user)
    const nav = useNavigate()
    const [data, setData] = useState()
    const [msg, setMsg] = useState("Loading, Please wait...")
    const ticketPrice = useSelector((state)=>state.events.ticketPrice)
    const { id } = useParams()
    const [ticketQty, setTicketQty] = useState(1)
    const [ticketQtyy, setTicketQtyy] = useState(1)

    const [oneStar, setOneStar] = useState (0)
    const [twoStar, setTwoStar] = useState (0)
    const [ThreeStar, setThreeStar] = useState (0)
    const [FourStar, setFourStar] = useState (0)
    const [fiveStar, setFiveStar] = useState (0)
    const [like, setLike] = useState (0)
    const [disLike, setDisLike] = useState (0)
    const [todos, setTodos] = useState([]);
    const [input, setInput] = useState('');
    const [review, setreview] = useState([]);
    const token = userOnLoggedIn.token
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      },
    };

const handleOneStar = ()=>{
    setOneStar(preOneStar => preOneStar + 5)
}

const handleTwoStar = ()=>{
    setTwoStar(preOneStar => preOneStar + 5)
}

const handleThreeStar = ()=>{
    setThreeStar(preOneStar => preOneStar + 5)
}

const handleFourStar = ()=>{
    setFourStar(preOneStar => preOneStar + 5)
}

const handleFiveStar = ()=>{
    setFiveStar(preOneStar => preOneStar + 5)
}

const addTodo = () => {
    axios.post(`https://creativents-on-boarding.onrender.com/api/events/${id}/review`, reviewData ,config)
      .then(res => {
        console.log(res);
        setreview(res.data)
        if (input.trim() !== '') {
            setTodos([...todos, { text: input, isCompleted: false }]);
            setInput('');
          }
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
   
  };

const handleLike = () =>{
    setLike(like === 0 ? 1 : 1)
}

const handledisLike = () =>{
    setDisLike(disLike === 0 ? 1 : 1)
}
const reviewData = {
    ratings:4,
    reviewText:input
}

useEffect(() => {
    
  }, []);



    const url = `https://creativents-on-boarding.onrender.com/api/events/${id}`
    useEffect(()=>{
        axios.get(url)
        .then(res=>{
            console.log(res.data.data);
            Dispatch(eventData(res.data.data))
            setData(res.data.data)
            setTicketQtyy(res.data.data.availableTickets)

        })
        .catch(err=>{
            console.log(err)
            if(err.message === "Network Error"){
                setMsg("Unable to connect to the Internet")
            }
            else{
                
                setMsg("Error Creating Event")
              }
        })
    },[])
   
   console.log(ticketPrice);
   console.log(ticketQtyy);
   const options = [];
   for (let i = 1; i <= ticketQtyy; i++) {
     options.push(<option key={i} value={i}>{i}</option>);
   }
  

    return(
        <>
       {
        !data? <div style={{width:"100%",
            height:"100vh", display:"flex",gap:"10px", flexDirection:"column", justifyContent:"center", alignItems:"center"}}>
           <h1 style={{
            fontSize:"26px", color:"white", textAlign:"center"
        }}>{msg}</h1>
        <SpinnerDotted size={200} thickness={50} speed={100} color="#ffffff" />
        </div> :
        <div className="checkoutcontainer">

        <div className="checkoutholder">

            <div className="checkoutlogo">
            <div className="checkoutimage">
            <img src={LogoC} onClick={()=>nav('/homepage')} alt=""/>
            {/* <h2>reactivent</h2> */}
            </div>
            </div>

            <div className='checkouteventimage'>
                <div className='imagecheckout'>
                    <img src={data.eventImages} alt="" />
                </div>
 
            </div>
                
                <p>{data.eventName}</p>
                <div className="checkouteventdetails">
                    <div className='everydetailsholder'>
                    <div className='checkoutvenue'>
                        <div className='checkoutdetails'>
                            <BsCalendarDate/>
                            <p>{data.eventDate}</p>
                        </div>
                        <div className='checkoutdetails'>
                            <BiTimeFive/>
                            <p>{data.eventTime}</p>
                        </div>
                        <div className='checkoutdetails'>
                            <CiLocationOn/>
                            <p>{data.eventVenue}</p>
                        </div>
                    </div>
                    <div className='checkoutticket'>
                        <h2>Ticket Details</h2>

                        <div className='allticket'>
                            <h2>Ticket Quantity</h2>
                            <div className='chooseticket'>
                                {/* <button className='buttonticket'>+</button> */}
                                <select onChange={(e)=>{
                                            setTicketQty(e.target.value)
                                            Dispatch(checkoutTicketQty(e.target.value))

                                            }}>
                                        {
                                            !data?<option value="1">1</option>:options  
                                        }
                                        {/* <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option> */}
                                        </select>
                                {/* <button className='buttonticket' onClick={decrementQuantity}>-</button> */}
                            </div>
                        </div>

                        <div className='quantity'>
                                <h2>Price</h2>
                                <h3>{data.eventPrice}</h3>
                            </div>

                            <div className='totalamount'>
                                <h2>Total</h2>
                                <h3>{data.eventPrice * ticketQty}</h3>
                             
                            </div>

                            <button className='booknow' onClick={()=>{

                            nav(`/api/tickets/${data._id}`)
                            }}>
                                 {data.isSoldOut?"Sold Out":"Book now"}
                                </button>
                    </div>
                    </div>

                    <div className="checkoutdescription-checkout">
                    <div className="checkoutdescription">
                        <h1>Description</h1>
                        <p>{data.eventDescription}.</p>
                    </div>
                    
                    <section className='sectionthree'>
                <div className='commentsectionrating'>
                    <h3>Comment</h3>
                    <input type="message" value={input} onChange={(e) => setInput(e.target.value)}/>
                </div>
                <div className='submitratings'>
                    <p>submit your comment</p>
                    <button onClick={addTodo} >Submit</button>
                </div>
             </section>
            
                      
             
        <div className='todo-list-holder'>
       
       {todos.map((todo, index) => (
            <div className="todo-list">
               
         <Todo
           key={index}
           index={index}
           todo={todo}
         />

                <div className='likeanddislike'>
                   <div className='liketoggle'>
                       <AiFillLike className='likecolor'onClick={handleLike}/>
                       <h5>{like}</h5>
                   </div>
                   <div className='disliketoggle'>
                       <AiFillDislike className='dislikecolor' onClick={handledisLike}/>
                       <h5>{disLike}</h5>
                   </div>
               </div>
         </div>
       ))}
    
       </div>
                </div>

      
                </div>
        </div>
        <div className="directiontodifferentpage">
            <div className="Homedirection">
                <AiFillHome className="directionmain"/>
                <h5>Home</h5>
            </div>

            <div className="Homedirection">
                <MdCreateNewFolder className="directionmain"/>
                <h5>Create</h5>
            </div>
            <div className="Homedirection">
                <BsFillCheckSquareFill className="directionmain"/>
                <h5>Save</h5>
            </div>
          </div>

         
    </div>
       }
        </>
    )
}

export default Checkout     