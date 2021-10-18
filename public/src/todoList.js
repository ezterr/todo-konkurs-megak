import { createTaskElement } from './createDOMElements.js';

export class TodoList {
  constructor(address, todoList, footer, todoCount) {
    this.address = address;
    this.todoList = todoList;
    this.footer = footer;
    this.todoCount = todoCount;
    this.data = [];
  }

  // Add to all dynamic DOM Elements event Listener
  async refreshListeners(tasksQuery, destroyBtnQuery) {
    const tasks = document.querySelectorAll(tasksQuery);
    const destroyBtn = document.querySelectorAll(destroyBtnQuery);
    const that = this;
    for (const task of tasks) {
      task.addEventListener('dblclick', () => {
        task.classList.toggle('editing');
      });

      task.addEventListener('keypress', async (e) => {
        if (task.classList.contains('editing') && e.key === 'Enter') {
          const id = task.id.split('-')[1];
          const editInput = document.querySelector(`#task-${id}>.edit`);
          task.classList.toggle('editing');
          await that.editTask(id, editInput.value);
        }
      });
    }

    for (const destroyButton of destroyBtn) {
      destroyButton.addEventListener('click', () => {
        const id = destroyButton.id.split('-')[1];
        this.deleteTask(id);
      });
    }
  }

  // render all tasks in to do list
  async renderList() {
    if (await this.getTask()) {
      this.todoList.innerHTML = '';
      this.data.forEach((e) => {
        this.todoList.appendChild(createTaskElement(e.id, e.taskDesc, e.isCompleted));
      });
      this.todoCount.textContent = this.data.length;
      this.footer.style.display = this.data.length ? 'block' : 'none';
      await this.refreshListeners('.todo-list>li', '.destroy');
    }
  }

  // get all tasks from api
  async getTask() {
    const res = await fetch(`${this.address}/api/task`);
    this.data = await res.json();
    return true;
  }

  // add new task to api
  async addTask(taskDesc) {
    const res = await fetch(`${this.address}/api/task/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        taskDesc,
        isCompleted: false,
      }),
    });
    await this.renderList();
  }

  // delete task by id
  async deleteTask(id) {
    const res = await fetch(`${this.address}/api/task/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    await this.renderList();
  }

  // edit task by id
  async editTask(id, taskDesc, isCompleted) {
    const data = {};
    if (taskDesc !== undefined) {
      data.taskDesc = taskDesc;
    }
    if (isCompleted !== undefined) {
      data.isCompleted = isCompleted;
    }
    console.log(data);
    const res = await fetch(`${this.address}/api/task/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify(data),
    });
    await this.renderList();
  }

  // active button control
  async activeButton() {
    const toogle = document.querySelectorAll('.toggle');
    for (const toogleElement of toogle) {
      if (toogleElement.checked) {
        await this.editTask(toogleElement.value, undefined, false);
      }
    }
  }

  // completed button control
  async completedButton() {
    const toogle = document.querySelectorAll('.toggle');
    for (const toogleElement of toogle) {
      if (toogleElement.checked) {
        console.log(toogleElement.value);
        await this.editTask(toogleElement.value, undefined, true);
      }
    }
  }

  // check all tasks
  allCheckButton() {
    const toogle = document.querySelectorAll('.toggle');
    for (const toogleElement of toogle) {
      toogleElement.checked = true;
    }
  }

  // uncheck all task
  allUncheckButton() {
    const toogle = document.querySelectorAll('.toggle');
    for (const toogleElement of toogle) {
      toogleElement.checked = false;
    }
  }

  // remove all completed tasks
  async clearCompleted() {
    const liElements = document.querySelectorAll('.todo-list>li');

    for (const liElement of liElements) {
      if (liElement.classList.contains('completed')) {
        const id = liElement.id.split('-')[1];
        await this.deleteTask(id);
      }
    }
  }
}
