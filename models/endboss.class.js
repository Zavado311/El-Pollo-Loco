class Endboss extends MovableObject {
  height = 400;
  width = 250;
  y = 50;
  x = 8350;
  energy = 10;
  oldEnergy = 10;
  hadFirstContact = false;
  moveChicken = false;
  i = 0;
  offset = {
    top: 85,
    bottom: 0,
    left: 0,
    right: 0,
  };

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
    this.preLoadAllImages();
    this.speed = 0.8 + Math.random() * 0.5;
    this.animate();
  }

  preLoadAllImages() {
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_ATTACK);
    this.loadImages(this.IMAGES_ALERT);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_DEAD);
  }

  animate() {
    setInterval(() => this.animationIfFirstContact(), 150);

    setInterval(() => this.moveEndboss(), 1000 / 60);

    setInterval(() => this.checkTheInteraction(), 100);
  }

  animationIfFirstContact() {
    let i = 0;
    if (!this.isDeadEnemy) {
      if (this.showFirstContactAnimation()) {
        this.playAnimation(this.IMAGES_ALERT);
      } else if (this.hadFirstContact) {
        this.showMovement();
      }
      this.i++;
      if (this.checkFirstContact) {
        this.gotFirstContact();
      }
    }
  }

  showFirstContactAnimation() {
    return this.i < 10 || !this.hadFirstContact;
  }

  showMovement() {
    this.playAnimation(this.IMAGES_WALKING);
    this.moveChicken = true;
  }

  checkFirstContact() {
    return positionCharacter > 7000 && !this.hadFirstContact;
  }

  gotFirstContact() {
    this.i = 0;
    this.hadFirstContact = true;
  }

  moveEndboss() {
    if (!this.isDeadEnemy && this.hadFirstContact) {
      if (this.characterOnTheLeft()) {
        this.moveLeft();
      } else if (this.characterOnTheRight()) {
        this.moveRight();
      }
    }
  }

  characterOnTheLeft() {
    return positionCharacter < this.x && this.moveChicken;
  }

  moveLeft() {
    super.moveLeft();
    this.otherDirection = false;
  }

  characterOnTheRight() {
    return positionCharacter > this.x && this.moveChicken;
  }

  moveRight() {
    super.moveRight();
    this.otherDirection = true;
  }

  checkTheInteraction() {
    if (this.isDead()) {
      this.playAnimation(this.IMAGES_DEAD);
      this.world.youWinOrLost = "win";
    } else if (this.isHurt() < 1) {
      this.playAnimation(this.IMAGES_HURT);
    } else if (this.isHurt() < 5) {
      this.playAnimation(this.IMAGES_ATTACK);
    }
  }
}
