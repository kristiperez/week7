// require initializes something
const express = require('express')
const mustacheExpress = require('mustache-express')
const app = express()
const path = require('path')
const Trip = require('./models/trips')

// express session
const session = require('express-session')
// initialize session 
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
  }))

//app.use(express.json()) --> used to send json to server
app.use(express.urlencoded())

//app.engine('mustache',mustacheExpress())

const VIEWS_PATH = path.join(__dirname,'/views')
///Users/kristiperez/Documents/DigitalCrafts/Assignments-by-week/week-7/trips-enhanced/views
console.log(VIEWS_PATH)
//tell express to use mustache templating engine
app.engine('mustache',mustacheExpress(VIEWS_PATH + '/partials','.mustache'))
//the pages are located in views directory
app.set('views',VIEWS_PATH)
app.set('view engine','.mustache')
//above is the same as below...
//app.set('views','./views')

app.use(express.static('static'))
//this is the path to the file that contains the class

let users = [{username:'elliotte', password:'password'}] 
let trips = []

//create an authentication middleware
function authenticate(req,res,next) {
//if there is a session
    if(req.session) {
        //if there is a username
        if(req.session.username) {
            //perform the original request
            next()
        } else {
            res.redirect('/login')
        }
    }
}

app.get('/',(req,res) => {
    res.render('index')
})

app.get('/login',(req,res) => {
    res.render('login')
})

app.post('/login',(req,res) => {
    let username = req.body.username
    let password = req.body.password
    //look at the users array and find the user where username and password entered in html match 
    //then set that person equal to user. 
    let persistedUser = users.find(user => {
        return user.username == username && user.password == password
    })
    //if persistedUser is returned then...
    if(persistedUser) {
        // user is authenticated successfully
        if(req.session) {
            req.session.username = persistedUser.username
            res.redirect('/trips')
        }
    } else {
        //user is not authenticated successfully
        res.render('login', {message: 'Invalid username or password'})
    }
})

app.post('/register', (req,res) => {
    let username = req.body.username
    let password = req.body.password

    let user = {username:username,password:password}

    users.push(user)

    res.redirect('/login')
    console.log(users)
})

app.get('/register', (req,res) => {
    res.render('register')
})

app.get('/add-trip',(req,res) => {
    res.render('addTrip')
})

app.post('/add-trip',(req,res) => {
    let cityName = req.body.cityName
    let departDate = req.body.departDate
    let returnDate = req.body.returnDate
    let imageURL = req.body.imageURL
    let userName = req.session.username
    console.log(req.body)

    //let trip = {name:cityName, departDate:departDate, returnDate:returnDate}
    let trip = new Trip (cityName,departDate,returnDate,imageURL, userName)
    trips.push(trip)

    // if(req.session) {
    //     let name = req.session.tripName
    //     console.log(name)
    // }

    res.redirect('/trips')
})

app.get('/trips/test-app',(req,res) => {
    res.render('my-trips')
})

app.get('/trips/my-trips', (req,res) => {
    let userName = req.session.username
    let myTrips = trips.find(trip => {
        return trip.userName == userName
    })
    res.render('my-trips',{trips:myTrips})
})

app.post('/delete-trip', authenticate,(req,res) => {
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

app.get('/logout', (req,res) => {
    if(req.session) {
        req.session.destroy(error => {
            if(error) {
                next(error)
            } else {
                res.redirect('/login')
            }
        })
    }
})

app.listen(3000, () => {
    console.log('Server has started...')
})