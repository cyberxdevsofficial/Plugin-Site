const pluginForm = document.getElementById("pluginForm");
const pluginList = document.getElementById("pluginList");

let plugins = JSON.parse(localStorage.getItem("plugins")) || [];

function renderPlugins() {
  pluginList.innerHTML = "";
  plugins.forEach((p, index) => {
    const div = document.createElement("div");
    div.classList.add("plugin-item");
    div.innerHTML = `
      <h3>${p.name}</h3>
      <p>${p.desc}</p>
      <a href="${p.link}" target="_blank">Download</a>
      <button onclick="deletePlugin(${index})">Delete</button>
    `;
    pluginList.appendChild(div);
  });
}

pluginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.getElementById("pluginName").value;
  const desc = document.getElementById("pluginDesc").value;
  const link = document.getElementById("pluginLink").value;

  plugins.push({ name, desc, link });
  localStorage.setItem("plugins", JSON.stringify(plugins));

  renderPlugins();
  pluginForm.reset();
});

function deletePlugin(index) {
  const pass = prompt("Enter password to delete plugin:");
  if (pass === "Anuga123") {
    plugins.splice(index, 1);
    localStorage.setItem("plugins", JSON.stringify(plugins));
    renderPlugins();
  } else {
    alert("Wrong password!");
  }
}

renderPlugins();
