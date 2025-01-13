class Cloud extends MovableObject {
  y = 30;
  width = 500;
  height = 250;

  constructor(imagePath) {
    super().loadImage(imagePath);
    this.x = Math.random() * 3000;
    this.speed = 0.15 + Math.random() * 0.5;

    this.animate();
  }
  animate() {
    setInterval(() => {
      this.moveLeft();
    }, 1000 / 30);
  }
}
