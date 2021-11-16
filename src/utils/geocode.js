const request = require('request');

const geoCoding = (name, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURI(name) + '.json?limit=1&access_token=pk.eyJ1Ijoic2Vsd3luYW5nIiwiYSI6ImNrdnQ0eXFvOTJ0Z3oycm91a2UyMWxwc3IifQ.03kIzGVqpspF6ClGt4FaBg';
    request({url, json: true}, (error, {body}) => {
        if (error) {
            callback("Unable to connect to geogtagging services.", undefined);
        } else if (body.features.length === 0) {
            callback("Unable to find location. Please try again!", undefined);
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            });
        }
    });
}

module.exports = geoCoding;