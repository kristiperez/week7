const express = require('express')
const router = express.Router()

const Trip = require('../models/trips')

router.get('/add-trip',(req,res) => {
    res.render('addTrip')
})

router.post('/add-trip',(req,res) => {
    let cityName = req.body.cityName
    let departDate = req.body.departDate
    let returnDate = req.body.returnDate
    let imageURL = req.body.imageURL
    let userName = req.session.username
    console.log(req.body)

    //let trip = {name:cityName, departDate:departDate, returnDate:returnDate}
    let trip = new Trip (cityName,departDate,returnDate,imageURL, userName)
    trips.push(trip)
    console.log(trips)

    res.redirect('/trips/my-trips')
})

router.get('/my-trips', (req,res) => {
    let userName = req.session.username
    let myTrips = trips.filter(trip => {
        return trip.userName == userName
    })

    res.render('my-trips',{trips:myTrips})
})

router.post('/delete-trip',(req,res) => {
    let tripName = req.body.tripName
    //filter is going to filter out the trip
    trips = trips.filter(trip => {
        return trip.cityName != tripName
    })
    res.redirect('/trips/my-trips')
})

router.get('/',(req,res) => {
    //says to render the page called 'trips, the second arguement {trips:trips} is passing an object to the page in the form of a key value pair
    //the key can be anything the value is the tips array in this case
    res.render('trips',{trips:trips})  
})

module.exports = router