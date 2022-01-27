const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + encodeURIComponent(latitude) + '&lon=' + encodeURIComponent(longitude) + '&exclude=daily,minutely&appid=9c6954d79680efb07b3b4bf7ab95c55a'

    request({ url, json: true }, (error, {body}) => {
        if(error){
            callback('unable to connect weather service',undefined)
        }else if(body.message){
            callback('unable to search',undefined)
        }
        else{
            callback(undefined, {
                timezone: body.timezone,
                temp: body.current.temp
            })
        }
    })
}

module.exports = forecast