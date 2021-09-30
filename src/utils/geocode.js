const request = require('request')
const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoicGtoYXJiYW5kYSIsImEiOiJja3N3bHQzNGwweXdoMnh0N284ZW9kOWxjIn0.f9v-KwPduzJ8DB6363SlgQ&limit=1'
    
    request({url:url, json:true},(error,response) => {
        if (error){
            callback('unable to connect to location services',undefined)
        } else if (response.body.features.length === 0) {
            callback('unable to find location try another search',undefined)
    
        } else {
            callback(undefined,{
               lattitude: response.body.features[0].center[0],
               longitude: response.body.features[0].center[1],
               location: response.body.features[0].place_name
            })
        }
    })
    }
module.exports = geocode    
    