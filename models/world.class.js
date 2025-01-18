class World {
  character = new Character();
  level = level1;
  canvas;
  ctx;
  keyboard;
  camera_x = 0;
  youWinOrLost = null;
  statusBar = new StatusBar();
  statusBarCoins = new StatusBarCoins();
  statusBarBottle = new StatusBarBottle();
  statusBarEndboss = new StatusBarEndboss();
  throwableObjects = [];

  /**
   * Initializes a new instance of the World class, sets up the canvas, context, keyboard inputs, and runs the game.
   * @param {HTMLCanvasElement} canvas - The canvas element where the game will be drawn.
   * @param {Object} keyboard - An object representing the state of the keyboard inputs.
   */
  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.draw();
    this.setWorld();
    this.run();
  }

  /**
   * Sets the world for the character and the end boss (enemy at index 29) so they can access the world context.
   */
  setWorld() {
    this.character.world = this;
    this.level.enemies[29].world = this;
  }

  /**
   * Starts the main game loop, setting intervals for checking collisions, object interactions, and updating the game state.
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
   * Checks if the game has been won or lost and triggers the appropriate actions.
   */
  endGame() {
    if (this.youWinOrLost) {
      if (this.youWinOrLost == "win") {
        showVictory();
        this.clearAllIntervals();
      } else if (this.youWinOrLost == "lost") {
        showLose();
        this.clearAllIntervals();
      }
    }
  }

  /**
   * Clears all running intervals to stop the game loop.
   */
  clearAllIntervals() {
    for (let i = 1; i < 9999; i++) window.clearInterval(i);
  }

  /**
   * Checks if the player pressed the throw button (D) and handles throwing bottles to the left or right.
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
   * Determines if throwing a bottle to the right is possible.
   * @param {boolean} changeDirection - Indicates if the character is facing right.
   * @returns {boolean} - True if a bottle can be thrown to the right.
   */
  possibleThrowToRight(changeDirection) {
    return changeDirection && this.statusBarBottle.percentage >= 10;
  }

  /**
   * Throws a bottle to the right and decreases the number of bottles in the status bar.
   * @param {boolean} changeDirection - Indicates if the character is facing right.
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
   * Determines if throwing a bottle to the left is possible.
   * @param {boolean} changeDirection - Indicates if the character is facing left.
   * @returns {boolean} - True if a bottle can be thrown to the left.
   */
  possibleThrowToLeft(changeDirection) {
    return !changeDirection && this.statusBarBottle.percentage >= 10;
  }

  /**
   * Throws a bottle to the left and decreases the number of bottles in the status bar.
   * @param {boolean} changeDirection - Indicates if the character is facing left.
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
   * Checks for collisions between the character and enemies, applying damage when necessary.
   */
  checkCollisions() {
    this.level.enemies.forEach((enemy, i) => {
      if (
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
   * Checks if the character collides with an enemy while jumping, causing damage to the enemy.
   */
  checkJumpCollision() {
    this.level.enemies.forEach((enemy, i) => {
      if (
        this.character.isColliding(enemy) &&
        this.character.isAboveGround() &&
        this.character.speedY <= 0 &&
        !this.level.enemies[i].isDeadEnemy &&
        i !== 29
      ) {
        enemy.hit();
        this.character.jump();
        if (!mute) {
          AUDIO_JUMPONCHICKEN.play();
        }
      }
      if (enemy.energy <= 0) {
        enemy.isDeadEnemy = true;
      }
    });
  }

  /**
   * Checks if any thrown bottles hit an enemy and handles the collision logic.
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
   * Checks if the character collects any coins and updates the coin status bar.
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
   * Checks if the character collects any bottles and updates the bottle status bar.
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
   * Draws all the game objects and background elements on the canvas.
   */
  draw() {
    this.clearCanvas();
    this.drawBackgroundObjects();
    this.drawStatusBars();
    this.drawMainObjects();
    this.requestNextFrame();
  }

  /**
   * Clears the entire canvas.
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
   * Draws the status bars and text information on the screen.
   */
  drawStatusBars() {
    this.addToMap(this.statusBar);
    this.addToMap(this.statusBarEndboss);
    this.addToMap(this.statusBarBottle);
    this.addToMap(this.statusBarCoins);
    this.addToMap(this.character);
  }

  /**
   * Draws the main game objects like enemies and throwable objects, applying camera translation.
   */
  drawMainObjects() {
    this.ctx.translate(this.camera_x, 0);
    this.addObjectsToMap(this.throwableObjects);
    this.addObjectsToMap(this.level.enemies);
    this.addObjectsToMap(this.level.coins);
    this.addObjectsToMap(this.level.bottles);
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
   * Fügt eine Liste von Objekten zur Karte hinzu, indem jedes Objekt gezeichnet wird.
   * @param {Object[]} objects - Ein Array von Objekten, die zur Karte hinzugefügt werden sollen.
   */
  addObjectsToMap(objects) {
    objects.forEach((o) => {
      this.addToMap(o);
    });
  }

  /**
   * Fügt ein einzelnes Objekt zur Karte hinzu und zeichnet es.
   * Wenn das Objekt die Eigenschaft `otherDirection` hat, wird das Bild gespiegelt.
   * @param {Object} mo - Das Objekt, das zur Karte hinzugefügt und gezeichnet wird.
   */
  addToMap(mo) {
    if (mo.otherDirection) {
      this.flipImage(mo);
    }
    mo.draw(this.ctx);
    mo.drawFrame(this.ctx);
    mo.drawFrameOffset(this.ctx);

    if (mo.otherDirection) {
      this.flipImageBack(mo);
    }
  }

  /**
   * Spiegelt das Bild des Objekts horizontal, indem der Kontext der Zeichenfläche gespeichert,
   * übersetzt und skaliert wird.
   * @param {Object} mo - Das Objekt, dessen Bild gespiegelt wird.
   */
  flipImage(mo) {
    this.ctx.save();
    this.ctx.translate(mo.width, 0);
    this.ctx.scale(-1, 1);
    mo.x = mo.x * -1;
  }

  /**
   * Setzt das Bild des Objekts nach der Spiegelung zurück, indem die horizontalen Koordinaten
   * wiederhergestellt und der Kontext der Zeichenfläche zurückgesetzt wird.
   * @param {Object} mo - Das Objekt, dessen Bild zurückgespiegelt wird.
   */
  flipImageBack(mo) {
    mo.x = mo.x * -1;
    this.ctx.restore();
  }
}
