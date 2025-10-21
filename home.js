const currentUser = localStorage.getItem("currentUser");

if (!currentUser) {
   window.location.href = "index.html"; 
}

document.getElementById("currentUserName").innerHTML = currentUser;

function logout() {
  localStorage.removeItem("currentUser");
}
