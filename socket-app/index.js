const express = require('express')
const app = express();
const http = require('http');
const expressServer = http.createServer(app) ;

const { Server } = require("socket.io");
const io= new Server(expressServer);

io.on('connection', (socket) => {

    console.log("Socket is connected for a user!");
    socket.on('disconnect', () => {
        console.log("one user is disconnected!");
    })
    setTimeout(function (){
        socket.send('Data comes from Socket Backend');
    },10000)
})

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
})
expressServer.listen(3000,function (){
    console.log('Express server listening on 3000');
})