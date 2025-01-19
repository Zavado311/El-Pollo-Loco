class StatusBarCoins extends DrawableObject {
  IMAGES = [
    "img/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/blue/20.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/blue/40.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/blue/60.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/blue/80.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/blue/100.png",
  ];

  percentage = 0;

  /**
   * Creates an instance of StatusBarCoins.
   * Initializes the position, size, and sets the initial coin percentage.
   */
  constructor() {
    super();
    this.loadImages(this.IMAGES);
    this.x = 40;
    this.y = 40;
    this.width = 200;
    this.height = 60;
    this.setPercentageCoins(0);
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
  setPercentageCoins(percentage) {
    this.percentage += percentage;
    let path = this.IMAGES[super.resolveImageIndex(50, 40, 30, 20, 10)];
    this.img = this.imageCache[path];
  }
}
