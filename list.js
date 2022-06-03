function insertList(className) {
  const listElement = document.createElement("section");
  listElement.className = className;
  listElement.appendChild(getListNameElement('Undone tasks'));
  listElement.addEventListener("click", deleteTaskInDOM);
  listElement.addEventListener("click", checkTask);

  const mainContent = document.querySelector(".main-content");
  mainContent.appendChild(listElement);
}

function getListNameElement(listName) {
  const listNameElement = document.createElement("h2");
  listNameElement.className = "list__name";
  listNameElement.textContent = listName;
  return listNameElement;
}

function toggleDoneTasks(event) {
    if (event.target.className === 'header__checkbox') {    
        let listName = event.target.checked ? 'All Tasks' : 'Undone tasks';    
        const listElement = document.querySelector('.list');
        listElement.querySelector('.list__name').textContent = listName;
        listElement.classList.toggle('list_show-done');
    }
}