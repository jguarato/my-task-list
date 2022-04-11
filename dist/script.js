hideOrShowInputTask();

var taskList = [];
var completedTaskList = [];


function addTask() {

  hideOrShowInputTask();
  hideOrShowAddButton();

  var newTaskField = document.getElementById("newTask");
  newTaskField.focus();

}

function saveTask() {

  var newTaskField = document.getElementById("newTask");
  var newTaskValue = newTaskField.value;
  var taskIndex = taskList.length;

  if (newTaskValue) {
    taskList.push(newTaskValue);
    printTaskList();

  }

  newTaskField.value = "";

  hideOrShowInputTask();
  hideOrShowAddButton();

}

function hideOrShowInputTask() {

  var newTaskId = document.getElementById("newTask");
  hideOrShowElement(newTaskId);

  var saveButtonId = document.getElementById("saveButton");
  hideOrShowElement(saveButtonId);

}


function hideOrShowAddButton() {

  var circleButtonId = document.getElementById("circleButton");
  hideOrShowElement(circleButtonId);

  var addButtonId = document.getElementById("addButton");
  hideOrShowElement(addButtonId);

}


function hideOrShowElement(elementId) {

  if (elementId.style.display === "none") {
    elementId.style.display = "block";

  } else {
    elementId.style.display = "none";

  }

}


function updateTasksNumber(listType) {

  var tasksNumber = document.getElementById("tasksNumber");
  if (taskList.length == 0) {
    tasksNumber.innerHTML = `<br>`;

  } else if (taskList.length == 1) {
    tasksNumber.innerHTML = `${taskList.length} task`;

  } else {
    tasksNumber.innerHTML = `${taskList.length} tasks`;

  }

}

function showOrHideTrash(element) {

  var trashCan = element.getElementsByTagName("span")[1];
  hideOrShowElement(trashCan);

}




function concludeItem(itemId) {

  var completedTaskValue = taskList[itemId];
  taskList.splice(itemId, 1);
  completedTaskList.push(completedTaskValue);

  printTaskList();
  printCompletedList();

}

function turnItemBack(itemId) {

  var completedTaskValue = completedTaskList[itemId];
  completedTaskList.splice(itemId, 1);
  taskList.push(completedTaskValue);

  printTaskList();
  printCompletedList();

}

function printTaskList() {

  var html = "";

  for (let i = 0; i < taskList.length; i++) {

    html += `<div class="list-item" onmouseover="showOrHideTrash(this)" onmouseout="showOrHideTrash(this)">`;
    html += `<label>${taskList[i]}<input type="checkbox"><span class="checkmark" onclick="concludeItem(${i})"></span></label>`;
    html += `<span class="remove-item" style="display:none" onclick="deleteInTaskList(${i})">`;
    html += `<i class="fi fi-ss-trash"></i></span></div>`;

  }

  var getListContent = document.getElementById("listContent");
  getListContent.innerHTML = html;
  
  updateTasksNumber();

}


function printCompletedList() {
  
  var getListContent = document.getElementById("completedListContent");
  var html = "";
  
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