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
  const button = document.querySelector(".add-task-form__button");
  const spinner = document.querySelector(".add-task-form__lds-ellipsis");
  const taskObject = formTask(form);

  toggleButton(button);
  toggleSpinner(spinner);

  try {
    const response = await addNewTaskOnServer(taskObject);
    if (response.ok) {
      await insertAllTasks(".list__content");
      setTimeout(() => {
        toggleSpinner(spinner);
        toggleButton(button);
        form.reset();
        toggleForm(event, true);
      }, 700);
    } else {
      toggleSpinner(spinner);
      errorHandling(
        { message: "Unable to add task on the server, sorry" },
        form
      );
    }
  } catch (error) {
    toggleSpinner(spinner);
    errorHandling(error, form);
  }
}

function addNewTaskOnServer(taskObject) {
  const endpoint = "http://localhost:3001/lists/1/tasks";
  return fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(taskObject),
  });
}

function needToToggle(targetClass, hide) {
  return (
    targetClass === "header__show-form" ||
    targetClass === "add-task-form__hide-form" ||
    hide
  );
}

function formatTask(form) {
  const formData = new FormData(form);
  const taskObject = Object.fromEntries(formData.entries());
  if (!taskObject.due_date) {
    delete taskObject.due_date;
  }
}

function toggleSpinner(spinner) {
  spinner.classList.toggle("add-task-form__lds-ellipsis_show");
}

function toggleButton(button) {
  button.classList.toggle("add-task-form__button_hide");
}