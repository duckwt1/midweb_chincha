const createUserForm = document.querySelector("#createUserForm");

const createName = document.querySelector("#createName");
const createAdress = document.querySelector("#createAdress");
const createZipcode = document.querySelector("#createZipcode");
const createCity = document.querySelector("#createCity");
const createEmail = document.querySelector("#createEmail");
const createPassword = document.querySelector("#createPassword");
const createPhone = document.querySelector("#createPhone");

const userArr = () => {
    const users = (() => {
      const userValue = localStorage.getItem('users');
      return userValue === null
        ? []
        : JSON.parse(userValue);
    })();

    users.push({
      "name": createName.value, 
      "adress": createAdress.value,
      "zipcode": createZipcode.value,
      "city": createCity.value,
      "email": createEmail.value,
      "password": createPassword.value,
      "phone": createPhone.value
    });

    localStorage.setItem('users', JSON.stringify(users));
  }

createUserForm.addEventListener("submit", (e) => {
  e.preventDefault();
  userArr();
  window.location.replace("login.html");
})