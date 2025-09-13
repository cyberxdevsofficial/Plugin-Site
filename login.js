// login.js
const loginForm = document.getElementById("loginForm");
if(loginForm){
  loginForm.addEventListener("submit", e=>{
    e.preventDefault();
    const user = document.getElementById("loginUsername").value.trim();
    const pass = document.getElementById("loginPassword").value;
    const users = JSON.parse(localStorage.getItem("users")||"[]");
    const found = users.find(u=>u.username===user && u.password===pass);
    if(found){
      localStorage.setItem("loggedInUser", JSON.stringify(found));
      alert("Login successful");
      window.location.href = "index.html";
    } else {
      alert("Invalid credentials");
    }
  });
}
