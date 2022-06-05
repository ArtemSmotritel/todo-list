function toggleForm(event, hide) {
  const targetClass = event.target.className;
  const form = document.forms["add-task"];
  const divider = document.querySelector(".divider-layer");
  if (needToToggle(targetClass, hide)) {
    event.preventDefault();
    form.classList.toggle("add-task-form_show");
    divider.classList.toggle("divider-layer_show");
  }
}

async function addNewTask(event) {
  event.preventDefault();
  const form = document.forms["add-task"];
  const button = document.querySelector('.add-task-form__button');
  const spinner = document.querySelector('.add-task-form__lds-ellipsis');
  const formData = new FormData(form);
  const taskObject = Object.fromEntries(formData.entries());
  
  button.classList.toggle('add-task-form__button_hide');
  spinner.classList.toggle('add-task-form__lds-ellipsis_show');
  
  const response = await addNewTaskOnServer(taskObject);
  if (response.ok) {
    const taskWithId = await response.json();
    addNewTaskInDOM(taskWithId);
    //await insertAllTasks('.list');
    spinner.classList.toggle('add-task-form__lds-ellipsis_show');
    button.classList.toggle('add-task-form__button_hide');
    form.reset();
    toggleForm(event, true);
  } else {
    // TODO reset the form
  }
}

function addNewTaskInDOM(taskObject) {
  const listElement = document.querySelector('.list');
  const taskElement = getTaskElement(taskObject);
  listElement.appendChild(taskElement);
}

function addNewTaskOnServer(taskObject) {
  const endpoint = 'http://localhost:3001/lists/1/tasks';
  fetch(endpoint, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(taskObject),
  })
}

function needToToggle(targetClass, hide) {
  return (
    targetClass === "header__show-form" ||
    targetClass === "add-task-form__hide-form" ||
    hide
  );
}