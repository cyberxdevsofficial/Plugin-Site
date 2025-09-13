// Toggle mobile menu
const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector("nav");

menuToggle.addEventListener("click", () => {
  nav.classList.toggle("active");
});

// Comments system (local for now, backend will store later)
const commentForm = document.getElementById("commentForm");
const commentsList = document.getElementById("commentsList");

commentForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.getElementById("commentName").value;
  const text = document.getElementById("commentText").value;

  const commentBox = document.createElement("div");
  commentBox.classList.add("comment");
  commentBox.innerHTML = `<strong>${name}</strong>: ${text}`;
  
  commentsList.appendChild(commentBox);

  commentForm.reset();
});
