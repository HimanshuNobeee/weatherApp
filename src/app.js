const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forcast = require('./utils/forcast')

//define path for Express config
const dir = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

const app = express()

//Setup handlerbars engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(dir))

app.get('',(req,res)=>{
    res.render('index',{
        title : 'Weather ',
        name : 'Himanshu Gupta'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title: 'About Me',
        name : 'Himanshu Gupta'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        helpText : 'this is the help page',
        title : 'Help',
        name: 'Himanshu Gupta'
    })
})
 
app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error : 'you must provide an address'
        })
    }
    geocode(req.query.address,(error,{latitude,longitude,location }={})=>{
        if(error){
            return res.send({error})
        }
        forcast(latitude,longitude,(error,fdata)=>{
            if(error){
                return res.send({error})
            }
                res.send({
                    forcast : fdata,
                    location,
                    address : req.query.address
                })
        })
    })
})

app.get('/products',(req,res)=>{
    if(!req.query.search){
    return res.send({
        Error : 'you must provide a search term'
    })
    }
    console.log(req.query.search)
    res.send({
        products : []
    })
})


app.get('/help/*',(req,res)=>{
    res.render('404',{
        title : '404 Errr',
        name : 'Himanshu Gupta',
        errorMessage : 'Help article not found.'
    })
})


app.get('*',(req,res)=>{
    res.render('404',{
        title : '404 Error',
        name: 'Himanshu Gupta',
        errorMessage : 'page not found'
    })
})

app.listen(3000,()=>{
    console.log('server is up on port 3000.')
})