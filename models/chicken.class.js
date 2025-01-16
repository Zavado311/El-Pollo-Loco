class Chicken extends MovableObject {
  y = 325;
  offset = {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  };
  energy = 1;
  IMAGES_WALKING = [
    "img/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
    "img/3_enemies_chicken/chicken_normal/1_walk/2_w.png",
    "img/3_enemies_chicken/chicken_normal/1_walk/3_w.png",
  ];

  constructor() {
    super().loadImage("img/3_enemies_chicken/chicken_normal/1_walk/1_w.png");
    this.x = 500 + Math.random() * (9000 - 500);
    this.loadImages(this.IMAGES_WALKING);
    this.speed = 0.8 + Math.random() * 0.5;
    this.animate();
  }

  animate() {
    setInterval(() => {
      if (!this.isDeadEnemy) {
        this.moveLeft();
        this.playAnimation(this.IMAGES_WALKING);
      } else {
        this.die();
      }
    }, 200);

    setInterval(() => {
      if (!this.isDeadEnemy) {
        this.moveLeft();
      } else {
        this.die();
      }
    }, 1000 / 60);
  }

  
  die() {
    this.isDeadEnemy = true;
    this.loadImage("img/3_enemies_chicken/chicken_normal/2_dead/dead.png");
    
  }
}
