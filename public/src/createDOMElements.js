export function createTaskElement(id, taskDesc, isCompleted) {
  const inputCheckbox = document.createElement('input');
  inputCheckbox.className = 'toggle';
  inputCheckbox.setAttribute('type', 'checkbox');
  inputCheckbox.setAttribute('value', id);
  inputCheckbox.setAttribute('name', 'toggle');

  const buttonDestroy = document.createElement('button');
  buttonDestroy.className = 'destroy';
  buttonDestroy.id = `destroy-${id}`;

  const label = document.createElement('label');
  label.textContent = taskDesc;

  const divMain = document.createElement('div');
  divMain.className = 'view';
  divMain.appendChild(inputCheckbox);
  divMain.appendChild(label);
  divMain.appendChild(buttonDestroy);

  const inputEdit = document.createElement('input');
  inputEdit.className = 'edit';
  inputEdit.setAttribute('value', taskDesc);

  const liElement = document.createElement('li');
  liElement.className = isCompleted ? 'completed' : '';
  liElement.id = `task-${id}`;
  liElement.appendChild(divMain);
  liElement.appendChild(inputEdit);

  return liElement;
}
