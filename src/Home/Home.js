import React from 'react';
import "./styles.css";
import landingImage from "../imgs/landing.svg";

export default (props) => {
    const { history } = props;
    return (
        <div className="HomePage">
            {/* <div className="header">
                <p>
                    Schedule Sync
                </p>
            </div> */}
            <div className="home-page-container">
                <h1 className="title">Schedule Sync</h1>
                <p className="subtitle">Dream Edition</p>
                <img src={landingImage} className="landing-img" />
                <p className="hero-text">Find time to meet with the people you like</p>
                <button onClick={() => history.push("/new-survey")} className="create-new-event-btn">Create Survey</button>
                <button className="view-event-btn">View Survey</button>
            </div>
            {/* <div className="footer">
                <p>
                    Made in Washington
                </p>
            </div> */}
        </div>
    )
}