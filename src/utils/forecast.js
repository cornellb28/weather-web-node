const request = require('request')
// Example of Callbacks
const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/c70b57db032dfd76d3fc514c7a6e6276/' + latitude + ',' + longitude
    
    request({ url: url, json: true }, (error, { body }) => {
        if(error) {
            callback('Unable to connect with weather services!', undefined)
        } else if (body.error) {
            callback('Unable to find Location. Try another search!', undefined)
        } else { 
            
            callback(undefined, body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degress out. There is a ' + body.currently.precipProbability + '% chance of rain.')
        }
    })

}

module.exports = forecast