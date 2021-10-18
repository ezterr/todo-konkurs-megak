const { resolve } = require('path');

const DATA_PATH = resolve(process.cwd(), './data/todo.json');

module.exports = {
  DATA_PATH,
};
