class MovableObject extends DrawableObject {
  speed = 0.2;
  otherDirection = false;
  speedY = 0;
  acceleration = 2.5;
  energy = 100;
  coins = 0;
  lastHit = 0;
  lastInteraction = 0;
  isDeadEnemy = false;
  offset = {
    top: 120,
    left: 120,
    right: 150,
    bottom: 150,
  };

  /**
   * Applies gravity to the object by adjusting its vertical position (y) and speed (speedY).
   */
  applyGravity() {
    setInterval(() => {
      if (this.isAboveGround() || this.speedY >= 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      }
    }, 1000 / 30);
  }

  /**
   * Checks if the object is above the ground.
   * @returns {boolean} True if the object is above the ground, false otherwise.
   */
  isAboveGround() {
    if (this instanceof ThrowableObject) {
      return true;
    } else {
      if (this instanceof LittleChicken) {
        return this.y < 340;
      }
      return this.y < 150;
    }
  }

  /**
   * Checks if the object is colliding with another movable object.
   * @param {MovableObject} mo - The other movable object to check for a collision.
   * @returns {boolean} True if the objects are colliding, false otherwise.
   */
  isColliding(mo) {
    return (
      this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
      this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
      this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
      this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom
    );
  }

  /**
   * Checks if the character is above the ground.
   * @param {Character} cha - The character object to check.
   * @returns {boolean} True if the character is above the ground, false otherwise.
   */
  isAbouveGround(cha) {
    return cha.y < 80;
  }

  /**
   * Reduces the object's energy by 2, simulating a hit.
   */
  hit() {
    this.energy -= 2;
    if (this.energy <= 0) {
      this.energy = 0;
    } else {
      this.lastHit = new Date().getTime();
    }
  }

  /**
   * Increases the object's coin count by 10.
   */
  hitCoin() {
    this.coins += 10;
  }

  /**
   * Returns the amount of time passed since the object was last hit.
   * @returns {number} The time passed in seconds.
   */
  isHurt() {
    let timepassed = new Date().getTime() - this.lastHit;
    timepassed = timepassed / 1000;
    return timepassed;
  }

  /**
   * Updates the last interaction timestamp.
   */
  gotInteraction() {
    this.lastInteraction = new Date().getTime();
  }

  /**
   * Returns the amount of time passed since the last interaction with the object.
   * @returns {number} The time passed in seconds.
   */
  isActive() {
    let timepassed = new Date().getTime() - this.lastInteraction;
    timepassed = timepassed / 1000;
    return timepassed;
  }

  /**
   * Checks if the object is dead (i.e., energy is 0).
   * @returns {boolean} True if the object is dead, false otherwise.
   */
  isDead() {
    return this.energy == 0;
  }

  /**
   * Plays the animation for the object by cycling through the given array of image paths.
   * @param {Array<string>} images - The array of image paths for the animation.
   */
  playAnimation(images) {
    let i = this.currentImage % images.length;
    let path = images[i];
    this.img = this.imageCache[path];
    this.currentImage++;
  }

  /**
   * Moves the object to the right by its speed.
   */
  moveRight() {
    this.x += this.speed;
  }

  /**
   * Moves the object to the left by its speed.
   */
  moveLeft() {
    this.x -= this.speed;
  }

  /**
   * Makes the object jump by setting its vertical speed (speedY) to a positive value.
   */
  jump() {
    this.speedY = 30;
  }

  /**
   * Checks if the object is currently jumping (speedY > 0).
   * @returns {boolean} True if the object is jumping, false otherwise.
   */
  isJumping() {
    return this.speedY > 0;
  }

  /**
   * Checks if the object has landed on the ground.
   * @returns {boolean} True if the object is landing, false otherwise.
   */
  isLanding() {
    return this.y === 130;
  }
}
