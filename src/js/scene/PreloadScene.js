import Phaser from 'phaser';

class PreloadScene extends Phaser.Scene {
  constructor() {
    super('PreloadScene');
  }

  preload() {
    this.load.image('preloaded', 'src/assets/preloaded.png');
    this.load.image('background', 'src/assets/bg_layer1.png');
    this.load.image('spark', 'src/assets/particles.png');
    this.load.image('tile_1', 'src/assets/tile_1.png');
    this.load.image('tile_2', 'src/assets/tile_2.png');
    this.load.image('tile_3', 'src/assets/tile_3.png');
    this.load.image('tile_4', 'src/assets/tile_4.png');
    this.load.image('tile_5', 'src/assets/tile_5.png');
    this.load.image('tile_6', 'src/assets/tile_6.png');
    this.load.image('tile_7', 'src/assets/tile_7.png');
    this.load.image('tile_8', 'src/assets/tile_8.png');
    this.load.image('tile_9', 'src/assets/tile_9.png');
    this.load.image('tile_10', 'src/assets/tile_10.png');
    this.load.image('tile_11', 'src/assets/tile_11.png');
    this.load.image('tile_12', 'src/assets/tile_12.png');
    this.load.image('tile_13', 'src/assets/tile_13.png');
    this.load.image('tile_14', 'src/assets/tile_14.png');
    this.load.image('tile_15', 'src/assets/tile_15.png');
    this.load.image('tile_16', 'src/assets/tile_16.png');

    this.load.on('progress', function (value) {
      console.log(value);
    });

    this.load.on('fileprogress', function (file) {
      console.log(file.src);
    });

    this.load.on('complete', function () {
      console.log('complete');
    });
  }

  create() {
    this.scene.start('PlayGame');
  }
}


export default PreloadScene;