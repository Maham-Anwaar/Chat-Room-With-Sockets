const socket = io('http://localhost:3000')



socket.on('connect', (sock) => {
    console.log('Connected to the Master Server.');
});

socket.on('joined', (msg) => {
    chatBox.innerHTML += '<p>' + msg + '</p>';
    socket.emit('report', 'Report back to Master.');
});

socket.on('display-msg', (msg) => {
    chatBox.innerHTML += '<p>' + msg + '</p>';
});




document.getElementById('messageForm').addEventListener('submit', function(event) {
    event.preventDefault(); 
    var message = document.getElementById('messageInput').value;
    var chatBox = document.getElementById('chatBox');
    chatBox.innerHTML += '<p>' + message + '</p>';
    document.getElementById('messageInput').value = '';
    socket.emit('new-msg', message);
});