
//require means we will be using the specific module
//node syntax saying..I want to use express
const express = require('express')

// creating an instance of express module
const app = express()
//console.log(app)
const cors = require('cors')
const bodyParser = require('body-parser')

// ths array will hold all the todos
let todos = []

// app.use mean you are using middleware
app.use(cors())
//set up body parser so it can parse the body of HTTP request
app.use(bodyParser.json())

//create a root url
app.get('/',(req, res) => {
    res.send("Hello Root!")
})

//localhost:3000/todos (POST)
app.post('/todos', (req, res) => {
    //this says you need to send an item with key of taskName
    let taskName = req.body.taskName
    let priority = req.body.priority
    let dateCreated = req.body.dateCreated
    let dateCompleted = req.body.dateComplted
    let isCompleted = req.body.isCompleted
    console.log(taskName)
    console.log(priority)
    res.send("Got it")
})

//localhost:3000/todos (DELETE)
app.delete('/todos', (req,res) => {

})

//localhost:3000/todos (GET)
app.get('/todos',(req,res) => {
    let tasks = [{name: 'Wash the car'}, {name: 'Feed the dog'}]
    res.json(tasks)
})

//port is 3000, could be 3001 or any other 4 digit number but use 3000 as convention
app.listen(3000,() => {
    console.log("Server is running...")
})