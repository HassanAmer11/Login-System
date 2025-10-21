/* Define variables*/
var userNameInput = document.querySelector("[name='UserName']");
var emailInput = document.querySelector("[name='Email']");
var passwordInput = document.querySelector("[name='pswd']");

var LgnEmailInput = document.querySelector("[name='email']");
var LgnPasswordInput = document.querySelector("[name='password']");

var invalidEmail = document.querySelector(".incorrect-email");

var forms = document.querySelectorAll("form");
var signUpBtn = document.querySelector(".sign-up");
var loginBtn = document.querySelector(".sign-in");
var usersList = JSON.parse(localStorage.getItem("users")) || [];


/* Define funcations*/

function addNewUsr() {
  document.getElementById("exist").innerHTML = "";
  if (
    validateform(emailInput) &&
    validateform(userNameInput) &&
    validateform(passwordInput)
  ) {
    if (isUserExist()) return false;
    var user = {
      userName: userNameInput.value,
      email: emailInput.value,
      password: passwordInput.value,
    };
    usersList.push(user);
    localStorage.setItem("users", JSON.stringify(usersList));
    document.getElementById("exist").innerHTML = '<span class="text-success m-3">Success</span>';
    localStorage.setItem("currentUser", user.userName);
    setTimeout(showHome, "3000");      
  }
}

function showHome() {
  window.open("home.html", "_self");
}

function isUserExist() {
  for (let i = 0; i < usersList.length; i++) {
    const person = usersList[i];
    if (
      person.email.toLowerCase().trim() == emailInput.value.toLowerCase().trim()
    ) {
      document.getElementById("exist").innerHTML =
        '<span class="text-danger m-3">E-mail already exists</span>';
      return true;
    }
  }
  return false;
}

function Login() {
  for (let i = 0; i < usersList.length; i++) {
    const user = usersList[i];
    currentEmail = LgnEmailInput.value;
    currentPassword = LgnPasswordInput.value;
    if (user.email === currentEmail && user.password === currentPassword) {
      invalidEmail.classList.add("d-none");
      localStorage.setItem("currentUser", user.userName);
      window.open("home.html", "_self");
    } else {
      invalidEmail.classList.remove("d-none");
    }
  }
}

function validateform(inputPram) {
  var vaildObj = {
    Email:
      /(?:[a-z0-9!#$%&'*+\x2f=?^_`\x7b-\x7d~\x2d]+(?:\.[a-z0-9!#$%&'*+\x2f=?^_`\x7b-\x7d~\x2d]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9\x2d]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9\x2d]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9\x2d]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/,
    UserName: /^[A-Za-z][A-Za-z0-9_]{7,29}$/,
    pswd: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
  };

  if (vaildObj[inputPram.name].test(inputPram.value)) {
    //hide error paragraph + set valid class
    inputPram.nextElementSibling.classList.add("d-none");
    inputPram.classList.remove("is-invalid");
    inputPram.classList.add("is-valid");
    return true;
  } else {
    //show error paragraph + set invalid class
    inputPram.nextElementSibling.classList.remove("d-none");
    inputPram.classList.remove("is-valid");
    inputPram.classList.add("is-invalid");
    return false;
  }
}


/* Event Listener*/

for (let i = 0; i < forms.length; i++) {
  forms[i].addEventListener("submit", function (event) {
    event.preventDefault();
  });
}

signUpBtn.addEventListener("click", function (event) {
  addNewUsr();
});

loginBtn.addEventListener("click", function (event) {
  Login();
});

emailInput.addEventListener("input", function (event) {
  validateform(event.target);
});

passwordInput.addEventListener("input", function (event) {
  validateform(event.target);
});

userNameInput.addEventListener("input", function (event) {
  validateform(event.target);
});


