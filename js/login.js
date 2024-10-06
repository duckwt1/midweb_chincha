const loginForm = document.querySelector("#loginForm");
const loginEmail = document.querySelector("#loginEmail");
const loginPassword = document.querySelector("#loginPassword");
const regBtn = document.querySelector("#regBtn");

const loggedInUser = () => {
  localStorage.removeItem("loggedInUser")
  localStorage.setItem("loggedInUser", JSON.stringify({
      email: loginEmail.value,
      password: loginPassword.value,
    })
  );

};


const checkUserInfo = () => {
  let userFound = false;

  if (localStorage.users) {
    let users = JSON.parse(localStorage.users);
    users.forEach((user) => {
      if (user.email === loginEmail.value) {
        if (user.password === loginPassword.value) {
          userFound = true;
        } 
      }
    });
  }

  if (userFound) {
    alert("login successful");
    loggedInUser();
  } else {
    alert("login failed");
  }
};

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  checkUserInfo();
  location.reload();
});

regBtn.addEventListener("click", (e) => {
  e.preventDefault();
  window.location.replace("skapa-login.html");
})