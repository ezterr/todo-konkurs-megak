import { createTaskElement } from '../createDOMElements.js';

export class TodoList {
  constructor(address, toDoList, toDoCount) {
    this.address = address;
    this.toDoList = toDoList;
    this.toDoCount = toDoCount;
  }

  async loadData(refreshListeners) {
    const res = await fetch(`${this.address}/api/task`);
    const data = await res.json();

    this.toDoList.innerHTML = '';
    this.toDoCount.textContent = data.length;
    data.forEach((e) => {
      this.toDoList.appendChild(createTaskElement(e.id, e.taskDesc, e.isCompleted));
    });
    await refreshListeners();
  }

  async patchData(id, name) {
    const res = await fetch(`${this.address}/api/task/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({
        taskDesc: name,
      }),
    });
    const data = await res.json();
    await this.loadData();
    return data;
  }

  async deleteData(id) {
    const res = await fetch(`${this.address}/api/task/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
    const data = await res.json();
    await this.loadData();
    return data;
  }
}
