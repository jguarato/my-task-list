const taskList = [];
const completedTaskList = [];

function hideOrShowElement(elementId) {

  if (elementId.style.display === "none") {
    elementId.style.display = "block";
  } else {
    elementId.style.display = "none";
  }

}

function showOrHideTrash(element) {
  const trashCan = element.getElementsByTagName("span")[1];
  hideOrShowElement(trashCan);
}

function hideOrShowInputTask() {
  
  const newTaskId = document.getElementById("newTask");
  hideOrShowElement(newTaskId);

  const saveButtonId = document.getElementById("saveButton");
  hideOrShowElement(saveButtonId);

}


function hideOrShowAddButton() {

  const circleButtonId = document.getElementById("circleButton");
  hideOrShowElement(circleButtonId);

  const addButtonId = document.getElementById("addButton");
  hideOrShowElement(addButtonId);

}

function printTaskList() {

  let html = "";

  for (let i = 0; i < taskList.length; i++) {
    html += `<div class="list-item" onmouseover="showOrHideTrash(this)" onmouseout="showOrHideTrash(this)">`;
    html += `<label>${taskList[i]}<input type="checkbox"><span class="checkmark" onclick="concludeItem(${i})"></span></label>`;
    html += `<span class="remove-item" style="display:none" onclick="deleteInTaskList(${i})">`;
    html += `<i class="fi fi-ss-trash"></i></span></div>`;
  }

  const getListContent = document.getElementById("listContent");
  getListContent.innerHTML = html;
  
  updateTasksNumber();

}

function printCompletedList() {
  
  const getListContent = document.getElementById("completedListContent");
  let html = "";
  
  if (completedTaskList.length == 0) {
    getListContent.style.borderTop = "none";
  } else {
    getListContent.style.borderTop = "1px solid #788B84";
    html=`<h4>Completed (${completedTaskList.length})</h4>`;
  }
  
  for (let i = 0; i < completedTaskList.length; i++) {
    html += `<div class="list-item" onmouseover="showOrHideTrash(this)" onmouseout="showOrHideTrash(this)">`;
    html += `<label>${completedTaskList[i]}<input type="checkbox" checked><span class="checkmark" onclick="turnItemBack(${i})"></span></label>`;
    html += `<span class="remove-item" style="display:none" onclick="deleteInCompletedList(${i})">`;
    html += `<i class="fi fi-ss-trash"></i></span></div>`;
  }
  
  getListContent.innerHTML = html;

}

function deleteInTaskList(itemId) {
  taskList.splice(itemId, 1);
  printTaskList();
}

function deleteInCompletedList(itemId) {
  completedTaskList.splice(itemId, 1);
  printCompletedList();
}

function addTask() {
    
  const inputSpace = document.getElementsByClassName("menu-add")[0];
  inputSpace.classList.add("menu-add-extended");

  hideOrShowInputTask();
  hideOrShowAddButton();

  const newTaskField = document.getElementById("newTask");
  newTaskField.focus();

}

function saveTask() {

  const newTaskField = document.getElementById("newTask");
  const newTaskValue = newTaskField.value;
  const taskIndex = taskList.length;

  if (newTaskValue) {
    taskList.push(newTaskValue);
    printTaskList();
  }

  newTaskField.value = "";

  hideOrShowInputTask();
  hideOrShowAddButton();
  
  const inputSpace = document.getElementsByClassName("menu-add")[0];
  inputSpace.classList.remove("menu-add-extended");

}

function updateTasksNumber(listType) {

  const tasksNumber = document.getElementById("tasksNumber");
  if (taskList.length == 0) {
    tasksNumber.innerHTML = `<br>`;
  } else if (taskList.length == 1) {
    tasksNumber.innerHTML = `${taskList.length} task`;
  } else {
    tasksNumber.innerHTML = `${taskList.length} tasks`;
  }

}

function concludeItem(itemId) {

  const completedTaskValue = taskList[itemId];
  taskList.splice(itemId, 1);
  completedTaskList.push(completedTaskValue);

  printTaskList();
  printCompletedList();

}

function turnItemBack(itemId) {

  const completedTaskValue = completedTaskList[itemId];
  completedTaskList.splice(itemId, 1);
  taskList.push(completedTaskValue);

  printTaskList();
  printCompletedList();

}

hideOrShowInputTask();