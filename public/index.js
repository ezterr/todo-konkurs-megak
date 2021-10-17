import { TodoList } from './src/todoList.js';

const todoDOM = document.querySelector('.todo-list');
const todoCount = document.querySelector('.todo-count>strong');
const newTodoInput = document.querySelector('.new-todo');
const footer = document.querySelector('.footer');

const allBtn = document.querySelector('.all-btn');
const activeBtn = document.querySelector('.active-btn');
const completedBtn = document.querySelector('.completed-btn');
const crearCompletedBtn = document.querySelector('.clear-completed');

const todo = new TodoList('http://localhost:3000', todoDOM, footer, todoCount);

window.addEventListener('DOMContentLoaded', async () => {
  await todo.renderList();
});

newTodoInput.addEventListener('keypress', async (e) => {
  if (newTodoInput.value && e.key === 'Enter') {
    await todo.addTask(newTodoInput.value);
    newTodoInput.value = '';
  }
});

let checked = false;
allBtn.addEventListener('click', () => {
  if (checked) {
    todo.allUncheckButton();
    checked = false;
  } else {
    todo.allCheckButton();
    checked = true;
  }
});

activeBtn.addEventListener('click', async () => {
  await todo.activeButton();
});

completedBtn.addEventListener('click', async () => {
  await todo.completedButton();
});

crearCompletedBtn.addEventListener('click', async () => {
  await todo.clearCompleted();
});
