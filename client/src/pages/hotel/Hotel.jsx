import React, { useState } from "react";
import './hotel.css'
import Navbar from '../../component/navbar/Navbar'
import Header from '../../component/header/Header'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleArrowRight, faCircleXmark, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import Footer from "../../component/footer/Footer"
import MailList from "../../component/mailList/MailList"
import { faCircleArrowLeft } from "@fortawesome/free-solid-svg-icons/faCircleArrowLeft";
const Hotel = ()=>{

    const[slideIndex,setSlideIndex] = useState(0)
    const[open,setOpen] = useState(false);

    const photos = [
        {
            src:"https://cf.bstatic.com/xdata/images/hotel/max1024x768/170846836.jpg?k=5dc7e3c2e03c5ae8a1c89f1d41b9cadb89f32f007a3b9b6470787bc5c9ae24dc&o=&hp=1"
        },
        {
            src:"https://cf.bstatic.com/xdata/images/hotel/max1024x768/221435593.jpg?k=b295be51063d18ef525cb4c09403e3d0c0c8aea4532553a7aa9899bc5ab92d31&o=&hp=1"
        },
        {
            src:"https://cf.bstatic.com/xdata/images/hotel/max1024x768/171716910.jpg?k=2646703f325178f3536fab97c1962395e59ce5a4a9f86979a7696f48bce63cd5&o=&hp=1"
        },
        {
            src:"https://cf.bstatic.com/xdata/images/hotel/max1024x768/221436888.jpg?k=3fc9b9b1bc0329efaf31f5f69c2549894270faf368d59390a34bdfe13cd17090&o=&hp=1"
        },
        {
            src:"https://cf.bstatic.com/xdata/images/hotel/max1024x768/239473822.jpg?k=605bd0525543f8532a397bc84f115f726fa5fdf6abb30c9c8e34d3b207c89cfb&o=&hp=1"
        },
        {
            src:"https://cf.bstatic.com/xdata/images/hotel/max1024x768/221436915.jpg?k=5df7585cc5b85154660efc1afcfcabd63f6b4a08e7a6c90d09e04636a526c4e3&o=&hp=1"
        }
    ]

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
            <div className="hotelContainer">
                { open && 
                    <div className="slider">
                        <FontAwesomeIcon icon = {faCircleXmark} className="close" onClick={()=>setOpen(false)}/>
                        <FontAwesomeIcon icon = {faCircleArrowLeft} className="arrow" onClick={()=>handleMove('l')}/>
                        <div className="sliderWrapper">
                            <img src={photos[slideIndex].src} className="sliderImg" />
                        </div>
                        <FontAwesomeIcon icon = {faCircleArrowRight} className="arrow" onClick={()=>handleMove('r')}/>

                    </div>
                }
                <div className="hotelWrapper">
                    <button className="bookNow">
                        Reserve or Book Now!
                    </button>
                    <div className="hotelTitle">
                        Grand Hotel
                    </div>
                    <div className="hotelAddress">
                        <FontAwesomeIcon icon = {faLocationDot}/>
                        <span> 123, XYZ Street, ABC City</span>
                    </div>

                    <span className="hotelDistance">
                        2.5 km from city center
                    </span>

                    <span className="hotelPriceHighlight">
                        Book a stay for $100 at this property and get free airport shuttle
                    </span>
                    <div className="hotelImages">
                        {
                            photos.map((img,index)=>{
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
                            <h1 className="hotelTitle">Postillion Hotel Amsterdam</h1>
                            <p className="hotelDesc">
                                Unele camere sunt controlate complet vocal, iar altele au o tabletă smart. De asemenea, tableta are conexiune AirPlay. Camerele au baie privată cu oglindă cu TV integrat, duș şi articole de toaletă gratuite. Unitățile de cazare au birou, iar unele sunt prevăzute cu zonă de relaxare.

                                Mâncăruri internaționale și preparate la grătar pot fi savurate la proprietate. Oaspeții pot lua, de asemenea, prânzul și cina la restaurant proprietății.

                                Centrul de convenții are 14 săli de conferințe modulare.

                                Postillion Hotel Amsterdam pune la dispoziție o terasă. În apropiere, oaspeții pot face ciclism, iar hotelul oferă un serviciu de închiriere de biciclete. Personalul recepției cu program nonstop vorbește engleză şi olandeză.

                                Stația de metrou Overamstel este la doar 3 minute de mers pe jos şi oferă acces la gara centrală din Amsterdam, aflată la o călătorie de aproximativ 12 minute. Teatrul Carre este la 3,4 km de Postillion Hotel Amsterdam. Cel mai apropiat aeroport este Aeroportul Schiphol, situat la 11 km. Oaspeții au la dispoziție o parcare subterană cu 89 de locuri.
                            </p>

                        </div>
                        <div className="hotelDetailsPrice">
                            <h1>Perfect for a 9-night stay!</h1>
                            <span>
                                Located in the real heart of Krakow, this property has an excellent location of 9.8!
                            </span>
                            <h2>
                                <b>$100</b> (9 nights)
                            </h2>
                            <button>Reserve or Book Now!</button>
                        </div>
                    </div>
                </div>
                <MailList/>
                <Footer/>
            </div>
        </div>
        
    )
}

export default Hotel