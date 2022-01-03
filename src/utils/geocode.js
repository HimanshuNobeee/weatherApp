const request = require('request')

const geocode = (address,callback)=>{
    const url2 = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoiZ3VwdGFoaW0xOTk5IiwiYSI6ImNrcno5am9qZTBiZHEyb3BqeTBscXM2aTUifQ.LFRE6LH5IH9F95NmV8DASg&limit=1'

    request({url:url2,json:true},(error,{body}={})=>{
        if(error){
            callback('unable to connect to location services!',undefined)
        }else if(body.features.length===0){
            callback('unable to find location Try another search')
        }else {
            callback(undefined,{
            latitude :body.features[0].center[1] ,
            longitude : body.features[0].center[0],
            location : body.features[0].place_name,
           // log(latitude)
            })
        }
    })
}

module.exports = geocode