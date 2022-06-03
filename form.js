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

function addNewTask(event) {
  event.preventDefault();
  const form = document.forms["add-task"];
  const formData = new FormData(form);
  const taskObject = Object.fromEntries(formData.entries());

  insertTasks([taskObject], ".list");

  form.reset();
  toggleForm(event, true);
}

function needToToggle(targetClass, hide) {
  return (
    targetClass === "header__show-form" ||
    targetClass === "add-task-form__hide-form" ||
    hide
  );
}
