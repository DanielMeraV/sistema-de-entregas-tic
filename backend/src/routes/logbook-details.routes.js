const express = require('express');
const router = express.Router();
const logbookDetailController = require('../controllers/logbook-detail.controller');

router.get('/', logbookDetailController.find);
router.get('/:id', logbookDetailController.findById);
router.post('/', logbookDetailController.create);
router.put('/:id', logbookDetailController.update);
router.delete('/:id', logbookDetailController.remove);

module.exports = router;
