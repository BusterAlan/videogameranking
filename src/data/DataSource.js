export class DataSource {
  async createPlayer(player) {
    throw new Error('Not implemented');
  }

  async addScore(score) {
    throw new Error('Not implemented');
  }

  async getLeaderboard() {
    throw new Error('Not implemented');
  }

  async getPlayerScores(playerId) {
    throw new Error('Not implemented');
  }
}