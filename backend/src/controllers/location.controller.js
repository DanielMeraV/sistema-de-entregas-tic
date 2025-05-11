const { models } = require('../config/connPgDB');
const { getWebSocket } = require('../lib/utils/websocket');

const saveLocation  = async (req, res) => {

    const { id_truck, latitude, longitude } = req.body;

    if (!id_truck || !latitude || !longitude) {
        return res.status(400).json({ message: 'Datos incompletos para la ubicacion.' });
    }

    try {
        const time = new Date().toLocaleTimeString('en-US', { hour12: false }); // Formato HH:mm:ss
        const locationString = `${latitude};${longitude}`;

         // Guardar la ubicación en la base de datos
        const location = await models.Location.create({
            truckId: id_truck,
            time,
            location: locationString,
        });

        res.status(201).json({ message: 'Ubicación guardada correctamente.' });
    } catch (error) {
        console.error('Error al guardar ubicación:', error);
        res.status(500).json({ message: 'Error al guardar ubicación.' });
    } 
}

const getLastLocation = async (req, res) => {
    const id = req.params.id;

    try {                
        const lastLocation = await models.Location.findOne({
            where: { truckId: id },
            order: [['time', 'DESC']],
        });

        if (!lastLocation) {
            return res.status(404).json({ message: 'No se encontró ubicación para este camión.' });
        }

        // Separar la ubicación en latitud y longitud
        const [latitude, longitude] = lastLocation.location.split(';');

        res.json({
            id,
            latitude: parseFloat(latitude),
            longitude: parseFloat(longitude),
            time: lastLocation.time
        });
    } catch (error) {
        console.error('Error al obtener ubicación:', error);
        res.status(500).json({ message: 'Error al obtener ubicación.' });
    }
}

const upsertLastLocation = async (req, res) => {
    const { id_truck, latitude, longitude } = req.body;

    if (!id_truck || !latitude || !longitude) {
        console.error(req.body);
        return res.status(400).json({ message: 'Datos incompletos para la ubicación.' });
    }

    try {
        const time = new Date().toLocaleTimeString('en-US', { hour12: false });
        const locationString = `${latitude};${longitude}`;

        await models.LocationLatest.upsert({
            truckId: id_truck,
            time,
            location: locationString
        });

    } catch (error) {
        console.error('Error en upsert ubicación:', error, req.body);
        res.status(500).json({ message: 'Error al actualizar última ubicación.' });
    }
};

const guardarUbicacion = async ({ id_truck, latitude, longitude }) => {
    const time = new Date().toLocaleTimeString('en-US', { hour12: false });
    const locationString = `${latitude};${longitude}`;

    await models.LocationLatest.upsert({
        truckId: id_truck,
        time,
        location: locationString
    });

    return { time };
};



module.exports = { saveLocation, getLastLocation, upsertLastLocation, guardarUbicacion };