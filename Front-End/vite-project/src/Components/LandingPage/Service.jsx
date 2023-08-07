import {AiOutlineArrowDown} from 'react-icons/ai'

function Service (){
    return(
        <div>
        <div className="our-service">

           <div className="service-div">
            <h2>Service</h2>
            <AiOutlineArrowDown className='arrow-down'/>
            </div>
                <div className='holder'>
                
            <div className='holderwrap'>
            <div className="service-containers">
                <div className="main-serice">
                    <div className="top-image"></div>
                    <div className="Down-discription"></div>
                </div>

                <div className="main-serice">
                    <div className="top-image"></div>
                    <div className="Down-discription"></div>
                </div>
                
                <div className="main-serice">
                    <div className="top-image"></div>
                    <div className="Down-discription"></div>
                </div>
                {/* <div className="main-serice">
                    <div className="top-image"></div>
                    <div className="Down-discription"></div>
                </div> */}
                </div>
            </div>
                </div>
            

        </div>
        </div>
    )
 }

export default Service