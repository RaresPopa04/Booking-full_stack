import './header.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBed, faCab, faCalendarDays, faPerson, faPlane } from '@fortawesome/free-solid-svg-icons';
import React, { useContext, useState } from "react";
import {DateRange} from 'react-date-range'
import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'
import {format} from "date-fns"
import { useNavigate } from 'react-router-dom';
import { SearchContext } from '../../context/SearchContext';
import { AuthContext } from '../../context/AuthContext';

const Header = ({type})=>{
    const [destination,setDestination] = useState("");
    const [openDate,setOpenDate] = useState(false)
    const [openOptions,setOpenOptions] = useState(false)
    const [options,setOptions] = useState({
        adult:1,
        children:0,
        rooms:1
    })

    const { dispatch } = useContext(SearchContext);

    const {user} = useContext(AuthContext)

    const [dates, setDate] = useState([
        {
            startDate: new Date(),
            endDate: new Date(),
            key: 'selection'
        }
    ])

    const handleOption = (name,operation)=>{
        setOptions(prev=>{
            return{
                ...prev,[name]:operation==="i" ? options[name]+1 : options[name]-1,
            }
        })
    }
    const navigate = useNavigate();
    const handleSearch = ()=>{
        dispatch({type:"NEW_SEARCH", payload:{destination,dates,options}})
        navigate("/hotels",{state:{destination,dates,options}})
    }
    return (
        <div className="header">
            <div className= {type === "list"? "headerContainer listMode" : "headerContainer"}>
                <div className="headerList">
                    <div className="headerListItem active">
                        <FontAwesomeIcon icon={faBed}/>
                        <span>Stays</span>
                    </div>
                    <div className="headerListItem">
                        <FontAwesomeIcon icon={faPlane}/>
                        <span>Flights</span>
                    </div>
                    <div className="headerListItem">
                        <FontAwesomeIcon icon={faBed}/>
                        <span>Attractions</span>
                    </div>
                    <div className="headerListItem">
                        <FontAwesomeIcon icon={faCab}/>
                        <span>Airport taxis</span>
                    </div>
                </div>
                
                { type !== "list" && 
                    <>
                    <h1 className='headerTitle'>A life time of discounts? It's Genius</h1>
                    <div className="headerDesc">
                        Get rewarded for you travels - unlock instant savings of 10% or more with a free Lamabooking account
                    </div>
                    {!user && <button className='headerBtn'>Sign in/ Register</button>}
                    <div className="headerSearch">
                        <div className="headerSearchItem">
                            <FontAwesomeIcon icon = {faBed} className='headerIcon'></FontAwesomeIcon>
                            <input type="text" 
                            placeholder='Where are you going?' 
                            className='headerSearchInput'
                            onChange={e=>setDestination(e.target.value)}/>
                        </div>
                        <div className="headerSearchItem">
                            <FontAwesomeIcon icon = {faCalendarDays} className='headerIcon'></FontAwesomeIcon>
                            <span onClick = {()=>setOpenDate(!openDate)} className='headerSearchText'>{`${format(dates[0].startDate, "MM/dd/yyyy")} to ${format(dates[0].endDate, "MM/dd/yyyy")}`}</span>
                            { openDate && <DateRange
                                editableDateInputs={true}
                                minDate={new Date()}
                                onChange={item => setDate([item.selection])}
                                moveRangeOnFirstSelection={false}
                                ranges={dates}
                                className='date'
                            />}
                        </div>
                        <div className="headerSearchItem">
                            <FontAwesomeIcon icon = {faPerson} className='headerIcon'></FontAwesomeIcon>
                            <span className='headerSearchText' onClick={()=>setOpenOptions(!openOptions)}>{`${options.adult} adults ${options.children} children ${options.rooms} rooms`}</span>
                            {
                                openOptions && 
                                <div className="options">
                                <div className="optionItem">
                                    <span className="optionText">Adult</span>
                                    <div className="optionCounter">
                                        <button className="optionCounterButton" disabled = {options.adult <= 1} onClick={()=>handleOption("adult","d")}>-</button>
                                        <span className="optionCounterNumber">{options.adult}</span>
                                        <button className="optionCounterButton" onClick={()=>handleOption("adult","i")}>+</button>
                                    </div>
                                </div>
                                <div className="optionItem">
                                    <span className="optionText">Children</span>
                                    <div className="optionCounter">
                                        <button className="optionCounterButton" disabled = {options.children <= 0} onClick={()=>handleOption("children","d")}>-</button>
                                        <span className="optionCounterNumber">{options.children}</span>
                                        <button className="optionCounterButton" onClick={()=>handleOption("children","i")}>+</button>
                                    </div>
                                </div>
                                <div className="optionItem">
                                    <span className="optionText">Room</span>
                                    <div className="optionCounter">
                                        <button className="optionCounterButton" disabled = {options.rooms <= 1} onClick={()=>handleOption("rooms","d")}>-</button>
                                        <span className="optionCounterNumber">{options.rooms}</span>
                                        <button className="optionCounterButton" onClick={()=>handleOption("rooms","i")}>+</button>
                                    </div>
                                </div>
                                </div>
                            }
                        </div>
                        <div className="headerSearchItem" onClick={handleSearch}>
                            <button className='headerBtn'>Search</button>
                        </div>
                    </div>
                    </>
                }
            </div>
        </div>
    )
}

export default Header