class LittleChicken extends MovableObject {
  y = 365;
  width = 60;
  height = 60;
  energy = 1;
  offset = {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  };

  IMAGES_WALKING = [
    "img/3_enemies_chicken/chicken_small/1_walk/1_w.png",
    "img/3_enemies_chicken/chicken_small/1_walk/2_w.png",
    "img/3_enemies_chicken/chicken_small/1_walk/3_w.png",
  ];

  /**
   * Creates an instance of LittleChicken.
   * Loads the initial image, sets the position, and starts the animations and gravity.
   */
  constructor() {
    super().loadImage("img/3_enemies_chicken/chicken_small/1_walk/1_w.png");
    this.x = 500 + Math.random() * (9000 - 500);
    this.loadImages(this.IMAGES_WALKING);
    this.speed = 1.5 + Math.random() * 1.5;
    this.animate();
    this.applyGravity();
  }

  /**
   * Starts the animation and movement of the little chicken.
   * The chicken moves left and plays the walking animation.
   * If it's dead, it will stop moving and display the dead image.
   * It also makes the chicken jump at intervals.
   */
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
        this.jump();
      }
    }, 2000);
  }

  /**
   * Handles the death of the little chicken.
   * Loads the dead image and sets the `isDeadEnemy` flag to true.
   */
  die() {
    this.isDeadEnemy = true;
    this.loadImage("img/3_enemies_chicken/chicken_small/2_dead/dead.png");
  }
}
