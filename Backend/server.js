const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http, {
    cors: {
        origin: '*'
    }
});

// Sirve los archivos estáticos de la aplicación Angular desde `/public`
app.use(express.static(path.join(__dirname, 'public')));

// Ajusta la ruta raíz para servir el `index.html` desde `/public`
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Redirige cualquier otra ruta a `index.html`
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});


// Maneja las conexiones WebSocket
io.on('connection', (socket) => {
    socket.on('set-user-name', (userName) => {
        addUser(userName, socket.id);
        io.emit('user-list', [...userList.keys()]);
        socket.userName = userName; // Asigna el nombre al socket para usarlo después
    });

    socket.on('message', (msg) => {
        socket.broadcast.emit('message-broadcast', { message: msg, userName: socket.userName });
    });

    socket.on('disconnect', (reason) => {
        removeUser(socket.userName, socket.id);
        io.emit('user-list', [...userList.keys()]);
    });
});

// Mapa para almacenar los usuarios conectados
let userList = new Map();

function addUser(userName, id) {
    if (!userList.has(userName)) {
        userList.set(userName, new Set([id]));
    } else {
        userList.get(userName).add(id);
    }
}

function removeUser(userName, id) {
    if (userList.has(userName)) {
        let userIds = userList.get(userName);
        userIds.delete(id); // Elimina el id del usuario
        if (userIds.size === 0) {
            userList.delete(userName);
        }
    }
}

// Inicia el servidor en el puerto 3000 o en el especificado por el entorno
http.listen(process.env.PORT || 3000, () => {
    console.log(`Server is running on port ${process.env.PORT || 3000}`);
});
