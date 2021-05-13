const WebSocket = require('ws').Server;

class WebSocketServer {
  constructor() {
    this.ws = new WebSocket({ port: 3011 });
    this.players = {};
    this.games = {};
  }
  uniqueId() {
    return Date.now().toString(36) + Math.random().toString(36).substring(2);
  }
  listen() {
    this.ws.on('connection', connection => {
      //generate new client 
      const clientId = this.uniqueId();
      this.players[clientId] = {
        connection
      }
      const returnInfo = {
        method: "connect",
        clientId
      }
      // send back the client connect
      connection.send(JSON.stringify(returnInfo));

      //messages from client
      connection.on('message', message => {
        const response = JSON.parse(message);
        //create game
        if (response.method === 'create') {
          const gameId = this.uniqueId();
          this.games[gameId] = {
            gameId,
            players: [],
            tiles: this.generateTilesArray()
          }
          const payLoad = {
            method: "create",
            game: this.games[gameId],
          }
          this.players[clientId].connection.send(JSON.stringify(payLoad));
        }
        if (response.method === "join") {
          const clientId = response.clientId;
          const gameId = response.gameId;
          this.games[gameId].players.push({ clientId });
          this.games[gameId].players.forEach(({ clientId }) => {
            if (this.players[clientId].connection.readyState === 1) {
              this.players[clientId].connection.send(JSON.stringify({ game: this.games[gameId], method: "join" }))
            }
          })
        }
        if (response.method === "search room") {
          const payLoad = {
            method: "search room",
            find: false
          }
          const clientId = response.clientId;
          const findRoom = Object.keys(this.games).find(hash => {
            if (this.games[hash].players.length < 2) {
              const payloadFind = {
                method: "search room",
                find: true,
                game: this.games[hash]
              }
              this.players[clientId].connection.send(JSON.stringify(payloadFind));
              return hash;
            }
          })
          if (!findRoom || Object.keys(this.games).length === 0) {
            this.players[clientId].connection.send(JSON.stringify(payLoad));
          }
        }
        if (response.method === "user event") {
          this.games[response.gameId].players.forEach((i) => {
            if (i.clientId === response.clientId) {

              if (this.games[response.gameId]) {
                i.events = response.events;
              }
            }
          })
          this.games[response.gameId].players.forEach(({ clientId }) => {
            if (this.players[clientId].connection.readyState === 1) {
              this.players[clientId].connection.send(JSON.stringify({ game: this.games[response.gameId], method: "user event" }))
            }
          })
        }
        /* if (response.method === "finish game") {
          if (!games[result.gameId].finishGame.find(i => i === result.clientId)) {
            games[result.gameId].finishGame.push(result.clientId);
          }
          games[result.gameId].players.forEach(({ clientId }) => {
            if (players[clientId].connection.readyState === 1) {
              players[clientId].connection.send(JSON.stringify({ game: games[result.gameId], method: "finish game" }))
            }
          });
        } */
      })
    });
  }


  generateTilesArray () {
    const tiles = [];

    for(let i = 1; i < 50; i++) {
      tiles.push('tile_' + Math.floor(Math.random() * 15 + 1));
    }

    return tiles;
  }
}

const server = new WebSocketServer();
server.listen();