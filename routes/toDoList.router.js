const express = require('express');
const {
  getTasks,
  getTaskById,
  addNewTask,
  removeTask,
  editData,
} = require('../controllers/toDoList.controller');

const toDoListRouter = express.Router();

toDoListRouter
  .get('/', getTasks)
  .get('/:id', getTaskById)
  .post('/', addNewTask)
  .delete('/:id', removeTask)
  .patch('/:id', editData);

module.exports = {
  toDoListRouter,
};
