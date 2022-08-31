import { _HourlySchedule } from "./HourlySchedule.js"
import { convertHourToMinuteInteger, convertMinuteToHourlyString } from "./lib.js"

export class _DailySchedule{
    constructor(day,initialTurns,startingHour,endingHour){
        this._day = day
        this._initialTurns = initialTurns
        this._startingHour = startingHour
        this._endingHour = endingHour
        this._turns = []
        this._initDailySchedule()
    }

    _initDailySchedule(){
        const endingMinutes = convertHourToMinuteInteger(this._endingHour)
        const startingMinutes = convertHourToMinuteInteger(this._startingHour)
        const lengthInMinutes = endingMinutes - startingMinutes
        const minutesPerTurn = lengthInMinutes / this._initialTurns

        for(let i = 0; i<this._initialTurns; i++){
            const hourlyString = convertMinuteToHourlyString(startingMinutes + (minutesPerTurn * i))
            const newHourlySchedule = new _HourlySchedule(hourlyString,true)
            this._turns.push(newHourlySchedule)
        }
    }

    _appendTurn(hour){
        const newHourlySchedule = new _HourlySchedule(hour,true)
        this._turns.push(newHourlySchedule)
    }

    _takeTurn(hour){
        const searchedTurn = this._turns.find((turn)=>{return turn._hour == hour})
        searchedTurn._makeAvailable(false)
    }

    _unTakeTurn(hour){
        const searchedTurn = this._turns.find((turn)=>{return turn._hour == hour})
        searchedTurn._makeAvailable(true)
    }
}