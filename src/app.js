const express = require('express');
const forecast = require('./utils.js/forecast');
const geocode = require('./utils.js/geocode');
const path = require('path');
const hbs = require('hbs');
const app = express();

const port = process.env.PORT || 3009;

// Define paths for express config
const publicDirectory = (path.join(__dirname, '../public'));
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Set up static directory to serve
app.use(express.static(publicDirectory));

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Sharron'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Sharron'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Sharron'
    });
});

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'Please provide loaction'
        });
    } else {
        geocode(req.query.address, (error, data) => {
            if(error) {
                console.log('gonna throw error now', error);
                return res.send(error);
            }
            
            forecast(data, (error, forecastData) => {
                console.log('Also Im here');
                if(error) {
                    console.log('next error');
                    return res.send(error);
                }
        
                res.send({
                    forecast: forecastData,
                    location: data.location,
                    address: req.query.address
                    });
            })
        })
    }
});

app.get('/products', (req, res) => {
    if(!req.query.search){
        return res.send({
            error: 'You must provide a search term'
        });
    }
    console.log(req.query, 'req');
    res.send({
        products: []
    });
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404 - help',
        name: 'Sharron',
        errorMessage: 'further help is not available',
    });
});

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Sharron',
        errorMessage: 'My 404 page',
    });
});

//app.com
//app.com/help
//app.com/about

app.listen(port, () => {
    console.log('Server is up on port', port);
});