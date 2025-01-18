class Chicken extends MovableObject {
  y = 325;
  offset = {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  };
  energy = 1;

  /**
   * Array of image paths for the walking animation.
   * @type {string[]}
   */
  IMAGES_WALKING = [
    "img/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
    "img/3_enemies_chicken/chicken_normal/1_walk/2_w.png",
    "img/3_enemies_chicken/chicken_normal/1_walk/3_w.png",
  ];

  /**
   * Initializes a new Chicken object.
   * The chicken is positioned randomly on the X-axis between 500 and 9000.
   * It loads the walking images and starts its movement.
   *
   * @constructor
   */
  constructor() {
    super().loadImage("img/3_enemies_chicken/chicken_normal/1_walk/1_w.png");
    this.x = 500 + Math.random() * (9000 - 500);
    this.loadImages(this.IMAGES_WALKING);
    this.speed = 1.5 + Math.random() * 1.5;
    this.animate();
  }

  /**
   * Animates the chicken's movement.
   * The chicken moves left every 200 milliseconds if it's not dead.
   * If it dies, the `die()` method is called.
   */
  animate() {
    setInterval(() => {
      if (!this.isDeadEnemy) {
        this.moveLeft();
      } else {
        this.die();
      }
    }, 100);
  }

  /**
   * Changes the state of the chicken to "dead" and loads the dead chicken image.
   * This method is called when the chicken dies.
   */
  die() {
    this.isDeadEnemy = true;
    this.loadImage("img/3_enemies_chicken/chicken_normal/2_dead/dead.png");
  }

  /**
   * Moves the chicken to the left and plays the walking animation.
   * This method is called every 200 milliseconds as part of the animation.
   */
  moveLeft() {
    super.moveLeft();
    this.playAnimation(this.IMAGES_WALKING);
  }
}
