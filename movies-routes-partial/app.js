//require means we will be using epxress module
const express = require('express')
//creates an instance of expres module
const app = express()
const path = require('path')
const mustacheExpress = require('mustache-express')

//const moviesRouter = require('./routes/movies')

// app.use means we are passing a middleware 
app.use(express.urlencoded())
app.engine('mustache',mustacheExpress())
app.set('views', './views')
app.set('view engine', 'mustache')

const Movie = require('./models/movies')

let movies = []

// app.use('/movies',moviesRouter)

app.get('/',(req,res) => {
    res.render('index')
})

app.get('/add-movie',(req,res) => {
    res.render('addMovie')
})

app.post('/add-movie',(req,res) => {
    let title = req.body.title
    let description = req.body.description
    let genre = req.body.genre
    let posterURL = req.body.posterURL
    console.log(req.body)

    let movie = new Movie(title,description, genre,posterURL)
    movies.push(movie)
    res.redirect('/confirm')
})


app.post('/delete-movie',(req,res) => {
    let movieTitle = req.body.movieTitle
    movies = movies.filter(movie => {
        return movie.title != movieTitle
    })
    res.redirect('/movies')
})

app.get('/movies',(req,res) => {
    res.render('movies',{movies:movies})
})

app.get('/confirm',(req,res) => {
    res.render('confirm')
})

app.get('/api/movies',(req,res) => {
    res.json(movies)
})

//start the express node server
app.listen(3000, () => {
    console.log('server is running....')
})