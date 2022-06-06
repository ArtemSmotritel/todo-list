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
  const formData = new FormData(form);
  const taskObject = Object.fromEntries(formData.entries());

  button.classList.toggle("add-task-form__button_hide");
  spinner.classList.toggle("add-task-form__lds-ellipsis_show");

  try {
    const response = await addNewTaskOnServer(taskObject);
    if (response.ok) {
      await insertAllTasks(".list__content");
      setTimeout(() => {
        spinner.classList.toggle("add-task-form__lds-ellipsis_show");
        button.classList.toggle("add-task-form__button_hide");
        form.reset();
        toggleForm(event, true);
      }, 700);
    } else {
      spinner.classList.toggle("add-task-form__lds-ellipsis_show");
      errorHandling(
        { message: "Unable to add task on the server, sorry" },
        form
      );
    }
  } catch (error) {
    spinner.classList.toggle("add-task-form__lds-ellipsis_show");
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
  }).catch((error) => {
    throw {
      message: "Unable to send task to the server, sorry",
    };
  });
}

function needToToggle(targetClass, hide) {
  return (
    targetClass === "header__show-form" ||
    targetClass === "add-task-form__hide-form" ||
    hide
  );
}
