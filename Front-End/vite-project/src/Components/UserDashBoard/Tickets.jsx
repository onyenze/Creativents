import React from 'react'
import {MdDateRange} from "react-icons/md"
import {LuTicket} from "react-icons/lu"
function Tickets({src, eventName, eventVenue, eventDate, eventPrice}) {
  return (
    <div className="My_Tickets" style={{marginTop:"35px"}}>
                        <div className="My_TicketDetails">
                            <div className="My_TicketImage">
                                <img src={src} alt="" />
                            </div>
                            <div className="My_EventDetails">
                                <div className="Events_Desc">
                                    <p>{eventName}</p>
                                    <p>{eventVenue}</p>
                                </div>
                                <div classname="SavedEvent_DateTime">
                               <div className="Date_Time">
                               <MdDateRange style={{fontSize:"13px"}}/> <span style={{fontSize:"13px"}}>{eventDate}</span>
                               </div>
                                <LuTicket style={{fontSize:"13px"}}/> <span style={{fontSize:"13px"}}>{eventPrice}</span>
                                </div>
                            </div>
                            <div classname="My_EventIcons">
                                
                            </div>
                        </div>
                        <div className="My_TicketOptions">
                            <span className="Delete_Ticket">Delete</span>
                            <span className="Update_Ticket">update</span>
                        </div>
                    </div>
  )
}

export default Tickets