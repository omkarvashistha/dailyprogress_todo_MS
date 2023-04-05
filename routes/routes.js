const express = require('express');
const router = express.Router();
const todoController = require('../Controller/todoController');
const cors = require('cors')

router.use(cors())

router.post('/:username/addTodo',todoController.addTodo);

router.get('/:username/getTodo',todoController.getTodo);

router.put('/:username/markComplete',todoController.markComplete);

router.all('*',todoController.invalid);

module.exports = router