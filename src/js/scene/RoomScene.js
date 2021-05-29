import Phaser from 'phaser';

class RoomScene extends Phaser.Scene {
  constructor() {
    super('RoomScene');
  }

  preload() {
    this.cameras.main.setBackgroundColor(0x93C54B);
  }

  create() {
    //this.scene.start('PlayGame');
  }
}


export default RoomScene;