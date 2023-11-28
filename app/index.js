const socket = io('http://localhost:3000')

var currentUser = ""
var currentRoom = ""

socket.on('connect', (sock) => {
    console.log('Connected to the Master Server.');
});

socket.on('joinMsg', (msg) => {
    chatBox.innerHTML += '<p>' + msg + '</p>';
});

socket.on('display-msg', (msg) => {
    chatBox.innerHTML += msg;
    chatBox.scrollTop = chatBox.scrollHeight;
});



document.getElementById('messageForm').addEventListener('submit', function(event) {
    event.preventDefault(); 
    var message = document.getElementById('messageInput').value;
    var chatBox = document.getElementById('chatBox');
    chatBox.innerHTML += `${currentUser}:  <span>` + message + '</span><br>';
    document.getElementById('messageInput').value = '';
    socket.emit('new-msg', `${currentUser}:  <span>` + message + '</span><br>', currentRoom);
    chatBox.scrollTop = chatBox.scrollHeight;
});

$(document).ready(function() {
    
    $('#nameModal').modal('show');

    // Event listener for the save button
    document.getElementById('saveNameButton').addEventListener('click', function() {
        var userName = document.getElementById('userNameInput').value;
        var roomValue = document.getElementById('roomSelect').value;
        var selectedRoom = document.getElementById(roomValue).innerText;
        if (userName && selectedRoom) {
            currentUser = userName;
            currentRoom = selectedRoom;
            document.getElementById('roomName').innerHTML = selectedRoom;
            socket.emit('newUser', userName, selectedRoom);
            socket.emit('roomJoin', selectedRoom, selectedRoom);
            document.getElementById('messageInput').disabled = false;
            document.getElementById('sendButton').disabled = false;
            $('#nameModal').modal('hide');
        } else {
            alert('Please enter your name and select a room.');
        }
    });
});