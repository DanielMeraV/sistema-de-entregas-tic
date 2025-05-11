const express = require('express');
const router = express.Router();
const truckController = require('../controllers/truck.controller');

router.get('/', truckController.find);
router.get('/:id', truckController.findById);
router.get('/user/:userId', truckController.findByUserId);
router.post('/', truckController.create);
router.put('/:id', truckController.update);
router.delete('/:id', truckController.remove);

module.exports = router;