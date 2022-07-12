class Room {
  constructor(id) {
    this.id = id
    this.players = []
    this.lang = 'en'
  }

  changeLang(lang) {
    this.lang = lang
  }

  addPlayer(player) {
    this.players.push(player)
  }

  removePlayer(playerId) {
    this.players = this.players.filter(p => p.id !== playerId)
  }

  isEmpty() {
    return this.players.length <= 2
  }

  isEveryoneDone() {
    return this.players.every(p => p.done)
  }
}

export default Room