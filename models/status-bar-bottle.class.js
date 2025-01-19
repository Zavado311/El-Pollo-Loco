class StatusBarBottle extends DrawableObject {
  IMAGES = [
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/0.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/20.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/40.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/60.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/80.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/100.png",
  ];

  percentage = 0;

  /**
   * Creates an instance of StatusBarBottle.
   * Initializes the position, size, and sets the initial bottle percentage.
   */
  constructor() {
    super();
    this.loadImages(this.IMAGES);
    this.x = 40;
    this.y = 80;
    this.width = 200;
    this.height = 60;
    this.setPercentageBottles(0);
  }

  /**
   * Increases the percentage value and updates the image based on the new percentage.
   *
   * - The function increments the current percentage by the given `percentage` value.
   * - It then calculates the correct image path by calling the `resolveImageIndex()` function with predefined thresholds.
   * - The calculated image path is used to update the `img` property with the corresponding image from the `imageCache`.
   *
   * @param {number} percentage - The value to increment the current percentage by.
   * @returns {void}
   */
  setPercentageBottles(percentage) {
    this.percentage += percentage;
    let path = this.IMAGES[super.resolveImageIndex(50, 40, 30, 20, 10)];
    this.img = this.imageCache[path];
  }
}
