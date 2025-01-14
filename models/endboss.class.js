class Endboss extends MovableObject {
  height = 400;
  width = 250;
  y = 50;
  x = 8350;
  energy = 10;
  oldEnergy = 10;
  offset = {
    top: 85,
    bottom: 0,
    left: 0,
    right: 0,
  };
  hadFirstContact = false;
  moveChicken = false;

  IMAGES_ALERT = [
    "img/4_enemie_boss_chicken/2_alert/G5.png",
    "img/4_enemie_boss_chicken/2_alert/G6.png",
    "img/4_enemie_boss_chicken/2_alert/G7.png",
    "img/4_enemie_boss_chicken/2_alert/G8.png",
    "img/4_enemie_boss_chicken/2_alert/G9.png",
    "img/4_enemie_boss_chicken/2_alert/G10.png",
    "img/4_enemie_boss_chicken/2_alert/G11.png",
    "img/4_enemie_boss_chicken/2_alert/G12.png",
  ];

  IMAGES_WALKING = [
    "img/4_enemie_boss_chicken/1_walk/G1.png",
    "img/4_enemie_boss_chicken/1_walk/G2.png",
    "img/4_enemie_boss_chicken/1_walk/G3.png",
    "img/4_enemie_boss_chicken/1_walk/G4.png",
  ];

  IMAGES_ATTACK = [
    "img/4_enemie_boss_chicken/3_attack/G13.png",
    "img/4_enemie_boss_chicken/3_attack/G14.png",
    "img/4_enemie_boss_chicken/3_attack/G15.png",
    "img/4_enemie_boss_chicken/3_attack/G16.png",
    "img/4_enemie_boss_chicken/3_attack/G17.png",
    "img/4_enemie_boss_chicken/3_attack/G18.png",
    "img/4_enemie_boss_chicken/3_attack/G19.png",
    "img/4_enemie_boss_chicken/3_attack/G20.png",
  ];

  IMAGES_HURT = [
    "img/4_enemie_boss_chicken/4_hurt/G21.png",
    "img/4_enemie_boss_chicken/4_hurt/G22.png",
    "img/4_enemie_boss_chicken/4_hurt/G23.png",
  ];

  IMAGES_DEAD = [
    "img/4_enemie_boss_chicken/5_dead/G24.png",
    "img/4_enemie_boss_chicken/5_dead/G25.png",
    "img/4_enemie_boss_chicken/5_dead/G26.png",
  ];

  constructor() {
    super().loadImage(this.IMAGES_ALERT[0]);
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_ATTACK);
    this.loadImages(this.IMAGES_ALERT);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_DEAD);
    this.speed = 0.5 + Math.random() * 0.5;

    this.animate();
    // this.checkAttacks();
    //this.animateDeath();
  }
  animate() {
    let i = 0;
    setInterval(() => {
      if (!this.isDeadEnemy) {
        if (i < 10 || !this.hadFirstContact) {
          this.playAnimation(this.IMAGES_ALERT);
        } else if (this.hadFirstContact) {
          this.playAnimation(this.IMAGES_WALKING);
          this.moveChicken = true;
        }
        i++;

        if (positionCharacter > 7400 && !this.hadFirstContact) {
          i = 0;
          this.hadFirstContact = true;
        }
      }
    }, 150);

    setInterval(() => {
      if (!this.isDeadEnemy && this.hadFirstContact) {
        if (positionCharacter < this.x && this.moveChicken) {
          this.moveLeft();
          this.otherDirection = false;
        } else if (positionCharacter > this.x && this.moveChicken) {
          this.moveRight();
          this.otherDirection = true;
        }
      }
    }, 1000 / 60);

    setInterval(() => {
      if (this.isDead()) {
        this.playAnimation(this.IMAGES_DEAD);
        this.youWinOrLost = "win";
      } else if (this.isHurt()) {
        this.playAnimation(this.IMAGES_HURT);
      } else if (this.isHurtAttackBack()) {
        this.playAnimation(this.IMAGES_ATTACK);
      }
    }, 100);
  }
  /*
  checkAttacks() {
    setInterval(() => {
      if (this.energy !== this.oldEnergy) {
        this.playAnimation(this.IMAGES_HURT);
        this.oldEnergy = this.energy;
      }
    }, 1000 / 60);
  }*/
  /*
  animateDeath() {
    let i = 0;
    setInterval(() => {
      if (i < 5 && this.isDeadEnemy) {
        this.playAnimation(this.IMAGES_DEAD);
        i++;
      } else if (this.isDeadEnemy) {
        this.loadImage("img/4_enemie_boss_chicken/5_dead/G26.png");
      }
    }, 250);
  }*/
}
