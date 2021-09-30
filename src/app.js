const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

//define paths for express config
const PublicDiectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')
//app.use(express.static(path.join(__dirname,'../public')))
//setup handlebars engine and location
app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)


//setup static diretory to serve
app.use(express.static(PublicDiectoryPath))

app.get('', (req,res) => {

    res.render('index', {
        title: 'Weather APP',
        name: 'Puneet Kharbanda'
    })
})

app.get('/about', (req,res) => {

    res.render('about', {
        title: 'ABOUT ME',
        name: 'Puneet Kharbanda'
    })
})

app.get('/help', (req,res) => {

    res.render('help', {
        title: 'We are here to help',
        name: 'Puneet Kharbanda'
    })
})

app.get('/weather',(req,res) => {
    if (!req.query.address) {
        return res.send({
            error: 'you must provide an address !'
        })
    }
    geocode(req.query.address, (error, {latitude,longitude, location} = {}) => {
        if (error) {
            return res.send({ error})
        }

        forecast(latitude,longitude,(error, forecastData) => {
            if (error) {
                return res.send({error})
            }
            res.send({
             forecast: forecastData,
             location,
             address: req.query.address   
            })

        })
    })
      //res.send({
        //forecast: 'It is snowing',
        //location: 'PA',
        //address: req.query.address
     //})
    })

app.get('/products', (req,res) => {
    if (!req.query.search){
        return res.send({
                error: 'you must provide search terms'
        })
    }
    console.log(req.query.test)
    res.send({
        products: []
    })
})
app.get('/help/*', (req,res) => {
 res.render('404',{ 
error: 'Help article not found'
 })
})

app.get('*', (req,res) => {

    res.render('404',{
        title: 404,        
        error: 'Page Not Found.'
    })

})


app.listen(3000,() => {
    console.log('Server is running on port 3000.')
})