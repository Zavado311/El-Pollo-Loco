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
    }, 1000 / 60);
  }

  checkThrowObjects() {
    if (this.keyboard.D) {
      if (this.statusBarBottle.percentage >= 10) {
        let bottle = new ThrowableObject(
          this.character.x + 100,
          this.character.y + 100
        );

        this.throwableObjects.push(bottle);
        this.statusBarBottle.setPercentageBottles(-10);
      }
    }
  }

  checkCollisions() {
    this.level.enemies.forEach((enemy) => {
      if (
        this.character.isColliding(enemy) // Charakter fällt nicht auf Gegner
      ) {
        this.character.hit(); // Charakter wird getroffen
        this.statusBar.setPercentage(this.character.energy);
      }
    });
  }


  checkJumpCollision() {
  this.level.enemies.forEach((enemy, i) => {
    if (
      this.character.isColliding(enemy) && // Kollision mit Gegner
      this.character.isAboveGround() && this.character.speedY <= 0 // Charakter fällt auf Gegner
    ) {
      enemy.hit(); // Gegner wird getroffen
    }
    if (enemy.energy <= 0) {
      this.level.enemies.splice(i, 1); // Entfernen, wenn Energie = 0
    }
  });
}



  checkChickenHit() {
    this.throwableObjects.forEach((bottle, index) => {
      for (let i = this.level.enemies.length - 1; i >= 0; i--) {
        const enemy = this.level.enemies[i];
        console.log(bottle.isColliding(enemy));
        if (bottle.isColliding(enemy) && !bottle.collision) {
          this.level.enemies[i].hit();

          if (this.level.enemies[7]) {
            //Falls mehr enemies werden ändern!!!!
            this.statusBarEndboss.setPercentageEndboss(-20);
          }
          bottle.collision = true;
          setTimeout(() => {
            this.throwableObjects.splice(index, 1);
          }, 150);

          if (enemy.energy <= 0) {
            this.level.enemies.splice(i, 1);
          }
          break;
        }
      }
    });
  }

  // vielleicht bei checkCollison dieses this.statusBar wegen Energy auch für das Hühnchen
  // this.statusBarCoins.setPercentage(this.character.coins);

  checkCollecting() {
    this.level.coins.forEach((coins, index) => {
      if (this.character.isColliding(coins)) {
        this.statusBarCoins.setPercentageCoins(10);
        this.level.coins.splice(index, 1);
      }
    });
  }

  checkCollectingBottles() {
    this.level.bottles.forEach((bottles, index) => {
      if (this.character.isColliding(bottles)) {
        this.statusBarBottle.setPercentageBottles(10);
        this.level.bottles.splice(index, 1);
      }
    });
  }

  getAttentionOfEndboss() {
   if (this.character.x >= 2800 ) {
    this.level.enemies[7].hadFirstContact = true;
   } 
  }


  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.translate(this.camera_x, 0);
    this.addObjectsToMap(this.level.backgroundObjects);
    this.addObjectsToMap(this.level.clouds);
    this.ctx.translate(-this.camera_x, 0);
    // ------ Space for fixed Objects ----------
    this.addToMap(this.statusBar);
    this.addToMap(this.statusBarCoins);
    this.addToMap(this.statusBarBottle);
    this.addToMap(this.statusBarEndboss);

    this.ctx.translate(this.camera_x, 0);

    this.addToMap(this.character);

    this.addObjectsToMap(this.level.enemies);
    this.addObjectsToMap(this.throwableObjects);
    this.addObjectsToMap(this.level.coins);
    this.addObjectsToMap(this.level.bottles);

    this.ctx.translate(-this.camera_x, 0);

    // Draw() wird immer wieder aufgerufen
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
