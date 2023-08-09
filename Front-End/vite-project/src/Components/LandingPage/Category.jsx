import {AiOutlineArrowDown} from 'react-icons/ai'
// import { useImage } from './Imagecontext';
function Category (){
    // const { image } = useImage();
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
            {/* {image.map((image, index) => (
                                <div className="main-category" key={index}>
                                    <div className="category-image">
                                        <img
                                            src={URL.createObjectURL(image)}
                                            alt=""
                                            style={{ width: "100%", height: "100%", borderRadius: "10px" }}
                                        />
                                    </div>
                                    <div className="category-discription"></div>
                                </div>
                            ))} */}

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