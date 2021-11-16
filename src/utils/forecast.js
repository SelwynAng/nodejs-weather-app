const request = require('request');

const forecast = (lat, long, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=b88dcea10ecccbf2bb5e16be7be77e8b&query=' + lat + ',' + long + '&units=m'
    request({url, json: true}, (error, {body}) => {
        if (error) {
            callback("Unable to connect to weather services.", undefined);
        } else if (body.error) {
            callback("Unable to find location. Please try again!", undefined);
        } else {
            callback(undefined, body.current.weather_descriptions[0] + 
            '. Temperature now is ' +  body.current.temperature + ' degrees. It currently feels like ' + 
            body.current.feelslike + ' degrees outside.')
        }
    })
}

module.exports = forecast;