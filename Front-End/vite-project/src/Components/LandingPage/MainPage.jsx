import React from "react"
import Header from "./Header"
import Hero from "./Hero"
import Service from "./Service"
import Category from "./category"
import './Media.css'
import FAQ from "./FAQ"
import Footer from "./Footer"
const MainPage = () =>{
    return(
        <> 
          <Header/>
        <Hero/>
        <Service/>
        <Category/>
        <FAQ/>
        <Footer/>
        </>
    )
}

export default MainPage