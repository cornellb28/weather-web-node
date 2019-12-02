const request = require('request')
// Example of Callbacks
const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiY29ybmVsbGIyOCIsImEiOiJjazNhaG80M20wZTRiM2JwMWR4emw4c2NtIn0.I_uxdCDJ9i6n_YCHxgcF7g&limit=1'
    request({ url: url, json: true }, (error, response) => {
        if(error) {
            callback('Unable to connect with location services!', undefined)
        } else if (response.body.features.length === 0) {
            callback('Unable to find Location. Try another search!', undefined)
        } else {
            callback(undefined, {
                latitude: response.body.features[0].center[1],
                longitude: response.body.features[0].center[0],
                location: response.body.features[0].place_name
            })
        }
    })

}

module.exports = geocode