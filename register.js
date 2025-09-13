// register.js
const registerForm = document.getElementById("registerForm");
if(registerForm){
  registerForm.addEventListener("submit", e=>{
    e.preventDefault();
    const username = document.getElementById("regUsername").value.trim();
    const email = document.getElementById("regEmail").value.trim();
    const phone = document.getElementById("regPhone").value.trim();
    const password = document.getElementById("regPassword").value;
    let users = JSON.parse(localStorage.getItem("users")||"[]");
    if(users.find(u=>u.username===username)){ alert("Username already taken"); return; }
    const newUser = { username, email, phone, password, coins:10, joined: new Date().toISOString() };
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));
    alert("Registered successfully. You have 10 coins.");
    window.location.href = "login.html";
  });
}
