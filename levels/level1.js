let level1;

/**
 * Initializes a new level with predefined entities including enemies, clouds, background objects, coins, and bottles.
 *
 * The function creates a new `Level` object containing the following:
 * - Enemies: A mix of `Chicken`, `LittleChicken`, and one `Endboss`.
 * - Clouds: Several `Cloud` objects with different background images.
 * - Background objects: A sequence of background layers including air, first, second, and third layers.
 * - Collectible items: Coins and bottles scattered throughout the level.
 *
 * @function initLevel
 * @global
 */
function initLevel() {
  level1 = new Level(
    [
      new Chicken(), new Chicken(), new Chicken(), new Chicken(), new Chicken(), 
      new Chicken(), new Chicken(), new Chicken(), new Chicken(), new Chicken(),
      new Chicken(), new Chicken(), new Chicken(), new Chicken(), new Chicken(),
      new Chicken(), new Chicken(), new LittleChicken(), new LittleChicken(),
      new LittleChicken(), new LittleChicken(), new LittleChicken(), new LittleChicken(),
      new LittleChicken(), new LittleChicken(), new LittleChicken(), new LittleChicken(),
      new LittleChicken(), new LittleChicken(), new LittleChicken(), new Endboss(),
    ],
    [
      new Cloud("img/5_background/layers/4_clouds/1.png"),
      new Cloud("img/5_background/layers/4_clouds/2.png"),
      new Cloud("img/5_background/layers/4_clouds/1.png"),
      new Cloud("img/5_background/layers/4_clouds/2.png"),
      new Cloud("img/5_background/layers/4_clouds/1.png"),
      new Cloud("img/5_background/layers/4_clouds/2.png"),
      new Cloud("img/5_background/layers/4_clouds/1.png"),
      new Cloud("img/5_background/layers/4_clouds/2.png"),
      new Cloud("img/5_background/layers/4_clouds/1.png"),
      new Cloud("img/5_background/layers/4_clouds/2.png"),
      new Cloud("img/5_background/layers/4_clouds/1.png"),
      new Cloud("img/5_background/layers/4_clouds/2.png"),
    ],
    [
      new BackgroundObject("img/5_background/layers/air.png", -719),
      new BackgroundObject("img/5_background/layers/3_third_layer/2.png", -719),
      new BackgroundObject("img/5_background/layers/2_second_layer/2.png", -719),
      new BackgroundObject("img/5_background/layers/1_first_layer/2.png", -719),
      
      new BackgroundObject("img/5_background/layers/air.png", 0),
      new BackgroundObject("img/5_background/layers/3_third_layer/1.png", 0),
      new BackgroundObject("img/5_background/layers/2_second_layer/1.png", 0),
      new BackgroundObject("img/5_background/layers/1_first_layer/1.png", 0),
      
      new BackgroundObject("img/5_background/layers/air.png", 719),
      new BackgroundObject("img/5_background/layers/3_third_layer/2.png", 719),
      new BackgroundObject("img/5_background/layers/2_second_layer/2.png", 719),
      new BackgroundObject("img/5_background/layers/1_first_layer/2.png", 719),
      
      new BackgroundObject("img/5_background/layers/air.png", 719 * 2),
      new BackgroundObject("img/5_background/layers/3_third_layer/1.png", 719 * 2),
      new BackgroundObject("img/5_background/layers/2_second_layer/1.png", 719 * 2),
      new BackgroundObject("img/5_background/layers/1_first_layer/1.png", 719 * 2),
      
      new BackgroundObject("img/5_background/layers/air.png", 719 * 3),
      new BackgroundObject("img/5_background/layers/3_third_layer/2.png", 719 * 3),
      new BackgroundObject("img/5_background/layers/2_second_layer/2.png", 719 * 3),
      new BackgroundObject("img/5_background/layers/1_first_layer/2.png", 719 * 3),
      
      new BackgroundObject("img/5_background/layers/air.png", 719 * 4),
      new BackgroundObject("img/5_background/layers/3_third_layer/1.png", 719 * 4),
      new BackgroundObject("img/5_background/layers/2_second_layer/1.png", 719 * 4),
      new BackgroundObject("img/5_background/layers/1_first_layer/1.png", 719 * 4),
      
      new BackgroundObject("img/5_background/layers/air.png", 719 * 5),
      new BackgroundObject("img/5_background/layers/3_third_layer/2.png", 719 * 5),
      new BackgroundObject("img/5_background/layers/2_second_layer/2.png", 719 * 5),
      new BackgroundObject("img/5_background/layers/1_first_layer/2.png", 719 * 5),
      
      new BackgroundObject("img/5_background/layers/air.png", 719 * 6),
      new BackgroundObject("img/5_background/layers/3_third_layer/1.png", 719 * 6),
      new BackgroundObject("img/5_background/layers/2_second_layer/1.png", 719 * 6),
      new BackgroundObject("img/5_background/layers/1_first_layer/1.png", 719 * 6),
      
      new BackgroundObject("img/5_background/layers/air.png", 719 * 7),
      new BackgroundObject("img/5_background/layers/3_third_layer/2.png", 719 * 7),
      new BackgroundObject("img/5_background/layers/2_second_layer/2.png", 719 * 7),
      new BackgroundObject("img/5_background/layers/1_first_layer/2.png", 719 * 7),
      
      new BackgroundObject("img/5_background/layers/air.png", 719 * 8),
      new BackgroundObject("img/5_background/layers/3_third_layer/1.png", 719 * 8),
      new BackgroundObject("img/5_background/layers/2_second_layer/1.png", 719 * 8),
      new BackgroundObject("img/5_background/layers/1_first_layer/1.png", 719 * 8),
      
      new BackgroundObject("img/5_background/layers/air.png", 719 * 9),
      new BackgroundObject("img/5_background/layers/3_third_layer/2.png", 719 * 9),
      new BackgroundObject("img/5_background/layers/2_second_layer/2.png", 719 * 9),
      new BackgroundObject("img/5_background/layers/1_first_layer/2.png", 719 * 9),
      
      new BackgroundObject("img/5_background/layers/air.png", 719 * 10),
      new BackgroundObject("img/5_background/layers/3_third_layer/1.png", 719 * 10),
      new BackgroundObject("img/5_background/layers/2_second_layer/1.png", 719 * 10),
      new BackgroundObject("img/5_background/layers/1_first_layer/1.png", 719 * 10),
      
      new BackgroundObject("img/5_background/layers/air.png", 719 * 11),
      new BackgroundObject("img/5_background/layers/3_third_layer/2.png", 719 * 11),
      new BackgroundObject("img/5_background/layers/2_second_layer/2.png", 719 * 11),
      new BackgroundObject("img/5_background/layers/1_first_layer/2.png", 719 * 11),
      
      new BackgroundObject("img/5_background/layers/air.png", 719 * 12),
      new BackgroundObject("img/5_background/layers/3_third_layer/1.png", 719 * 12),
      new BackgroundObject("img/5_background/layers/2_second_layer/1.png", 719 * 12),
      new BackgroundObject("img/5_background/layers/1_first_layer/1.png", 719 * 12),
      
      new BackgroundObject("img/5_background/layers/air.png", 719 * 13),
      new BackgroundObject("img/5_background/layers/3_third_layer/2.png", 719 * 13),
      new BackgroundObject("img/5_background/layers/2_second_layer/2.png", 719 * 13),
      new BackgroundObject("img/5_background/layers/1_first_layer/2.png", 719 * 13),
    ],
    [
      new Coins(), new Coins(), new Coins(), new Coins(), new Coins()
    ],
    [
      new Bottle(), new Bottle(), new Bottle(), new Bottle(), new Bottle(), 
      new Bottle(), new Bottle(), new Bottle()
    ]
  );
}
