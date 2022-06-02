const header = document.querySelector('header');
header.addEventListener('click', toggleDoneTasks);

insertList('list', 'All tasks');
insertTasks(tasks, '.list');