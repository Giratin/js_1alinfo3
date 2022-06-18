const express = require("express");

const PORT = process.env.PORT || 3000;
const path = require("path");

const app = express();

const server = require("http").createServer(app);
const io = require("socket.io")(server);
const mongoose = require("mongoose");
const { getMessages, createMessage } = require("./controller/messages.controller");
mongoose.connect('mongodb://localhost:27017/socket_1_alinfo_3');

io.on("connection", socket => {
    getMessages((err,messages)=>{
        console.log('sending messages first time after connection');
        socket.emit('connected', messages);
    })
    


    socket.on('onMessage', data =>{
        createMessage(data.client, data.message, (err,doc)=>{
            socket.broadcast.emit('messages', doc)
            socket.emit('messages', doc)
        })
    })

    socket.on("disconnect", data =>{
        console.log(data);
    })
})



app.use(express.static(path.join(__dirname, 'public')));
app.get("/", (req, res) => {
    res.sendFile("index.html");
});

server.listen(PORT, () => {
    console.log("Express Server is running on port", PORT);
});