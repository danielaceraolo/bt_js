// Parses an hourly string into minutes integer
/**
* @param {"HH:MM"} hourlyString 
* @returns number
*/
export function convertHourToMinuteInteger(hourlyString){
    const parseTime = hourlyString.split(":")
    const totalMinutes = parseInt((parseTime[0]*60)) + parseInt(parseTime[1])
    return totalMinutes
}

// Parses a minute string into an hourly string
/**
* @param {"number"} minuteString
* @returns "HH:MM"
*/
export function convertMinuteToHourlyString(minuteString){
    const minutes = minuteString % 60 < 10 ? "0" + minuteString % 60 : minuteString % 60
    const hours = (minuteString - minutes) / 60 < 10 ? "0" + (minuteString - minutes) / 60 : (minuteString - minutes) / 60
    const hourlyString = hours + ":" + minutes

    return hourlyString
}

// Parses a date into a date string
/**
* @param {Date} date
* @returns "YYYY-MM-DD"
*/
export function convertDateToString(date){
    const newDate = date.toISOString().split("T")
    return newDate[0]
}

// Parses a date into a date string
/**
* @param {"YYYY-MM-DD"} dateString
* @returns Date
*/
export function convertStringDateToDate(dateString){
    const GMT = "T00:00:00"
    const newDate = new Date(dateString + GMT)
    return newDate
}
