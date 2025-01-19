const AUDIO_BACKGROUND = new Audio("audio/theme.mp3");
const AUDIO_WALKING = new Audio("audio/walking.mp3");
const AUDIO_JUMP = new Audio("audio/jump.mp3");
const AUDIO_JUMPONCHICKEN = new Audio("audio/jumpingOnChicken.mp3");
const AUDIO_PAIN = new Audio("audio/pain.mp3");
const AUDIO_SNORING = new Audio("audio/snoring.mp3");
const AUDIO_COINS = new Audio("audio/coins.mp3");
const AUDIO_BOTTLE = new Audio("audio/bottle.mp3");
const AUDIO_BROKENBOTTLE = new Audio("audio/brokenBottle.mp3");
const AUDIO_CHICKENCACKLE = new Audio("audio/cackleChicken.mp3");

AUDIO_JUMP.loop = false;
AUDIO_BACKGROUND.volume = 0.08;

/**
 * Pauses all audio playback and resets the current time for all audio tracks.
 *
 * - The function defines an array of all audio objects and iterates over them.
 * - For each audio object, it pauses the audio playback and resets the `currentTime` to `0`, effectively stopping the audio and preparing it to be played from the beginning.
 *
 * @returns {void}
 */
function stopAllAudio() {
  const allAudio = [
    AUDIO_BACKGROUND,
    AUDIO_WALKING,
    AUDIO_JUMP,
    AUDIO_JUMPONCHICKEN,
    AUDIO_PAIN,
    AUDIO_SNORING,
    AUDIO_COINS,
    AUDIO_BOTTLE,
    AUDIO_BROKENBOTTLE,
    AUDIO_CHICKENCACKLE,
  ];

  allAudio.forEach((audio) => {
    audio.pause();
    audio.currentTime = 0;
  });
}
