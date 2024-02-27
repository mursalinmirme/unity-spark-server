const dotenv = require("dotenv");
const dbConnect = require("./src/db/dbConnect.js");
const app = require("./src/app.js");
const { Server } = require("socket.io");
const httpServer = require("http").createServer(app); // Create HTTP server using Express app
const port = process.env.PORT || 5000;

dotenv.config({
    path: './.env'
});

var server;

// Establish database connection
dbConnect()
.then(() => {
    server = httpServer.listen(port, async () => {
        console.log(`The server is running on port ${port}`);
    });
})
.catch(() => {
    console.log("Database Connection Failed!");
});

// Initialize Socket.IO server
const io = new Server(httpServer, {
    pingTimeOut: 60000,
    cors: {
        origin: [
            'http://localhost:5000',
            "http://localhost:5173",
            "http://localhost:5174",
        ]
    }
});

// Handle Socket.IO connections
io.on('connection', socket => {
    console.log('socket.io connected successfully');

    socket.on('setup', user => {
        socket.join(user._id)
        socket.emit('connected')
    })

    socket.on('join-room', room => {
        socket.join(room)
        console.log('user joined in room ' + room);
    })

    socket.on('new-message', newMessage => {
        var chat = newMessage.chat

        if(!chat.users){
            return console.log('user not found');
        }

        chat.users.forEach(user => {
            if(user._id == newMessage.sender._id) return

            socket.in(user._id).emit('message-received', newMessage)
        })
    })
});
