const { customAlphabet } = require('nanoid');
const SocketServer = require('socket.io');
const Player = require('./game/player.js');

// Configs ID Generator
const ID_CONFIG = {
    alphabet: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
    serverLength: 6,
    playerLength: 15
};

// Initialization
const generateId = customAlphabet(ID_CONFIG.alphabet, ID_CONFIG.playerLength);
const generateServerId = customAlphabet(ID_CONFIG.alphabet, ID_CONFIG.serverLength);
const serverId = generateServerId();

const io = new SocketServer(process.env.PORT || 52300);
const players = new Map();
const sockets = new Map();

console.log(`Server has started!\nID: ${serverId}`);

// Handle Events
const handleConnection = (socket) => {
    console.log('Client connected');

    const player = new Player();
    const playerId = player.id;

    console.log(`Client ID: ${playerId}`);

    // Save connection Data
    players.set(playerId, player);
    sockets.set(playerId, socket);

    // Send start data
    socket.emit('register', { id: playerId, serverID: serverId });
    socket.on('auth', (data) => {
        //console.log(JSON.stringify(data, null, 2));

        if (data.success === true || data.success === "true") {
            broadcastSpawn(socket, player);
            sendExistingPlayers(socket, playerId);
        }
        else {
            socket.emit('disconnect', { id: playerId });
        }
    });

    // Handle socket events
    socket.on('update', (data) => handleUpdate(playerId, data));
    socket.on('disconnect', () => handleDisconnect(playerId));
};

// Auxiliary functions
const broadcastSpawn = (socket, player) => {
    socket.emit('spawn', player);
    socket.broadcast.emit('spawn', player);
};

const sendExistingPlayers = (socket, currentPlayerId) => {
    players.forEach((player, id) => {
        if (id !== currentPlayerId) {
            socket.emit('spawn', player);
        }
    });
};

const handleUpdate = (playerId, data) => {
    //console.log(JSON.stringify(data, null, 2));

    players.set(playerId, data);
    sockets.get(playerId).broadcast.emit('update', data);
};

const handleDisconnect = (playerId) => {
    console.log(`Client ${playerId} disconnected`);

    io.emit('disconnected', { id: playerId });

    players.delete(playerId);
    sockets.delete(playerId);
};

// Start server
function start() {
    io.on('connection', handleConnection);
}

module.exports.generateId = generateId;
module.exports.serverId = serverId;
module.exports.start = start;
