// require initializes something
const express = require('express')
const mustacheExpress = require('mustache-express')
const app = express()
const path = require('path')
const Trip = require('./models/trips')
const http = require('http').createServer(app)
const tripsRouter = require('./routes/trips')

// express session
const session = require('express-session')
//create socket io instance
const io = require('socket.io')(http)
// initialize session 
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
  }))

  app.all('/trips/*', authenticate)

//app.use(express.json()) --> used to send json to server
app.use(express.urlencoded())
app.use('/trips',tripsRouter)
app.use(express.static('static'))
app.use(express.static('public'))
const VIEWS_PATH = path.join(__dirname,'/views')
///Users/kristiperez/Documents/DigitalCrafts/Assignments-by-week/week-7/trips-enhanced/views
console.log(VIEWS_PATH)
//app.engine('mustache',mustacheExpress()) this is same as below
//tell express to use mustache templating engine
app.engine('mustache',mustacheExpress(VIEWS_PATH + '/partials','.mustache'))
//the pages are located in views directory
app.set('views',VIEWS_PATH)
//above is the same as below...
//app.set('views','./views')
app.set('view engine','.mustache')

let users = [{username:'elliotte', password:'password'}] 
global.trips = []

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

io.on('connection',(socket) => {
    console.log("You are connected via socket...")

    socket.on('Trips App', (message) => {
        console.log(message)

        //send message back to the client
        io.emit('Trips App', message)
    })
})


app.get('/',(req,res) => {
    res.render('index')
})

app.get('/chat', authenticate,(req,res) => {
    res.render('chat',{username:req.session.username})
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
            res.redirect('/trips/my-trips')
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

http.listen(3000, () => {
    console.log('Server has started.....')
})
