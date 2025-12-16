const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');

// List Projects
router.get('/', projectController.getAllProjects);

// Create Project Form
router.get('/new', projectController.createProjectForm);

// Create Project Action
router.post('/', projectController.createProject);

module.exports = router;
