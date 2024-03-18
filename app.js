require('dotenv').config();
const express = require('express');
const User = require('./models/userModel');
const Chat = require('./models/chatModel')
var mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/chat-app');

const app =require('express')();
const http = require('http').Server(app);

const userRoute = require('./routes/userRoute');

app.use('/', userRoute);

const io = require('socket.io')(http);

var usn = io.of('/user-namespace');

usn.on('connection', async function(socket){
    console.log("User connected");

    var userId = socket.handshake.auth.token;

    await User.findByIdAndUpdate({_id: userId}, {$set:{is_online:'1'}})
    socket.broadcast.emit('getOnlineUser', {user_id: userId});

    socket.on('disconnect', async function(){
        console.log("User disconnected");
        var userId = socket.handshake.auth.token;
        await User.findByIdAndUpdate({_id: userId}, {$set:{is_online:'0'}})
        socket.broadcast.emit('getOfflineUser', {user_id: userId});
    });

    socket.on('newChat', function(data){
        socket.broadcast.emit('loadNewChat', data);
    });

    socket.on('existChat', async function(data){
        var chats = await Chat.find({ $or:[
           { sender_id:data.sender_id, receiver_id:data.receiver_id },
           { sender_id:data.receiver_id, receiver_id:data.sender_id }
        ]});
        socket.emit('loadChats', { chats:chats });
    });

})



http.listen(3005, function(){
    console.log('server is running');
})