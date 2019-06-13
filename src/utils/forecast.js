const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/7abeb1bc300c6a55a49bb17a862ba0fd/' + latitude + ',' + longitude//encodeURIComponent(latitude) + ',' + encodeURIComponent(longitude)//37.8267,-122.4233'
    request({url, json:true}, (error, {body}) => {
        if (error) {
            callback('Unable location', undefined)
        } else if (body.error) {
            callback('Unable location', undefined)
        } else {
            callback(undefined, body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degress out. There is a ' + body.currently.precipProbability + '% chance of rain.')
        }
    })
}

module.exports = forecast