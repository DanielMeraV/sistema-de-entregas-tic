const { models } = require('../config/connPgDB');

// Obtener todos los registros de logbook
const find = async (req, res) => {
    try {
        const logbooks = await models.Logbook.findAll();
        return res.json(logbooks);
    } catch (error) {
        return res.status(500).send({ success: false, message: error.message });
    }
}

// Obtener un registro de logbook por su ID
const findById = async (req, res) => {
    try {
        const logbook = await models.Logbook.findByPk(req.params.id);
        if (!logbook) {
            return res.status(404).send({ success: false, message: 'Logbook not found' });
        }
        return res.json(logbook);
    } catch (error) {
        return res.status(500).send({ success: false, message: error.message });
    }
}

// Crear un nuevo registro de logbook
const create = async (req, res) => {
    try {
        const logbook = await models.Logbook.create(req.body);
        return res.json(logbook);
    } catch (error) {
        return res.status(500).send({ success: false, message: error.message });
    }
}

// Actualizar un registro de logbook
const update = async (req, res) => {
    try {
        const logbook = await models.Logbook.findByPk(req.params.id);
        if (!logbook) {
            return res.status(404).send({ success: false, message: 'Logbook not found' });
        }
        await logbook.update(req.body);
        return res.json(logbook);
    } catch (error) {
        return res.status(500).send({ success: false, message: error.message });
    }
}

// Eliminar un registro de logbook
const remove = async (req, res) => {
    try {
        const logbook = await models.Logbook.findByPk(req.params.id);
        if (!logbook) {
            return res.status(404).send({ success: false, message: 'Logbook not found' });
        }
        await logbook.destroy();
        return res.json({ success: true, message: 'Logbook deleted successfully' });
    } catch (error) {
        return res.status(500).send({ success: false, message: error.message });
    }
}

module.exports = { find, findById, create, update, remove };
