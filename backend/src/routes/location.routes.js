const express = require('express');
const router = express.Router();
const locationController = require('../controllers/location.controller');

router.post('/', locationController.saveLocation);
router.post('/latest', locationController.upsertLastLocation);
router.get('/:id', locationController.getLastLocation);
router.get('/latest/:id', locationController.getLastLocation);

module.exports = router;