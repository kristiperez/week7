const express = require('express')
const router = express.Router()

const Movie = require('../models/movies')
let movies = []
//localhost:3000/movies
router.get('/',(req,res) => {
    res.render('movies',{movies:movies})
})
//localhost:3000/movies/add-movie
router.get('/add-movie',(req,res) => {
    res.render('addMovie')
})
//localhost:3000/movies/add-movie
router.post('/add-movie',(req,res) => {
    //req.body.title needs to match what is in the mustache page
    let title = req.body.title
    let description = req.body.description
    let genre = req.body.genre
    let posterURL = req.body.posterURL
    console.log(req.body)

    let movie = new Movie(title,description, genre,posterURL)
    movies.push(movie)
    res.redirect('/movies')
})

//localhost:3000/movies/delete-movie
router.post('/delete-movie',(req,res) => {
    let movieTitle = req.body.movieTitle
    movies = movies.filter(movie => {
        return movie.title != movieTitle
    })
    res.redirect('/movies')
})
//local host:3000/movies/movies
router.get('/movies',(req,res) => {
    res.render('movies',{movies:movies})
})
//localhost:3000/movies/confirm
// router.get('/confirm',(req,res) => {
//     res.render('confirm')
// })

module.exports = router

