//intialize the socket
// this will make a connection with the server
let socket = io()

let chatMessageTextBox = document.getElementById("chatMessageTextBox")
let sendButton = document.getElementById("sendButton")
let chatMessagesSPAN = document.getElementById("chatMessagesSPAN")
let usernameChat = document.getElementById("usernameChat")

//let username = usernameHF.value

sendButton.addEventListener('click', () => {
    let chatMessage = chatMessageTextBox.value
    socket.emit('Trips App',chatMessage)

})

//listen for a particular event/channel

socket.on('Trips App', (message) => {
    let username = usernameChat.value
    let messageItem = `<p>${username}: ${message}</p>`
    chatMessagesSPAN.insertAdjacentHTML('beforeend',messageItem)
})