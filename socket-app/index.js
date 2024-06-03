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
    // set time out
/*
  setTimeout(function (){
        socket.send('Data comes from Socket Backend');
   },10000)*/

// setInerval
  /*  setInterval(function (){
        let date = new Date();
        let hours = date.getHours();
        let minutes = date.getMinutes();
        let seconds = date.getSeconds();
      socket.send(hours + ":" + minutes + ":" + seconds);
    },2000)*/

    // Custom event
    setInterval(function (){
        let date = new Date();
        let hours = date.getHours();
        let minutes = date.getMinutes();
        let seconds = date.getSeconds();
        socket.emit( "myEvent",hours + ":" + minutes + ":" + seconds);
    },100)



//    Received data from client
    socket.on("message", function(msg){
        console.log(msg);
    })
    // Custom event
    socket.on("customEvent", function(msg){
        console.log( "custm event"+msg);
    })

})


//     Using NameSpace for separate connection
let buyNsp = io.of("/buy");
    buyNsp.on('connection', (socket) => {
        buyNsp.emit("myEvent1","This is Buy NameSpace");
    })

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
})
expressServer.listen(3000,function (){
    console.log('Express server listening on 3000');
})