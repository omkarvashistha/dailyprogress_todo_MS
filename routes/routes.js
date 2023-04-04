const express = require('express');
const router = express.Router();
const todoController = require('../Controller/todoController');

router.post('/:username/addTodo',todoController.addTodo);

router.get('/:username/getTodo',todoController.getTodo);

router.all('*',todoController.invalid);

module.exports = router