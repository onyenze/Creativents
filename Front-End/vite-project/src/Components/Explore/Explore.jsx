import "./Explore.css"
import "./ExploreResponsive.css"
import { useNavigate } from "react-router-dom"
const Explore = () => {
    const nav = useNavigate()
    return(
        <>
        <div className="ExploreHolder">
           <img src="./src/assets/Vent.png" alt="" className="ExploreLogo"/>
           <h1 className="ExploreText">You are at the right place, don't fail to explore</h1>
           <button className="ExploreButton" onClick={()=>nav('/landingpage')}>EXPLORE</button>
        </div>
        </>
    )
}
export default Explore