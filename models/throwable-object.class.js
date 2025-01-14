class ThrowableObject extends MovableObject {
  collision = false;
  offset = {
    top: 20,
    bottom: 20,
    left: 20,
    right: 20,
  };

  IMAGES_THROW = [
    "img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png",
  ];

  IMAGES_BROKEN = [
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png",
  ];

  constructor(x, y, direction) {
    super().loadImage("img/6_salsa_bottle/salsa_bottle.png");
    this.x = x;
    this.y = y;
    this.height = 100;
    this.width = 100;
    this.loadImages(this.IMAGES_THROW);
    this.loadImages(this.IMAGES_BROKEN);
    if (direction) {
      this.throw();
    } else {
      this.throwReverse();
    }
    this.animate();
  }

  throw() {
    this.speedY = 30;
    this.applyGravity();
    setInterval(() => {
      this.x += 10;
    }, 25);
  }

  throwReverse() {
    this.speedY = 30;
    this.applyGravity();
    setInterval(() => {
      this.x -= 10;
    }, 25);
  }

  animate() {
    setInterval(() => {
      if (this.collision) {
        setInterval(() => {
          this.playAnimation(this.IMAGES_BROKEN);
        }, 1000 / 60);
        this.y = this.y;
      } else {
        this.playAnimation(this.IMAGES_THROW);
      }
    }, 50);
  }
}
