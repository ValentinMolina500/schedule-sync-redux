import React, { useRef, useEffect } from "react";
import "./styles.css";
import { minutesToTimeString, timeStringToMinutes} from "../utils/time";

const STEP = 30;
export default (props) => {
    const {
        minValue = 0,
        maxValue = 1440,
        onValueChange,
        setVisibility,
        visibility,
        currentValue = 0
    } = props;
    const timeRef = useRef(null);

    useEffect(() => {
        /**
         * Alert if clicked on outside of element
         */
        function handleClickOutside(event) {
            if (timeRef.current && !timeRef.current.contains(event.target) && visibility) {
                setVisibility(false)
            }
        }

        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [timeRef, visibility]);
    const renderTimePicker = () => {
        let items = [];
        for (let i = minValue; i < maxValue; i += STEP) {
            items.push({ valueAsString: minutesToTimeString(i), valueAsMinutes: i });
        }

        return items.map((item) => {
            return <div key={item.valueAsMinutes} onClick={() => { onValueChange(item); setVisibility(false) }} className={`time-picker-item ${item.valueAsMinutes === currentValue ? "active" : ""}`} tabIndex="0">
                <span>{item.valueAsString}</span>
            </div>
        })
    }
    return (
        <div className={`time-picker-container ${visibility ? "" : "hidden"}`}  ref={timeRef}>
            {renderTimePicker()}
            {/* <div className="time-picker-item" tabIndex="0">
                <span>12:00am</span>
            </div>
            <div className="time-picker-item">
                <span>12:30am</span>
            </div>
            <div className="time-picker-item">
                <span>12:30am</span>
            </div>
            <div className="time-picker-item">
                <span>12:30am</span>
            </div>
            <div className="time-picker-item">
                <span>12:30am</span>
            </div>
            <div className="time-picker-item">
                <span>12:30am</span>
            </div> */}
        </div>
    );
};


