import Phaser from 'phaser';
import './scss/style.scss';
import PreloadScene from './js/scene/PreloadScene';
import PlayGame from './js/scene/PlayGame';
import MenuScene from './js/scene/MenuScene';
import RoomScene from './js/scene/RoomScene';

const config = {
  type: Phaser.AUTO,
  width: 320,
  height: 568,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: {
        y: 300
      },
      debug: true
    }
  },
  scene: [PreloadScene, PlayGame, MenuScene, RoomScene]
};

const game = new Phaser.Game(config);