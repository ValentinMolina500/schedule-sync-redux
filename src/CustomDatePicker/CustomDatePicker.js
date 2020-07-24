import React, { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faChevronLeft,
    faChevronRight,
} from "@fortawesome/pro-solid-svg-icons";
import "./CustomDatePicker.css";

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

export default (props) => {
    const { visible = false, onDateSelected, visibilityCallback } = props;

    const onLeftButtonClick = () => {
        /* Reset selected cell */
        setSelectedCell({});

        /* Decrement current month by 1 */
        setCurrentDate(
            new Date(currentDate.setMonth(currentDate.getMonth() - 1))
        );
    };

    const onRightButtonClick = () => {
        setSelectedCell({});
        setCurrentDate(
            new Date(currentDate.setMonth(currentDate.getMonth() + 1))
        );
    };

    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedCell, setSelectedCell] = useState({});
    const dateRef = useRef(null);

    useEffect(() => {
        /**
         * Alert if clicked on outside of element
         */
        function handleClickOutside(event) {
            if (dateRef.current && !dateRef.current.contains(event.target) && visible) {
                visibilityCallback(false)
            }
        }

        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [dateRef, visible]);

    return (
        <div ref={dateRef} className={`date-picker-container ${visible ? "" : "hidden"}`}>
            <div className="date-picker-top-bar">
                <div className="month-heading">{getMonth(currentDate.getMonth())}&nbsp;{currentDate.getFullYear()}</div>
                <FontAwesomeIcon icon={faChevronLeft} onClick={onLeftButtonClick}/>
                <FontAwesomeIcon
                    style={{ marginLeft: "1rem" }}
                    icon={faChevronRight}
                    onClick={onRightButtonClick}
                />
            </div>
            <div className="date-grid">
                <div className="dp-cell dp-c-1 dp-month">Sun</div>
                <div className="dp-cell dp-c-2 dp-month">Mon</div>
                <div className="dp-cell dp-c-3 dp-month">Tue</div>
                <div className="dp-cell dp-c-4 dp-month">Wed</div>
                <div className="dp-cell dp-c-5 dp-month">Thu</div>
                <div className="dp-cell dp-c-6 dp-month">Fri</div>
                <div className="dp-cell dp-c-7 dp-month">Sat</div>

                {renderDatePicker(
                    currentDate,
                      onDateSelected,
                    selectedCell,
                    setSelectedCell,
                      visibilityCallback
                )}
            </div>
        </div>
    );
};

function getMonth (month) {
    return months[month];
  }
/**
 *
 * @param {Date} currentDate
 * @param {Function} onDateSelected
 * @param {*} selectedCell
 * @param {*} setSelectedCell
 */
function renderDatePicker(
    currentDate,
    onDateSelected,
    selectedCell,
    setSelectedCell,
    visibilityCallback
) {
    /* Set iterator to first day of current month */
    const iteratorDate = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        1
    );
    const currentMonth = currentDate.getMonth();

    const prevMonthDate = new Date(iteratorDate);
    const nextMonthDate = new Date(iteratorDate);
    prevMonthDate.setMonth(prevMonthDate.getMonth() - 1);
    nextMonthDate.setMonth(nextMonthDate.getMonth() + 1);

    /* Iterator set to first day of the week of the first day of the month
     *
     * E.g if first day of the month is Wednesday, June 1st, iterator will
     * be set to Sunday, May 29th
     */
    iteratorDate.setDate(iteratorDate.getDate() - iteratorDate.getDay());

    /* Dates that will be rendered for the current month */
    const dates = [];

    /* Calculate current dates to display  */
    while (
        isIteratorDateInPreviousMonth(iteratorDate, prevMonthDate) ||
        isIteratorDateInNextMonth(iteratorDate, nextMonthDate) ||
        iteratorDate.getMonth() === currentMonth
    ) {
        dates.push(new Date(iteratorDate));
        iteratorDate.setDate(iteratorDate.getDate() + 1);
    }

    return dates.map((date) => {
        return (
            <div
                key={date.getTime()}
                onClick={(e) => {
                    e.preventDefault();
                    /* Dates not within current month are not selectable */
                    if (!isDateCellSelectable(date, currentMonth)) return;

                    /* Set cell as selected */
                    setSelectedCell({
                        [date.getTime()]: {
                            isSelected: true,
                        },
                    });

                    visibilityCallback(false);

                    onDateSelected(formatDate(date));
                }}
                className={[
                    "dp-cell",
                    `dp-c-${date.getDay() + 1}`,
                    applySelectedDateStyles(date, currentMonth, selectedCell),
                ].join(" ")}
            >
                <div
                    className={
                        isDateCellSelectable(date, currentMonth)
                            ? ""
                            : "dp-text-muted"
                    }
                >
                    {date.getDate()}
                </div>
            </div>
        );
    });
}

function formatDate(date) {
    return `${days[date.getDay()]}, ${months[date.getMonth()]} ${date.getDate()}`;
}
/**
 *
 * @param {Date} iterator The current iterator
 * @param {Date} prevMonth The previous month
 * @returns {boolean}
 */
function isIteratorDateInPreviousMonth(iterator, prevMonth) {
    if (prevMonth.getMonth() === iterator.getMonth()) {
        return true;
    }

    return false;
}

/**
 *
 * @param {Date} iterator The current iterator
 * @param {Date} nextMonth The next month
 *
 * @returns {boolean}
 */
function isIteratorDateInNextMonth(iterator, nextMonth) {
    if (
        nextMonth.getMonth() === iterator.getMonth() &&
        iterator.getDay() !== 0
    ) {
        return true;
    }

    return false;
}

function applySelectedDateStyles(currentDate, currentMonth, selectedCell) {
    if (
        isDateCellSelectable(currentDate, currentMonth) &&
        selectedCell[currentDate.getTime()] !== undefined &&
        selectedCell[currentDate.getTime()].isSelected === true
    ) {
        return "dp-cell-selected";
    }

    return "";
}

function isDateCellSelectable(currentDate, currentMonth) {
    const now = new Date();

    if (currentDate.getMonth() === now.getMonth()) {
        if (currentDate.getDate() >= now.getDate()) {
            return true;
        } else {
            return false;
        }
    }

    if (currentDate.getMonth() === currentMonth) {
        return true;
    }

    return false;
}
