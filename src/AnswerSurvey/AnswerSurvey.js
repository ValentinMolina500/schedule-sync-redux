import React, { useState } from 'react';
import "./AnswerSurvey.css";
import logo from "../imgs/logo.png";

export default () => {
    const [buttonActive, setButtonActive] = useState(false)
    return (
        <div className="AnswerSurvey">
            <div className="main-page-container">
                <div className="main-content-container">
                    
                    <div className="info-container">
                        <img className="logo" src={logo} />
                        <div className="action-bar-container">
                           
                            <h1 className="headline">Answer Survey</h1>
                        </div>
                        <div className="title-date-container"> 
                            <span className="event-title">Ford's Tesla Unveiling</span>
                            <span className="middle-dot">&middot;</span>
                            <span className="date-text">Jun 19, 2020</span>
                        </div> 
                    </div>
                    
                    <div className="time-selection-container">
                        <div style={{gridColumn: "1"}}>10:30AM</div>
                        <div style={{gridColumn: "2"}}>11:00AM</div>
                        <div onClick={() => setButtonActive(!buttonActive)} className={`${buttonActive ? 'active' : ''}`}>
                            <div className="inner-button">
                                <div>
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