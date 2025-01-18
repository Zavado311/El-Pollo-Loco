class Character extends MovableObject {
  y = 150;
  height = 280;
  width = 120;
  speed = 10;
  lastInteraction = 0;
  world;

  offset = {
    top: 100,
    bottom: 30,
    left: 40,
    right: 40,
  };

  IMAGES_WALKING = [
    "img/2_character_pepe/2_walk/W-21.png",
    "img/2_character_pepe/2_walk/W-22.png",
    "img/2_character_pepe/2_walk/W-23.png",
    "img/2_character_pepe/2_walk/W-24.png",
    "img/2_character_pepe/2_walk/W-25.png",
    "img/2_character_pepe/2_walk/W-26.png",
  ];

  IMAGES_JUMPING_UP = [
    "img/2_character_pepe/3_jump/J-31.png",
    "img/2_character_pepe/3_jump/J-31.png",
    "img/2_character_pepe/3_jump/J-32.png",
    "img/2_character_pepe/3_jump/J-32.png",
    "img/2_character_pepe/3_jump/J-34.png",
    "img/2_character_pepe/3_jump/J-34.png",
    "img/2_character_pepe/3_jump/J-34.png",
    "img/2_character_pepe/3_jump/J-34.png",
    "img/2_character_pepe/3_jump/J-34.png",
    "img/2_character_pepe/3_jump/J-34.png",
    "img/2_character_pepe/3_jump/J-34.png",
    "img/2_character_pepe/3_jump/J-34.png",
    "img/2_character_pepe/3_jump/J-34.png",
    "img/2_character_pepe/3_jump/J-34.png",
  ];

  IMAGES_JUMPING_DOWN = [
    "img/2_character_pepe/3_jump/J-35.png",
    "img/2_character_pepe/3_jump/J-35.png",
    "img/2_character_pepe/3_jump/J-36.png",
    "img/2_character_pepe/3_jump/J-36.png",
    "img/2_character_pepe/3_jump/J-37.png",
    "img/2_character_pepe/3_jump/J-37.png",
    "img/2_character_pepe/3_jump/J-37.png",
    "img/2_character_pepe/3_jump/J-37.png",
    "img/2_character_pepe/3_jump/J-37.png",
    "img/2_character_pepe/3_jump/J-37.png",
  ];

  IMAGES_JUMPING_LANDING = [
    "img/2_character_pepe/3_jump/J-38.png",
    "img/2_character_pepe/3_jump/J-38.png",
    "img/2_character_pepe/3_jump/J-39.png",
    "img/2_character_pepe/3_jump/J-39.png",
  ];

  IMAGES_DEAD = [
    "img/2_character_pepe/5_dead/D-51.png",
    "img/2_character_pepe/5_dead/D-52.png",
    "img/2_character_pepe/5_dead/D-53.png",
    "img/2_character_pepe/5_dead/D-54.png",
    "img/2_character_pepe/5_dead/D-55.png",
    "img/2_character_pepe/5_dead/D-56.png",
    "img/2_character_pepe/5_dead/D-57.png",
  ];

  IMAGES_HURT = [
    "img/2_character_pepe/4_hurt/H-41.png",
    "img/2_character_pepe/4_hurt/H-42.png",
    "img/2_character_pepe/4_hurt/H-43.png",
  ];

  IMAGES_IDLE = [
    "img/2_character_pepe/1_idle/idle/I-1.png",
    "img/2_character_pepe/1_idle/idle/I-2.png",
    "img/2_character_pepe/1_idle/idle/I-3.png",
    "img/2_character_pepe/1_idle/idle/I-4.png",
    "img/2_character_pepe/1_idle/idle/I-5.png",
    "img/2_character_pepe/1_idle/idle/I-6.png",
    "img/2_character_pepe/1_idle/idle/I-7.png",
    "img/2_character_pepe/1_idle/idle/I-8.png",
    "img/2_character_pepe/1_idle/idle/I-9.png",
    "img/2_character_pepe/1_idle/idle/I-10.png",
  ];

  IMAGES_LONGIDLE = [
    "img/2_character_pepe/1_idle/long_idle/I-11.png",
    "img/2_character_pepe/1_idle/long_idle/I-12.png",
    "img/2_character_pepe/1_idle/long_idle/I-13.png",
    "img/2_character_pepe/1_idle/long_idle/I-14.png",
    "img/2_character_pepe/1_idle/long_idle/I-15.png",
    "img/2_character_pepe/1_idle/long_idle/I-16.png",
    "img/2_character_pepe/1_idle/long_idle/I-17.png",
    "img/2_character_pepe/1_idle/long_idle/I-18.png",
    "img/2_character_pepe/1_idle/long_idle/I-19.png",
    "img/2_character_pepe/1_idle/long_idle/I-20.png",
  ];

  /**
   * Initializes a new instance of the Character class.
   * Preloads all images and starts animations and gravity.
   */
  constructor() {
    super().loadImage("img/2_character_pepe/2_walk/W-21.png");
    this.preLoadAllImages();
    this.animate();
    this.applyGravity();
  }

  /**
   * Preloads all character images for different states like walking, jumping, idle, etc.
   */
  preLoadAllImages() {
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_JUMPING_UP);
    this.loadImages(this.IMAGES_JUMPING_DOWN);
    this.loadImages(this.IMAGES_JUMPING_LANDING);
    this.loadImages(this.IMAGES_IDLE);
    this.loadImages(this.IMAGES_LONGIDLE);
    this.loadImages(this.IMAGES_DEAD);
    this.loadImages(this.IMAGES_HURT);
  }


  /**
   * Starts the character animations and movement at regular intervals.
   */
  animate() {
    setInterval(() => this.moveCharacter(), 1000 / 60);
    setInterval(() => this.playCharacter(), 100);
  }

  /**
   * Moves the character based on keyboard input.
   * Controls movement to the right, left, and jumping.
   * Also updates the camera position.
   */
  moveCharacter() {
    AUDIO_WALKING.pause();
    if (!this.isDead()) {
      if (this.canMoveRight()) this.moveRight();
      if (this.canMoveLeft()) this.moveLeft();
      if (this.canJump()) this.jump();
    }
    this.world.camera_x = -this.x + 100;
    positionCharacter = this.x;
  }

  /**
   * Checks if the character can move right.
   * @returns {boolean} True if the character can move right.
   */
  canMoveRight() {
    return this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x;
  }

  /**
   * Moves the character to the right.
   * Plays walking sound and updates the direction.
   */
  moveRight() {
    super.moveRight();
    this.gotInteraction();
    this.otherDirection = false;
    if (!mute) {
      AUDIO_WALKING.play();
    }
  }

  /**
   * Checks if the character can move left.
   * @returns {boolean} True if the character can move left.
   */
  canMoveLeft() {
    return this.world.keyboard.LEFT && this.x > 0;
  }

  /**
   * Moves the character to the left.
   * Plays walking sound and updates the direction.
   */
  moveLeft() {
    super.moveLeft();
    this.gotInteraction();
    this.otherDirection = true;
    if (!mute) {
      AUDIO_WALKING.play();
    }
  }

  /**
   * Checks if the character can jump.
   * @returns {boolean} True if the character can jump.
   */
  canJump() {
    return this.world.keyboard.SPACE && !this.isAboveGround();
  }

  /**
   * Makes the character jump.
   */
  jump() {
    super.jump();
    this.gotInteraction();
  }

  /**
   * Plays the appropriate animation based on the character's state (e.g., walking, jumping, dead).
   */
  playCharacter() {
    if (this.isDead()) {
      this.playDead();
    } else if (this.isActive() > 3) {
      this.playSleeping();
    } else if (this.isActive() > 2) {
      this.playAnimation(this.IMAGES_IDLE);
    } else if (super.isHurt() < 1) {
      this.playHurt();
    } else if (this.isAboveGround()) {
      this.playJump();
    } else if (this.isLanding()) {
      this.playAnimation(this.IMAGES_JUMPING_LANDING);
    } else if (this.isMoving()) {
      this.playAnimation(this.IMAGES_WALKING);
    } else {
      this.playIdle();
    }
  }

  /**
   * Checks if the character has moved recently.
   * @returns {number} The time in seconds since the last interaction.
   */
  isActive() {
    let elapsed = new Date().getTime() - this.lastInteraction;
    return elapsed / 1000;
  }

  /**
   * Updates the last interaction time to the current time.
   */
  gotInteraction() {
    this.lastInteraction = new Date().getTime();
  }

  /**
   * Plays the dead animation for the character.
   */
  playDead() {
    this.playAnimation(this.IMAGES_DEAD);
    this.world.youWinOrLost = "lost";
  }

  /**
   * Plays the hurt animation and the corresponding pain sound for the character.
   * The animation is played using the images defined in `IMAGES_HURT`.
   * If the audio is not muted, the hurt sound effect is played.
   */
  playHurt() {
    this.playAnimation(this.IMAGES_HURT);
    if (!mute) {
      AUDIO_PAIN.play();
    }
  }

  /**
   * Plays the jumping animation and triggers the jump sound effect for the character.
   *
   * The function starts the jump animation using the character's upward jumping images.
   * If the sound is not muted, it also plays the jumping sound effect.
   *
   * @method playJump
   */
  playJump() {
    this.playAnimation(this.IMAGES_JUMPING_UP);
    if (!mute) {
      AUDIO_JUMP.play();
    }
  }

  /**
   * Plays the idle animation for the character.
   */
  playIdle() {
    this.playAnimation(this.IMAGES_IDLE);
  }

  /**
   * Plays the sleeping animation for the character.
   */
  playSleeping() {
    this.playAnimation(this.IMAGES_LONGIDLE);
    if (!mute) {
      AUDIO_SNORING.play();
    }
  }

  /**
   * Checks if the character is landing after a jump.
   * @returns {boolean} True if the character is landing.
   */
  isLanding() {
    return this.speedY < 0.5 && this.speedY > 0;
  }

  /**
   * Checks if the character is hurt (no more health).
   * @returns {number} The character's health.
   */
  isHurt() {
    return this.energy;
  }

  /**
   * Checks if the character is moving either left or right.
   * @returns {boolean} True if the character is moving.
   */
  isMoving() {
    return this.world.keyboard.RIGHT || this.world.keyboard.LEFT;
  }

  /**
   * Checks if the character is dead (no more energy).
   * @returns {boolean} True if the character is dead.
   */
  isDead() {
    return this.energy <= 0;
  }
}
