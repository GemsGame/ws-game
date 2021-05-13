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
  }
  create() {
    this.add.image(240, 320, 'background').setScrollFactor(1, 0);
    this.createTiles();
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
          this._allTiles[i - 1].removeFromDisplayList();
        })
      }
    })
  }
}
export default PlayGame;