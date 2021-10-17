const { DATA_PATH } = require('../config/constants');
const { loadToDoData, saveTaskData } = require('../utils/dataManagement');

// Get all products
// GET /api/task
async function getTasks(req, res) {
  try {
    const data = await loadToDoData(DATA_PATH);
    res.send(data.tasks.map((e) => e.getAllData()));
  } catch (err) {
    res
      .status(404)
      .send({ error: err.message });
  }
}

// get task by id
// GET /api/task/:id
async function getTaskById(req, res) {
  try {
    const data = await loadToDoData(DATA_PATH);
    const taskData = data.tasks
      .map((e) => e.getAllData())
      .find((e) => e.id === Number(req.params.id));
    if (taskData) {
      res.send(taskData);
    } else {
      throw new Error('Task not exist');
    }
  } catch (err) {
    res
      .status(404)
      .send({ error: err.message });
  }
}

// add new task to list
// POST /api/task
async function addNewTask(req, res) {
  try {
    const data = await saveTaskData(DATA_PATH, req.body);
    res
      .status(201)
      .send(data);
  } catch (err) {
    res
      .status(404)
      .send({ error: err.message });
  }
}

// remove task from list
// DELETE /api/task/:id
async function removeTask(req, res) {
  try {
    const data = await loadToDoData(DATA_PATH);
    const dataAfterRemoved = data.tasks
      .filter((e) => e.id !== Number(req.params.id))
      .map((e) => e.getAllData());
    const saveInfo = await saveTaskData(DATA_PATH, dataAfterRemoved);

    if (data.tasks.length === dataAfterRemoved.length) {
      res.send({ message: 'The data you wanted to delete did not exist' });
    } else {
      res
        .status(201)
        .send(saveInfo);
    }
  } catch (err) {
    res
      .status(404)
      .send({ error: err.message });
  }
}

// add new task to list
// PATCH /api/task/:id
async function editData(req, res) {
  try {
    const data = await loadToDoData(DATA_PATH);
    const index = data.tasks.findIndex((e) => e.id === Number(req.params.id));
    const oldData = data.tasks[index].getAllData();

    data.tasks[index].taskDesc = req.body.taskDesc ?? oldData.taskDesc;
    data.tasks[index].isCompleted = req.body.isCompleted ?? oldData.isCompleted;

    const saveInfo = await saveTaskData(DATA_PATH, data.tasks);
    res.send(saveInfo);
  } catch (err) {
    res
      .status(404)
      .send({ error: err.message });
  }
}

module.exports = {
  getTasks,
  getTaskById,
  addNewTask,
  removeTask,
  editData,
};
