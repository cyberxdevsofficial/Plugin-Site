// marketplace.js - add/delete market items + render
function getMarket(){ return JSON.parse(localStorage.getItem("marketItems")||"[]"); }
function setMarket(arr){ localStorage.setItem("marketItems", JSON.stringify(arr)); }

const marketForm = document.getElementById("marketForm");
const marketList = document.getElementById("marketList");

function renderMarket(){
  const arr = getMarket();
  if(!marketList) return;
  marketList.innerHTML = arr.length ? arr.map((m, idx)=>`
    <div class="market-item">
      <h4>${escapeHtml(m.title)} <small class="muted">(${m.price} coins)</small></h4>
      <p>${escapeHtml(m.desc)}</p>
      <div><button class="btn" onclick="promptDeleteMarket(${idx})">Delete</button></div>
    </div>
  `).join('') : `<p class="muted">No items in marketplace.</p>`;
}

function promptDeleteMarket(idx){
  const pass = prompt("Enter admin password to delete item:");
  if(checkAdminPassword(pass)){
    const arr = getMarket();
    arr.splice(idx,1);
    setMarket(arr);
    renderMarket();
  } else alert("Wrong password");
}

if(marketForm){
  marketForm.addEventListener("submit", e=>{
    e.preventDefault();
    const title = document.getElementById("mTitle").value.trim();
    const desc = document.getElementById("mDesc").value.trim();
    const price = parseInt(document.getElementById("mPrice").value,10) || 0;
    const pass = document.getElementById("mPass").value;
    if(!checkAdminPassword(pass)){ alert("Wrong admin password"); return; }
    const arr = getMarket();
    arr.unshift({title, desc, price, createdAt: new Date().toISOString()});
    setMarket(arr);
    marketForm.reset();
    renderMarket();
  });
}

document.addEventListener("DOMContentLoaded", renderMarket);
