function saveToLocalStorage(event) {
  event.preventDefault();
  const amount = event.target.amount.value;
  const description = event.target.description.value;
  const category = event.target.category.value;
  // localStorage.setItem("amount", amount);
  // localStorage.setItem("description", description);
  // localStorage.setItem("category", category);

  const obj = {
    amount,
    description,
    category,
  };

  localStorage.setItem(obj.category, JSON.stringify(obj));
  showNewUserOnScreen(obj);
}

window.addEventListener("DOMContentLoaded", () => {
  const localStorageObj = localStorage;
  const localstoragekeys = Object.keys(localStorageObj);

  for (var i = 0; i < localstoragekeys.length; i++) {
    const key = localstoragekeys[i];
    const userDetailsString = localStorageObj[key];
    const userDetailsObj = JSON.parse(userDetailsString);
    showNewUserOnScreen(userDetailsObj);
  }
});

function showNewUserOnScreen(user) {
  if (localStorage.getItem(user.category) !== null) {
    removeUserFromScreen(user.category);
  }

  const parentNode = document.getElementById("listOfExpenses");
  const childHTML = `<li id=${user.category}> ${user.amount} - ${user.description} - ${user.category}
                     <button onclick=deleteUser('${user.category}')> Delete </button>
                     <button onclick=editUserDetails('${user.category}','${user.amount}','${user.description}')> Edit </button>
                     </li>`;
  parentNode.innerHTML = parentNode.innerHTML + childHTML;
}

function removeUserFromScreen(category) {
  const parentNode = document.getElementById("listOfExpenses");
  const childNodeToBeDeleted = document.getElementById(category);

  if (childNodeToBeDeleted) {
    parentNode.removeChild(childNodeToBeDeleted);
  }
}

function deleteUser(category) {
  console.log(category);
  localStorage.removeItem(category);
  removeUserFromScreen(category);
}

function editUserDetails(category, amount, description) {
  console.log(category);
  document.getElementById("category").value = category;
  document.getElementById("amount").value = amount;
  document.getElementById("description").value = description;
  deleteUser(category);
}
