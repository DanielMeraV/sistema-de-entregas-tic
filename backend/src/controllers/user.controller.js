const { models } = require('../config/connPgDB');

const find = async (req, res) => {
    try {
        const users = await models.User.findAll();
        res.json(users);
    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }
}

const findById = async (req, res) => {
    try {
        const user = await models.User.findByPk(req.params.id);
        res.json(user);
    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }
}

const findByUsername = async (req, res) => {
    try {
        const user = await models.User.findOne({ where: { username: req.params.username } });
        res.json(user);
    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }
}

const create = async (req, res) => {
    try {
        const user = await models.User.create(req.body);
        res.json(user);
    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }
}

const update = async (req, res) => {
    try {
        const user = await models.User.findByPk(req.params.id);
        await user.update(req.body);
        res.json(user);
    }
    catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }
}

const remove = async (req, res) => {
    try {
        const user = await models.User.findByPk(req.params.id);
        await user.destroy();
        res.json({ success: true, message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }
}

module.exports = { find, findById, findByUsername, create, update, remove };
