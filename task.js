function insertTasks(tasks, listClass) {
  const list = document.querySelector(listClass);
  tasks.forEach((task) => {
    const taskElement = getTaskElement(task);
    list.appendChild(taskElement);
  });
}

function getTaskElement(task) {
  const { id, name, description, done, due_date, list_id } = task;

  const taskElement = document.createElement("section");
  taskElement.className = `task${done ? " task_done" : ""}`;
  taskElement.innerHTML = `<img src="./trash-bin (1).png" alt="a trash can button" class="task__delete">
  ${statusHTML(id, done, name)}
  ${dateHTML(due_date)}
  ${descriptionHTML(description)}`;

  return taskElement;
}

function dateHTML(dueDateStringOrDate) {
  const { overDue, dateFormmated } = formatDate(dueDateStringOrDate);

  return `<p class="task__date${overDue}">
    Due date<span class="task__due-date">${dateFormmated}</span>
  </p>`;
}

function formatDate(dueDateStringOrDate) {
  const today = new Date();
  const dueDate = dueDateStringOrDate ? new Date(dueDateStringOrDate) : "";

  let overDue = " task__date_overdue";
  if (!dueDate || dueDate > today) {
    overDue = "";
  }

  let dateFormmated = dueDate
    ? ": " + Intl.DateTimeFormat("en-US").format(dueDate)
    : " is not set";

  return {
    overDue,
    dateFormmated,
  };
}

function descriptionHTML(description) {
  if (description) {
    return `<p class="task__description">${description}</p>`;
  }
  return "";
}

function statusHTML(id, done, name) {
  return `<div class="task__status">
        <input
            id="task-${id}"
            type="checkbox"
            name="done"
            class="task__checkbox"
            ${done ? "checked" : ""}
        />
        <label class="task__name" for="task-${id}">${name}</label>        
    </div>`;
}

function deleteTaskElement(event) {
  if (event.target.className === "task__delete") {
    const parentOfAButton = event.target.parentElement;
    const parentOfTheParent = parentOfAButton.parentElement;
    parentOfTheParent.removeChild(parentOfAButton);
  }
}

function checkTask(event) {
  if (event.target.className === "task__checkbox") {
    const taskElement = event.target.parentElement.parentElement;
    taskElement.classList.toggle("task_done");
  }
}
