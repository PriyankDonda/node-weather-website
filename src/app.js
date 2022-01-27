const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

// Define path for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)

// setup static directory to setup
app.use(express.static(publicDirectoryPath))

app.get('', (req,res) => {
    res.render('index', {
        title: 'weather app',
        name: 'priyank'
    })
})

app.get('/about', (req,res) => {
    res.render('about',{
        title: 'About Me',
        name: 'Priyank'
    })
})

app.get('/help', (req,res) => {
    res.render('help', {
        title: 'Help',
        name: 'Priyank'
    })
})

// app.get('', (req,res) => {
//     res.send('<h1>Weather</h1>')
// }) 

// app.get('/help', (req,res) => {
    // res.send({
    //     name: 'Priyank',
    //     age: 19
    // })
// })

// app.get('/about', (req,res) => {
    // res.send('<h1>About</h1>')
// })

app.get('/weather', (req,res) => {
    if(!req.query.address){
        return res.send({
            error: 'please provide address...'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = { })=> {
        if(error){
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, {temp}) =>{
            if(error){
                return res.send({
                   error
                })
            }
            return res.send({
                location,
                temp: temp,
                address: req.query.address
            })
        })
    })
    
    // res.send({
    //     forecast: 'it is raining',
    //     location: 'bhavnagar',
    //     address: req.query.address
    // })
})

app.get('/products', (req,res) => {
    if(!req.query.search){
        return res.send({
            error: 'you must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        prducts: []
    })
})

app.get('*', (req,res) => {
    res.render('404', {
        title: '404',
        name: 'Priyank',
        errorMessage: 'Page not found.'
    })
})

app.listen(3000, () => {
    console.log('server is up on port 3000.')
})