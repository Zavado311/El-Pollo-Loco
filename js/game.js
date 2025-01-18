let canvas;
let world;
let keyboard = new Keyboard();
let currentKey;
let positionCharacter;
let mute = false;

/**
 * Initialisiert die Welt und das Canvas, startet die Hintergrundmusik.
 * Wiederholt die Überprüfung der Audio-Steuerung alle 1/60 Sekunden.
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
 * Schaltet den Ton aus, ändert das Sound-Icon zu 'Mute' und
 * aktualisiert die onclick-Eigenschaft, um die Funktion zum Entmuten zu verwenden.
 */
function muteIt() {
  mute = true;
  document.getElementById("soundIMG").src = "img/background/noSound.svg";
  document.getElementById("sound").setAttribute("onclick", "unMuteIt()");
}

/**
 * Schaltet den Ton ein, ändert das Sound-Icon zu 'Sound' und
 * aktualisiert die onclick-Eigenschaft, um die Funktion zum Stummschalten zu verwenden.
 */
function unMuteIt() {
  mute = false;
  document.getElementById("soundIMG").src = "img/background/sound.svg";
  document.getElementById("sound").setAttribute("onclick", "muteIt()");
}

/**
 * Aktiviert den Vollbildmodus, ändert das Vollbild-Symbol zu 'kleiner Bildschirm' und
 * passt die onclick-Eigenschaft an, um den kleineren Bildschirm zu aktivieren.
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
 * Deaktiviert den Vollbildmodus, ändert das Vollbild-Symbol zu 'Vollbild' und
 * passt die onclick-Eigenschaft an, um den größeren Bildschirm zu aktivieren.
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
 * Fordert den Browser auf, den angegebenen Element im Vollbildmodus anzuzeigen.
 * @param {HTMLElement} element - Das Element, das im Vollbildmodus angezeigt werden soll.
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
 * Beendet den Vollbildmodus des Dokuments.
 */
function exitFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  }
}

/**
 * Fügt Event-Listener für Touch-Steuerung hinzu, um die Bewegung der Spielfigur zu steuern.
 * Startet und stoppt die Bewegung bei Berührung (touchstart, touchend).
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
 * Fügt Event-Listener für Tastatureingaben hinzu, um die Bewegung der Spielfigur zu steuern.
 * Setzt die Richtung und Aktionen basierend auf den gedrückten Tasten.
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
 * Fügt Event-Listener hinzu, um die Spielfigur zu stoppen, wenn die entsprechende Taste losgelassen wird.
 * Entfernt die Aktion basierend auf der losgelassenen Taste.
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
