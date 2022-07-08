class Room {
  constructor(id) {
    this.id = id
    this.players = []
  }

  addPlayer(player) {
    this.players.push(player)
  }

  removePlayer(playerId) {
    this.players = this.players.filter(p => p.id !== playerId)
  }

  isEmpty() {
    return this.players.length <= 1
  }
}

export default Room