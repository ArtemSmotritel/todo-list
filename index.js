const header = document.querySelector('header');
const addTaskForm = document.forms['add-task'];
header.addEventListener('click', toggleDoneTasks);
header.addEventListener('click', toggleForm);
addTaskForm.addEventListener('submit', addNewTask);
addTaskForm.addEventListener('keyboard', toggleForm);

insertList('list', 'All tasks');
insertTasks(tasks, '.list');