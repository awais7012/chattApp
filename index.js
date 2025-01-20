const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.set('view engine', 'ejs'); 
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render('index');
});

io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('chat message', (data) => {
        // Broadcast the message text to others
        socket.broadcast.emit('chat message', {
            text: data.text,
            id: data.id  // Make sure we're passing the message ID
        });
    });

    // Add new handler for reactions
    socket.on('message reaction', (data) => {
        // Broadcast the reaction to all other clients
        socket.broadcast.emit('message reaction', {
            messageId: data.messageId,
            reaction: data.reaction
        });
    });

    // Handle music file sharing
    socket.on('music file', (data) => {
        console.log("Broadcasting music file");
        socket.broadcast.emit('music file', data);
    });

    // Handle music controls
    socket.on('music control', (data) => {
        console.log("Broadcasting music control:", data.action);
        socket.broadcast.emit('music control', data);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

const PORT = process.env.PORT || 3000;
http.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
}); 