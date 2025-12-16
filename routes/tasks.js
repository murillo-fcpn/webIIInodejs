const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');

// List Tasks
router.get('/', taskController.getAllTasks);

// Create Task Form
router.get('/new', taskController.createTaskForm);

// Create Task Action
router.post('/', taskController.createTask);

module.exports = router;
