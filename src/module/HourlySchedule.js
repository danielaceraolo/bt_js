export class _HourlySchedule{
    constructor(hour,available){
        this._hour = hour
        this._available = available
    }
    _makeAvailable(boolean){
        this._available = boolean
    }
}