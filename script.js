/* ===== Admin System ===== */
function loadAdmins(){
  let admins = JSON.parse(localStorage.getItem("admins")) || [];
  if(admins.length === 0){
    // default admin
    admins.push({user:"admin", pass:"Anuga123"});
    localStorage.setItem("admins", JSON.stringify(admins));
  }
  return admins;
}

function addAdmin(user, pass){
  let admins = loadAdmins();
  admins.push({user, pass});
  localStorage.setItem("admins", JSON.stringify(admins));
  alert("New admin added!");
}

/* ===== Comments & Replies ===== */
function addComment(obj){
  let comments = JSON.parse(localStorage.getItem("comments")) || [];
  obj.replies = [];
  comments.push(obj);
  localStorage.setItem("comments", JSON.stringify(comments));
}

function replyToComment(index, replyText){
  let comments = JSON.parse(localStorage.getItem("comments")) || [];
  comments[index].replies.push(replyText);
  localStorage.setItem("comments", JSON.stringify(comments));
}

/* Render comments for all users */
function renderComments(){
  let comments = JSON.parse(localStorage.getItem("comments")) || [];
  const container = document.getElementById("comments");
  if(!container) return;
  container.innerHTML = "";
  comments.forEach((c, i)=>{
    let div = document.createElement("div");
    div.className="comment";
    div.innerHTML = `<p><strong>${c.name}:</strong> ${c.text}</p>`;
    if(c.replies && c.replies.length){
      div.innerHTML += "<div class='replies'><strong>Replies:</strong><ul>"+
        c.replies.map(r=>`<li>${r}</li>`).join("")+
        "</ul></div>";
    }
    container.appendChild(div);
  });
}

/* Render dashboard comments (with reply option) */
function renderDashboard(){
  // stats
  document.getElementById("viewCount").innerText = localStorage.getItem("views") || 0;
  let comments = JSON.parse(localStorage.getItem("comments")) || [];
  document.getElementById("commentCount").innerText = comments.length;
  let admins = loadAdmins();
  document.getElementById("adminCount").innerText = admins.length;

  // comment management
  const adminComments = document.getElementById("adminComments");
  adminComments.innerHTML = "";
  comments.forEach((c, i)=>{
    let div = document.createElement("div");
    div.className="comment-box";
    div.innerHTML = `<p><strong>${c.name}:</strong> ${c.text}</p>`;
    if(c.replies && c.replies.length){
      div.innerHTML += "<div class='replies'><strong>Replies:</strong><ul>"+
        c.replies.map(r=>`<li>${r}</li>`).join("")+
        "</ul></div>";
    }
    div.innerHTML += `
      <form onsubmit="event.preventDefault();
        let pw=prompt('Enter Admin Password to Reply:');
        if(checkAdminPassword(pw)){
          let reply= this.querySelector('input').value;
          replyToComment(${i}, reply);
          renderDashboard();
        } else { alert('Wrong Password'); }">
        <input type="text" placeholder="Reply as admin" required>
        <button type="submit" class="btn">Reply</button>
      </form>
    `;
    adminComments.appendChild(div);
  });
}

/* Check if given password matches any admin */
function checkAdminPassword(pass){
  let admins = loadAdmins();
  return admins.some(a=>a.pass===pass);
}
