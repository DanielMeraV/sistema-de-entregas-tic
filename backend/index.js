const express = require('express');
const cors = require('cors');
const { PORT, FRONTEND_URL } = require('./config/config');
const http = require('http');
const { initWebSocket } = require('./lib/utils/websocket');

const authRoutes = require('./src/routes/auth.routes');
const usersRoutes = require('./src/routes/users.routes');
const ordersRoutes = require('./src/routes/orders.routes');
const CustomersRoutes = require('./src/routes/customers.routes');
const ManifestoRoutes = require('./src/routes/manifesto.routes');
const TruckRoutes = require('./src/routes/truck.routes');
const LocationRoutes = require('./src/routes/location.routes');
const LogbookRoutes = require('./src/routes/logbook.routes');
const LogbookDetailsRoutes = require('./src/routes/logbook-details.routes');
const PdfRoutes = require('./src/routes/pdf.routes');

const cron = require('node-cron');
const cleanUpLocations = require('./src/services/cleanup.service');

const path = require('path');
const backupsPath = path.join(__dirname, 'src' ,'backups');

const app = express();
const router = express.Router();

// Middlewares globales
app.use(cors({
    origin: `${FRONTEND_URL}`, 
    methods: ['GET', 'POST', 'PUT', 'DELETE'],        
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'] 
}));
app.use(express.json());

app.use('/backups', express.static(backupsPath)); // Para ver los backups desde el navegador

// Rutas
app.use('/api/v1', router);
router.use('/auth', authRoutes)
router.use('/users', usersRoutes);
router.use('/orders', ordersRoutes);
router.use('/customers', CustomersRoutes);
router.use('/manifestos', ManifestoRoutes);
router.use('/trucks', TruckRoutes);
router.use('/location', LocationRoutes);
router.use('/logbook', LogbookRoutes);
router.use('/logbook-details', LogbookDetailsRoutes);
router.use('/pdf', PdfRoutes);

// Cron job: se ejecuta todos los días a las 00:00 (12am)
cron.schedule('0 0 * * *', () => {
    console.log('Ejecutando limpieza diaria de ubicaciones...');
    cleanUpLocations();
});

// Servidor para el websocket
const server = http.createServer(app);
initWebSocket(server);

server.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});

module.exports = app;
