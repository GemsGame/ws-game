import Phaser from 'phaser';

class PreloadScene extends Phaser.Scene {
  constructor() {
    super('PreloadScene');
  }

  preload() {
    this.load.image('background', 'src/assets/bg_layer1.png');
    this.load.image('platform', 'src/assets/ground_grass.png');
    this.load.image('bunny_stand', 'src/assets/bunny1_stand.png');
  }

  create() {
    this.scene.start('PlayGame');
  }
}


export default PreloadScene;