class BackgroundObject extends MovableObject {
  width = 720;
  height = 480;

  /**
 * Constructor for initializing an object with an image, and specific x and y coordinates.
 * 
 * This constructor loads an image from the specified `imagePath` and sets the object's 
 * x-coordinate to the provided `x` value. The y-coordinate is automatically calculated 
 * as `480 - this.height`, positioning the object at the bottom of the screen, accounting 
 * for its height.
 * 
 * @param {string} imagePath - The path to the image to be loaded for the object.
 * @param {number} x - The x-coordinate of the object.
 * @param {number} y - The y-coordinate of the object (automatically calculated based on height).
 */
  constructor(imagePath, x, y) {
    super().loadImage(imagePath);
    this.x = x;
    this.y = 480 - this.height;
  }
}
