const { models } = require('../config/connPgDB');

class UserService {
    
    constructor() {}

    async find() {
        const res = await models.User.findAll();
        return res;
    }

    async findById(id) {
        const res = await models.User.findByPk(id);
        return res;
    }

    async findByUsername(username) {
        const res = await models.User.findOne({ where: { username } });
        return res;
    }

    async create(data) {
        const res = await models.User.create(data);
        return res;
    }

    async update(id, data) {
        const res = await models.User.update(data, { where: { id } });
        return res;
    }

    async delete(id) {
        const res = await models.User.destroy({ where: { id } });
        return res;
    }
}

module.exports = UserService;