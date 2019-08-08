
const express = require('express')
const app = express()
const mustacheExpress = require('mustache-express')

app.use(express.urlencoded())
app.engine('mustache',mustacheExpress())
app.set('views','./views')
app.set('view engine','mustache')
//this is the path to the file that contains the class
const Trip = require('./models/trips')
let trips = []

app.get('/',(req,res) => {
    let trip = {name: "NYC", departDate:"05/15/2019", returnDate: "05/20/2109"}
    res.render('index',trip)
})

app.get('/add-trip',(req,res) => {
    res.render('addTrip')
})

app.post('/add-trip',(req,res) => {
    let cityName = req.body.cityName
    let departDate = req.body.departDate
    let returnDate = req.body.returnDate
    console.log(req.body)

    //let trip = {name:cityName, departDate:departDate, returnDate:returnDate}
    let trip = new Trip (cityName,departDate,returnDate )
    trips.push(trip)

    res.redirect('/confirm')
})

app.post('/delete-trip', (req,res) => {
    let tripName = req.body.tripName
    //filter is going to filter out the trip
    trips = trips.filter(trip => {
        return trip.cityName != tripName
    })

    res.redirect('/trips')
})

app.get('/trips',(req,res) => {
    //says to render the page called 'trips, the second arguement {trips:trips} is passing an object to the page in the form of a key value pair
    //the key can be anything the value is the tips array in this case
    res.render('trips',{trips:trips})  
})

app.get('/confirm',(req,res) =>{
    res.render('confirm')
})

/*
app.get('/example-list',(req,res) => {
    let cities = ['nyc','dc','sanfran','portland']
    res.render('example-list',{cities:cities})
})
*/
app.listen(3000, () => {
    console.log('Server has started...')
})