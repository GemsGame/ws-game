export default class WebSocketClient {
  constructor() {
    this.socket = new WebSocket('ws://localhost:3011');
    this.clientId = null;
    this.game = null;
    this.getMessage();
  }
  getMessage() {
    this.socket.onmessage = (message) => {
      const response = JSON.parse(message.data);
      if (response.method === 'connect') {
        this.clientId = response.clientId;
        this.searchRoom();
      }
      if (response.method === "create") {
        this.game = response.game;
      }
      if (response.method === "search room") {
        if(response.find) {
          console.log('room found ->>');
          this.game = response.game;
          this.joinToGame();
        } else {
          console.log('room not found ->>');
          this.createNewRoom();
          this.searchRoom();
        }
      }
      if (response.method === 'user event') {
        console.log('event ->>');
        this.game = response.game;
        console.log(this);
      }
    }
  }
  create() {
    const payLoad = { method: "create" };
    this.socket.send(JSON.stringify(payLoad));
  }
  searchRoom() {
    const payLoad = {
      method: "search room",
      clientId: this.clientId,
    }
    this.socket.send(JSON.stringify(payLoad));
  }
  createNewRoom() {
    const payLoad = { method: "create" }
    this.socket.send(JSON.stringify(payLoad));
  }
  joinToGame() {
    const payLoad = {
      method: "join",
      clientId: this.clientId,
      gameId: this.game.gameId
    }
    this.socket.send(JSON.stringify(payLoad));
  }
  
  userEvent(events) {
      const payLoad = {
        method: "user event",
        clientId: this.clientId,
        gameId: this.game.gameId,
        events
      }
      this.socket.send(JSON.stringify(payLoad));
  }
  
}