const marketForm = document.getElementById("marketForm");
const marketList = document.getElementById("marketList");

let items = JSON.parse(localStorage.getItem("marketItems")) || [];

function renderItems() {
  marketList.innerHTML = "";
  items.forEach((item, index) => {
    const div = document.createElement("div");
    div.classList.add("market-item");
    div.innerHTML = `
      <h3>${item.name} - ${item.price} coins</h3>
      <p>${item.desc}</p>
      <button onclick="deleteItem(${index})">Delete</button>
    `;
    marketList.appendChild(div);
  });
}

marketForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const pass = prompt("Enter password to add item:");
  if (pass !== "Anuga123") {
    alert("Wrong password!");
    return;
  }

  const name = document.getElementById("itemName").value;
  const desc = document.getElementById("itemDesc").value;
  const price = document.getElementById("itemPrice").value;

  items.push({ name, desc, price });
  localStorage.setItem("marketItems", JSON.stringify(items));

  renderItems();
  marketForm.reset();
});

function deleteItem(index) {
  const pass = prompt("Enter password to delete item:");
  if (pass === "Anuga123") {
    items.splice(index, 1);
    localStorage.setItem("marketItems", JSON.stringify(items));
    renderItems();
  } else {
    alert("Wrong password!");
  }
}

renderItems();
