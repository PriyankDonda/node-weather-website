const request = require('request')
require('dotenv').config()

const geocode = (address,callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token='+ process.env.ACCESS_TOKEN +'&limit=1'
    console.log(url)
    request({ url, json: true}, (error, {body}) => {
        if(error){
            callback('unable to connect to mapbox', undefined)
        }else if(body.features.length === 0){
            callback('unable to find location. please try another search!', undefined)
        }else{
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode