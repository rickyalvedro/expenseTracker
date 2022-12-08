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

  axios
    .post(
      "https://crudcrud.com/api/9651c79a40aa4064bc8151e3ead9426a/expensetracker",
      obj
    )
    .then((response) => {
      showNewUserOnScreen(response.data);
    })
    .catch((error) => {
      document.body.innerHTML += "<h4> Something went wrong </h4>";
      console.log(error);
    });

  // localStorage.setItem(obj.category, JSON.stringify(obj));
  // showNewUserOnScreen(obj);
}

window.addEventListener("DOMContentLoaded", () => {
  axios
    .get(
      "https://crudcrud.com/api/9651c79a40aa4064bc8151e3ead9426a/expensetracker"
    )
    .then((response) => {
      console.log(response);

      for (var i = 0; i < response.data.length; i++) {
        showNewUserOnScreen(response.data[i]);
      }
    })
    .catch((error) => {
      console.log(error);
    });
  // const localStorageObj = localStorage;
  // const localstoragekeys = Object.keys(localStorageObj);
  // for (var i = 0; i < localstoragekeys.length; i++) {
  //   const key = localstoragekeys[i];
  //   const userDetailsString = localStorageObj[key];
  //   const userDetailsObj = JSON.parse(userDetailsString);
  //   showNewUserOnScreen(userDetailsObj);
  // }
});

function showNewUserOnScreen(user) {
  document.getElementById("category").value = "";
  document.getElementById("amount").value = "";
  document.getElementById("description").value = "";
  if (localStorage.getItem(user._id) !== null) {
    removeUserFromScreen(user._id);
  }

  const parentNode = document.getElementById("listOfExpenses");
  const childHTML = `<li id=${user._id}> ${user.amount} - ${user.description} - ${user.category}
                     <button onclick="deleteUser('${user._id}')"> Delete Espense </button>
                     <button onclick="editUserDetails('${user.category}','${user.amount}','${user.description}','${user._id}')"> Edit Expense </button>
                     </li>`;
  parentNode.innerHTML = parentNode.innerHTML + childHTML;
}

function removeUserFromScreen(userId) {
  const parentNode = document.getElementById("listOfExpenses");
  const childNodeToBeDeleted = document.getElementById(userId);

  if (childNodeToBeDeleted) {
    parentNode.removeChild(childNodeToBeDeleted);
  }
}

function deleteUser(userId) {
  axios
    .delete(
      `https://crudcrud.com/api/9651c79a40aa4064bc8151e3ead9426a/expensetracker/${userId}`
    )
    .then((response) => {
      removeUserFromScreen(userId);
    })
    .catch((error) => {
      console.log(error);
    });
  // console.log(category);
  // localStorage.removeItem(category);
  // removeUserFromScreen(category);
}

function editUserDetails(category, amount, description, userId) {
  // console.log(category);
  document.getElementById("category").value = category;
  document.getElementById("amount").value = amount;
  document.getElementById("description").value = description;
  deleteUser(userId);
}
