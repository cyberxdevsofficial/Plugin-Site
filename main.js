// main.js - comments system + menu + storage initialization
(function initStorage(){
  if(!localStorage.getItem("users")) localStorage.setItem("users", JSON.stringify([]));
  if(!localStorage.getItem("plugins")) localStorage.setItem("plugins", JSON.stringify([]));
  if(!localStorage.getItem("marketItems")) localStorage.setItem("marketItems", JSON.stringify([]));
  if(!localStorage.getItem("comments")) localStorage.setItem("comments", JSON.stringify([]));
  if(!localStorage.getItem("admins")) localStorage.setItem("admins", JSON.stringify([{user:'admin',pass:'Anuga123'}]));
  if(!localStorage.getItem("views")) localStorage.setItem("views", "0");
  // increment view count for analytics
  localStorage.setItem("views", String((parseInt(localStorage.getItem("views")||"0",10)+1)));
})();

// menu toggle
function toggleMenu(){
  const nav = document.getElementById("menuNav");
  if(nav) nav.classList.toggle("show");
}

// comment rendering & posting
const commentForm = document.getElementById("commentForm");
const commentsContainer = document.getElementById("comments");

function getComments(){ return JSON.parse(localStorage.getItem("comments")||"[]"); }
function setComments(arr){ localStorage.setItem("comments", JSON.stringify(arr)); }

function renderComments(){
  const list = getComments();
  if(!commentsContainer) return;
  commentsContainer.innerHTML = list.length ? list.map((c,idx)=>`
    <div class="comment-card">
      <strong>${escapeHtml(c.name)}</strong>
      <p>${escapeHtml(c.text)}</p>
      ${(c.replies||[]).map(r=>`<p class="muted">↳ ${escapeHtml(r)}</p>`).join('')}
    </div>
  `).join('') : `<p class="muted">No comments yet.</p>`;
}

// escape helper
function escapeHtml(s){ return String(s||"").replace(/[&<>"']/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":"&#39;"}[m])); }

if(commentForm){
  commentForm.addEventListener("submit", e=>{
    e.preventDefault();
    const name = document.getElementById("cName") ? document.getElementById("cName").value : document.getElementById("name").value;
    const text = document.getElementById("cText") ? document.getElementById("cText").value : document.getElementById("comment").value;
    if(!name||!text){ alert("Fill both fields"); return; }
    const arr = getComments();
    arr.unshift({name:text?name.trim():name, text:text.trim(), replies:[]});
    setComments(arr);
    renderComments();
    if(document.getElementById("cName")) document.getElementById("cName").value = "";
    if(document.getElementById("cText")) document.getElementById("cText").value = "";
    if(document.getElementById("name")) document.getElementById("name").value = "";
    if(document.getElementById("comment")) document.getElementById("comment").value = "";
  });
}
document.addEventListener("DOMContentLoaded", renderComments);
