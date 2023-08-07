import{AiOutlineSearch, AiOutlineArrowRight} from 'react-icons/ai'

function Hero (){
    return(
        <div>
            <div className="hero-section">
            <div className="event-result">

                <div className="discription">
                    <h1>DON'T MISS THE UPCOMING EVENT</h1>
                    <h2>Explore what's happening, where and when</h2>
                </div>

                <div className="search-event">
                    <button className='search-bar'>
                    <input type="text" placeholder="Search Event" name="search"></input>
                        <AiOutlineSearch className='searchin'/>
                        
                    </button>

                    <button className='see-result'>See result
                    <AiOutlineArrowRight className='arrow'/>
                    </button>

                </div>
            </div>
            
          
        </div>
        </div>
    )
}

export default Hero