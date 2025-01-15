function loadGameInstructions() {
    document.getElementById("startScreen").style.display = "none";
    document.getElementById("instructions").style.display = "flex";
}

function removeStartScreen() {

    document.getElementById("instructions").style.display = "none";
}

function showVictory() {
    document.getElementById("victory").style.display = "flex";
}

function showLose() {
    document.getElementById("lose").style.display = "flex";
}