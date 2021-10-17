const { resolve, dirname } = require('path');

const DATA_PATH = resolve(dirname(process.argv[1]), './data/todo.json');

module.exports = {
  DATA_PATH,
};
