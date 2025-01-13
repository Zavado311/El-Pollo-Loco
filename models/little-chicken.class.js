class LittleChicken extends MovableObject {
  y = 365;
  width = 60;
  height = 60;
  energy = 5;
  offset = {
    top: 5,
    bottom: 5,
    left: 5,
    right: 5,
  };
  IMAGES_WALKING = [
    "img/3_enemies_chicken/chicken_small/1_walk/1_w.png",
    "img/3_enemies_chicken/chicken_small/1_walk/2_w.png",
    "img/3_enemies_chicken/chicken_small/1_walk/3_w.png",
  ];

  constructor() {
    super().loadImage("img/3_enemies_chicken/chicken_small/1_walk/1_w.png");
    this.x = 400 + Math.random() * (3000 - 400);
    this.loadImages(this.IMAGES_WALKING);

    this.speed = 0.15 + Math.random() * 0.5;

    this.animate();
    this.applyGravity();
  }

  animate() {
    setInterval(() => {
      this.moveLeft();
    }, 1000 / 60);

    setInterval(() => {
      this.playAnimation(this.IMAGES_WALKING);
    }, 200);

    setInterval(() => {
      this.jump();
    }, 2000);
  }
}
