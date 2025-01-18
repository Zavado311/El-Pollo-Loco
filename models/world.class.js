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

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.draw();
    this.setWorld();
    this.run();
  }

  setWorld() {
    this.character.world = this;
    this.level.enemies[29].world = this;
  }

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

  clearAllIntervals() {
    for (let i = 1; i < 9999; i++) window.clearInterval(i);
  }

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

  possibleThrowToRight(changeDirection) {
    return changeDirection && this.statusBarBottle.percentage >= 10;
  }

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

  possibleThrowToLeft(changeDirection) {
    return !changeDirection && this.statusBarBottle.percentage >= 10;
  }

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


  addObjectsToMap(objects) {
    objects.forEach((o) => {
      this.addToMap(o);
    });
  }

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

  flipImage(mo) {
    this.ctx.save();
    this.ctx.translate(mo.width, 0);
    this.ctx.scale(-1, 1);
    mo.x = mo.x * -1;
  }

  flipImageBack(mo) {
    mo.x = mo.x * -1;
    this.ctx.restore();
  }
}
