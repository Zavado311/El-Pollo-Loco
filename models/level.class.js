class Level {
  enemies;
  clouds;
  backgroundObjects;
  coins;
  bottles;
  level_end_x = 9347;

  /**
   * Creates an instance of the Level class.
   *
   * @param {Array} enemies - The enemies present in the level.
   * @param {Array} clouds - The clouds that appear in the level.
   * @param {Array} backgroundObjects - The background objects in the level.
   * @param {Array} coins - The coins that can be collected in the level.
   * @param {Array} bottles - The bottles that can be collected in the level.
   */
  constructor(enemies, clouds, backgroundObjects, coins, bottles) {
    this.enemies = enemies;
    this.clouds = clouds;
    this.backgroundObjects = backgroundObjects;
    this.coins = coins;
    this.bottles = bottles;
  }
}
