const request = require('request')
const forecast = (longitude, lattitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=b1385ba096736bf0ec624d3295f3d625&query='+ lattitude+ ',' + longitude +'&units=f'
    
    request({url:url, json:true},(error,response) => {
        if (error){
            callback('unable to connect to weather services',undefined)
        } else if (response.body.error) {
            callback('unable to find location ',undefined)
    
        } else {
            callback(undefined,response.body.current.weather_descriptions[0] + ". it is currently "+ response.body.current.temperature + " degrees out. feels like " + response.body.current.feelslike+" degrees out.")
        }
    })
    }
module.exports = forecast    
    