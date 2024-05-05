const itemForm = document.querySelector("#form");
const itemInput = document.querySelector("#input");
const itemList = document.querySelector(".item-list");
const filter = document.querySelector("#filter");
const clearAllList = document.querySelector(".clearList");

function displayAllList() {
  const items = getAllFromLocalStorage();
  items.forEach((item) => {
    return addListToDisplay(item);
  });
}
//!add item to lits
function addItem(e) {
  e.preventDefault();
  const value = itemInput.value;
  if (value === "") {
    alert("please fill in the form");
    return;
  }
  //* creating li start here
  addListToDisplay(value);
  addItemTolocalStorage(value);

  itemInput.value = "";
}
//!add item to list end here

function addListToDisplay(text) {
  const li = document.createElement("li");
  li.className = "list";
  li.appendChild(document.createTextNode(text));

  const button = createButton("remove");
  li.appendChild(button);
  //* creating li ends here

  itemList.appendChild(li);
}

//!get all item  from  localStorage

function getAllFromLocalStorage() {
  let getItemsFromStorage;
  if (localStorage.getItem("items") === null) {
    getItemsFromStorage = [];
  } else {
    getItemsFromStorage = JSON.parse(localStorage.getItem("items"));
  }
  return getItemsFromStorage;
}

//!get all items from localstorage

//*get all items from localstorege ends here

function addItemTolocalStorage(item) {
  const getItemsFromStorage = getAllFromLocalStorage();

  getItemsFromStorage.push(item);

  localStorage.setItem("items", JSON.stringify(getItemsFromStorage));
}

//?
//!this is button
function createButton(classes) {
  const button = document.createElement("button");
  button.className = classes;
  const icon = createIcon("fa-solid fa-xmark");
  button.appendChild(icon);

  return button;
}
//!button end here
//?
//!this is icon
function createIcon(classes) {
  const icon = document.createElement("i");
  icon.className = classes;

  return icon;
}
//!icon ends here
function onItemClicked(e) {
  const target = e.target.parentElement.classList.contains("remove");
  if (target) {
    remove(e.target.parentElement.parentElement);
  }
}

//* remove item from list

function remove(item) {
  if (confirm("are you sure you wanna delete")) {
    item.remove();
  }
  removeFromLocalStorage(item);
}

function removeFromLocalStorage(item) {
  let dataFromLocalStorage = getAllFromLocalStorage();

  dataFromLocalStorage = dataFromLocalStorage.filter(
    (i) => i !== item.textContent
  );

  localStorage.setItem("items", JSON.stringify(dataFromLocalStorage));
}
//* remove item from list end here

//! clear all list
function clearList() {
  //   itemList.innerHTML = "";
  while (itemList.firstChild) {
    // itemList.firstChild.remove();
    itemList.removeChild(itemList.firstChild);
  }
}
//! clear all list end here

function filterList(e) {
  const items = document.querySelectorAll("li");
  const target = e.target.value.toLowerCase();
  items.forEach((item) => {
    const nameofItem = item.firstChild.textContent.toLowerCase();
    if (nameofItem.indexOf(target) !== -1) {
      item.style.display = "flex";
    } else {
      item.style.display = "none";
    }
  });
}

itemForm.addEventListener("submit", addItem);
itemList.addEventListener("click", onItemClicked);
clearAllList.addEventListener("click", clearList);
filter.addEventListener("input", filterList);
document.addEventListener("DOMContentLoaded", displayAllList);
