const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const path = require('path')
const express = require('express')
const hbs = require('hbs')

const app = express()

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views', viewsPath)//customize views folder name
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'ChaeEun'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'ChaeEun'
    })
})

app.get('/help', (req,res) => {
    res.render('help', {
        helpMessage: 'helpful message',
        title: 'Help',
        name: 'ChaeEun'
    })
})

/*When someone access homepage and gives request, return answer
app.get('',(req, res) => {
    res.send('<h1>Weather</h1>')//html
})

app.get('/help', (req, res) => {
    // res.send({
    //     name: 'ChaeEun',
    //     age: 23
    // })//json
    res.send([{
        name: 'ChaeEun'
    }, {
        name: 'ChaeYoon'
    }])//json
})

app.get('/about', (req, res) => {
    res.send('<h1>About Page</h1>')
})*/

app.get('/weather', (req, res) => {
    if (!req.query.address){
        return res.send({
            error: 'You must provide an address term'
        })
    }

    const address = req.query.address
    geocode(address, (error, {latitude, longitude, location} = {}) => {
        if (error){
            return res.send({error})
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return  res.send({error})
            }
            res.send({
                forecast: forecastData,
                location,
                address        
            })
        })
    })
})

app.get('/products', (req,res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req,res) => {
    res.render('404', {
        title: '404',
        name: 'ChaeEun',
        errorMessage: 'Help article not found.'
    })
})

app.get('*',(req, res) => {
    res.render('404', {
        title: '404',
        name: 'ChaeEun',
        errorMessage: 'Page not found.'
    })
})

//start up server and listen to specific port
app.listen(3000, () => {
    console.log('Server is up on port 3000')//never shown on browser 
})