import Phaser from 'phaser';
import './scss/style.scss';
import PreloadScene from './js/scene/PreloadScene';
import PlayGame from './js/scene/PlayGame';
import MenuScene from './js/scene/MenuScene';

const config = {
  type: Phaser.AUTO,
  width: 480,
  height: 640,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: {
        y: 300
      },
      debug: true
    }
  },
  scene: [PreloadScene, PlayGame, MenuScene]
};

const game = new Phaser.Game(config);
