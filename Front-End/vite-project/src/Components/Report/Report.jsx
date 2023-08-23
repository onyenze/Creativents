
import { useState } from "react"
import   "./Report.css"
import axios from 'axios'
import { useSelector } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'

const Report = () => {
    const [holder, setHolder] =useState(true)
    const [report, setReport] =useState(false)
    const userOnLoggedIn = useSelector(state=>state.events.user)
    const [reason, setReason] = useState('')
    const { eventID } = useParams()

    const token = userOnLoggedIn.token
    const config = {
        headers: {
          Authorization: `Bearer ${token}`
        },
      };

      const EventReportReason = (e) => {
        setReason(e.target.value)
        console.log(reason);
      }

      const reportData = {
        targetType : "event",
        targetId : eventID,
        reason
      }


    const url = "https://creativents-on-boarding.onrender.com/api/report"

    const Submit_Report = () => {
        axios.post(url, reportData, config)
        .then(res=>{
            console.log(res);
        })
        .catch(err=>{
            console.log(err);
        })

    }


    const Clickstart = () =>{
        setHolder(false)
        setReport(true)
    }

    const Goback = () =>{
        setHolder(true)
        setReport(false)
    }
    const cancel = () =>{
        setHolder(false)
        setReport(false)
    }
    return(
        <>
        <div className="ReportHolder">
         
           {
                holder?
                <div className="Report">
                <div className="ReportEvent">
                    <div className="ReportTextHolder">
                        <h2 className="ReportH2">Report This Event</h2>
                    </div>
                    <div className="ReportCancelHolder">
                        <span className="CancelSpan" onClick={cancel}>x</span>
                    </div>
                </div>
                <div className="OurDomain">
                 <div className="OurDomainText">
                 Our Community Guidelines will describe the sort of content we prohibit on<br></br>
                    Creativent. If you suspect an event may be in violation, you can report it to us so<br></br>
                    We can investigate.
                 </div>
                </div>
                <div className="TheOrganizer">
                    <div className="TheOrganizerOne">
                       <div className="OurDomainText">
                       If you have a question about an event, need to reolve dispute, or would<br></br>
                        like to request a refund, we encourage   you to first contact the organize<br></br>
                        directly.
                       </div>
                    </div>
                    <div className="TheOrganizerTwo">
                        <div className="OurDomainText">
                            If you or someone else is in imminent danger as a result of an event <br></br>listing,
                            please contact your law enforcement agency for assistance.
                        </div>
                     
                    </div>
                    <div className="StartReport">
                    <button className="StartButt" onClick={Clickstart}>Start Report</button>
                     
                    </div>
                </div>
               
            </div>:null
            }
            {
                report?
                <div className="Reportt">
                      <div className="ReportEventt">
                      <div className="ReportTextHolderr">
                              <h2 className="ReportH22">Report This Event</h2>
                          </div>
                          <div className="ReportCancelHolderr">
                              <span className="CancelSpann" onClick={cancel}>x</span>
                          </div>
                      </div>
                     <div className="ItsHoldingAllOfThem">
                     <div className="ResonForReport">
                    <div className="Report_Reasons">
                    <label>
                        <input type="radio"
                         name="reportReason"
                         value="Fraudulent or Unauthorized Event"
                        onChange={EventReportReason}
                        checked={reason === 'Fraudulent or Unauthorized Event'}
                        />
                        Fraudulent or Unauthorized Event
                    </label>
                    </div>

                    <div className="Report_Reasons">
                    <label>
                        <input type="radio"
                         name="reportReason"
                         value="Harmful Content"
                        onChange={EventReportReason}
                        checked={reason === 'Harmful Content'}
                        />
                        Harmful Content
                    </label>
                    </div>

                    <div className="Report_Reasons">
                    <label>
                        <input type="radio"
                         name="reportReason"
                         value="Illegal or Regulated Content"
                        onChange={EventReportReason}
                        checked={reason === 'Illegal or Regulated Content'}
                        />
                        Illegal or Regulated Content
                    </label>
                    </div>

                    <div className="Report_Reasons">
                    <label>
                        <input type="radio"
                         name="reportReason"
                         value="Sexually Explicit Content"
                        onChange={EventReportReason}
                        checked={reason === 'Sexually Explicit Content'}
                        />
                        Sexually Explicit Content
                    </label>
                    </div>

                    <div className="Report_Reasons">
                    <label>
                        <input
                        type="radio"
                        name="reportReason"
                        value="Hateful Content"
                        onChange={EventReportReason}
                        checked={reason === 'Hateful Content'}
                        />
                        Hateful Content
                    </label>
                    </div>

                    <div className="Report_Reasons">
                    <label>
                        <input
                        type="radio"
                        name="reportReason"
                        value="Violence or Extremism"
                        onChange={EventReportReason}
                        checked={reason === 'Violence or Extremism'}
                        />
                        Violence or Extremism
                    </label>
                    </div>

                    <div className="Report_Reasons">
                    <label>
                        <input
                        type="radio"
                        name="reportReason"
                        value="Canceled Event"
                        onChange={EventReportReason}
                        checked={reason === 'Canceled Event'}
                        />
                        Canceled Event
                    </label>
                    </div>
                    
                    </div>
                    <div className="ReasonOption">
                    
                      </div>
                      {/* <div className="YourEmail">
                          <input type="email"  placeholder="Your Email*" className="ReportEmail"/>
                      </div> */}
                      <textarea name="description" rows="4" cols="50" className="ReportDes" defaultValue="Enter your description here...">
                         
                        </textarea>
                      <div className="SubmitAndGoBack">
                          <button className="ReportButton" onClick={Submit_Report}>Submit Report</button>
                          <h3 className="GoBackText" onClick={Goback}>Go back</h3>
                      </div>
                     </div>
                  </div>:null
            }
        </div>
        </>
    )
}
export default Report