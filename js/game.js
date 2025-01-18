let canvas;
let world;
let keyboard = new Keyboard();
let currentKey;
let positionCharacter;
let mute = false;

/**
 * Initializes the world and the canvas, starts the background music.
 * Repeatedly checks the audio control every 1/60 seconds.
 */
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

/**
 * Mutes the audio, changes the sound icon to 'Mute', and updates the onclick
 * attribute to use the unmute function.
 */
function muteIt() {
  mute = true;
  document.getElementById("soundIMG").src = "img/background/noSound.svg";
  document.getElementById("sound").setAttribute("onclick", "unMuteIt()");
}

/**
 * Unmutes the audio, changes the sound icon to 'Sound', and updates the onclick
 * attribute to use the mute function.
 */
function unMuteIt() {
  mute = false;
  document.getElementById("soundIMG").src = "img/background/sound.svg";
  document.getElementById("sound").setAttribute("onclick", "muteIt()");
}

/**
 * Enables fullscreen mode, changes the fullscreen icon to 'small screen', and
 * updates the onclick attribute to enable the smaller screen.
 */
function biggerScreenSize() {
  document.getElementById("fullscreenSymbol").src =
    "img/background/smallscreenSymbol.svg";
  document
    .getElementById("screenSizing")
    .setAttribute("onclick", "littleScreenSize()");
  enterFullscreen(document.getElementById("fullscreen"));
}

/**
 * Exits fullscreen mode, changes the fullscreen icon to 'fullscreen', and
 * updates the onclick attribute to enable the larger screen.
 */
function littleScreenSize() {
  document.getElementById("fullscreenSymbol").src =
    "img/background/fullscreenSymbol.svg";
  document
    .getElementById("screenSizing")
    .setAttribute("onclick", "biggerScreenSize()");
  exitFullscreen();
}

/**
 * Requests the browser to display the specified element in fullscreen mode.
 * @param {HTMLElement} element - The element to be displayed in fullscreen mode.
 */
function enterFullscreen(element) {
  if (element.requestFullscreen) {
    element.requestFullscreen();
  } else if (element.msRequestFullscreen) {
    element.msRequestFullscreen();
  } else if (element.webkitRequestFullscreen) {
    element.webkitRequestFullscreen();
  }
}

/**
 * Exits fullscreen mode for the document.
 */
function exitFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  }
}

/**
 * Adds event listeners for touch controls to move the character.
 * Starts and stops movement on touch (touchstart, touchend).
 */
document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("moveLeft").addEventListener("touchstart", (e) => {
    if (e.cancelable) {
      e.preventDefault();
    }
    keyboard.LEFT = true;
  });

  document.getElementById("moveLeft").addEventListener("touchend", (e) => {
    if (e.cancelable) {
      e.preventDefault();
    }
    keyboard.LEFT = false;
  });

  document.getElementById("moveRight").addEventListener("touchstart", (e) => {
    if (e.cancelable) {
      e.preventDefault();
    }
    keyboard.RIGHT = true;
  });

  document.getElementById("moveRight").addEventListener("touchend", (e) => {
    if (e.cancelable) {
      e.preventDefault();
    }
    keyboard.RIGHT = false;
  });

  document.getElementById("throwBottle").addEventListener("touchstart", (e) => {
    if (e.cancelable) {
      e.preventDefault();
    }
    keyboard.D = true;
  });

  document.getElementById("throwBottle").addEventListener("touchend", (e) => {
    if (e.cancelable) {
      e.preventDefault();
    }
    keyboard.D = false;
  });

  document.getElementById("jump").addEventListener("touchstart", (e) => {
    if (e.cancelable) {
      e.preventDefault();
    }
    keyboard.SPACE = true;
  });

  document.getElementById("jump").addEventListener("touchend", (e) => {
    if (e.cancelable) {
      e.preventDefault();
    }
    keyboard.SPACE = false;
  });
});

/**
 * Adds event listeners for keyboard inputs to control the character's movement.
 * Sets direction and actions based on the pressed keys.
 */
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

/**
 * Adds event listeners to stop the character's movement when the corresponding
 * key is released. Removes actions based on the released key.
 */
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
