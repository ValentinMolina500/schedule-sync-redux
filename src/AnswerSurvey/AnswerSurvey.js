import React, { useState } from 'react';
import "./AnswerSurvey.css";
import logo from "../imgs/logo.png";
import { Link } from "react-router-dom";

export default () => {
    const [buttonActive, setButtonActive] = useState(false)
    return (
        <div className="AnswerSurvey">
            
            <div className="main-page-container">
            <nav className="header">
                <img className="header-logo" src={logo} />
                <ul>
                    <li><Link to={"/"}>Home</Link></li>
                    <li><Link to={"/new-survey"}>Create Poll</Link></li>
                </ul>
            </nav>
                <div className="main-content-container">
                    
                    <div className="info-container">
                        <div className="logo-container">
                            <img className="logo" src={logo} />

                        </div>
                        <div className="action-bar-container">
                           
                            <h1 className="headline">When are you free?</h1>
                        </div>
                        <div className="title-date-container"> 
                            <span className="event-title">Ford's Tesla Unveiling</span>
                            <span className="middle-dot">&middot;</span>
                            <span className="date-text">Jun 19, 2020</span>
                        </div> 
                        <div className="description-container">
                            Ford finally got his Tesla so we are meeting up at his place to check it out. By the way this is very long.
                        </div>
                    </div>
                    
                    <div className="time-selection-container">
                        <div>10:30AM</div>
                        <div>11:00AM</div>
                        <div onClick={() => setButtonActive(!buttonActive)} className={`${buttonActive ? 'active' : ''}`}>
                            <div className="inner-button">
                                <div className="button-head">
                                    11:30AM
                                </div>
                                <div className={`button-sub ${buttonActive ? "" : 'hidden'}`}> 
                                    &mdash; 12:30PM
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="inner-button">
                                <div>
                                    12:00PM
                                </div>
                                <div className="button-sub"> 
                                    &mdash; 1:00PM
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="inner-button">
                                <div>
                                    12:30PM
                                </div>
                                <div className="button-sub"> 
                                    &mdash; 1:30PM
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="inner-button">
                                <div>
                                    1:00PM
                                </div>
                                <div className="button-sub"> 
                                    &mdash; 2:00PM
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="inner-button">
                                <div>
                                    1:30PM
                                </div>
                                <div className="button-sub"> 
                                    &mdash; 2:30PM
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="inner-button">
                                <div>
                                    2:00PM
                                </div>
                                <div className="button-sub"> 
                                    &mdash; 3:00PM
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="inner-button">
                                <div>
                                    2:30PM
                                </div>
                                <div className="button-sub"> 
                                    &mdash; 3:30PM
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="inner-button">
                                <div>
                                    3:00PM
                                </div>
                                <div className="button-sub"> 
                                    &mdash; 4:00PM
                                </div>
                            </div>
                        </div>
                        <div>3:30PM</div>
                        <div>3:30PM</div>
                        <div>3:30PM</div>
                    </div>
                    <div className="btn-container">
                        <button className="confirm-selection-btn">Confirm</button>
                    </div>
                </div>
            </div>
        </div>
    );
}