const socket = io('http://localhost:3000')

socket.on('connection', (sock) => {
    console.log('Connected to the Master Server.');
});



