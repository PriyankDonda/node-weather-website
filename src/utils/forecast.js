const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + encodeURIComponent(latitude) + '&lon=' + encodeURIComponent(longitude) + '&units=metric&exclude=minutely&appid=' + process.env.APP_ID

    request({ url, json: true }, (error, {body}) => {
        if(error){
            callback('unable to connect weather service',undefined)
        }else if(body.message){
            callback('unable to search',undefined)
        }
        else{
            callback(undefined, 'It is currently '+body.current.temp+' degrees out there. \n Pressure is ' + body.current.pressure + ' hPa. \n Humidity is ' + body.current.humidity + ' %. Cloudiness ' + body.current.clouds + ' %. \n UV index is ' + body.current.uvi + '. \n todays maximum temp is ' + body.daily[0].temp.max + ' degrees and minimum temp is '+ body.daily[0].temp.min + ' degrees.')
            // callback(undefined, `It is currently ${body.current.temp} degrees out there. \n Pressure is ${body.current.pressure} hPa \n Humidity is ${body.current.humidity} % Cloudiness ${body.current.clouds} % \n`)
        }
    })
}

module.exports = forecast