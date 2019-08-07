
//require means we will be using the specific module
//node syntax saying..I want to use express
const express = require('express')

// creating an instance of express module
const app = express()
//console.log(app)
const cors = require('cors')
const bodyParser = require('body-parser')
// this array will hold all the todos
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
    //taskName and taskPriority are strings
    let taskName = req.body.taskName
    let taskPriority = req.body.taskPriority
    //create an annonymous task object. here you are creating an object called task
    //name and priority are properties of the object task
    let task = {name:taskName, priority:taskPriority}

    todos.push(task)
    // console.log(taskName)
    // console.log(priority)
    res.send(todos)  //don't send strings back to client. client needs to receive json
})

//localhost:3000/todos (DELETE)
// app.delete('/todos', (req,res) => {
// })

//localhost:3000/todos (GET)
app.get('/todos',(req,res) => {
    res.json(todos)
})

//port is 3000, could be 3001 or any other 4 digit number but use 3000 as convention
app.listen(3000,() => {
    console.log("Server is running...")
})