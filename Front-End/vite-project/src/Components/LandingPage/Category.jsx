import {AiOutlineArrowDown} from 'react-icons/ai'

function Category (){
    return(
        <div>
        <div className="our-category">

           <div className="category-div">
            <h2>Find your interest</h2>
            <AiOutlineArrowDown className='arrow-down'/>
            </div>
           <div className='holder2'>
            <div className='inner-holder2'>

            <div className="category-containers">           
                <div className="main-category">
                    <div className="category-image"></div>
                    <div className="category-discription"></div>
                </div>

                <div className="main-category">
                    <div className="category-image"></div>
                    <div className="category-discription"></div>
                </div>
                
                <div className="main-category">
                    <div className="category-image"></div>
                    <div className="category-discription"></div>
                </div>

                <div className="main-category">
                    <div className="category-image"></div>
                    <div className="category-discription"></div>
                </div>

                <div className="main-category">
                    <div className="category-image"></div>
                    <div className="category-discription"></div>
                </div>
                
            </div>
            </div>
           </div>
            
           

        </div>
        </div>
    )
}

export default Category