const { models } = require('../config/connPgDB');
const ManifestoService = require('./manifesto.service');
const { successResponse, errorResponse, notFoundResponse, noContentResponse } = require('../lib/utils/responseHandler');

class OrderService {

    constructor() { }

    async find() {
        try {
            const res = await models.Order.findAll({
                include: [
                    { model: models.Customer, as: 'sender', attributes: ['companyName'] },
                    { model: models.Customer, as: 'receiver', attributes: ['companyName'] },
                ],
            });

            if (res.length === 0) {
                return notFoundResponse('No se encontraron pedidos.');
            }

            return successResponse(res);
        } catch (error) {
            return errorResponse('Error al buscar pedidos');
        }
    }

    async findById(id) {
        try {
            const res = await models.Order.findByPk(id);

            if (!res) {
                return notFoundResponse(`No se encontró el pedido con ID ${id}.`);
            }

            return successResponse(res);
        } catch (error) {
            return errorResponse('Error al buscar el pedido');
        }
    }

    async create(data) {
        try {
            const res = await models.Order.create(data);
            return successResponse(res);
        } catch (error) {
            return errorResponse('Error al crear un pedido');
        }
    }

    async setManifest(id, idManifest) {
        try {
            const order = await this.findById(id);
            const manifest = await ManifestoService.findById(idManifest);

            if (order && manifest) {
                await models.Order.update(
                    { manifestId: idManifest },
                    { where: { id } }
                );
                return noContentResponse();
            } else {
                return notFoundResponse('Pedido o Manifiesto no existen en el sistema.');
            }
        } catch (error) {
            return errorResponse('Error al asignar manifiesto al pedido');
        }
    }

    async update(id, data) {
        try {
            const order = await this.findById(id);

            if (order) {
                await models.Order.update(data, { where: { id } });
                return noContentResponse();
            } else {
                return notFoundResponse('Pedido no existe en el sistema.');
            }
        } catch (error) {
            return errorResponse('Error al actualizar el pedido');
        }
    }

    async delete(id) {
        try {
            const order = await this.findById(id);

            if (order) {
                await models.Order.destroy({ where: { id } });
                return noContentResponse();
            } else {
                return notFoundResponse('Pedido no existe en el sistema');
            }
        } catch (error) {
            return errorResponse('Error al eliminar el pedido');
        }
    }
}

module.exports = new OrderService();