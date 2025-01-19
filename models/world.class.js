class World {
  character = new Character();
  level = level1;
  canvas;
  ctx;
  keyboard;
  camera_x = 0;
  statusBar = new StatusBar();
  statusBarCoins = new StatusBarCoins();
  statusBarBottle = new StatusBarBottle();
  statusBarEndboss = new StatusBarEndboss();
  throwableObjects = [];

  /**
   * Constructor method for initializing the game world.
   * Sets up the canvas context, keyboard input, and starts the game loop.
   *
   * @param {HTMLCanvasElement} canvas - The HTML canvas element to draw the game.
   * @param {Keyboard} keyboard - The keyboard object to handle player input.
   */
  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.setWorld();
    this.draw();
    this.run();
  }

  /**
   * Sets the world for the character and enemies.
   * Links the world context to the character and a specific enemy.
   */
  setWorld() {
    this.character.world = this;
    this.level.enemies[29].world = this;
  }

  /**
   * Starts the game loop by setting up intervals for various game checks.
   *
   * - Checks for chicken hits and object throws every 120ms.
   * - Checks for collisions, collecting items, and game ending conditions every frame (60fps).
   */
  run() {
    setInterval(() => {
      this.checkChickenHit();
      this.checkThrowObjects();
    }, 120);
    setInterval(() => {
      this.checkJumpCollision();
      this.checkCollisions();
      this.checkCollecting();
      this.checkCollectingBottles();
      this.endGame();
    }, 1000 / 60);
  }

  /**
   * Ends the game based on the current win or loss status.
   * Shows the appropriate screen (victory or loss) and clears all intervals.
   */
  endGame() {
    if (youWinOrLost) {
      if (youWinOrLost == "win") {
        showVictory();
        this.clearAllIntervals();
      } else if (youWinOrLost == "lost") {
        showLose();
        this.clearAllIntervals();
      }
    }
  }

  /**
   * Clears all intervals that are currently set.
   * Loops through all possible interval IDs and clears them.
   */
  clearAllIntervals() {
    for (let i = 1; i < 9999; i++) window.clearInterval(i);
  }

  /**
   * Checks if the character can throw objects and triggers the throw action.
   * It checks the keyboard input for the 'D' key.
   */
  checkThrowObjects() {
    if (this.keyboard.D) {
      let changeDirection = !this.character.otherDirection;
      if (this.possibleThrowToRight(changeDirection)) {
        this.throwBottleToRight(changeDirection);
      }
      if (this.possibleThrowToLeft(changeDirection)) {
        this.throwBottleToLeft(changeDirection);
      }
    }
  }

  /**
   * Determines if the character can throw a bottle to the right.
   * @param {boolean} changeDirection - Whether the character is facing the right direction.
   * @returns {boolean} - Returns true if throwing to the right is possible.
   */
  possibleThrowToRight(changeDirection) {
    return changeDirection && this.statusBarBottle.percentage >= 10;
  }

  /**
   * Throws a bottle to the right if possible.
   * Creates a new throwable object and adds it to the list of throwable objects.
   * Reduces the percentage of bottles in the status bar.
   * @param {boolean} changeDirection - Whether the character is facing the right direction.
   */
  throwBottleToRight(changeDirection) {
    this.character.gotInteraction();
    let bottle = new ThrowableObject(
      this.character.x + 100,
      this.character.y + 100,
      changeDirection
    );
    this.throwableObjects.push(bottle);
    this.statusBarBottle.setPercentageBottles(-10);
  }

  /**
   * Determines if the character can throw a bottle to the left.
   * @param {boolean} changeDirection - Whether the character is facing the left direction.
   * @returns {boolean} - Returns true if throwing to the left is possible.
   */
  possibleThrowToLeft(changeDirection) {
    return !changeDirection && this.statusBarBottle.percentage >= 10;
  }

  /**
   * Throws a bottle to the left if possible.
   * Creates a new throwable object and adds it to the list of throwable objects.
   * Reduces the percentage of bottles in the status bar.
   * @param {boolean} changeDirection - Whether the character is facing the left direction.
   */
  throwBottleToLeft(changeDirection) {
    this.character.gotInteraction();
    let bottle = new ThrowableObject(
      this.character.x - 100,
      this.character.y + 100,
      changeDirection
    );
    this.throwableObjects.push(bottle);
    this.statusBarBottle.setPercentageBottles(-10);
  }

  /**
   * Checks for collisions between the character and enemies, and handles the interaction when a collision occurs.
   *
   * - The function iterates over all enemies in the level.
   * - If the character collides with an enemy, is not above ground, and the enemy is not dead, the character will be hit and an interaction will occur.
   * - The character's energy is updated in the status bar after the interaction.
   *
   * @returns {void}
   */
  checkCollisions() {
    this.level.enemies.forEach((enemy, i) => {
      if (
        this.character.isColliding(enemy) &&
        !this.level.enemies[i].isDeadEnemy &&
        !this.character.isAboveGround()
      ) {
        this.character.hit();
        this.character.gotInteraction();
        this.statusBar.setPercentage(this.character.energy);
      }
    });
  }

  /**
   * Checks for jump collisions between the character and enemies, and handles jump or hit interactions.
   *
   * - The function iterates over all enemies in the level.
   * - If the jump is valid (the character is jumping on an enemy), it calls the `jumpingOnEnemy()` method to handle the interaction.
   * - If the jump is not valid but a collision occurs with an enemy (and the enemy is not dead), the character gets hit, and an interaction occurs.
   * - The character's energy is updated in the status bar after the interaction.
   *
   * @returns {void}
   */
  checkJumpCollision() {
    this.level.enemies.forEach((enemy, i) => {
      if (this.checkIfJumpValid(enemy, i)) {
        this.jumpingOnEnemy(enemy, i);
      } else if (
        this.character.isColliding(enemy) &&
        !this.level.enemies[i].isDeadEnemy
      ) {
        this.character.hit();
        this.character.gotInteraction();
        this.statusBar.setPercentage(this.character.energy);
      }
    });
  }

  /**
   * Checks if the character's jump is valid for colliding with a given enemy.
   *
   * - The function checks if the character is colliding with the enemy, is above the ground, and is descending (speedY <= 0).
   * - It ensures that the enemy is not dead and that the enemy is not the specific enemy at index 30 (likely an exception, e.g., a boss).
   * - Returns `true` if the jump is valid (character can jump on the enemy), otherwise returns `false`.
   *
   * @param {Object} enemy - The enemy to check for collision with.
   * @param {number} i - The index of the enemy in the level's enemies array.
   * @returns {boolean} - `true` if the jump is valid, otherwise `false`.
   */
  checkIfJumpValid(enemy, i) {
    return (
      this.character.isColliding(enemy) &&
      this.character.isAboveGround() &&
      this.character.speedY <= 0 &&
      !this.level.enemies[i].isDeadEnemy &&
      enemy !== this.level.enemies[30]
    );
  }

  /**
   * Handles the interaction when the character jumps on an enemy.
   *
   * - The function deals damage to the enemy by calling the `hit()` method on the enemy.
   * - The character performs a jump by calling the `jump()` method on the character.
   * - If the game is not muted, the "jump on chicken" sound effect is played.
   * - If the enemy's energy reaches 0 or below, the enemy is marked as dead (`isDeadEnemy` set to `true`).
   *
   * @param {Object} enemy - The enemy that the character is interacting with during the jump.
   * @param {number} i - The index of the enemy in the level's enemies array.
   * @returns {void}
   */
  jumpingOnEnemy(enemy, i) {
    enemy.hit();
    this.character.jump();
    if (!mute) {
      AUDIO_JUMPONCHICKEN.play();
    }
    if (enemy.energy <= 0) {
      enemy.isDeadEnemy = true;
    }
  }

  /**
   * Checks for collisions between throwable bottles and enemies.
   * If a bottle hits an enemy, it triggers the corresponding collision handling.
   */
  checkChickenHit() {
    this.throwableObjects.forEach((bottle, index) => {
      this.level.enemies.forEach((enemy, i) => {
        this.checkBottleCollision(bottle, enemy, index, i);
      });
    });
  }

  /**
   * Checks if a bottle collides with an enemy and handles the collision logic.
   * @param {Object} bottle - The thrown bottle object.
   * @param {Object} enemy - The enemy object that might collide with the bottle.
   * @param {number} index - The index of the bottle in the throwableObjects array.
   * @param {number} i - The index of the enemy in the level's enemies array.
   */
  checkBottleCollision(bottle, enemy, index, i) {
    if (bottle.isColliding(enemy) && !bottle.collision) {
      bottle.collision = true;
      this.playCollisionSound();
      this.handleEnemyHit(enemy);
      this.removeBottle(index);
    }
  }

  /**
   * Plays the broken bottle sound effect if not muted.
   */
  playCollisionSound() {
    if (!mute) {
      AUDIO_BROKENBOTTLE.play();
    }
  }

  /**
   * Handles the logic when an enemy is hit by a bottle.
   * @param {Object} enemy - The enemy object that was hit.
   */
  handleEnemyHit(enemy) {
    enemy.hit();
    this.handleEndbossHit(enemy);
  }

  /**
   * If the endboss (enemy at index 29) is hit, reduce its energy.
   * @param {Object} enemy - The enemy that was hit.
   */
  handleEndbossHit(enemy) {
    if (this.level.enemies[29]) {
      this.statusBarEndboss.setPercentageEndboss(-20);
    }
  }

  /**
   * Removes the bottle from the throwableObjects array after a short delay.
   * @param {number} index - The index of the bottle in the throwableObjects array.
   */
  removeBottle(index) {
    setTimeout(() => {
      this.throwableObjects.splice(index, 1);
    }, 200);
  }

  /**
   * Checks if the character collides with any coins and collects them.
   * If a collision occurs, the character collects the coin, plays a sound effect,
   * increases the coin count in the status bar by 10, and removes the coin from the level.
   */
  checkCollecting() {
    this.level.coins.forEach((coins, index) => {
      if (this.character.isColliding(coins)) {
        if (!mute) {
          AUDIO_COINS.play();
        }
        this.statusBarCoins.setPercentageCoins(10);
        this.level.coins.splice(index, 1);
      }
    });
  }

  /**
   * Checks if the character collides with any bottles and collects them.
   * If a collision occurs, the character collects the bottle, plays a sound effect,
   * increases the bottle count in the status bar by 10 (if it's below 50%),
   * and removes the bottle from the level.
   */
  checkCollectingBottles() {
    this.level.bottles.forEach((bottles, index) => {
      if (
        this.character.isColliding(bottles) &&
        this.statusBarBottle.percentage < 50
      ) {
        if (!mute) {
          AUDIO_BOTTLE.play();
        }
        this.statusBarBottle.setPercentageBottles(10);
        this.level.bottles.splice(index, 1);
      }
    });
  }

  /**
   * Draws the entire game scene on the canvas.
   * It clears the canvas, draws the background objects, draws the status bars,
   * and draws the main game objects (such as the character and enemies).
   * Finally, it requests the next frame for continuous animation.
   */
  draw() {
    this.clearCanvas();
    this.drawBackgroundObjects();
    this.drawStatusBars();
    this.drawMainObjects();
    this.requestNextFrame();
  }

  /**
   * Clears the entire canvas by wiping it clean.
   * This is typically used before drawing a new frame.
   */
  clearCanvas() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  /**
   * Draws the background objects and clouds, applying camera translation.
   */
  drawBackgroundObjects() {
    this.ctx.translate(this.camera_x, 0);
    this.addObjectsToMap(this.level.backgroundObjects);
    this.addObjectsToMap(this.level.clouds);
    this.ctx.translate(-this.camera_x, 0);
  }

  /**
   * Draws the status bars and related UI elements.
   */
  drawStatusBars() {
    this.addToMap(this.statusBar);
    this.addToMap(this.statusBarCoins);
    this.addToMap(this.statusBarBottle);
    this.addToMap(this.statusBarEndboss);
  }

  /**
   * Draws the main game objects like enemies, throwable objects, coins, bottles, and the character.
   */
  drawMainObjects() {
    this.ctx.translate(this.camera_x, 0);

    this.addObjectsToMap(this.level.enemies);
    this.addObjectsToMap(this.throwableObjects);
    this.addObjectsToMap(this.level.coins);
    this.addObjectsToMap(this.level.bottles);

    this.addToMap(this.character);

    this.ctx.translate(-this.camera_x, 0);
  }

  /**
   * Requests the next animation frame to keep the game loop running.
   */
  requestNextFrame() {
    let self = this;
    requestAnimationFrame(function () {
      self.draw();
    });
  }

  /**
   * Adds multiple objects to the map by calling the `addToMap` method for each object.
   *
   * @param {Array} objects - The array of objects to be added to the map.
   */
  addObjectsToMap(objects) {
    objects.forEach((o) => {
      this.addToMap(o);
    });
  }

  /**
   * Adds a single object to the map by drawing it on the canvas and applying transformations
   * if the object is facing the other direction.
   *
   * @param {Object} mo - The object to be added to the map. The object should have
   * properties such as `otherDirection`, `draw()`, `drawFrame()`, and `drawFrameOffset()`.
   */
  addToMap(mo) {
    if (mo.otherDirection) {
      this.flipImage(mo);
    }
    mo.draw(this.ctx);

    if (mo.otherDirection) {
      this.flipImageBack(mo);
    }
  }

  /**
   * Flips the image of the object horizontally by applying a transformation to the canvas context.
   * This is used when the object is facing the other direction.
   *
   * @param {Object} mo - The object to be flipped. The object should have a `width` property
   * and an `x` position that will be transformed.
   */
  flipImage(mo) {
    this.ctx.save();
    this.ctx.translate(mo.width, 0);
    this.ctx.scale(-1, 1);
    mo.x = mo.x * -1;
  }

  /**
   * Reverses the flipping transformation applied by the `flipImage` method.
   * This restores the object to its original facing direction.
   *
   * @param {Object} mo - The object to be restored to its original direction.
   */
  flipImageBack(mo) {
    mo.x = mo.x * -1;
    this.ctx.restore();
  }
}
