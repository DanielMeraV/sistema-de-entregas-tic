const { models } = require('../config/connPgDB');

const find = async (req, res) => {
    try {
        const trucks = await models.Truck.findAll();
        return res.status(200).json(trucks);
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

const findById = async (req, res) => {
    try {
        const truck = await models.Truck.findByPk(req.params.id);
        if (!truck) {
            return res.status(404).json({ message: 'Truck not found' });
        }
        return res.status(200).json(truck);
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

const findByUserId = async (req, res) => {
    try {
        const truck = await models.Truck.findOne({ where: { userId: req.params.userId } });
        res.json(truck);
    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }
}

const create = async (req, res) => {
    try {
        const truck = await models.Truck.create(req.body);
        return res.status(201).json(truck);
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

const update = async (req, res) => {
    try {
        const truck = await models.Truck.findByPk(req.params.id);
        if (!truck) {
            return res.status(404).json({ message: 'Truck not found' });
        }
        await truck.update(req.body);
        return res.status(200).json(truck);
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

const remove = async (req, res) => {
    try {
        const truck = await models.Truck.findByPk(req.params.id);
        if (!truck) {
            return res.status(404).json({ message: 'Truck not found' });
        }
        await truck.destroy();
        return res.status(204).json();
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

module.exports = { find, findById, findByUserId, create, update, remove };