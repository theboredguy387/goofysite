const gamesDiv = document.getElementById("games");
const search = document.getElementById("search");
const player = document.getElementById("player");
const sidebar = document.getElementById("sidebar");

const games = [
  {
    name: "Happy Wheels",
    url: "https://genizymath.github.io/games/happy-wheels/"
  },
  {
    name: "Slope",
    url: "https://genizymath.github.io/games/slope/"
  },
  {
    name: "Run 1",
    url: "https://genizymath.github.io/games/run-1/"
  },
  {
    name: "House of Hazards",
    url: "https://genizymath.github.io/games/house-of-hazards/"
  }
];

function render() {
  gamesDiv.innerHTML = "";
  const q = search.value.toLowerCase();

  games
    .filter(g => g.name.toLowerCase().includes(q))
    .forEach(g => {
      const d = document.createElement("div");
      d.className = "game";
      d.textContent = g.name;
      d.onclick = () => launchGame(g.url);
      gamesDiv.appendChild(d);
    });
}

function launchGame(url) {
  player.src = url;

  gamesDiv.style.display = "none";
  search.style.display = "none";
  sidebar.style.display = "flex";

  player.style.position = "fixed";
  player.style.top = 0;
  player.style.left = "60px";
  player.style.width = "calc(100% - 60px)";
  player.style.height = "100vh";
  player.style.zIndex = 9999;

  if (player.requestFullscreen) {
    player.requestFullscreen();
  } else if (player.webkitRequestFullscreen) {
    player.webkitRequestFullscreen();
  }
}

function exitGame() {
  player.src = "";
  document.exitFullscreen?.();

  sidebar.style.display = "none";
  gamesDiv.style.display = "flex";
  search.style.display = "block";

  player.style.position = "relative";
  player.style.width = "100%";
  player.style.height = "500px";
}

function goHome() {
  exitGame();
}

search.oninput = render;
render();
