class Coins extends MovableObject {
    y = 325;
    offset = {
      top: 30,
      bottom: 30,
      left: 30,
      right: 30
    };


    COINS = [
      "img/8_coin/coin_1.png",
      "img/8_coin/coin_2.png"
    ];
  
    constructor() {
      super().loadImage("img/8_coin/coin_1.png");
      this.x = 300 + Math.random() * 1500;
      this.y = 100 + Math.random() * 200;
      this.loadImages(this.COINS);
      this.animate();
  }

  animate() {
  
    setInterval(() => {
      this.playAnimation(this.COINS);
    }, 200);
  }
}