const request = require('request');

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1Ijoic2hhcnJvbmEiLCJhIjoiY2todHY5Zm5kMTFvdDJxbnBpeGRpaXFtYiJ9.b2SnXMd3RnTkX8HKE3xr-A&limit=1';
    request({url, json: true}, (error, response) => {
        if(error){
            callback('Unable to connect to location service: '+ error, undefined)
        } else if(response.body.features.length === 0) {
            callback('Unable to find location. Try another search'+ error, undefined)
        } else {
            callback(undefined, {
                latitude: response.body.features[0].center[0],
                longitude: response.body.features[0].center[1],
                location: response.body.features[0].place_name
            });
        }
    })
}



module.exports = geocode;
