class Room {
  constructor(id) {
    this.id = id
    this.players = []
  }

  addPlayer(player) {
    this.players.push(player)
  }

  removePlayer(player) {
    this.players = this.players.filter(p => p.id !== player.id)
  }

  isEmpty() {
    return this.players.length === 0
  }

  playerExists(player) {
    return this.players.some(p => p.id === player.id)
  }
}

export default Room