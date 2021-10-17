const { readFile, writeFile } = require('fs').promises;
const Task = require('./Task');
const { DATA_PATH } = require('../config/constants');

async function loadToDoData(path) {
  try {
    const data = JSON.parse(await readFile(path, 'utf8'));
    const tasks = data.tasks.map((e) => new Task(e.id, e.taskDesc, e.isCompleted));

    return { tasks, lastId: tasks.length !== 0 ? data.lastId : 0 };
  } catch (err) {
    if (err.code === 'ENOENT') {
      const error = new Error('File not found');
      error.code = 'ENOENT';
      throw error;
    }
    throw new Error('Unknown error');
  }
}

// if taskData is an array, all tasks will be overwritten
// if taskData is an object, it will be added to the end of the array
async function saveTaskData(path, tasksData) {
  try {
    const data = await loadToDoData(DATA_PATH);
    if (tasksData instanceof Array) {
      data.tasks = tasksData.map((e) => new Task(e.id, e.taskDesc, e.isCompleted));
    } else if (tasksData instanceof Object) {
      data.tasks.push(new Task(++data.lastId, tasksData.taskDesc ?? 'error', tasksData.isCompleted ?? 'false'));
    }

    const dataToSave = data.tasks.map((e) => e.getAllData());
    await writeFile(path, JSON.stringify({ tasks: dataToSave, lastId: data.lastId }));

    return { message: 'successful' };
  } catch (err) {
    if (err.code === 'ENOENT') {
      const error = new Error('File not found');
      error.code = 'ENOENT';
      throw error;
    }
    throw new Error('Unknown error');
  }
}

module.exports = {
  loadToDoData,
  saveTaskData,
};
