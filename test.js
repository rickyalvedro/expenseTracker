function saveToLocalStorage(event) {
  event.preventDefault();
  const name = event.target.username.value;
  const email = event.target.emailid.value;
  const phoneNumber = event.target.phonenumber.value;
  // localStorage.setItem("name", name);
  // localStorage.setItem("email", email);
  // localStorage.setItem("phoneNumber", phoneNumber);

  const obj = {
    name,
    email,
    phoneNumber,
  };

  localStorage.setItem(obj.email, JSON.stringify(obj));
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
  document.getElementById("emailid").value = "";
  document.getElementById("username").value = "";
  document.getElementById("ph_no").value = "";
  if (localStorage.getItem(user.email) !== null) {
    removeUserFromScreen(user.email);
  }

  const parentNode = document.getElementById("listOfUsers");
  const childHTML = `<li id=${user.email}> ${user.name} - ${user.email} 
                     <button onclick=deleteUser('${user.email}')> Delete User </button>
                     <button onclick=editUserDetails('${user.email}','${user.name}','${user.phoneNumber}')> Edit User </button>
                     </li>`;
  parentNode.innerHTML = parentNode.innerHTML + childHTML;
}

function removeUserFromScreen(emailId) {
  const parentNode = document.getElementById("listOfUsers");
  const childNodeToBeDeleted = document.getElementById(emailId);

  if (childNodeToBeDeleted) {
    parentNode.removeChild(childNodeToBeDeleted);
  }
}

function deleteUser(emailId) {
  console.log(emailId);
  localStorage.removeItem(emailId);
  removeUserFromScreen(emailId);
}

function editUserDetails(emailId, name, phoneNumber) {
  document.getElementById("emailid").value = emailId;
  document.getElementById("username").value = name;
  document.getElementById("ph_no").value = phoneNumber;
  deleteUser(emailId);
}
