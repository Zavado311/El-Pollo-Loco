
const AUDIO_BACKGROUND = new Audio("../audio/theme.mp3");
const AUDIO_WALKING = new Audio("audio/walking.mp3")
const AUDIO_JUMP = new Audio("audio/jump.mp3");
const AUDIO_JUMPONCHICKEN = new Audio("audio/jumpingOnChicken.mp3");
const AUDIO_PAIN = new Audio("audio/pain.mp3");
const AUDIO_SNORING = new Audio("audio/snoring.mp3");

const AUDIO_COINS = new Audio("audio/coins.mp3");
const AUDIO_BOTTLE = new Audio("audio/bottle.mp3");
const AUDIO_BROKENBOTTLE = new Audio("audio/brokenBottle.mp3");

AUDIO_BACKGROUND.volume = 0.005;
AUDIO_BOTTLE.volume = 0.05;

AUDIO_JUMP.loop = false;
AUDIO_JUMP.playbackRate = 2.1;

AUDIO_PAIN.playbackRate = 1.8;