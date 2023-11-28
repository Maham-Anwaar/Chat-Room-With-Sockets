const io = require('socket.io')(3000, {
    cors: {
        origin: "*", // Replace with the client's origin
        methods: ["GET", "POST"]
    }
});

io.on('connection', socket=>{
    console.log('I am connected to the Client.');
})