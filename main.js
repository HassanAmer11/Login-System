
/* Sing up inputs */
var userNameInput = document.querySelector("[name='UserName']");
var emailInput = document.querySelector("[name='Email']");
var passwordInput = document.querySelector("[name='pswd']");

/* login inputs */
var LgnEmailInput = document.querySelector("[name='email']");
var LgnPasswordInput = document.querySelector("[name='password']");

var invalidEmail = document.querySelector(".incorrect-email");

var forms = document.querySelectorAll("form");
for (let i = 0; i < forms.length; i++) {
  forms[i].addEventListener("submit", function (event) {
    event.preventDefault();
  });
}

var signUpBtn = document.querySelector(".sign-up");

signUpBtn.addEventListener("click", function (event) {
  addNewUsr();
});

var loginBtn = document.querySelector(".sign-in");

loginBtn.addEventListener("click", function (event) {
  Login();
});

var usersList = JSON.parse(localStorage.getItem("users")) || [];

function addNewUsr() {
  var user = {
    userName: userNameInput.value,
    email: emailInput.value,
    password: passwordInput.value,
  };
  usersList.push(user);
  localStorage.setItem("users", JSON.stringify(usersList));
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

emailInput.addEventListener("input", function (event) {
  debugger
  validateEmailAddress();
})

function validateEmailAddress() {
  var regex =
    /(?:[a-z0-9!#$%&'*+\x2f=?^_`\x7b-\x7d~\x2d]+(?:\.[a-z0-9!#$%&'*+\x2f=?^_`\x7b-\x7d~\x2d]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9\x2d]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9\x2d]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9\x2d]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

  if (regex.test(emailInput.value)) {
    //hide error pragraph + set vaild class
    emailInput.nextElementSibling.classList.add("d-none");
    emailInput.classList.remove("is-invalid");
    emailInput.classList.add("is-valid");
  }
  else {
    //show error pragraph + set invaild class
    emailInput.nextElementSibling.classList.remove("d-none");
    emailInput.classList.remove("is-valid");
    emailInput.classList.add("is-invalid");
  }
}