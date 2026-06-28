const express = require('express');
const router = express.Router();
const {
  createTask,
  getAllTasks,
  getTaskById,
  updateTask,
  deleteTask,
} = require('../controllers/taskController');

// CREATE - POST a new task
router.post('/', createTask);

// READ - GET all tasks
router.get('/', getAllTasks);

// READ - GET a single task by ID
router.get('/:id', getTaskById);

// UPDATE - PUT update a task
router.put('/:id', updateTask);

// DELETE - DELETE a task
router.delete('/:id', deleteTask);

module.exports = router;