const path = require('path'); //NodeJS core module to manipulate paths
const express = require('express'); //ExpressJS NPM module
const hbs = require('hbs');

/*Loading in our weather app modules!*/
const request = require('request');
const geoCoding = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express(); //Express itself is a function which we initialise to a variable which we name 'app'
const port = process.env.PORT || 3000;
//Setting up a port variable which takes in the dynamic port value which Heroku provides. The port variable takes
//in a default value of 3000 too, so that our app can run on our local machine without any issues.


/*Configuring paths for Express*/
const publicStaticDirectory = path.join(__dirname, '..', 'public');
//path.join() manipulates the directory to point to our public folder
//__dirname is the directory to this file's folder (src)
const viewsPath = path.join(__dirname, '../templates/views');
//viewsPath now points to the views folder in the templates folder
const partialsPath = path.join(__dirname, '../templates/partials');
//partialsPath now points to the partials folder in the templates folder

/*Setup Handlebars engine & view location*/
app.set('view engine', 'hbs');
//Links to the Handlebars NPM module and the views folder to access handlebars files to serve up dynamic 
//pages instead of static HTML pages
app.set('views', viewsPath);
//Allows Express to search for the views folder in the template folder which we defined in viewsPath instead
// of finding a 'views' folder in the web-server folder in its default configuration
hbs.registerPartials(partialsPath);
//Allows Handlebars to take in partials files


/*Setup a static directory to serve*/
app.use(express.static(publicStaticDirectory));
//Basically allows our app to have access to our public folder and display its static assets 
//(Eg. CSS, JS, HTML, Images)


app.get('', (req, res) => {//Renders the index.hbs file for the root page
    res.render('index', {
        title: 'Welcome to the Weather App',
        period: 'Nov 2021',
        name: 'Selwyn Ang'
    });
    //Initialising properties to act as variables in index.hbs to render dynamic content
})

app.get('/about', (req, res) => { 
    //Note that setting '/about' to be the path to the about.hbs file will result in the URL being 
    //localhost:3000/about, NOT localhost:3000/about.hbs, NOT localhost:3000/about.html
    res.render('about', {
        title: 'About Me',
        period: 'Nov 2021',
        name: 'Selwyn Ang',
    });
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        period: 'Nov 2021',
        name: 'Selwyn Ang',
        engine: 'Weather Stack'
    });
})

app.get('/weather', (req, res) => {
    //To check if the HTTP request from the client has a query value of 'address'
    if (!req.query.address) {
        return res.send({
            error: 'No address provided. Try again!'
        })
    }
    geoCoding(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({error});
        } else {
            forecast(latitude, longitude, (error, forecastData, icon) => {
                if (error) {
                    return res.send({error});
                } else {
                    res.send({
                        location,
                        forecast: forecastData,
                        icon,
                        address: req.query.address
                    })
                }
            });
        }
    });
})

/*For 404 error handling pages*/
//404 related code should be written after the named pages as Express reads the code sequentially.
//If error code is written in between or before named pages, the named pages will render the 404page hbs file instead
app.get('/help/*', (req, res) => { 
    // Adding * after /help will only render the content below if the URL is specific to help
    res.render('404page', {
        title: '404 Page',
        period: 'Nov 2021',
        error: 'Help article cannot be found!'
    })
})
// /example/* code should come before * as * encompasses all of the random pages
app.get('*', (req, res) => {
    // * is for any other random page typed into the URL
    res.render('404page', {
        title: '404 Page',
        period: 'Nov 2021',
        error: 'Page not found.'
    })
})


/*Final step to setup the web server*/
app.listen(port, () => {
    console.log('Server is up and running on port ' + port + '!');
})
//"On" the web server and allows it to run