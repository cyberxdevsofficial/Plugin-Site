// admin.js - admin login handling
function loadAdmins(){ return JSON.parse(localStorage.getItem("admins")||"[]"); }
function checkAdminCredentials(user, pass){
  const admins = loadAdmins();
  return admins.some(a => a.user === user && a.pass === pass);
}
function checkAdminPassword(pass){
  const admins = loadAdmins();
  return admins.some(a => a.pass === pass);
}

const adminForm = document.getElementById("adminLoginForm");
if(adminForm){
  adminForm.addEventListener("submit", e=>{
    e.preventDefault();
    const user = document.getElementById("adminUser").value.trim();
    const pass = document.getElementById("adminPass").value;
    if(checkAdminCredentials(user, pass)){
      // mark admin as authenticated for this session
      sessionStorage.setItem("isAdmin", "1");
      window.location.href = "admin-dashboard.html";
    } else {
      alert("Invalid admin credentials");
    }
  });
}
