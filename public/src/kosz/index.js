import { TodoList } from './todolist.js';
import { createTaskElement } from '../createDOMElements.js';

const toDoList = document.querySelector('.todo-list');
const toDoCount = document.querySelector('.todo-count>strong');
const todoList = new TodoList('http://localhost:3000', toDoList, toDoCount);

window.addEventListener('click', () => {
});

window.addEventListener('DOMContentLoaded', async () => {
  await todoList.loadData(refreshListeners);
});

// async function loadData() {
//   const res = await fetch('http://localhost:3000/api/task');
//   const data = await res.json();
//
//   toDoList.innerHTML = '';
//   toDoCount.textContent = data.length;
//   data.forEach((e) => {
//     toDoList.appendChild(createTaskElement(e.id, e.taskDesc, e.isCompleted));
//   });
//   refreshListeners();
// }
//
// async function refreshListeners() {
//   const tasks = document.querySelectorAll('.todo-list>li');
//   const destroyBtns = document.querySelectorAll('.destroy');
//
//   for (const task of tasks) {
//     task.addEventListener('dblclick', () => {
//       task.classList.toggle('editing');
//     });
//
//     task.addEventListener('keypress', (e) => {
//       if (task.classList.contains('editing') && e.key === 'Enter') {
//         const id = task.id.split('-')[1];
//         const editInput = document.querySelector(`#task-${id}>.edit`);
//         task.classList.toggle('editing');
//         todoList.patchData(id, editInput.value);
//       }
//     });
//   }
//
//   for (const destroyBtn of destroyBtns) {
//     destroyBtn.addEventListener('click', () => {
//       const id = destroyBtn.id.split('-')[1];
//       todoList.deleteData(id);
//     });
//   }
// }
//
// async function deleteData(id) {
//   const res = await fetch(`http://localhost:3000/api/task/${id}`, {
//     method: 'DELETE',
//     headers: {
//       'Content-Type': 'application/json',
//       // 'Content-Type': 'application/x-www-form-urlencoded',
//     },
//   });
//   const data = await res.json();
//   await loadData();
// }
//
// async function patchData(id, name) {
//   const res = await fetch(`http://localhost:3000/api/task/${id}`, {
//     method: 'PATCH',
//     headers: {
//       'Content-Type': 'application/json',
//       // 'Content-Type': 'application/x-www-form-urlencoded',
//     },
//     body: JSON.stringify({
//       taskDesc: name,
//     }),
//   });
//   const data = await res.json();
//   await loadData();
// }
