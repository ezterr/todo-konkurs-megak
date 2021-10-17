const express = require('express');

const { toDoListRouter } = require('./routes/toDoList.router');

const app = express();
app.use(express.json());
app.use(express.static('./public'));

app.use('/api/task', toDoListRouter);

app.listen(3000, '127.0.0.1');
