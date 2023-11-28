const io = require('socket.io')(3000, {
    cors: {
        origin: "*", // Replace with the client's origin
        methods: ["GET", "POST"]
    }
});


io.on('connection', socket=>{
    console.log('Master is connected to the Client.');

    // tell the client a user has joined.
    // broadcast because we want everyone to get this msg except the new user.
    // socket.broadcast.emit('joined', 'A user has joined.');

    socket.on('roomJoin', (room)=>{
        console.log(room)
        socket.join(room);
    })

    socket.on('report', socket=>{
        console.log('> Slave has reported back');
    })
    
    socket.on('new-msg', (msg, selectedRoom)=>{
        console.log(selectedRoom)
        socket.to(selectedRoom).emit('display-msg', msg);
    })

    socket.on('newUser', (user, selectedRoom)=>{
        socket.to(selectedRoom).emit('joinMsg', `${user} has joined the chat.`);
    })



})

