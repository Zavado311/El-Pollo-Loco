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
  
  applyGravity() {
    setInterval(() => {
      if (this.isAboveGround() || this.speedY >= 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      }
    }, 1000 / 30);
  }

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

  isColliding(mo) {
    return (
      this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
      this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
      this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
      this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom
    );
  }

  isAbouveGround(cha) {
    return cha.y < 80;
  }

  hit() {
    this.energy -= 2;
    if (this.energy <= 0) {
      this.energy = 0;
    } else {
      this.lastHit = new Date().getTime();
    }
  }

  hitCoin() {
    this.coins += 10;
  }

  isHurt() {
    let timepassed = new Date().getTime() - this.lastHit;
    timepassed = timepassed / 1000;
    return timepassed < 1;
  }

  isHurtAttackBack() {
    let timepassed = new Date().getTime() - this.lastHit;
    timepassed = timepassed / 1000;
    return timepassed < 5;
  }

  gotInteraction() {
    this.lastInteraction = new Date().getTime();
  }

  isActive() {
    let timepassed = new Date().getTime() - this.lastInteraction;
    timepassed = timepassed / 1000;
    return timepassed;
  }

  isDead() {
    return this.energy == 0;
  }

  playAnimation(images) {
    let i = this.currentImage % images.length;
    let path = images[i];
    this.img = this.imageCache[path];
    this.currentImage++;
  }

  moveRight() {
    this.x += this.speed;
  }

  moveLeft() {
    this.x -= this.speed;
  }

  jump() {
    this.speedY = 30;
  }

  isJumping() {
    return this.speedY > 0;
  }

  isLanding() {
    return this.y === 130;
  }
}
