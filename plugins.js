// plugins.js - manage plugins (add, delete, render)
function getPlugins(){ return JSON.parse(localStorage.getItem("plugins")||"[]"); }
function setPlugins(arr){ localStorage.setItem("plugins", JSON.stringify(arr)); }

const pluginForm = document.getElementById("pluginForm");
const pluginList = document.getElementById("pluginList");

function renderPlugins(){
  const arr = getPlugins();
  if(!pluginList) return;
  pluginList.innerHTML = arr.length ? arr.map((p, idx)=>`
    <div class="plugin-item">
      <h4>${escapeHtml(p.title)}</h4>
      <p>${escapeHtml(p.desc)}</p>
      <pre class="muted">${escapeHtml(p.code||"")}</pre>
      <div><button class="btn" onclick="promptDeletePlugin(${idx})">Delete</button></div>
    </div>
  `).join('') : `<p class="muted">No plugins found.</p>`;
}

function promptDeletePlugin(idx){
  const pass = prompt("Enter admin password to delete plugin:");
  if(checkAdminPassword(pass)){
    const arr = getPlugins();
    arr.splice(idx,1);
    setPlugins(arr);
    renderPlugins();
  } else alert("Wrong password");
}

if(pluginForm){
  pluginForm.addEventListener("submit", e=>{
    e.preventDefault();
    const title = document.getElementById("pTitle").value.trim();
    const desc = document.getElementById("pDesc").value.trim();
    const code = document.getElementById("pCode").value.trim();
    const pass = document.getElementById("pPass").value;
    if(!checkAdminPassword(pass)){ alert("Wrong admin password"); return; }
    const arr = getPlugins();
    arr.unshift({title, desc, code, createdAt: new Date().toISOString()});
    setPlugins(arr);
    pluginForm.reset();
    renderPlugins();
  });
}

document.addEventListener("DOMContentLoaded", renderPlugins);
