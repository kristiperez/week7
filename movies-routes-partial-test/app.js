
const express = require('express')
const app = express()
const path = require('path')
const mustacheExpress = require('mustache-express')

const moviesRouter = require('./routes/movies')

app.use(express.urlencoded())
app.engine('mustache',mustacheExpress())
app.set('views', './views')
app.set('view engine', 'mustache')

const Movie = require('./models/movies')

//let movies = []
//this is the only thing you need to add to use images from your server at the root level
app.use(express.static('images'))
app.use('/movies',moviesRouter)
// app.use('/',moviesRouter)

// const VIEWS_PATH = path.join(__dirname,'/views')
// console.log(__dirname)


app.get('/',(req,res) => {
    res.render('movies')
}) 


app.get('/api/movies',(req,res) => {
    res.json(movies)
})

//start the express node server
app.listen(3000, () => {
    console.log('server is running....')
})