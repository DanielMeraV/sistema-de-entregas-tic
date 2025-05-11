const fs = require('fs');
const path = require('path');
const { models } = require('../config/connPgDB');
const axios = require('axios');

const cleanUpLocations = async () => {
    try {
        const locations = await models.Location.findAll();

        if (locations.length === 0) {
            console.log('No hay ubicaciones para guardar.');
            return;
        }

        const date = new Date();
        const fileName = `truck-locations-${date.toISOString().split('T')[0]}.txt`; // Ej: truck-locations-2025-05-11.txt
        const filePath = path.join(__dirname, '../backups', fileName);

        // Crear carpeta si no existe
        fs.mkdirSync(path.dirname(filePath), { recursive: true });

        // Agrupar por camión
        const grouped = {};
        locations.forEach(loc => {
            const truckId = loc.truckId;
            if (!grouped[truckId]) grouped[truckId] = [];
            grouped[truckId].push({
            time: loc.time,
            latitude: loc.location.split(';')[0],
            longitude: loc.location.split(';')[1],
            });
        });

        // Construir el contenido en formato de tabla por camión
        let content = '';
        for (const truckId in grouped) {
            content += `==== CAMIÓN ${truckId} ====\n`;
            content += `Hora        | Latitud      | Longitud     | Dirección\n`;
            content += `-------------------------------------------------------------------\n`;

            for (const entry of grouped[truckId]) {
                const address = await getAddressFromCoords(entry.latitude, entry.longitude);
                content += `${entry.time.padEnd(12)}| ${entry.latitude.padEnd(12)}| ${entry.longitude.padEnd(12)}| ${address}\n`;
            }

            content += `\n`;
        }

        // Escribir archivo
        fs.writeFileSync(filePath, content);
        console.log(`Ubicaciones guardadas en: ${filePath}`);

        // Eliminar registros
        await models.Location.destroy({ where: {} });
        console.log('Registros eliminados de la tabla Location.');
    } catch (error) {
        console.error('Error en cleanUpLocations:', error);
    }
};

async function getAddressFromCoords(lat, lon) {
  try {
    const response = await axios.get('https://nominatim.openstreetmap.org/reverse', {
      params: {
        format: 'json',
        lat,
        lon,
      },
      headers: {
        'User-Agent': 'MiAppDeCamiones/1.0',
      },
    });

    const address = response.data.display_name;
    return address || 'Dirección desconocida';
  } catch (err) {
    console.error('Error al obtener dirección:', err.message);
    return 'Error al obtener dirección';
  }
}

module.exports = cleanUpLocations;
