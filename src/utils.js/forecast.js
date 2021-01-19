const request = require('request')

const forecast = ({longitude, latitude}, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=17671a76f7761cd8241509f3c5f31ed0&query=' + longitude + ',' + latitude;
    console.log('url', url);
    request({ url, json: true}, (error, {body}) => {
        if(error){
            callback('Unable to connect to weather service: '+ error.code, undefined);
        }else if(body.error) {
            callback('Unable to find to location: '+ response.body.error.code, undefined);
        } else {
            const currentData = body.current;
            // console.log(currentData.weather_descriptions[0])
            callback(undefined, `${currentData.weather_descriptions[0]}: It is currently ${currentData.temperature} Fahrenheit out. It feels like ${currentData.feelslike} Fahrenheit out`);
            // console.log(response);
        }
    })
}

module.exports = forecast;
