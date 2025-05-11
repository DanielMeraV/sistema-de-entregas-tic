const { models } = require('../config/connPgDB');

// Obtener todos los registros de logbook_detail
const find = async (req, res) => {
    try {
        const logbookDetails = await models.LogbookDetail.findAll();
        return res.json(logbookDetails);
    } catch (error) {
        return res.status(500).send({ success: false, message: error.message });
    }
}

// Obtener un registro de logbook_detail por su ID
const findById = async (req, res) => {
    try {
        const logbookDetail = await models.LogbookDetail.findByPk(req.params.id);
        if (!logbookDetail) {
            return res.status(404).send({ success: false, message: 'LogbookDetail not found' });
        }
        return res.json(logbookDetail);
    } catch (error) {
        return res.status(500).send({ success: false, message: error.message });
    }
}

// Crear un nuevo registro de logbook_detail
const create = async (req, res) => {
    try {
        const logbookDetail = await models.LogbookDetail.create(req.body);
        return res.json(logbookDetail);
    } catch (error) {
        return res.status(500).send({ success: false, message: error.message });
    }
}

// Actualizar un registro de logbook_detail
const update = async (req, res) => {
    try {
        const logbookDetail = await models.LogbookDetail.findByPk(req.params.id);
        if (!logbookDetail) {
            return res.status(404).send({ success: false, message: 'LogbookDetail not found' });
        }
        await logbookDetail.update(req.body);
        return res.json(logbookDetail);
    } catch (error) {
        return res.status(500).send({ success: false, message: error.message });
    }
}

// Eliminar un registro de logbook_detail
const remove = async (req, res) => {
    try {
        const logbookDetail = await models.LogbookDetail.findByPk(req.params.id);
        if (!logbookDetail) {
            return res.status(404).send({ success: false, message: 'LogbookDetail not found' });
        }
        await logbookDetail.destroy();
        return res.json({ success: true, message: 'LogbookDetail deleted successfully' });
    } catch (error) {
        return res.status(500).send({ success: false, message: error.message });
    }
}

module.exports = { find, findById, create, update, remove };
