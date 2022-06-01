function getHTMLforTask(task) {
  const { id, name, description, done, due_date, list_id } = task;
  const taskHTML = `<section class="task" id="task-${id}">
    ${statusHTML(id, done, name)}    
    ${dateHTML(due_date, done)}
    ${descriptionHTML(description)}
  </section>`;
  return taskHTML;
}

insertTasks(tasks);

function insertTasks(tasks) {
  const list = document.querySelector(".list");
  tasks.forEach((task) => {
    const html = getHTMLforTask(task);
    insertHTML(list, html);
  });
}

function insertHTML(element, html) {
  element.innerHTML += html;
}

function dateHTML(dueDate, done) {
  const today = new Date();

  let overDue = " task__date_overdue";
  if (done || !dueDate || dueDate > today) {
    overDue = "";
  }

  let dateFormmated = dueDate
    ? ": " + Intl.DateTimeFormat("en-US").format(dueDate)
    : " is not set";

  return `<p class="task__date${overDue}">
    Due date<span class="task__due-date">${dateFormmated}</span>
  </p>`;
}

function descriptionHTML(description) {
  if (description) {
    return `<p class="task__description">${description}</p>`;
  }
  return "";
}

function statusHTML(id, done, name) {
  let status = "";
  if (done) {
    status = " task__status_done";
  }

  return `<div class="task__status${status}">
        <input
            type="checkbox"
            name="done"
            class="task__checkbox"
            value="false"
            ${done ? "checked" : ""}
        />
        <span 
            id="checkbox-task-${id}" 
            class="task__custom-checkbox">
        </span>    
        <label class="task__name" for="task-${id}">${name}</label>
    </div>`;
}
