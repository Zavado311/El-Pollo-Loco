let canvas;
let world;
let keyboard = new Keyboard();
let currentKey;
let positionCharacter;
let mute = false;

const AUDIO_BACKGROUND = new Audio("../audio/theme.mp3");
const AUDIO_COINS = new Audio("audio/coins.mp3");
const AUDIO_BOTTLE = new Audio("audio/bottle.mp3");
const AUDIO_BROKENBOTTLE = new Audio("audio/brokenBottle.mp3");

AUDIO_BACKGROUND.volume = 0.007;

function init() {
  canvas = document.getElementById("canvas");
  world = new World(canvas, keyboard);

  setInterval(() => {
    if (mute) {
      AUDIO_BACKGROUND.pause(); 
    } else {
      if (AUDIO_BACKGROUND.paused) {
        AUDIO_BACKGROUND.play(); 
      }
    }
  }, 1000 / 60);
}

function muteIt() {
  mute = true;
  document.getElementById("soundIMG").src = "img/background/noSound.svg";
  document.getElementById("sound").setAttribute("onclick", "unMuteIt()");
}

function unMuteIt() {
  mute = false;
  document.getElementById("soundIMG").src = "img/background/sound.svg";
  document.getElementById("sound").setAttribute("onclick", "muteIt()");
}

function biggerScreenSize() {
  document.getElementById("fullscreenSymbol").src =
    "img/background/smallscreenSymbol.svg";
  document
    .getElementById("screenSizing")
    .setAttribute("onclick", "littleScreenSize()");
  enterFullscreen(document.getElementById("fullscreen"));
}

function littleScreenSize() {
  document.getElementById("fullscreenSymbol").src =
    "img/background/fullscreenSymbol.svg";
  document
    .getElementById("screenSizing")
    .setAttribute("onclick", "biggerScreenSize()");
  exitFullscreen();
}

function enterFullscreen(element) {
  if (element.requestFullscreen) {
    element.requestFullscreen();
  } else if (element.msRequestFullscreen) {
    // for IE11 (remove June 15, 2022)
    element.msRequestFullscreen();
  } else if (element.webkitRequestFullscreen) {
    // iOS Safari
    element.webkitRequestFullscreen();
  }
}

function exitFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  }
}

window.addEventListener("keydown", (e) => {
  if (e.keyCode == 39) {
    keyboard.RIGHT = true;
  }
  if (e.keyCode == 37) {
    keyboard.LEFT = true;
  }

  if (e.keyCode == 38) {
    keyboard.UP = true;
  }
  if (e.keyCode == 40) {
    keyboard.DOWN = true;
  }

  if (e.keyCode == 32) {
    keyboard.SPACE = true;
  }

  if (e.keyCode == 68) {
    keyboard.D = true;
  }

  currentKey = e;
});

window.addEventListener("keyup", (e) => {
  if (e.keyCode == 39) {
    keyboard.RIGHT = false;
  }
  if (e.keyCode == 37) {
    keyboard.LEFT = false;
  }

  if (e.keyCode == 38) {
    keyboard.UP = false;
  }
  if (e.keyCode == 40) {
    keyboard.DOWN = false;
  }

  if (e.keyCode == 32) {
    keyboard.SPACE = false;
  }

  if (e.keyCode == 68) {
    keyboard.D = false;
  }
  currentKey = e;
});
