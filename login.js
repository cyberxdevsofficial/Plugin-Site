const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const username = document.getElementById("loginUsername").value;
  const password = document.getElementById("loginPassword").value;

  // Get stored users
  let users = JSON.parse(localStorage.getItem("users")) || [];

  const user = users.find(u => u.username === username && u.password === password);

  if (user) {
    alert(`Welcome back, ${user.username}!`);
    localStorage.setItem("loggedInUser", JSON.stringify(user));
    window.location.href = "index.html"; // redirect to homepage
  } else {
    alert("Invalid username or password!");
  }
});
