const express = require('express');
const router = express.Router();
const manifestoController = require('../controllers/manifesto.controller');

router.get('/', manifestoController.find);
router.get('/:id', manifestoController.findById);
router.get('/truck/:truckId', manifestoController.findManifestosByTruckId);
router.post('/', manifestoController.create);
router.put('/:id', manifestoController.update);
router.delete('/:id', manifestoController.remove);

module.exports = router;