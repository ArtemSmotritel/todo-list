async function insertAllTasks(listClass) {
  const list = document.querySelector(listClass);
  tasksInMemory = [];
  const allTasksEndpoint = "http://localhost:3001/lists/1/tasks?all=true";

  let tasks;
  try {
    tasks = await getTasks(allTasksEndpoint);
    tasks.forEach((task) => {
      tasksInMemory.push(task);
      const taskElement = getTaskElement(task);
      list.appendChild(taskElement);
    });
  } catch (error) {
    console.log(error);
    // TODO: error handling, e.x. failed to connect screen or 'failed' inside list section
  }
}

function getTaskElement(task) {
  const { id, name, description, done, due_date, list_id } = task;

  const taskElement = document.createElement("section");
  taskElement.id = id;
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
  if (
    !dueDate ||
    dueDate > today ||
    (dueDate.getDate() == today.getDate() &&
      dueDate.getMonth() == today.getMonth() &&
      dueDate.getFullYear() == today.getFullYear())
  ) {
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

function deleteTask(event) {
  if (event.target.className === "task__delete") {
    const taskElement = event.target.parentElement;
    const id = taskElement.id;
    deleteTaskInDOM(taskElement);
    let deletedTask;

    try {
      deleteTaskOnServer(id);
      let index = tasksInMemory.findIndex((t) => t.id === id);
      deletedTask = tasksInMemory.splice(index, 1);
    } catch (error) {
      console.log(error);
      //tasksInMemory.push(deletedTask);
    }
  }
}

function deleteTaskInDOM(taskElement) {
  const listElement = taskElement.parentElement;
  listElement.removeChild(taskElement);
}

function deleteTaskOnServer(id) {
  const endpoint = `http://localhost:3001/tasks/${id}`;
  fetch(endpoint, {
    method: "DELETE",
  });
}

function checkTask(event) {
  if (event.target.className === "task__checkbox") {
    const taskElement = event.target.parentElement.parentElement;
    const id = taskElement.id;
    const newDone = !taskElement.classList.contains("task_done");
    checkTaskInDOM(taskElement);

    try {
      checkTaskOnServer(id, newDone);
    } catch (error) {
      console.log(error);
      checkTaskInDOM(taskElement);
    }
  }
}

function checkTaskInDOM(taskElement) {
  taskElement.classList.toggle("task_done");
}

function checkTaskOnServer(id, newDone) {
  const endpoint = `http://localhost:3001/tasks/${id}`;
  fetch(endpoint, {
    method: "PATCH",
    body: JSON.stringify({
      done: newDone,
    }),
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
  });
}

function findTaskInMemory(id) {
  return tasksInMemory.find((t) => (t.id = id));
}

async function getTasks(endpoint) {
  return fetch(endpoint)
    .then((res) => res.json())
    .catch((error) => {
      throw "Something went very wrong...";
    });
}
