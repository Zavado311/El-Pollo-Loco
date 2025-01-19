class StatusBarEndboss extends DrawableObject {
  IMAGES = [
    "img/7_statusbars/2_statusbar_endboss/blue/blue0.png",
    "img/7_statusbars/2_statusbar_endboss/blue/blue20.png",
    "img/7_statusbars/2_statusbar_endboss/blue/blue40.png",
    "img/7_statusbars/2_statusbar_endboss/blue/blue60.png",
    "img/7_statusbars/2_statusbar_endboss/blue/blue80.png",
    "img/7_statusbars/2_statusbar_endboss/blue/blue100.png",
  ];

  percentage = 0;

  /**
   * Creates an instance of StatusBarEndboss.
   * Initializes the position, size, and sets the initial health percentage to 100%.
   */
  constructor() {
    super();
    this.loadImages(this.IMAGES);
    this.x = 500;
    this.y = 60;
    this.width = 200;
    this.height = 60;
    this.setPercentageEndboss(100);
  }

  /**
   * Increases the percentage value and updates the image based on the new percentage for the end boss.
   *
   * - The function increments the current percentage by the given `percentage` value.
   * - It then calculates the correct image path by calling the `resolveImageIndex()` function with predefined thresholds specific to the end boss.
   * - The calculated image path is used to update the `img` property with the corresponding image from the `imageCache`.
   *
   * @param {number} percentage - The value to increment the current percentage by.
   * @returns {void}
   */
  setPercentageEndboss(percentage) {
    this.percentage += percentage;
    let path = this.IMAGES[super.resolveImageIndex(100, 80, 60, 40, 20)];
    this.img = this.imageCache[path];
  }
}
