import "./Explore.css"
import "./Exploremedia.css"
import { useNavigate } from "react-router-dom"
import LogoC from "../../assets/LogoC.png"

const Explore = () => {
    const nav = useNavigate()
    return(
        <>
        <div className="ExploreHolder">
            <div className="mirrow"></div>

            <div className="exploreinnerholder">
            <img src={LogoC} alt="" className="ExploreLogo"/>
            <h1>Creativent</h1>
            </div>
           
           <h1 className="ExploreText">You are at the right place, don't fail to explore</h1>
        
           <button className="ExploreButton" onClick={()=>nav('/landingpage')}>EXPLORE</button>
           

        </div>
        </>
    )
}
export default Explore