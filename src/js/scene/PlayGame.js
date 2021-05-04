import Phaser from 'phaser';

class PlayGame extends Phaser.Scene {
  constructor() {
    super('PlayGame');
  }

  create() {
    this.add.image(240, 320, 'background').setScrollFactor(1, 0);
    this.player = this.physics.add.sprite(240, 320, 'bunny_stand').setScale(0.5);
    this.player.body.checkCollision.up = false
    this.player.body.checkCollision.left = false
    this.player.body.checkCollision.right = false

    this.platforms = this.physics.add.staticGroup();

    for (let i = 0; i < 5; i++) {
      const x = Phaser.Math.Between(80, 400);
      const y = 150 * i;

      const platform = this.platforms.create(x, y, 'platform');
      platform.scale = 0.5;

      const body = platform.body;
      body.updateFromGameObject();
    }

    this.physics.add.collider(this.platforms, this.player);

    this.cameras.main.startFollow(this.player);
  }

  preload() {
    this.cursors = this.input.keyboard.createCursorKeys();
  }

  update() {
    this.platforms.children.iterate(child => {
      const platform = child;
      const scrollY = this.cameras.main.scrollY;
      if (platform.y >= scrollY + 700) {
        platform.y = scrollY - Phaser.Math.Between(50, 100);
        platform.body.updateFromGameObject();
      }
    })

    const touchingDown = this.player.body.touching.down;

    if (touchingDown) {
      // this makes the bunny jump straight up
      this.player.setVelocityY(-300);

    }


    // left and right input logic
    if (this.cursors.left.isDown && !touchingDown) {
      this.player.setVelocityX(-200)

    }
    else if (this.cursors.right.isDown && !touchingDown) {
      this.player.setVelocityX(200)

    }
    else {
      // stop movement if not left or right
      this.player.setVelocityX(0)

    }

  }
  
}


export default PlayGame;