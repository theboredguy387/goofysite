window.onload = () => {
  const gamesDiv = document.getElementById("games");
  const search = document.getElementById("search");
  const player = document.getElementById("player");
  const rail = document.getElementById("rail");
  const shell = document.getElementById("gameShell");

  const games = [
    { name: "Stickman Hook", url: "https://genizymath.github.io/games/stickman-hook/" },
    { name: "Happy Wheels", url: "https://genizymath.github.io/games/happy-wheels/" },
    { name: "House of Hazards", url: "https://genizymath.github.io/games/house-of-hazards/" }
  ];

  function render() {
    gamesDiv.innerHTML = "";
    const q = search.value.toLowerCase();

    games.filter(g => g.name.toLowerCase().includes(q))
      .forEach(g => {
        const d = document.createElement("div");
        d.className = "game";
        d.textContent = g.name;
        d.onclick = () => launch(g.url);
        gamesDiv.appendChild(d);
      });
  }

  function launch(url) {
    player.src = url;

    search.style.display = "none";
    gamesDiv.style.display = "none";
    rail.style.display = "flex";
    shell.style.display = "block";
  }

  window.exitGame = () => {
    player.src = "";
    rail.style.display = "none";
    shell.style.display = "none";
    search.style.display = "block";
    gamesDiv.style.display = "grid";
  };

  window.goHome = () => exitGame();

  search.oninput = render;
  render();
};
