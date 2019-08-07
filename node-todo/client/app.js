
//http://localhost:3000/todos
let taskList = document.getElementById("taskList")
let taskNameTextBox = document.getElementById("taskNameTextBox")
let priorityTextBox = document.getElementById("priorityTextBox")
let submitButton = document.getElementById("submitButton")



function populateTasks() {
    fetch('http://localhost:3000/todos')
        .then(response => response.json())
        //.then(json => console.log(json))
        .then(json => displayTasks(json))
}

function displayTasks(tasks) {
    let taskItems  = tasks.map(task => {
        return `<li>${task.name} - ${task.priority}</li>`
    })
    taskList.innerHTML = taskItems.join('')
    console.log(tasks)
}

populateTasks()

submitButton.addEventListener('click', () => {
    let taskEntered = taskNameTextBox.value
    let priorityEntered = priorityTextBox.value

    fetch('http://localhost:3000/todos', {
        method:'POST',
        body: JSON.stringify({taskName:taskEntered,taskPriority:priorityEntered}),
        headers:{
            'Content-Type':'application/json'
        }
    }).then(response => response.json())
    .then(json => displayTasks(json))
    .catch(error => console.error('Error:',error))
})