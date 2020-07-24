/**
 *
 * @param {String} time Format "XX:XXA/P" i.e. "12:00p"
 */
export function timeStringToMinutes(time) {
    /* Check if format is correct */

    // if (time.charAt(2) !== ":") {
    //     console.log("FORMAT ERROR");
    //     return;
    // }

    // if (
    //     time.charAt(5).toLowerCase() !== "a" &&
    //     time.charAt(5).toLowerCase() !== "p"
    // ) {
    //     console.log("FORMAT ERROR");
    // }
    let minutes = 0;
    if (time.length === 7) {
        

        let hour = time.slice(0, 2);

        minutes += 60 * Number.parseInt(hour);
        let minute = time.slice(3, 5);

        if (minute === "00") {
            minute = 0;
        }

        minutes += Number(minute);
        // console.log(time.slice(3, 5))
        if (time.charAt(5).toLowerCase() === "p" && hour !== "12") {
            minutes += 720;
        } else {
            if (hour === "12" && time.charAt(5).toLowerCase() === "a")
                minutes -= 720;
        }

    } else if (time.length === 6) {
        // let minutes = 0;

        let hour = time.slice(0, 1);

        minutes += 60 * Number.parseInt(hour);
        let minute = time.slice(2, 4);

        if (minute === "00") {
            minute = 0;
        }

        minutes += Number(minute);
        // console.log(time.slice(3, 5))
        if (time.charAt(4).toLowerCase() === "p" && hour !== "12") {
            minutes += 720;
        } else {
            if (hour === "12" && time.charAt(4).toLowerCase() === "a")
                minutes -= 720;
        }

        
        
    }

    return minutes;
}
export function minutesToTimeString(minutes) {
    let hour = Math.floor(minutes / 60);
    let period = "am";

    
    if (hour === 24) {
        hour = 12;
    } else if (hour === 12){
        period = "pm";
    } else if (hour === 0) {
        hour = 12;
    } else if (hour > 12) {
        hour -= 12;
        period = "pm";
    }

    let minute = minutes % 60;
    let leadingZero = "";
    if (minute < 10) {
        leadingZero = "0";
    }


    return `${hour}:${leadingZero}${minute}${period}`;
}
