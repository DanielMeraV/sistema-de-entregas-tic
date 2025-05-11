const { models } = require('../config/connPgDB');

const find = async (req, res) => {
    try {
        const manifestos = await models.Manifesto.findAll();
        return res.status(200).json(manifestos);
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

const findById = async (req, res) => {
    try {
        const manifesto = await models.Manifesto.findByPk(req.params.id, {
            include: [
                'truck',
                'orders',
            ]
        });
        if (!manifesto) {
            return res.status(404).json({ message: 'Manifesto not found' });
        }
        return res.status(200).json(manifesto);
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

const findManifestosByTruckId = async (req, res) => {
    try {
        const manifestos = await models.Manifesto.findAll({
            where: { truckId: req.params.truckId }
        });
        return res.status(200).json(manifestos);
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

const create = async (req, res) => {
    try {
        const manifesto = await models.Manifesto.create(req.body);
        return res.status(201).json(manifesto);
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

const update = async (req, res) => {
    try {
        const manifesto = await models.Manifesto.findByPk(req.params.id);
        if (!manifesto) {
            return res.status(404).json({ message: 'Manifesto not found' });
        }
        await manifesto.update(req.body);
        return res.status(200).json(manifesto);
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

const remove = async (req, res) => {
    try {
        const manifesto = await models.Manifesto.findByPk(req.params.id);
        if (!manifesto) {
            return res.status(404).json({ message: 'Manifesto not found' });
        }
        await manifesto.destroy();
        return res.status(200).json(manifesto);
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

module.exports = { find, findById, findManifestosByTruckId, create, update, remove };

