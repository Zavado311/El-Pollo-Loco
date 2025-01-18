class Endboss extends MovableObject {
  height = 400;
  width = 250;
  y = 50;
  x = 8350;
  world;
  energy = 10;
  oldEnergy = 10;
  hadFirstContact = false;
  moveChicken = false;
  i = 0;
  offset = {
    top: 85,
    bottom: 0,
    left: 0,
    right: 0,
  };

  IMAGES_ALERT = [
    "img/4_enemie_boss_chicken/2_alert/G5.png",
    "img/4_enemie_boss_chicken/2_alert/G6.png",
    "img/4_enemie_boss_chicken/2_alert/G7.png",
    "img/4_enemie_boss_chicken/2_alert/G8.png",
    "img/4_enemie_boss_chicken/2_alert/G9.png",
    "img/4_enemie_boss_chicken/2_alert/G10.png",
    "img/4_enemie_boss_chicken/2_alert/G11.png",
    "img/4_enemie_boss_chicken/2_alert/G12.png",
  ];

  IMAGES_WALKING = [
    "img/4_enemie_boss_chicken/1_walk/G1.png",
    "img/4_enemie_boss_chicken/1_walk/G2.png",
    "img/4_enemie_boss_chicken/1_walk/G3.png",
    "img/4_enemie_boss_chicken/1_walk/G4.png",
  ];

  IMAGES_ATTACK = [
    "img/4_enemie_boss_chicken/3_attack/G13.png",
    "img/4_enemie_boss_chicken/3_attack/G14.png",
    "img/4_enemie_boss_chicken/3_attack/G15.png",
    "img/4_enemie_boss_chicken/3_attack/G16.png",
    "img/4_enemie_boss_chicken/3_attack/G17.png",
    "img/4_enemie_boss_chicken/3_attack/G18.png",
    "img/4_enemie_boss_chicken/3_attack/G19.png",
    "img/4_enemie_boss_chicken/3_attack/G20.png",
  ];

  IMAGES_HURT = [
    "img/4_enemie_boss_chicken/4_hurt/G21.png",
    "img/4_enemie_boss_chicken/4_hurt/G22.png",
    "img/4_enemie_boss_chicken/4_hurt/G23.png",
  ];

  IMAGES_DEAD = [
    "img/4_enemie_boss_chicken/5_dead/G24.png",
    "img/4_enemie_boss_chicken/5_dead/G25.png",
    "img/4_enemie_boss_chicken/5_dead/G26.png",
  ];

  /**
   * Constructor method for initializing the Endboss object.
   * Loads the initial image, preloads all the necessary images for animations,
   * sets the movement speed, and starts the animation process.
   */
  constructor() {
    super().loadImage(this.IMAGES_ALERT[0]);
    this.preLoadAllImages();
    this.world = world; 
    this.speed = 1.5 + Math.random() * 1.5;
    this.animate();
  }

  /**
   * Preloads all the necessary images used for the Endboss animations.
   * Images include walking, attack, alert, hurt, and dead states.
   */
  preLoadAllImages() {
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_ATTACK);
    this.loadImages(this.IMAGES_ALERT);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_DEAD);
  }

  /**
   * Starts the animation process for the Endboss.
   * Three intervals are set up:
   * - To handle the alert animation upon first contact.
   * - To move the Endboss.
   * - To check for interactions such as hurt or death.
   */
  animate() {
    setInterval(() => this.animationIfFirstContact(), 100);
    setInterval(() => this.moveEndboss(), 1000 / 60);
    setInterval(() => this.checkTheInteraction(), 100);
  }

  /**
   * Handles the alert animation when the player first contacts the Endboss.
   * If the Endboss is not dead, it plays the alert animation until first contact
   * is confirmed. After the first contact, it switches to movement.
   */
  animationIfFirstContact() {
    if (!this.isDeadEnemy) {
      if (this.checkFirstContact()) {
        this.gotFirstContact();
      }
      if (this.showFirstContactAnimation()) {
        this.playAnimation(this.IMAGES_ALERT);
      } else if (this.hadFirstContact) {
        this.showMovement();
      }
    }
    this.i++;
  }

  /**
   * Determines whether to show the alert animation (before first contact).
   *
   * @returns {boolean} - True if the alert animation should play, false otherwise.
   */
  showFirstContactAnimation() {
    return this.i < 10 || !this.hadFirstContact;
  }

  /**
   * Plays the walking animation and flags the Endboss as ready to move.
   */
  showMovement() {
    this.playAnimation(this.IMAGES_WALKING);
    this.moveChicken = true;
  }

  /**
   * Checks if the player's character is in close proximity to trigger first contact.
   *
   * @returns {boolean} - True if first contact is triggered, false otherwise.
   */
  checkFirstContact() {
    return positionCharacter > 6500 && !this.hadFirstContact;
  }

  /**
   * Resets the first contact flag and stops the alert animation.
   */
  gotFirstContact() {
    this.i = 0;
    this.hadFirstContact = true;
  }

  /**
   * Moves the Endboss left or right depending on the player's character position.
   * Movement only occurs after first contact and if the Endboss is not dead.
   */
  moveEndboss() {
    if (!this.isDeadEnemy && this.hadFirstContact) {
      if (this.characterOnTheLeft()) {
        this.moveLeft();
      } else if (this.characterOnTheRight()) {
        this.moveRight();
      }
    }
  }

  /**
   * Checks if the player's character is to the left of the Endboss.
   *
   * @returns {boolean} - True if the character is on the left, false otherwise.
   */
  characterOnTheLeft() {
    return positionCharacter < this.x && this.moveChicken;
  }

  /**
   * Moves the Endboss to the left and changes the direction to face left.
   */
  moveLeft() {
    super.moveLeft();
    this.otherDirection = false;
  }

  /**
   * Checks if the player's character is to the right of the Endboss.
   *
   * @returns {boolean} - True if the character is on the right, false otherwise.
   */
  characterOnTheRight() {
    return positionCharacter > this.x && this.moveChicken;
  }

  /**
   * Moves the Endboss to the right and changes the direction to face right.
   */
  moveRight() {
    super.moveRight();
    this.otherDirection = true;
  }

  /**
   * Checks the current interaction between the player and the Endboss.
   * If the Endboss is dead, it plays the death animation and sets the game state to "win".
   * If hurt, the hurt or attack animations are played depending on the damage level.
   */
  checkTheInteraction() {
    if (this.isDead()) {
      this.playAnimation(this.IMAGES_DEAD);
      youWinOrLost = "win";
    } else if (this.isHurt() < 1) {
      if (!mute) {
        AUDIO_CHICKENCACKLE.play();
      }
      this.playAnimation(this.IMAGES_HURT);
    } else if (this.isHurt() < 5) {
      this.playAnimation(this.IMAGES_ATTACK);
    }
  }
}
