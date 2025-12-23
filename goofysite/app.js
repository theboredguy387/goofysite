const categories = ["All", "Arcade", "Favorites"];
const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");

const games = [
  { name: "Demo Click Game", category: "Arcade", path: "games/game1/index.html", thumb: "games/game1/thumb.png" }
];

let active = "All";

const gamesDiv = document.getElementById("games");
const search = document.getElementById("search");
const tabs = document.getElementById("tabs");
const player = document.getElementById("player");

categories.forEach(c => {
  const b = document.createElement("button");
  b.textContent = c;
  b.onclick = () => {
    active = c;
    render();
  };
  tabs.appendChild(b);
});

function toggleFav(name) {
  const i = favorites.indexOf(name);
  i > -1 ? favorites.splice(i, 1) : favorites.push(name);
  localStorage.setItem("favorites", JSON.stringify(favorites));
  render();
}

function render() {
  gamesDiv.innerHTML = "";
  const term = search.value.toLowerCase();

  games.filter(g => {
    if (active === "Favorites") return favorites.includes(g.name);
    if (active !== "All" && g.category !== active) return false;
    return g.name.toLowerCase().includes(term);
  }).forEach(g => {
    const d = document.createElement("div");
    d.className = "game";
    d.innerHTML = `
      <img src="${g.thumb}" onerror="this.src='default.png'">
      <span>${g.name}</span>
      <small>${g.category}</small>
      <button class="fav">${favorites.includes(g.name) ? "★" : "☆"}</button>
    `;
    d.onclick = () => player.src = g.path;
    d.querySelector(".fav").onclick = e => {
      e.stopPropagation();
      toggleFav(g.name);
    };
    gamesDiv.appendChild(d);
  });
}

search.oninput = render;
render();
