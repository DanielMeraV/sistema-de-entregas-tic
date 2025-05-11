const express = require('express');
const router = express.Router();
const logbookController = require('../controllers/logbook.controller');

router.get('/', logbookController.find);
router.get('/:id', logbookController.findById);
router.post('/', logbookController.create);
router.put('/:id', logbookController.update);
router.delete('/:id', logbookController.remove);

module.exports = router;
