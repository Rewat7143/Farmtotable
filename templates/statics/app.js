const rec = document.getElementById("logout");

const checkToken = () => {
  const tok = window.localStorage.getItem("token")
  if (tok) {
    rec.textContent = "Logout";
  } else {
    rec.textContent = "Login";
  }
}

checkToken()

rec.addEventListener("click", () => {
  console.log("hi")
  const tok = window.localStorage.getItem("token");
  checkToken();
  if (tok != null) {
    window.localStorage.clear();
  } else {
    null;
  }
  window.location.href = "/templates/login.html";
})