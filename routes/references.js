const express = require('express');
const router = express.Router();
const referenceController = require('../controllers/referenceController');

// Project Types
router.get('/project-types', referenceController.getAllProjectTypes);
router.post('/project-types', referenceController.createProjectType);

// Status Tasks
router.get('/status-tasks', referenceController.getAllStatusTasks);
router.post('/status-tasks', referenceController.createStatusTask);

module.exports = router;
