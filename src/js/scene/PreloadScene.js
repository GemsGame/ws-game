import Phaser from 'phaser';

class PreloadScene extends Phaser.Scene {
  constructor() {
    super('PreloadScene');
    
  }

  preload() {
    this.cameras.main.setBackgroundColor(0x00ff80);
    
    var width = this.cameras.main.width;
    var height = this.cameras.main.height;
    
    var progressBar = this.add.graphics();
    var progressBox = this.add.graphics();
    progressBox.fillStyle(0xFFFFFF, 0.8);
    progressBox.fillRect(0, 260, 320, 50);
     
    var percentText = this.make.text({
      x: width / 2,
      y: height / 2,
      text: '0%',
      style: {
        font: '18px monospace',
        fill: 'black'
      }
    });
    percentText.setOrigin(0.5, 0.5);
    this.load.image('logo', 'src/assets/logo.png');
    this.load.image('music_off', 'src/assets/musicOff.png');
    this.load.image('music_on', 'src/assets/musicOn.png');
    this.load.image('preloader', 'src/assets/preloader.png');
    this.load.image('share', 'src/assets/share2.png');
    this.load.image('leaderboardsComplex', 'src/assets/leaderboardsComplex.png');
    this.load.image('open', 'src/assets/open.png');
    //this.load.image('rating', 'src/assets/rating.png');
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
      progressBar.clear();
      progressBar.fillStyle(0xffffff, 1);
      progressBar.fillRect(0, 270, 320 * value, 30);
      percentText.setText(parseInt(value * 100) + '%');
    });

    this.load.on('fileprogress', function (file) {
      //console.log(file.key);
    });

    this.load.on('complete', function () {
      progressBar.destroy();
      progressBox.destroy();
      percentText.destroy();
    });
  }

  create() {
    this.scene.start('MenuScene');
  }
}


export default PreloadScene;