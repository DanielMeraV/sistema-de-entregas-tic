const { Server } = require('socket.io');
const { FRONTEND_URL } = require('../../config/config');
const { guardarUbicacion } = require('../../controllers/location.controller');

let io;
let activeSockets = new Map(); // Usamos Map para mejor manejo de pares key-value

const initWebSocket = (server) => {    
    io = new Server(server, {
        cors: {
            origin: `${FRONTEND_URL}`,
            methods: ["GET", "POST"],
            credentials: true,
            allowedHeaders: ["Content-Type"]
        },
        pingTimeout: 60000, // 60 segundos para timeout
        pingInterval: 25000, // 25 segundos entre pings
        transports: ['websocket', 'polling'] //transportes permitidos
    });

    io.on('connection', (socket) => {
        const userId = socket.handshake.query.userId || socket.id;
        //console.log('Cliente conectado - Usuario ID:', userId, 'Socket ID:', socket.id);

        // Si ya existe una conexión previa para este usuario, la manejamos
        const existingSocket = activeSockets.get(userId);
        if (existingSocket && existingSocket.id !== socket.id) {
            //console.log(`Usuario ${userId} ya tiene una conexión activa. Actualizando socket.`);
            existingSocket.disconnect(true);
        }

        // Guardamos o actualizamos la conexión
        activeSockets.set(userId, socket);

        // Manejamos la desconexión
        socket.on('disconnect', (reason) => {
            //console.log(`Cliente desconectado - Usuario ID: ${userId}, Razón: ${reason}`);
            
            // Solo eliminamos si el socket actual es el último conocido para este usuario
            if (activeSockets.get(userId)?.id === socket.id) {
                activeSockets.delete(userId);
            }
        });

        // Manejamos eventos de ubicación incluyendo el userId
        socket.on('updateLocation', async (data) => {
            const { id_truck, latitude, longitude } = data;
            // Guardar en la base de datos
            try {
                const { time } = await guardarUbicacion({ id_truck, latitude, longitude });
            } catch (err) {
                console.error('Error al guardar ubicación desde WebSocket:', err);
            }
        });

        // Manejamos errores
        socket.on('error', (error) => {
            console.error(`Error en socket ${socket.id} para usuario ${userId}:`, error);
        });
    });
};

const getWebSocket = () => {
    if (!io) {
        throw new Error('WebSocket no ha sido inicializado. Llame a initWebSocket primero.');
    }
    return io;
};

const getSocketByUserId = (userId) => {
    return activeSockets.get(userId);
};

const broadcastToAllExcept = (userId, event, data) => {
    activeSockets.forEach((socket, socketUserId) => {
        if (socketUserId !== userId) {
            socket.emit(event, data);
        }
    });
};

module.exports = { 
    initWebSocket, 
    getSocketByUserId,
    broadcastToAllExcept,
    getWebSocket
};