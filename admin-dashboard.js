// admin-dashboard.js - admin features: list plugins, comments, add admins, stats
function loadAdmins(){ return JSON.parse(localStorage.getItem("admins")||"[]"); }
function setAdmins(a){ localStorage.setItem("admins", JSON.stringify(a)); }

function ensureDefaultAdmin(){
  const admins = loadAdmins();
  if(admins.length === 0){
    admins.push({user:'admin', pass:'Anuga123'});
    setAdmins(admins);
  }
}
ensureDefaultAdmin();

function getUsers(){ return JSON.parse(localStorage.getItem("users")||"[]"); }
function getPlugins(){ return JSON.parse(localStorage.getItem("plugins")||"[]"); }
function getComments(){ return JSON.parse(localStorage.getItem("comments")||"[]"); }
function getMarket(){ return JSON.parse(localStorage.getItem("marketItems")||"[]"); }

function renderAdminData(){
  document.getElementById("viewsCount").textContent = localStorage.getItem("views") || "0";
  document.getElementById("usersCount").textContent = getUsers().length;
  document.getElementById("commentCount").textContent = getComments().length;
  document.getElementById("adminCoins").textContent = (JSON.parse(localStorage.getItem("adminData")||'{"coins":10000000}').coins || 10000000).toLocaleString();

  // plugins list
  const node = document.getElementById("adminPluginList");
  node.innerHTML = getPlugins().map((p, idx)=>`
    <div class="plugin-item">
      <h4>${escapeHtml(p.title)}</h4>
      <p>${escapeHtml(p.desc)}</p>
      <small class="muted">${p.createdAt?p.createdAt:''}</small>
      <div><button class="btn" onclick="adminDeletePlugin(${idx})">Delete</button></div>
    </div>
  `).join('') || '<p class="muted">No plugins</p>';

  // comments
  const cmnode = document.getElementById("adminComments");
  cmnode.innerHTML = getComments().map((c, idx)=>`
    <div class="comment-card">
      <strong>${escapeHtml(c.name)}</strong>
      <p>${escapeHtml(c.text)}</p>
      ${(c.replies||[]).map(r=>`<p class="muted">↳ ${escapeHtml(r)}</p>`).join('')}
      <div>
        <button class="btn" onclick="adminReplyPrompt(${idx})">Reply</button>
      </div>
    </div>
  `).join('') || '<p class="muted">No comments</p>';

  // admins list
  const adminsNode = document.getElementById("adminsList");
  const admins = loadAdmins();
  adminsNode.innerHTML = admins.map((a, i)=>`<div class="muted">#${i+1} ${escapeHtml(a.user)}</div>`).join('');
}

function adminDeletePlugin(idx){
  const pass = prompt("Enter admin password to delete plugin:");
  if(!checkAdminPassword(pass)){ alert("Wrong password"); return; }
  const arr = getPlugins();
  arr.splice(idx,1);
  localStorage.setItem("plugins", JSON.stringify(arr));
  renderAdminData();
}

function adminReplyPrompt(idx){
  const admins = loadAdmins();
  const pass = prompt("Enter admin password to reply:");
  if(!checkAdminPassword(pass)){ alert("Wrong password"); return; }
  const text = prompt("Reply text:");
  if(!text) return;
  const comments = getComments();
  comments[idx].replies = comments[idx].replies || [];
  comments[idx].replies.push(text);
  localStorage.setItem("comments", JSON.stringify(comments));
  renderAdminData();
}

/* add admin form */
const addAdminForm = document.getElementById("addAdminForm");
if(addAdminForm){
  addAdminForm.addEventListener("submit", e=>{
    e.preventDefault();
    const u = document.getElementById("newAdminUser").value.trim();
    const p = document.getElementById("newAdminPass").value;
    if(!u||!p){ alert("Fill both fields"); return; }
    const admins = loadAdmins();
    admins.push({user:u, pass:p});
    setAdmins(admins);
    document.getElementById("newAdminUser").value="";
    document.getElementById("newAdminPass").value="";
    renderAdminData();
    alert("Admin added");
  });
}

/* require admin session check */
(function requireAdmin(){
  if(sessionStorage.getItem("isAdmin") !== "1"){
    // redirect to admin login
    if(!/admin-dashboard.html$/i.test(location.pathname)) return;
    location.href = "admin.html";
  }
})();

document.addEventListener("DOMContentLoaded", renderAdminData);
