class StatusBar extends DrawableObject {
  IMAGES = [
    "img/7_statusbars/1_statusbar/2_statusbar_health/blue/0.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/blue/20.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/blue/40.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/blue/60.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/blue/80.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/blue/100.png",
  ];

  percentage = 100;

  /**
   * Creates an instance of StatusBar.
   * Initializes the position, size, and sets the initial health percentage to 100%.
   */
  constructor() {
    super();
    this.loadImages(this.IMAGES);
    this.x = 40;
    this.y = 0;
    this.width = 200;
    this.height = 60;
    this.setPercentage(100);
  }

  /**
   * Sets the percentage value and updates the image based on the given percentage.
   *
   * - The function sets the `percentage` property to the provided `percentage` value.
   * - It then calculates the correct image path by calling the `resolveImageIndex()` function with predefined thresholds.
   * - The calculated image path is used to update the `img` property with the corresponding image from the `imageCache`.
   *
   * @param {number} percentage - The new percentage value to set.
   * @returns {void}
   */
  setPercentage(percentage) {
    this.percentage = percentage;
    let path = this.IMAGES[super.resolveImageIndex(100, 80, 60, 40, 20)];
    this.img = this.imageCache[path];
  }
}
