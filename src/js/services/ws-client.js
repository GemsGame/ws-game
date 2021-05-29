export default class WebSocketClient {
  constructor() {
    this.clientId = null;
    this.game = {
      players: []
    };
    this.messages = [];
  }
  createConnection () {
    this.socket = new WebSocket('ws://localhost:3011');
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
          this.messages.push('Комната найдена ->>');
          this.game = response.game;
          this.joinToGame();
          this.messages.push('Подключаемся ->>');
        } else {
          console.log('room not found ->>');
          this.messages.push('Комната не найдена ->>');
          this.createNewRoom();
          this.messages.push('Создаем игру ->>');
          this.searchRoom();
        }
      }
      if (response.method === 'user event') {
        console.log('event ->>');
        this.game = response.game;
        console.log(this);
      }

      if(response.method === 'join') {
        console.log('join ->>');
        this.game = response.game;
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