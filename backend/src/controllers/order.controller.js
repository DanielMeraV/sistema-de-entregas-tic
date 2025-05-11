const { models } = require('../config/connPgDB');

const find = async (req, res) => {
    try {
        const orders = await models.Order.findAll({
            include: [
                {
                    model: models.Customer,
                    as: 'sender',
                    attributes: ['companyName'] 
                },
                {
                    model: models.Customer,
                    as: 'receiver',
                    attributes: ['companyName'] 
                },
            ]
        });
        res.json(orders);
    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }
}

const findById = async (req, res) => {
    try {
        const order = await models.Order.findByPk(req.params.id, {
            include: [
                {
                    model: models.Customer,
                    as: 'sender',
                    attributes: ['companyName'] 
                },
                {
                    model: models.Customer,
                    as: 'receiver',
                    attributes: ['companyName'] 
                },
            ]
        });
        res.json(order);
    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }
}

const create = async (req, res) => {
    try {
        const order = await models.Order.create(req.body);
        res.json(order);
    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }
}

const setManifesto = async (req, res) => {
    try {
        // Buscar la orden por su ID
        const order = await models.Order.findByPk(req.params.id);
        if (!order) {
            return res.status(404).send({ success: false, message: 'Order not found' });
        }

        // Validar si el manifesto existe
        const manifesto = await models.Manifesto.findByPk(req.body.manifestoId);
        if (!manifesto) {
            return res.status(404).send({ success: false, message: 'Manifesto not found' });
        }

        // Actualizar solo el campo manifestoId
        order.manifestoId = manifesto.id;
        await order.save(); // Guarda los cambios en la base de datos

        res.json({ success: true, message: 'Manifesto updated successfully', order });
    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }
};

const update = async (req, res) => {
    try {
        const order = await models.Order.findByPk(req.params.id);
        await order.update(req.body);
        res.json(order);
    }
    catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }
}

const remove = async (req, res) => {
    try {
        const order = await models.Order.findByPk(req.params.id);
        await order.destroy();
        res.json(order);
    }
    catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }
}

module.exports  = { find, findById, create, setManifesto, update, remove };