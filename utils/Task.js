class Task {
  #id;
  #taskDesc;
  #isCompleted;

  constructor(id, taskDesc, isCompleted) {
    this.#id = id;
    this.#taskDesc = taskDesc;
    this.#isCompleted = isCompleted;
  }

  get id() {
    return this.#id;
  }

  get taskDesc() {
    return this.#taskDesc;
  }

  set taskDesc(taskDesc) {
    this.#taskDesc = taskDesc;
  }

  get isCompleted() {
    return this.#isCompleted;
  }

  set isCompleted(completedState) {
    this.#isCompleted = completedState;
  }

  getAllData() {
    return {
      id: this.#id,
      taskDesc: this.#taskDesc,
      isCompleted: this.#isCompleted,
    };
  }
}

module.exports = Task;
