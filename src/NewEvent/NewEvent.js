import React, { useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faEdit,
    faCalendarAlt,
    faClock,
    faBars,
    faCheck,
} from "@fortawesome/pro-regular-svg-icons";
import TimePicker from "../CustomTimePicker/CustomTimePicker";
import DatePicker from "../CustomDatePicker/CustomDatePicker";
import { minutesToTimeString, timeStringToMinutes } from "../utils/time";
import "./NewEvent.css";

export default (props) => {
    const { history } = props;
    const [titleInputFocused, setTitleInputFocused] = useState(false);
    const [dateInputFocused, setDateInputFocused] = useState(false);
    // const [timeInputFocused, setTimeInputFocused] = useState(false);
    const [startTimeInputFocused, setStartTimeInputFocused] = useState(false);
    const [endTimeInputFocused, setEndTimeInputFocused] = useState(false);
    const [allDayClicked, setAllDayClicked] = useState(false);

    const [startVisibility, setStartVisibility] = useState(false);
    const [startValueMinutes, setStartValueMinutes] = useState(0);
    const [startValueString, setStartValueString] = useState(
        minutesToTimeString(0)
    );

    const [endVisibility, setEndVisibility] = useState(false);
    const [endValueMinutes, setEndValueMinutes] = useState(30);
    const [endValueString, setEndValueString] = useState(
        minutesToTimeString(30)
    );

    const [datePickerVisibility, setDatePickerVisibility] = useState(false);
    const [dateString, setDateString] = useState(formatDate(new Date()));

    const startInputRef = useRef(null);

    const setStartInputValue = (time) => {
        setStartValueMinutes(time.valueAsMinutes);
        setStartValueString(time.valueAsString);

        if (endValueMinutes <= time.valueAsMinutes) {
            setEndValueString(minutesToTimeString(time.valueAsMinutes + 30));
            setEndValueMinutes(time.valueAsMinutes + 30);
        }
    };

    const setEndInputValue = (time) => {
        setEndValueMinutes(time.valueAsMinutes);
        setEndValueString(time.valueAsString);
    };
    return (
        <div className="NewEventPage">
            <div className="main-page-container">
                <div className="date-input-container">
                    <h1 className="headline row-1 col-2">Create Survey</h1>
                    <label
                        className="row-2 col-1 icon-label"
                        htmlFor="title-input"
                    >
                        <FontAwesomeIcon icon={faEdit} className="label-icon" />
                    </label>
                    <div className="title-input-wrapper row-2 col-2">
                        <input
                            onFocus={() => setTitleInputFocused(true)}
                            onBlur={() => setTitleInputFocused(false)}
                            type="text"
                            className="title-input"
                            placeholder="Add Title"
                            id="title-input"
                        ></input>
                        <div
                            className={`input-bottom-border ${
                                titleInputFocused ? "focused" : ""
                            }`}
                        />
                    </div>
                    <label
                        htmlFor="date-input"
                        className="row-3 col-1 icon-label"
                    >
                        <FontAwesomeIcon
                            icon={faCalendarAlt}
                            style={{ marginRight: "3px" }}
                            className="label-icon"
                        />
                    </label>
                    {/* <label htmlFor="date">Date</label> */}
                    {/* <input id="date" className="row-2 col-2 date-input" type="date"></input> */}
                    <div className="input-wrapper row-3 col-2">
                        <input
                            onFocus={() => { setDateInputFocused(true); setDatePickerVisibility(true) }}
                            onBlur={() =>  { setDateInputFocused(false);  }}
                            className="date-time-input"
                            
                            // placeholder="Add Title"
                            id="date-input"
                            readOnly
                            value={dateString}
                        ></input>
                        <div
                            className={`input-bottom-border ${
                                dateInputFocused ? "focused" : ""
                            }`}
                        />
                         <DatePicker visibilityCallback={setDatePickerVisibility} visible={datePickerVisibility} onDateSelected={setDateString}/>
                    </div>
                    <label
                        htmlFor="time-input"
                        className="row-4 col-1 icon-label"
                    >
                        <FontAwesomeIcon
                            icon={faClock}
                            style={{ marginRight: "3px" }}
                            className="label-icon"
                        />
                    </label>
                    <div
                        className="row-4 col-2 time-input-container"
                        // style={{ display: "flex", width:"400px", alignItems: "center", justifyContent:"flex-start" }}
                    >
                        <div className="input-wrapper">
                            <input
                                onFocus={() => {
                                    setStartTimeInputFocused(true);
                                    setStartVisibility(true);
                                }}
                                onBlur={() => setStartTimeInputFocused(false)}
                                className="date-time-input start-time-input"
                                // placeholder="Add Title"
                                id="start-time-input"
                                ref={startInputRef}
                                disabled={allDayClicked}
                                value={startValueString}
                                readOnly
                            ></input>
                            <div
                                className={`input-bottom-border ${
                                    startTimeInputFocused ? "focused" : ""
                                }`}
                            />
                            <TimePicker
                                visibility={startVisibility}
                                onValueChange={setStartInputValue}
                                currentValue={startValueMinutes}
                                setVisibility={setStartVisibility}
                            />

                            <label htmlFor="end-time-input" className="time-input-label">No Earlier Than...</label>
                        </div>
                        <p
                            style={{
                                margin: "0rem 1rem",
                                display: "inline-block",
                            }}
                        >
                            &mdash;
                        </p>
                        <div className="input-wrapper">
                            <input
                                onFocus={() => {
                                    setEndTimeInputFocused(true);
                                    setEndVisibility(true);
                                }}
                                onBlur={() => setEndTimeInputFocused(false)}
                                className="date-time-input end-time-input"
                                // placeholder="Add Title"
                                id="end-time-input"
                                disabled={allDayClicked}
                                readOnly
                                value={endValueString}
                            ></input>
                            <div
                                className={`input-bottom-border ${
                                    endTimeInputFocused ? "focused" : ""
                                }`}
                            />

                            <label htmlFor="end-time-input" className="time-input-label">No Later Than...</label>

                            <TimePicker
                                visibility={endVisibility}
                                minValue={startValueMinutes + 30}
                                onValueChange={setEndInputValue}
                                currentValue={endValueMinutes}
                                setVisibility={setEndVisibility}
                            />
                        </div>

                        <div
                            onClick={() => setAllDayClicked(!allDayClicked)}
                            className={`checkbox-ss ${
                                allDayClicked ? "active" : ""
                            }`}
                            tabIndex="0"
                        >
                            <FontAwesomeIcon className="icon" icon={faCheck} />
                        </div>

                        <p className="all-day-text">All Day?</p>
                    </div>
                    <label
                        htmlFor="description"
                        className="row-5 col-1 icon-label description-label"
                    >
                        <FontAwesomeIcon
                            icon={faBars}
                            style={{ marginRight: "3px" }}
                            className="label-icon"
                        />
                    </label>
                    <div className="title-input-wrapper row-5 col-2">
                        <textarea
                            rows="8"
                            placeholder="Add description (optional)"
                            className="description-textarea"
                            id="description"
                        ></textarea>
                    </div>
                    <div className="row-6 col-2">
                        <button onClick={() => history.push("/view-survey")} className="submit-btn">Submit</button>
                        {/* <TimePicker /> */}
                       
                    </div>
                </div>
            </div>
        </div>
    );
};

const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];

const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
]
function formatDate(date) {
    return `${days[date.getDay()]}, ${months[date.getMonth()]} ${date.getDate()}`;
}