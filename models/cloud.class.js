class Cloud extends MovableObject {
  y = 30;
  width = 500;
  height = 250;

  /**
   * Initializes a new Cloud object.
   * The cloud is positioned randomly on the X-axis between 0 and 3000.
   * It loads the provided image and sets a random speed for the cloud.
   *
   * @constructor
   * @param {string} imagePath - The path to the cloud image.
   */
  constructor(imagePath) {
    super().loadImage(imagePath);
    this.x = Math.random() * 3000;
    this.speed = 0.15 + Math.random() * 0.5;

    this.animate();
  }

  /**
   * Animates the cloud's movement.
   * The cloud moves left at a rate of 30 frames per second.
   */
  animate() {
    setInterval(() => {
      this.moveLeft();
    }, 1000 / 30);
  }
}
