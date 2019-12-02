// path to find files in your folder
const path = require('path')
// Activate Epress framework
const express = require('express')
// Activate handlebar
const hbs = require('hbs')
// The Request Function in src/utils
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

// init express and called it "app"
const  app = express()

// Define path. Express Config
const publicDirPath = path.join(__dirname, '../public/')
const viewsPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')

// Setup handlebar views location 
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialPath)

// Setup static directory to serve
app.use(express.static(publicDirPath))

// app.com
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App Home',
        name: 'Cornell Benson'
    })
})

// app.com/about 
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'Weather App on About',
        name: 'Bailey Benson'
    })
})

// app.com/about 
app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Section',
        name: 'Cornell Benson'
    })
})

// app.com/about 
app.get('/weather', (req, res) => {
    if(!req.query.address) {
        // make sure the action stops for error messages
        return res.send({
            error: 'You must provide an address!'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if(error) {
            return res.send({ error })
        }
        
        forecast(latitude, longitude, (error, forecastData) => {
            if(error) {
                return res.send({ error }) 
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    }) // end geocode
}) // end app

app.get('/products', (req, res) => {

    if(!req.query.search) {
        return res.send({
            error: 'You mut provide a search term.'
        })
    }
    console.log(req.query.search) // returns 
    res.send({
        products: []
    })
})

// app.com/help
app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Cornell Benson',
        errorMessage: 'Help article not found.'
    })
})

// app.com/help
app.get('*', (req, res) => {
    res.render('404', {
        errorMessage: 'We Could not find your page. Try again',
        name: 'Cornell Benson',
        title: '404'
    })
})


app.listen(3000, () => {
    console.log('Server Up. 3000')
})