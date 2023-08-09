import "./SavedTickets.css"
import "./SavedTicketsMobile.css"
import {AiOutlineHeart} from "react-icons/ai"
import {BsBookmark, BsCart3, BsFillSuitHeartFill,BsBookmarkFill} from "react-icons/bs"
import {GiHamburgerMenu} from "react-icons/gi"
import {MdDateRange} from "react-icons/md"
import {LuTicket} from "react-icons/lu"
import {RiDeleteBin5Line} from "react-icons/ri"
// import Footer from "../Footer/Footer"
import { useState } from "react"



const SavedTickets =()=>{
    const [detail, setDetail] = useState(false);
    const DetailPop = () =>{
         setDetail(!detail)
    }
    return(
        <>
        <main className="MainDetailHolder">
            <nav className="NavDetailHolder">
                <div className="DetailLogoHolder">
                    <img src="./src/assets/Vent.png" alt="Vent" className="DetailLogo" />
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
                  <h3 className="DetailCart">MyCart</h3>
                  <BsCart3 className="ReactCart"/>
                  </div>
                </div>
                <div className="DetailProfile">
                    <div className="DetailCircle"></div>
                    <h3 className="DetailName">Profile</h3>
                    <GiHamburgerMenu className="DetailMenu" 
                    onClick={DetailPop}
                    />
                </div>
               </nav>
              {
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
              }
            <section className="DetailTextHolder">
                <div className="DetailText">
                    <h1 className="DetailWelcome">Welcome Back Muna!!</h1>
                    <h2 className="DetailPurchased">You have purchased (8) tickets in total</h2>
                </div>
            </section>
            <div className="MainTicketHolderr">
            <div className="TicketHolderr">
            <div className="TicketTextt">
                    <h2 className="SavedTickets">Saved Tickets</h2>
                </div>
                <div className="TicketTickett">
                <div className="FirstTickett">
                <div className="FirstTicketOne"></div>
                        <div className="FirstTickettTwo">
                        <div className="FirstTicketttOne">
                        <h3 className="HealthText">Health Care Africa
                                     2023 Show                     
                                     Sheraton Hotel, Ikeja GRA.</h3>
                        </div>
                    <div className="FirstTicketttTwo">
                    <div className="FirstTicketTwoTextTwoLeft">
                            <MdDateRange/>
                            <h3 className="DateDetails">Aug 1st, 2023</h3>
                          </div>
                            <div className="FirstTicketTwoTextTwoRight">
                                <LuTicket/>
                                <h3 className="DateDetails">₦12k - ₦17k</h3>
                            </div>
                    </div>
                    <div className="FirstTicketttThree">
                    <div className="IconLeft">
                            <RiDeleteBin5Line className="DeleteIcon"/>
                        </div>
                        <div className="IconRight">
                            <BsFillSuitHeartFill className="IconHeart"/>
                            <BsBookmarkFill className="IconBook"/>
                        </div>
                    </div>
                        </div>
                </div>
                <div className="SecondTickett">
                <div className="SecondTicketOne"></div>
                        <div className="SecondTickettTwo">
                        <div className="SecondTicketttOne">
                        <h3 className="HealthText">
                        The curve Cohort 2 HackAthon Graduation 2023.
                        151, Muyibi Street, Olodi, Apapa 
                         Lagos State
                        </h3>
                        </div>
                    <div className="SecondTicketttTwo">
                    <div className="SecondTicketTwoTextTwoLeft">
                        <MdDateRange/>
                        <h3 className="DateDetails">Jun 29, 2023</h3>
                        </div>
                            <div className="SecondTicketTwoTextTwoRight">
                            <LuTicket/>
                                <h3 className="DateDetails">₦2k - ₦5k</h3>
                            </div>
                    </div>
                    <div className="SecondTicketttThree">
                    <div className="IconLeft">
                            <RiDeleteBin5Line className="DeleteIcon"/>
                        </div>
                        <div className="IconRight">
                            <BsFillSuitHeartFill className="IconHeart"/>
                            <BsBookmarkFill className="IconBook"/>
                        </div>
                    </div>
                        </div>
                </div>
                </div>
                <div className="TicketTickettt">
                <div className="FirstTickettt">
                <div className="FirstTicketOnee"></div>
                        <div className="FirstTicketttTwoo">
                        <div className="FirstTickettttOne">
                        <h3 className="HealthText">
                        Sustainable Business Conference
                        2023 Show
                        Muson Centre . Lagos, LA
                        </h3>
                        </div>
                    <div className="FirstTickettttTwo">
                    <div className="ThirdTicketTwoTextTwoLeft">
                        <MdDateRange/>
                        <h3 className="DateDetails">Jun 29, 2023</h3>
                        </div>
                            <div className="ThirdTicketTwoTextTwoRight">
                            <LuTicket/>
                                <h3 className="DateDetails">₦8k - ₦15k</h3>
                            </div>
                    </div>
                    <div className="FirstTickettttThree">
                    <div className="IconLeft">
                            <RiDeleteBin5Line className="DeleteIcon"/>
                        </div>
                        <div className="IconRight">
                            <BsFillSuitHeartFill className="IconHeart"/>
                            <BsBookmarkFill className="IconBook"/>
                        </div>
                    </div>
                        </div>
                </div>
                <div className="SecondTickettt">
                <div className="SecondTicketOnee"></div>
                        <div className="SecondTicketttTwoo">
                        <div className="SecondTickettttOne">
                        <h3 className="HealthText">Health Care Africa
                                     2023 Show                     
                                     Sheraton Hotel, Ikeja GRA.</h3>
                        </div>
                    <div className="SecondTickettttTwo">
                    <div className="FourthTicketTwoTextTwoLeft">
                            <MdDateRange/>
                        <h3 className="DateDetails">Jun 29, 2023</h3>
                            </div>
                            <div className="FourthTicketTwoTextTwoRight">
                            <LuTicket/>
                                <h3 className="DateDetails">₦7k - ₦14k</h3>
                            </div>
                    </div>
                    <div className="SecondTickettttThree">
                    <div className="IconLeft">
                            <RiDeleteBin5Line className="DeleteIcon"/>
                        </div>
                        <div className="IconRight">
                            <BsFillSuitHeartFill className="IconHeart"/>
                            <BsBookmarkFill className="IconBook"/>
                        </div>
                    </div>
                        </div>
                </div>
                </div>
                </div> 
            </div>
            <div className="MainTicketHolderr">
            <div className="TicketHolderr">
            <div className="TicketTextt">
                    <h2 className="SavedTickets">BookMark Tickets</h2>
                </div>
                <div className="TicketTickett">
                <div className="FirstTickett">
                <div className="FirstTicketOne"></div>
                        <div className="FirstTickettTwo">
                        <div className="FirstTicketttOne">
                        <h3 className="HealthText">Health Care Africa
                                     2023 Show                     
                                     Sheraton Hotel, Ikeja GRA.</h3>
                        </div>
                    <div className="FirstTicketttTwo">
                    <div className="FirstTicketTwoTextTwoLeft">
                            <MdDateRange/>
                            <h3 className="DateDetails">Aug 1st, 2023</h3>
                          </div>
                            <div className="FirstTicketTwoTextTwoRight">
                                <LuTicket/>
                                <h3 className="DateDetails">₦12k - ₦17k</h3>
                            </div>
                    </div>
                    <div className="FirstTicketttThree">
                    <div className="IconLeft">
                            <RiDeleteBin5Line className="DeleteIcon"/>
                        </div>
                        <div className="IconRight">
                            <BsFillSuitHeartFill className="IconHeart"/>
                            <BsBookmarkFill className="IconBook"/>
                        </div>
                    </div>
                        </div>
                </div>
                <div className="SecondTickett">
                <div className="SecondTicketOne"></div>
                        <div className="SecondTickettTwo">
                        <div className="SecondTicketttOne">
                        <h3 className="HealthText">
                        The curve Cohort 2 HackAthon Graduation 2023.
                        151, Muyibi Street, Olodi, Apapa 
                         Lagos State
                        </h3>
                        </div>
                    <div className="SecondTicketttTwo">
                    <div className="SecondTicketTwoTextTwoLeft">
                        <MdDateRange/>
                        <h3 className="DateDetails">Jun 29, 2023</h3>
                        </div>
                            <div className="SecondTicketTwoTextTwoRight">
                            <LuTicket/>
                                <h3 className="DateDetails">₦2k - ₦5k</h3>
                            </div>
                    </div>
                    <div className="SecondTicketttThree">
                    <div className="IconLeft">
                            <RiDeleteBin5Line className="DeleteIcon"/>
                        </div>
                        <div className="IconRight">
                            <BsFillSuitHeartFill className="IconHeart"/>
                            <BsBookmarkFill className="IconBook"/>
                        </div>
                    </div>
                        </div>
                </div>
                </div>
                <div className="TicketTickettt">
                <div className="FirstTickettt">
                <div className="FirstTicketOnee"></div>
                        <div className="FirstTicketttTwoo">
                        <div className="FirstTickettttOne">
                        <h3 className="HealthText">
                        Sustainable Business Conference
                        2023 Show
                        Muson Centre . Lagos, LA
                        </h3>
                        </div>
                    <div className="FirstTickettttTwo">
                    <div className="ThirdTicketTwoTextTwoLeft">
                        <MdDateRange/>
                        <h3 className="DateDetails">Jun 29, 2023</h3>
                        </div>
                            <div className="ThirdTicketTwoTextTwoRight">
                            <LuTicket/>
                                <h3 className="DateDetails">₦8k - ₦15k</h3>
                            </div>
                    </div>
                    <div className="FirstTickettttThree">
                    <div className="IconLeft">
                            <RiDeleteBin5Line className="DeleteIcon"/>
                        </div>
                        <div className="IconRight">
                            <BsFillSuitHeartFill className="IconHeart"/>
                            <BsBookmarkFill className="IconBook"/>
                        </div>
                    </div>
                        </div>
                </div>
                <div className="SecondTickettt">
                <div className="SecondTicketOnee"></div>
                        <div className="SecondTicketttTwoo">
                        <div className="SecondTickettttOne">
                        <h3 className="HealthText">Health Care Africa
                                     2023 Show                     
                                     Sheraton Hotel, Ikeja GRA.</h3>
                        </div>
                    <div className="SecondTickettttTwo">
                    <div className="FourthTicketTwoTextTwoLeft">
                            <MdDateRange/>
                        <h3 className="DateDetails">Jun 29, 2023</h3>
                            </div>
                            <div className="FourthTicketTwoTextTwoRight">
                            <LuTicket/>
                                <h3 className="DateDetails">₦7k - ₦14k</h3>
                            </div>
                    </div>
                    <div className="SecondTickettttThree">
                    <div className="IconLeft">
                            <RiDeleteBin5Line className="DeleteIcon"/>
                        </div>
                        <div className="IconRight">
                            <BsFillSuitHeartFill className="IconHeart"/>
                            <BsBookmarkFill className="IconBook"/>
                        </div>
                    </div>
                        </div>
                </div>
                </div>
                </div> 
            </div>
            <div className="MainTicketHolder">
            <div className="TicketHolder">
                <div className="TicketText">
                    <h2 className="SavedTickets">Saved Tickets</h2>
                </div>
                <div className="TicketTicket">
                    <div className="FirstTicket">
                        <div className="FirstTicketOne"></div>
                        <div className="FirstTicketTwo">
                            <div className="FirstTicketTwoText">
                                <h3 className="HealthText">Health Care Africa
                                     2023 Show                     
                                     Sheraton Hotel, Ikeja GRA.</h3>
                          </div>
                          <div className="FirstTicketTwoTextTwo">
                          <div className="FirstTicketTwoTextTwoLeft">
                            <MdDateRange/>
                            <h3 className="DateDetails">Aug 1st, 2023</h3>
                          </div>
                            <div className="FirstTicketTwoTextTwoRight">
                                <LuTicket/>
                                <h3 className="DateDetails">₦12k - ₦17k</h3>
                            </div>
                          </div>
                        </div>
                    </div>
                    <div className="SecondTicket">
                    <div className="SecondTicketOne"></div>
                        <div className="SecondTicketTwo">
                        <div className="SecondTicketTwoText">
                        <h3 className="HealthText">
                        The curve Cohort 2 HackAthon Graduation 2023.
                        151, Muyibi Street, Olodi, Apapa 
                         Lagos State
                        </h3>
                        </div>
                        <div className="SecondTicketTwoTextTwo">
                        <div className="SecondTicketTwoTextTwoLeft">
                        <MdDateRange/>
                        <h3 className="DateDetails">Jun 29, 2023</h3>
                        </div>
                            <div className="SecondTicketTwoTextTwoRight">
                            <LuTicket/>
                                <h3 className="DateDetails">₦2k - ₦5k</h3>
                            </div>
                        </div>
                        </div>
                    </div>
                    <div className="ThirdTicket">
                    <div className="ThirdTicketOne"></div>
                        <div className="ThirdTicketTwo">
                        <div className="ThirdTicketTwoText">
                        <h3 className="HealthText">
                        Sustainable Business Conference
                        2023 Show
                        Muson Centre . Lagos, LA
                        </h3>
                        </div>
                        <div className="ThirdTicketTwoTextTwo">
                        <div className="ThirdTicketTwoTextTwoLeft">
                        <MdDateRange/>
                        <h3 className="DateDetails">Jun 29, 2023</h3>
                        </div>
                            <div className="ThirdTicketTwoTextTwoRight">
                            <LuTicket/>
                                <h3 className="DateDetails">₦8k - ₦15k</h3>
                            </div>
                        </div>
                        </div>
                    </div>
                    <div className="FourthTicket">
                    <div className="FourthTicketOne"></div>
                        <div className="FourthTicketTwo">
                        <div className="FourthTicketTwoText">
                        <h3 className="HealthText">
                        Lagos Health Summit 4.0
                        2023 Show
                        Muson Centre . Lagos, LA
                        </h3>
                        </div>
                        <div className="FourthTicketTwoTextTwo">
                            <div className="FourthTicketTwoTextTwoLeft">
                            <MdDateRange/>
                        <h3 className="DateDetails">Jun 29, 2023</h3>
                            </div>
                            <div className="FourthTicketTwoTextTwoRight">
                            <LuTicket/>
                                <h3 className="DateDetails">₦7k - ₦14k</h3>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
                <div className="TicketPayment">
                    <div className="FirstIcon">
                        <div className="IconLeft">
                            <RiDeleteBin5Line className="DeleteIcon"/>
                        </div>
                        <div className="IconRight">
                            <BsFillSuitHeartFill className="IconHeart"/>
                            <BsBookmarkFill className="IconBook"/>
                        </div>
                    </div>
                    <div className="SecondIcon">
                    <div className="IconLeft">
                    <RiDeleteBin5Line className="DeleteIcon"/>
                    </div>
                        <div className="IconRight">
                        <BsFillSuitHeartFill className="IconHeart"/>
                            <BsBookmarkFill className="IconBook"/>
                        </div>
                    </div>
                    <div className="ThirdIcon">
                    <div className="IconLeft">
                    <RiDeleteBin5Line className="DeleteIcon"/>
                    </div>
                        <div className="IconRight">
                        <BsFillSuitHeartFill className="IconHeart"/>
                            <BsBookmarkFill className="IconBook"/>
                        </div>
                    </div>
                    <div className="FourthIcon">
                    <div className="IconLeft">
                    <RiDeleteBin5Line className="DeleteIcon"/>
                    </div>
                        <div className="IconRight">
                        <BsFillSuitHeartFill className="IconHeart"/>
                            <BsBookmarkFill className="IconBook"/>
                        </div>
                    </div>
                </div>
            </div>
            </div>
            <div className="MainTicketHolder">
            <div className="TicketHolder">
                <div className="TicketText">
                    <h2 className="SavedTickets">BookMark Tickets</h2>
                </div>
                <div className="TicketTicket">
                    <div className="FirstTicket">
                        <div className="FirstTicketOnee"></div>
                        <div className="FirstTicketTwo">
                            <div className="FirstTicketTwoText">
                                <h3 className="HealthText">Health Care Africa
                                     2023 Show                     
                                     Sheraton Hotel, Ikeja GRA.</h3>
                          </div>
                          <div className="FirstTicketTwoTextTwo">
                          <div className="FirstTicketTwoTextTwoLeft">
                            <MdDateRange/>
                            <h3 className="DateDetails">Aug 1st, 2023</h3>
                          </div>
                            <div className="FirstTicketTwoTextTwoRight">
                                <LuTicket/>
                                <h3 className="DateDetails">₦12k - ₦17k</h3>
                            </div>
                          </div>
                        </div>
                    </div>
                    <div className="SecondTicket">
                    <div className="SecondTicketOnee"></div>
                        <div className="SecondTicketTwo">
                        <div className="SecondTicketTwoText">
                        <h3 className="HealthText">
                        The curve Cohort 2 HackAthon Graduation 2023.
                        151, Muyibi Street, Olodi, Apapa 
                         Lagos State
                        </h3>
                        </div>
                        <div className="SecondTicketTwoTextTwo">
                        <div className="SecondTicketTwoTextTwoLeft">
                        <MdDateRange/>
                        <h3 className="DateDetails">Jun 29, 2023</h3>
                        </div>
                            <div className="SecondTicketTwoTextTwoRight">
                            <LuTicket/>
                                <h3 className="DateDetails">₦2k - ₦5k</h3>
                            </div>
                        </div>
                        </div>
                    </div>
                    <div className="ThirdTicket">
                    <div className="ThirdTicketOnee"></div>
                        <div className="ThirdTicketTwo">
                        <div className="ThirdTicketTwoText">
                        <h3 className="HealthText">
                        Sustainable Business Conference
                        2023 Show
                        Muson Centre . Lagos, LA
                        </h3>
                        </div>
                        <div className="ThirdTicketTwoTextTwo">
                        <div className="ThirdTicketTwoTextTwoLeft">
                        <MdDateRange/>
                        <h3 className="DateDetails">Jun 29, 2023</h3>
                        </div>
                            <div className="ThirdTicketTwoTextTwoRight">
                            <LuTicket/>
                                <h3 className="DateDetails">₦8k - ₦15k</h3>
                            </div>
                        </div>
                        </div>
                    </div>
                    <div className="FourthTicket">
                    <div className="FourthTicketOnee"></div>
                        <div className="FourthTicketTwo">
                        <div className="FourthTicketTwoText">
                        <h3 className="HealthText">
                        Lagos Health Summit 4.0
                        2023 Show
                        Muson Centre . Lagos, LA
                        </h3>
                        </div>
                        <div className="FourthTicketTwoTextTwo">
                            <div className="FourthTicketTwoTextTwoLeft">
                            <MdDateRange/>
                        <h3 className="DateDetails">Jun 29, 2023</h3>
                            </div>
                            <div className="FourthTicketTwoTextTwoRight">
                            <LuTicket/>
                                <h3 className="DateDetails">₦7k - ₦14k</h3>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
                <div className="TicketPayment">
                    <div className="FirstIcon">
                        <div className="IconLeft">
                            <RiDeleteBin5Line className="DeleteIcon"/>
                        </div>
                        <div className="IconRight">
                            <BsFillSuitHeartFill className="IconHearts"/>
                            <BsBookmarkFill className="IconBooks"/>
                        </div>
                    </div>
                    <div className="SecondIcon">
                    <div className="IconLeft">
                    <RiDeleteBin5Line className="DeleteIcon"/>
                    </div>
                        <div className="IconRight">
                        <BsFillSuitHeartFill className="IconHearts"/>
                            <BsBookmarkFill className="IconBooks"/>
                        </div>
                    </div>
                    <div className="ThirdIcon">
                    <div className="IconLeft">
                    <RiDeleteBin5Line className="DeleteIcon"/>
                    </div>
                        <div className="IconRight">
                        <BsFillSuitHeartFill className="IconHearts"/>
                            <BsBookmarkFill className="IconBooks"/>
                        </div>
                    </div>
                    <div className="FourthIcon">
                    <div className="IconLeft">
                    <RiDeleteBin5Line className="DeleteIcon"/>
                    </div>
                        <div className="IconRight">
                        <BsFillSuitHeartFill className="IconHearts"/>
                            <BsBookmarkFill className="IconBooks"/>
                        </div>
                    </div>
                </div>
            </div>
            </div>
            </main>
            <div>
            {/* <Footer/> */}
            </div>
            </>
           
    )
}
export default SavedTickets
