const express = require('express');
const router = express.Router();
const UserModel = require('../models/UserModel.js');
const mongoose = require('mongoose');
const UsersController = require('../controllers/UsersController.js');

router.get('/', UsersController.list);
router.get('/', UsersController.show);
router.get('/:id/edit', UsersController.edit);
router.post('/', UsersController.create);
router.put('/:id', UsersController.update);
router.delete('/:id', UsersController.remove);

module.exports = router;
