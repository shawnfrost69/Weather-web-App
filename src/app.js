const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000
// paths for express config

const pathtopublicdir = path.join(__dirname, '../public')
const viewspath = path.join(__dirname, '../templates/views')
const partialspath = path.join(__dirname, '../templates/partials')


//setup handlebars engine and views engine
app.set('view engine', 'hbs')
app.set('views', viewspath)
hbs.registerPartials(partialspath)

//setup static directory to serve
app.use(express.static(pathtopublicdir))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'AKASH VERMA'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me!',
        name: 'AKASH VERMA'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        message: 'This will help you in case you get stuck !!',
        title: 'Help Page',
        name: 'AKASH VERMA'

    })
})

//using the pre made functions to do the tasks of geocoding and weather forecasting..
app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({ error: 'Please provide a search address!!' })
    }
    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        } forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Help not found!',
        name: 'AKASH VERMA',
        errmessage: 'Help document not found'
    })
})

//404 handling 
app.get('*', (req, res) => {
    res.render('404', {
        title: '404 Page',
        name: 'AKASH VERMA',
        errmessage: 'Page not found!'
    })
})


//for server starting at a port
app.listen(port, () => {
    console.log('Server up and running at port' + port)
})

