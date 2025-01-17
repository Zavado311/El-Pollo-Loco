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
      }
      if (enemy.energy <= 0) {
        enemy.isDeadEnemy = true;
      }
    });
  }

  checkChickenHit() {
    this.throwableObjects.forEach((bottle, index) => {
      for (let i = this.level.enemies.length - 1; i >= 0; i--) {
        const enemy = this.level.enemies[i];

        if (bottle.isColliding(enemy) && !bottle.collision) {
          bottle.collision = true;
          if (!mute) {
            AUDIO_BROKENBOTTLE.play();
          }
          this.level.enemies[i].hit();
          if (this.level.enemies[29]) {
            this.statusBarEndboss.setPercentageEndboss(-20);
          }
          setTimeout(() => {
            this.throwableObjects.splice(index, 1);
          }, 200);

          if (enemy.energy <= 0) {
            enemy.isDeadEnemy = true;
          }
          break;
        }
      }
    });
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
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.translate(this.camera_x, 0);
    this.addObjectsToMap(this.level.backgroundObjects);
    this.addObjectsToMap(this.level.clouds);
    this.ctx.translate(-this.camera_x, 0);

    this.addToMap(this.statusBar);
    this.addToMap(this.statusBarCoins);
    this.addToMap(this.statusBarBottle);
    this.addToMap(this.statusBarEndboss);

    this.ctx.translate(this.camera_x, 0);

    this.addObjectsToMap(this.level.enemies);
    this.addObjectsToMap(this.throwableObjects);
    this.addObjectsToMap(this.level.coins);
    this.addObjectsToMap(this.level.bottles);

    this.addToMap(this.character);

    this.ctx.translate(-this.camera_x, 0);

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
