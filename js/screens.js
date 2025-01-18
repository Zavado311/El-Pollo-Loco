/**
 * Displays the game instructions and hides the start screen.
 */
function loadGameInstructions() {
  document.getElementById("startScreen").style.display = "none";
  document.getElementById("instructions").style.display = "flex";
}

/**
 * Hides the instructions and hides the imprint screen.
 */
function removeStartScreen() {
  document.getElementById("instructions").style.display = "none";
  document.getElementById("imprint").classList.add = "hidden";
}

/**
 * Displays the victory screen.
 */
function showVictory() {
  document.getElementById("victory").style.display = "flex";
}

/**
 * Hides the victory screen.
 */
function hideVictory() {
  document.getElementById("victory").style.display = "none";
}

/**
 * Displays the lose screen.
 */
function showLose() {
  document.getElementById("lose").style.display = "flex";
}

/**
 * Hides the lose screen.
 */
function hideLose() {
  document.getElementById("lose").style.display = "none";
}

/**
 * Opens the imprint section by removing the 'hidden' class.
 */
function openImprint() {
  document.getElementById("insertImprint").classList.remove("hidden");
}

/**
 * Closes the imprint section by adding the 'hidden' class.
 */
function closeImprint() {
  document.getElementById("insertImprint").classList.add("hidden");
}
