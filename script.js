"use strict";

// VARIABLES

const form = document.querySelector(".form");
const inputTitle = document.querySelector(".input-title");
const textDescription = document.querySelector(".description");
const todoSection = document.querySelector("#todo");
const deleteItem = document.querySelector(".bi-x-lg");
const countTotal = document.querySelector("#count");
const totalBtn = document.querySelector("#all");
const completedBtn = document.querySelector("#completed");
const countCompleted = document.querySelector("#count-completed");
const activeBtn = document.querySelector("#active");
const countActive = document.querySelector("#count-active");
const infoBtn = document.querySelector(".info button");
const db = localStorage;
let i = 0,
  j = 0,
  k;

// FUNCTIONS

function loadTODOs() {
  let keys = Object.keys(db);
  for (const key of keys) {
    i++;
    let todoItem = JSON.parse(db.getItem(key));
    createList(todoItem, db);
  }
  k = i - j;
  countTotal.textContent = i;
  countActive.textContent = k;
  countCompleted.textContent = j;
}

function createList(todo, db) {
  const { id, title, description, checked } = todo;
  const titleEl = document.createElement("H2");
  titleEl.classList.add("todo-title");
  titleEl.textContent = title;

  const descriptionEl = document.createElement("P");
  descriptionEl.classList.add("todo-descr");
  descriptionEl.textContent = description;

  const checkBox = document.createElement("INPUT");
  checkBox.setAttribute("type", "checkbox");
  checkBox.classList.add("todo-check");
  let item = JSON.parse(db.getItem("checked"));
  checkBox.addEventListener("click", (e) => {
    if (checkBox.checked) {
      j++;
      k = i - j;
      item = true;
      todo.checked = item;
      db.setItem(id, JSON.stringify(todo));
    } else {
      if (j === 0) {
        j = 0;
      } else {
        j--;
      }
      item = false;
      todo.checked = item;
      db.setItem(id, JSON.stringify(todo));
      k = i - j;
    }
    countCompleted.textContent = j;
    countActive.textContent = k;
  });
  if (checked === true) {
    checkBox.setAttribute("checked", checked);
    j++;
  }

  const deleteBtn = document.createElement("BUTTON");
  deleteBtn.classList.add("bi", "bi-x-lg");

  const todoText = document.createElement("DIV");
  todoText.classList.add("todo-text");
  todoText.appendChild(titleEl);
  todoText.appendChild(descriptionEl);

  const todoEl = document.createElement("DIV");
  todoEl.classList.add("todo-item");
  todoEl.appendChild(checkBox);
  todoEl.appendChild(todoText);
  todoEl.appendChild(deleteBtn);

  todoSection.appendChild(todoEl);

  deleteBtn.onclick = () => {
    todoSection.removeChild(todoEl);
    db.removeItem(todo.id);
    i--;
    j--;
    if (k === 0) {
      k = 0;
    } else {
      k = i - j;
    }
    countCompleted.textContent = j;
    countTotal.textContent = i;
    countActive.textContent = k;
  };

  countCompleted.textContent = j;
  countTotal.textContent = i;
  countActive.textContent = k;

  totalBtn.addEventListener("click", () => location.reload());

  completedBtn.addEventListener("click", () => {
    if (!checkBox.getAttribute("checked")) {
      todoSection.removeChild(todoEl);
    }
  });

  activeBtn.addEventListener("click", () => {
    if (checkBox.getAttribute("checked")) {
      todoSection.removeChild(todoEl);
    }
  });
}

// EVENT LISTENERS

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (
    (inputTitle.value === "" && textDescription.value === "") ||
    inputTitle.value === ""
  ) {
    alert("Please fill all inputs");
    inputTitle.value = "";
    textDescription.value = "";
  } else {
    const todo = {
      id: Math.trunc(Math.random() * 1000) + 1,
      title: inputTitle.value,
      description: textDescription.value,
      checked: false,
    };
    db.setItem(todo.id, JSON.stringify(todo));
    createList(todo, db);
    inputTitle.value = "";
    textDescription.value = "";
    i++;
    k = i - j;
    countTotal.textContent = i;
    countCompleted.textContent = j;
    countActive.textContent = k;
  }
});

infoBtn.addEventListener("click", (e) => {});

loadTODOs();
