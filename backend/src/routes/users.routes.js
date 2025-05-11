const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');

router.get('/', userController.find);
router.get('/:id', userController.findById);
router.get('/username/:username', userController.findByUsername);
router.put('/:id', userController.update);
router.delete('/:id', userController.remove);

module.exports = router;