const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// List all users
router.get('/', userController.getAllUsers);

// Show create form
router.get('/new', userController.showCreateForm);

// Create user
router.post('/', userController.createUser);

// Show edit form
router.get('/:id/edit', userController.showEditForm);

// Update user
router.post('/:id', userController.updateUser);

// Delete user
router.post('/:id/delete', userController.deleteUser);

module.exports = router;
