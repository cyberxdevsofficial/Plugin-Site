/* ===== Hacker Matrix Background ===== */
(function(){
  const canvas=document.getElementById("matrixBackground");
  if(!canvas)return;
  const ctx=canvas.getContext("2d");
  function resize(){canvas.width=innerWidth;canvas.height=innerHeight;}
  resize();window.onresize=resize;
  const chars="01ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const fontSize=14;let columns=canvas.width/fontSize;let drops=new Array(Math.floor(columns)).fill(1);
  function draw(){
    ctx.fillStyle="rgba(0,0,0,0.1)";ctx.fillRect(0,0,canvas.width,canvas.height);
    ctx.fillStyle="#0f0";ctx.font=fontSize+"px monospace";
    drops.forEach((y,i)=>{const text=chars[Math.floor(Math.random()*chars.length)];
      ctx.fillText(text,i*fontSize,y*fontSize);
      if(y*fontSize>canvas.height&&Math.random()>0.975)drops[i]=0;
      drops[i]++;});
  }setInterval(draw,40);
})();

/* ===== Plugins System ===== */
function getPlugins(){return JSON.parse(localStorage.getItem("plugins")||"[]");}
function setPlugins(a){localStorage.setItem("plugins",JSON.stringify(a));}
function addPlugin(p){const arr=getPlugins();arr.unshift({...p,id:Date.now()});setPlugins(arr);}
function deletePlugin(id){
  const pass=prompt("Enter password to delete plugin:");
  if(pass!=="Anuga123"){alert("Wrong password");return;}
  setPlugins(getPlugins().filter(x=>x.id!==id));renderPluginsList();
}
function renderPluginsList(){
  const cont=document.getElementById("pluginsList");if(!cont)return;
  cont.innerHTML=getPlugins().map(p=>`<div class="plugin-card"><h4>${p.title}</h4><p>${p.desc}</p><pre>${p.code}</pre><button class="btn" onclick="deletePlugin(${p.id})">Delete</button></div>`).join("");
}

/* ===== Marketplace ===== */
function getMarket(){return JSON.parse(localStorage.getItem("market")||"[]");}
function setMarket(a){localStorage.setItem("market",JSON.stringify(a));}
function addMarketItem(m){const arr=getMarket();arr.unshift({...m,id:Date.now()});setMarket(arr);}
function deleteMarket(id){
  const pass=prompt("Enter password to delete item:");
  if(pass!=="Anuga123"){alert("Wrong password");return;}
  setMarket(getMarket().filter(x=>x.id!==id));renderMarketplace();
}
function renderMarketplace(){
  const cont=document.getElementById("marketList");if(!cont)return;
  cont.innerHTML=getMarket().map(m=>`<div class="plugin-card"><h4>${m.title}</h4><p>${m.desc}</p><button class="btn" onclick="deleteMarket(${m.id})">Delete</button></div>`).join("");
}

/* ===== Reviews / Comments ===== */
function getComments(){return JSON.parse(localStorage.getItem("comments")||"[]");}
function setComments(a){localStorage.setItem("comments",JSON.stringify(a));}
function addComment(c){const arr=getComments();arr.unshift({...c,id:Date.now()});setComments(arr);}
function replyComment(id,text){
  const pass=prompt("Enter password to reply:");
  if(pass!=="Anuga123"){alert("Wrong password");return;}
  const arr=getComments();const c=arr.find(x=>x.id===id);
  if(!c.replies)c.replies=[];c.replies.push({text,date:new Date().toISOString()});
  setComments(arr);renderComments();
}
function renderComments(){
  const cont=document.getElementById("comments");if(!cont)return;
  cont.innerHTML=getComments().map(c=>`<div class="plugin-card"><h4>${c.name}</h4><p>${c.text}</p>
  ${(c.replies||[]).map(r=>`<p class="muted">↳ Reply: ${r.text}</p>`).join("")}
  <button class="btn" onclick="replyComment(${c.id},prompt('Reply text:'))">Reply</button></div>`).join("");
}
function renderDashboard(){
  document.getElementById("viewCount").textContent=localStorage.getItem("views")||0;
  document.getElementById("commentCount").textContent=getComments().length;
  const cont=document.getElementById("adminComments");if(!cont)return;
  cont.innerHTML=getComments().map(c=>`<div><b>${c.name}</b>: ${c.text}</div>`).join("");
}

/* ===== Views Counter ===== */
(function(){localStorage.setItem("views",(parseInt(localStorage.getItem("views")||0)+1));})();

/* ===== Mobile Menu Toggle ===== */
function toggleMenu(){
  document.getElementById("menuNav").classList.toggle("show");
}
