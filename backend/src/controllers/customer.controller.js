const { models } = require('../config/connPgDB');

const find = async (req, res) => {
    try {
        const customers = await models.Customer.findAll();
        res.json(customers);
    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }
}

const findById = async (req, res) => {
    try {
        const customer = await models.Customer.findByPk(req.params.id);
        res.json(customer);
    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }
}

const create = async (req, res) => {
    try {
        // Obtener el último cliente registrado ordenado por ID de forma descendente
        const lastCustomer = await models.Customer.findOne({
            order: [['id', 'DESC']]
        });

        // Generar el nuevo ID
        let newId = "C001"; // Valor por defecto si no hay clientes

        if (lastCustomer) {
            const lastId = lastCustomer.id; // Ejemplo: "C010"
            const lastNumber = parseInt(lastId.replace("C", ""), 10); // Extrae el número "010"
            newId = `C${String(lastNumber + 1).padStart(3, "0")}`; // Genera "C011", "C012"...
        }

        // Crear el nuevo cliente con el ID generado
        const newCustomer = await models.Customer.create({
            id: newId,
            companyName: req.body.companyName,
            ruc: req.body.ruc,
            email: req.body.email,
            address: req.body.address,
            location: req.body.location,
            phone: req.body.phone,
            city: req.body.city
        });

        res.status(201).json(newCustomer);
    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }
};


const update = async (req, res) => {
    try {
        const customer = await models.Customer.findByPk(req.params.id);
        await customer.update(req.body);
        res.json(customer);
    }
    catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }
}

const remove = async (req, res) => {
    try {
        const customer = await models.Customer.findByPk(req.params.id);
        await customer.destroy();
        res.json(customer);
    }
    catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }
}

module.exports = { find, findById, create, update, remove };