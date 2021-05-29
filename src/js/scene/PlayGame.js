import Phaser from 'phaser';
import Socket from './Socket';
class PlayGame extends Phaser.Scene {
  constructor() {
    super('PlayGame');
    this.tilesId = [];
    this._allTiles = [];
    this._deleteTiles = [];
    this.colors = ['0xFF00FF', '0x00ff00'];
    this.socket = new Socket();
    this.start = false;

  }

  findRoom() {
    this.width = this.cameras.main.width;
    this.height = this.cameras.main.height;
    this.preloader = this.add.image(
      this.cameras.main.width / 2,
      this.cameras.main.height / 2.1,
      'preloader'
    ).setScale(0.5);

    this.roomTextStatus = this.make.text({
      x: this.width / 1.9,
      y: this.height / 1.5,
      text: '',
      style: {
        font: '16px monospace',
        fill: 'white',

        //backgroundColor: 'white'
      }
    });

    this.roomTextStatus.setOrigin(0.5, 0.5);
    this.roomTextStatus.z = 1;
  }

  create() {
    this.cameras.main.setBackgroundColor(0x00ff80);
    this.socket.createConnection();
    this.socket.getMessage();
    this.findRoom();
  }
  createTiles() {
    let row = 1;
    let count = 1;
    for (let col = 1; col < 46; col++) {
      if (count > 5) {
        row += 1;
        count = 1;
      }
      const x = (50 + 4) * count // вправо
      const y = (50 + 4) * row; // вверх 
      const tile = this.add.image(x, y, this.socket.game.tiles[col]).setInteractive();
      tile.scale = 0.25;
      this._allTiles.push(tile);

      tile.addListener('pointerdown', () => {
        const ind = this.tilesId.find(i => i.col === col);
        if (ind) {
          this.tilesId = this.tilesId.filter(i => {
            if (i.col !== ind.col) {
              return i;
            }
          });
        } else {
          if (this.tilesId.length < 2) {
            this.tilesId.push({ col, tile: this.socket.game.tiles[col] });
          }
          if (this.tilesId.length === 2) {
            if (this.tilesId[0].tile === this.tilesId[1].tile) {
              this._deleteTiles.push(this.tilesId[0].col);
              this._deleteTiles.push(this.tilesId[1].col);
              this.socket.userEvent(
                { delete: this._deleteTiles, touched: this.tilesId }
              );
              this.tilesId = [];
            }
          }

        }
        this.socket.userEvent(
          { delete: this._deleteTiles, touched: this.tilesId }
        );
      });

      count += 1;
    }
  }

  update() {
    this.tilesTouching();
    this.preloader.rotation += 0.1;
    this.roomTextStatus.setText(this.socket.messages.map(i => i));
    if (this.socket.game.players.length === 2) {
      if (this.start === false) {
        this.start = true;
        if (this.socket.game.tiles) {
          this.add.image(240, 320, 'background').setScrollFactor(1, 0);
          this.createTiles();
          this.preloader.removedFromScene();
          this.preloader.destroy();
          this.roomTextStatus.destroy();
        }
      }

      if (this.start === false) {
       //this.endGame();
      }
    }



  }

  endGame() {
    const unicalTiles = this._allTiles.filter((item, index) => {
      return this._allTiles.indexOf(item) === index;
    });

    if (unicalTiles.length === this._allTiles.length) {
      this.start = false;
    }
  }

  tilesTouching() {
    this._allTiles.forEach(tile => {
      tile.clearTint();
    });
    this.socket.game.players.map(z => {
      if (z.clientId === this.socket.clientId) {
        if (z.events && z.events.touched) {
          z.events.touched.map((i) => {
            this._allTiles[i.col - 1].setTint(this.colors[1]);
          });
        }
      } else {
        if (z.events && z.events.touched) {
          z.events.touched.map((i) => {
            this._allTiles[i.col - 1].setTint(this.colors[0]);
          });
        }
      }

      if (z.events && z.events.delete) {
        z.events.delete.map((i) => {
          if (this._allTiles[i - 1]) {
            this._allTiles[i - 1].destroy();
          }
        })
      }
    })
  }
}
export default PlayGame;