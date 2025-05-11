const { models } = require('../config/connPgDB');
const { successResponse, errorResponse, notFoundResponse, noContentResponse } = require('../lib/utils/responseHandler');

class ManifestoService {

    constructor() { }

    async find() {
        try {
            const res = await models.Manifesto.findAll();

            if (res.length === 0) {
                return notFoundResponse('No se encontraron manifiestos.');
            }

            return successResponse(res);
        } catch (error) {
            console.error('Error al buscar manifiestos:', error);
            return errorResponse('Error al obtener los manifiestos.');
        }
    }

    async findById(id) {
        try {
            const res = await models.Manifesto.findByPk(id, {
                include: [
                    'truck',
                    'orders',
                ]
            });

            if (!res) {
                return notFoundResponse(`No se encontró el manifiesto con ID ${id}.`);
            }

            return successResponse(res);
        } catch (error) {
            console.error('Error al buscar el manifiesto:', error);
            return errorResponse('Error al obtener el manifiesto.');
        }
    }

    async create(data) {
        try {
            const res = await models.Manifesto.create(data);
            return successResponse(res);
        } catch (error) {
            console.error('Error al crear un manifiesto:', error);
            return errorResponse('Error al crear el manifiesto.');
        }
    }

    async update(id, data) {
        try {
            const manifest = await models.Manifesto.findByPk(id);
            if (manifest) {
                await models.Manifesto.update(data, { where: { id } });
                return noContentResponse();
            } else {
                return notFoundResponse(`No se encontró el manifiesto con ID ${id}.`);
            }
        } catch (error) {
            console.error('Error al actualizar el manifiesto:', error);
            return errorResponse('Error al actualizar el manifiesto.');
        }
    }

    async delete(id) {
        try {
            const manifest = await models.Manifesto.findByPk(id);
            if (manifest) {
                await models.Manifesto.destroy({ where: { id } });
                return noContentResponse();
            } else {
                return notFoundResponse(`No se encontró el manifiesto con ID ${id}.`);
            }
        } catch (error) {
            console.error('Error al eliminar el manifiesto:', error);
            return errorResponse('Error al eliminar el manifiesto.');
        }
    }
}

module.exports = new ManifestoService();