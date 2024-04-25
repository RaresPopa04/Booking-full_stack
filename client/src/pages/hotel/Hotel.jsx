import React, { useContext, useState } from "react";
import './hotel.css'
import Navbar from '../../component/navbar/Navbar'
import Header from '../../component/header/Header'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleArrowRight, faCircleXmark, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import Footer from "../../component/footer/Footer"
import MailList from "../../component/mailList/MailList"
import { faCircleArrowLeft } from "@fortawesome/free-solid-svg-icons/faCircleArrowLeft";
import { useLocation } from "react-router-dom";
import useFetch from "../../component/hooks/useFetch";
import { SearchContext } from "../../context/SearchContext";
const Hotel = ()=>{

    const location = useLocation()
    const id = location.pathname.split("/")[2]

    const[slideIndex,setSlideIndex] = useState(0)
    const[open,setOpen] = useState(false);

    const {data,loading,error} = useFetch(`${id}`)
    const {dates,options} = useContext(SearchContext)


    const MILISECONDS_PER_DAY = 1000*60*60*24
    function dayDifference(date1,date2){
        const timeDIff = Math.abs(date1.getTime()-date2.getTime())
        const diffDays = Math.ceil(timeDIff/MILISECONDS_PER_DAY)
        return diffDays;
    }

    const days = dayDifference(dates[0].endDate,dates[0].startDate)



    const handleOpen = (index)=>{
        setSlideIndex(index)
        setOpen(true);
    }

    const handleMove = (dir)=>{
        let newSlideIndex;
        if(dir === 'l'){
            newSlideIndex = slideIndex === 0 ? 5: slideIndex-1;
        }else{
            newSlideIndex = slideIndex === 5 ? 0: slideIndex+1;
        }
        console.log(newSlideIndex);
        setSlideIndex(newSlideIndex);
    }
    return (
        <div>
            <Navbar/>
            <Header type = "list"/>
        {loading ? ("Loading"): (
        <div className="hotelContainer">
                { open && 
                    <div className="slider">
                        <FontAwesomeIcon icon = {faCircleXmark} className="close" onClick={()=>setOpen(false)}/>
                        <FontAwesomeIcon icon = {faCircleArrowLeft} className="arrow" onClick={()=>handleMove('l')}/>
                        <div className="sliderWrapper">
                            <img src={data.photos[slideIndex]} className="sliderImg" />
                        </div>
                        <FontAwesomeIcon icon = {faCircleArrowRight} className="arrow" onClick={()=>handleMove('r')}/>

                    </div>
                }
                <div className="hotelWrapper">
                    <button className="bookNow">
                        Reserve or Book Now!
                    </button>
                    <div className="hotelTitle">
                        {data.name}
                    </div>
                    <div className="hotelAddress">
                        <FontAwesomeIcon icon = {faLocationDot}/>
                        <span> 123, XYZ Street, ABC City</span>
                    </div>

                    <span className="hotelDistance">
                        {data.distance} km from city center
                    </span>

                    <span className="hotelPriceHighlight">
                        Book a stay for ${data.cheapestPrice} at this property and get free airport shuttle
                    </span>
                    <div className="hotelImages">
                        {
                            data.photos?.map((img,index)=>{
                                return(
                                    <div className="hotelImgWrapper">
                                        <img onClick={()=>handleOpen(index)} src={img.src} alt="dasd" className="hotelImg"/>
                                    </div>
                                )
                                
                            })
                        }
                    </div>
                    <div className="hotelDetails">
                        <div className="hotelDetailsTexts">
                            <h1 className="hotelTitle">{data.title}</h1>
                            <p className="hotelDesc">
                               {data.desc}
                            </p>

                        </div>
                        <div className="hotelDetailsPrice">
                            <h1>Perfect for a {days}-night stay!</h1>
                            <span>
                                Located in the real heart of Krakow, this property has an excellent location of 9.8!
                            </span>
                            <h2>
                                <b>${days*data.cheapestPrice*options.rooms}</b> ({days} nights)
                            </h2>
                            <button>Reserve or Book Now!</button>
                        </div>
                    </div>
                </div>
                <MailList/>
                <Footer/>
            </div>
            )}
        </div>
        
    )
}

export default Hotel