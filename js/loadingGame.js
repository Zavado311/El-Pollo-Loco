function loadGameInstructions() {
  document.getElementById("startScreen").style.display = "none";
  document.getElementById("instructions").style.display = "flex";
}

function removeStartScreen() {
  document.getElementById("instructions").style.display = "none";
  document.getElementById("imprint").classList.add = "hidden";
}

function showVictory() {
  document.getElementById("victory").style.display = "flex";
}

function showLose() {
  document.getElementById("lose").style.display = "flex";
}

function openImprint() {
  document.getElementById("insertImprint").classList.remove("hidden");
}

function closeImprint() {
  document.getElementById("insertImprint").classList.add("hidden");
}
