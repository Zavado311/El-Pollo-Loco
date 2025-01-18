class Coins extends MovableObject {
  y = 325;
  offset = {
    top: 30,
    bottom: 30,
    left: 30,
    right: 30,
  };

  COINS = ["img/8_coin/coin_1.png", "img/8_coin/coin_2.png"];
  /**
   * Initializes a new object.
   * Loads the initial coin image and sets a random position for the coin within a defined range.
   * The coin is positioned randomly on the X-axis between 500 and 9000, and on the Y-axis between 100 and 300.
   * It also loads all the images associated with the coin animation and starts the animation process.
   *
   * @constructor
   */
  constructor() {
    super().loadImage("img/8_coin/coin_1.png");
    this.x = 500 + Math.random() * (9000 - 500);
    this.y = 100 + Math.random() * 200;
    this.loadImages(this.COINS);
    this.animate();
  }

  /**
   * Animates the coin by continuously playing the images from the coin animation array.
   * The animation is updated every 200 milliseconds.
   */
  animate() {
    setInterval(() => {
      this.playAnimation(this.COINS);
    }, 200);
  }
}
