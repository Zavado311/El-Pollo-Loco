class DrawableObject {
  img;
  imageCache = {};
  currentImage = 0;
  x = 180;
  y = 335;
  height = 100;
  width = 100;

  /**
   * Loads an image from the specified file path and assigns it to the `img` property.
   *
   * @param {string} path - The path to the image file.
   */
  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  /**
   * Draws the image on the given canvas context at the current object's position
   * and with its specified width and height.
   *
   * @param {CanvasRenderingContext2D} ctx - The canvas rendering context to draw the image on.
   */
  draw(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }

  /**
   * Draws a blue rectangle (frame) around certain types of objects (like Character, Chicken, Endboss, etc.)
   * to highlight their boundaries on the canvas.
   * The frame is only drawn for specific object types.
   *
   * @param {CanvasRenderingContext2D} ctx - The canvas rendering context to draw the frame on.
   */
  drawFrame(ctx) {
    if (
      this instanceof Character ||
      this instanceof Chicken ||
      this instanceof LittleChicken ||
      this instanceof Endboss ||
      this instanceof Coins ||
      this instanceof Bottle
    ) {
      ctx.beginPath();
      ctx.lineWidth = "5";
      ctx.strokeStyle = "blue";
      ctx.rect(this.x, this.y, this.width, this.height);
      ctx.stroke();
    }
  }

  /**
   * Draws a red offset rectangle around certain types of objects (like Character, Chicken, Bottle, etc.)
   * to highlight their effective hitbox on the canvas, based on the offset properties.
   *
   * @param {CanvasRenderingContext2D} ctx - The canvas rendering context to draw the offset frame on.
   */
  drawFrameOffset(ctx) {
    if (
      this instanceof Character ||
      this instanceof Chicken ||
      this instanceof LittleChicken ||
      this instanceof Endboss ||
      this instanceof Coins ||
      this instanceof Bottle ||
      this instanceof ThrowableObject
    ) {
      ctx.beginPath();
      ctx.lineWidth = "3";
      ctx.strokeStyle = "rgba(248, 0, 0, 1)";
      ctx.rect(
        this.x + this.offset.left,
        this.y + this.offset.top,
        this.width - this.offset.left - this.offset.right,
        this.height - this.offset.top - this.offset.bottom
      );
      ctx.stroke();
    }
  }

  /**
   * Loads multiple images from the specified array of file paths and stores them
   * in the `imageCache` object for future use.
   *
   * @param {string[]} arr - An array of image file paths to load.
   */
  loadImages(arr) {
    arr.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.imageCache[path] = img;
    });
  }

  /**
   * Resolves the image index based on the percentage and threshold values provided.
   * The function compares the percentage with the provided thresholds and returns an index corresponding to the highest threshold the percentage meets.
   *
   * @param {number} fv - The threshold for the highest index (5).
   * @param {number} sv - The threshold for the second index (4).
   * @param {number} tv - The threshold for the third index (3).
   * @param {number} fourv - The threshold for the fourth index (2).
   * @param {number} fivev - The threshold for the fifth index (1).
   * @returns {number} - The image index corresponding to the percentage and threshold values.
   */
  resolveImageIndex(fv, sv, tv, fourv, fivev) {
    if (this.percentage >= fv) {
      return 5;
    } else if (this.percentage >= sv) {
      return 4;
    } else if (this.percentage >= tv) {
      return 3;
    } else if (this.percentage >= fourv) {
      return 2;
    } else if (this.percentage >= fivev) {
      return 1;
    } else {
      return 0;
    }
  }
}
