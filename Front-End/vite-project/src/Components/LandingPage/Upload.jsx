import {AiOutlinePlus} from 'react-icons/ai'
import React from "react"
function Upload() {
    return(
        <>
        <div className="CreateMain">
          <div className="createheader">
            <div className="image">
            <img src="./src/image/devicon-plain_c4.png" alt=""></img>
            <h1>reaivent</h1>
            </div>

            <div className="profile">
                <div className="circle"></div>
                <h1>mary</h1>
            </div>
          </div>

          <div className="event-name">
            <h6>Event name</h6>
                <input type="text" />
          </div>

          <div className="upload">
            <div className="dateTime">
                <div className="message">
                    <h6>Event Description</h6>
                    <input type="message" />
                </div>

                <div className="inputdate">
                    <div className="date">
                        <h6>Date</h6>
                        <input type="date" />
                    </div>

                    <div className="time">
                        <h6>Time</h6>
                        <input type="time" />
                    </div>
                </div>
            </div>

            <div className="imageupload">
                <div className="addimage">
                    <AiOutlinePlus/>
                </div>
            </div>
          </div>
          <div className="book-now">
            <button>Book Now</button>
          </div>
        </div>
        </>
    )
}

export default Upload