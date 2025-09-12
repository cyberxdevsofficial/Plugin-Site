/* ===== Matrix Background ===== */
(function matrixInit(){
  const canvas = document.getElementById("matrixBackground");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  function resize(){ canvas.width = innerWidth; canvas.height = innerHeight; }
  resize();
  window.addEventListener("resize", resize);

  const chars = "01ABCDEFGHIJKLMNOPQRSTUVWXYZ$%#@*&^abcdefghijklmnopqrstuvwxyz0123456789";
  const fontSize = 14;
  let columns = Math.floor(canvas.width / fontSize);
  let drops = new Array(columns).fill(1);

  function draw(){
    ctx.fillStyle = "rgba(0,0,0,0.12)";
    ctx.fillRect(0,0,canvas.width,canvas.height);
    ctx.fillStyle = "#0f0";
    ctx.font = fontSize + "px monospace";
    for (let i = 0; i < drops.length; i++) {
      const text = chars.charAt(Math.floor(Math.random()*chars.length));
      ctx.fillText(text, i * fontSize, drops[i] * fontSize);
      if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
      drops[i]++;
    }
  }
  setInterval(draw, 45);
})();

/* ===== Plugins storage helpers ===== */
function ensureStorage(){
  if (!localStorage.getItem("plugins")) localStorage.setItem("plugins", JSON.stringify([]));
}
ensureStorage();

function getPlugins(){
  ensureStorage();
  return JSON.parse(localStorage.getItem("plugins") || "[]");
}

function setPlugins(arr){
  localStorage.setItem("plugins", JSON.stringify(arr));
}

/* Add plugin object: {id, title, desc, lang, code, createdAt} */
function addPlugin(plugin){
  const list = getPlugins();
  plugin.id = Date.now() + "-" + Math.floor(Math.random()*9999);
  plugin.createdAt = new Date().toISOString();
  list.unshift(plugin);
  setPlugins(list);
}

/* Render marketplace list */
function renderPluginsList(){
  const container = document.getElementById("pluginsList");
  if (!container) return;
  const list = getPlugins();
  container.innerHTML = list.length ? list.map(p => pluginCardHtml(p)).join("") : "<p class='muted'>No plugins yet. Admin can add plugins from the Admin page.</p>";
  // wire view buttons
  document.querySelectorAll(".view-plugin-btn").forEach(btn=>{
    btn.addEventListener("click", ()=> openPluginModal(btn.dataset.id));
  });
}

function renderAdminPlugins(){
  const container = document.getElementById("adminPluginsList");
  if (!container) return;
  const list = getPlugins();
  container.innerHTML = list.length ? list.map(p => adminPluginHtml(p)).join("") : "<p class='muted'>No plugins uploaded.</p>";
  // wire delete
  document.querySelectorAll(".admin-delete-btn").forEach(b=>{
    b.addEventListener("click", ()=> {
      if (!confirm("Delete this plugin?")) return;
      deletePlugin(b.dataset.id);
      renderAdminPlugins();
      renderPluginsList();
    });
  });
}

/* Helper HTML */
function pluginCardHtml(p){
  return `
    <div class="plugin-card">
      <h4>${escapeHtml(p.title)}</h4>
      <p>${escapeHtml(p.desc)}</p>
      <div class="plugin-actions">
        <button class="btn view-plugin-btn" data-id="${p.id}">View</button>
        <button class="btn" onclick="downloadPlugin('${p.id}')">Download</button>
        <small style="color:var(--muted);margin-left:auto">${p.lang}</small>
      </div>
    </div>`;
}

function adminPluginHtml(p){
  return `
    <div class="plugin-card">
      <h4>${escapeHtml(p.title)}</h4>
      <p>${escapeHtml(p.desc)}</p>
      <div style="display:flex;gap:8px;align-items:center">
        <small class="muted">${p.lang} • ${new Date(p.createdAt).toLocaleString()}</small>
        <button class="btn admin-delete-btn" data-id="${p.id}" style="margin-left:auto">Delete</button>
      </div>
    </div>`;
}

/* Modal open */
function openPluginModal(id){
  const list = getPlugins();
  const p = list.find(x=>x.id===id);
  if (!p) return alert("Plugin not found");
  document.getElementById("modalTitle").textContent = p.title;
  document.getElementById("modalDesc").textContent = p.desc;
  document.getElementById("modalLang").textContent = p.lang;
  document.getElementById("modalCode").textContent = p.code;
  const down = document.getElementById("downloadBtn");
  down.onclick = ()=> downloadPlugin(p.id);
  document.getElementById("pluginModal").style.display = "block";
}

/* Download plugin as file (filename from title + ext guess) */
function downloadPlugin(id){
  const list = getPlugins();
  const p = list.find(x=>x.id===id);
  if (!p) return alert("Plugin not found");
  const ext = (p.lang||"txt").toLowerCase();
  const map = { javascript: "js", js:"js", python:"py", py:"py", shell:"sh", sh:"sh", json:"json" };
  const fileExt = map[ext] || ext.split("/").pop() || "txt";
  const filename = p.title.replace(/[^a-z0-9_\-\.]/gi,"_") + "." + fileExt;
  const blob = new Blob([p.code], {type: "text/plain;charset=utf-8"});
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
}

/* Delete plugin */
function deletePlugin(id){
  let list = getPlugins();
  list = list.filter(p => p.id !== id);
  setPlugins(list);
}

/* Util: escape HTML for safe display */
function escapeHtml(s){
  if (!s) return "";
  return s.replace(/[&<>"']/g, function(m){ return ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":"&#39;"}[m]); });
}

/* Init rendering on pages */
document.addEventListener("DOMContentLoaded", ()=>{
  renderPluginsList();
  renderAdminPlugins();
});
