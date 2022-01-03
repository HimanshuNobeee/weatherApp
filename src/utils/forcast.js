const request = require('request')


const forcast = (latitude,longitude,callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=3004a3320fa56d1c85c7edce7ebc88ad&query='+latitude+','+longitude

    request({ url, json: true }, (error, {body}={}) => {
        if (error) {
            callback('unable to connect to server')
        } else if (body.error) {
            callback('unable to find location')
        }
        else{
            // console.log(response.body.current)
            callback(undefined, 'It is currently ' + body.current.temperature + ' degree celcius in ' + body.location.name)
        }
    })
}

module.exports = forcast