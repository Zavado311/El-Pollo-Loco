class Bottle extends MovableObject {
  y = 325;
  offset = {
    top: 10,
    bottom: 10,
    left: 30,
    right: 30,
  };

  BOTTLES = [
    "img/6_salsa_bottle/1_salsa_bottle_on_ground.png",
    "img/6_salsa_bottle/2_salsa_bottle_on_ground.png",
  ];
  
/**
 * Constructor for initializing a new object with a random bottle image and a random x-coordinate.
 * 
 * This constructor selects a random bottle from the `BOTTLES` array and loads its image. 
 * Additionally, it sets a random x-coordinate within a specified range (500 to 7800).
 */
  constructor() {
    super();
    let randomBottle = Math.floor(Math.random() * this.BOTTLES.length);
    this.loadImage(this.BOTTLES[randomBottle]);
    this.x = 500 + Math.random() * (7800 - 500);
  }
}
