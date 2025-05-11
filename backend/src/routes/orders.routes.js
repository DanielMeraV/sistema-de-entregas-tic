const express = require('express');
const router = express.Router();
const orderController = require('../controllers/order.controller');

router.get('/', orderController.find);
router.get('/:id', orderController.findById);
router.post('/', orderController.create);
router.post('/setManifesto/:id', orderController.setManifesto);
router.put('/:id', orderController.update);
router.delete('/:id', orderController.remove);

module.exports = router;