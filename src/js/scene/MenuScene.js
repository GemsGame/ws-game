import Phaser from 'phaser';

class MenuScene extends Phaser.Scene {
  constructor() {
    super('MenuScene');
  }

  preload() {
    this.cameras.main.setBackgroundColor(0x00ff80);
  }

  create() {
    this.width = this.cameras.main.width;
    this.height = this.cameras.main.height;
    const play = this.add.image(this.width / 2, this.height / 2.1, 'open').setScale(1);
    play.setInteractive();
    play.on('pointerdown', (e) => {
      this.scene.start('PlayGame');
    })
    this.add.image(this.width / 2, this.height / 1.2, 'leaderboardsComplex').setScale(0.8);
    this.add.image(this.width / 2, this.height / 8, 'logo').setScale(0.5);
    this.add.image(this.width / 1.2, this.height / 1.2, 'music_off').setScale(0.5);
    this.add.image(this.width / 6, this.height / 1.2, 'share').setScale(0.5);
  }
}


export default MenuScene;