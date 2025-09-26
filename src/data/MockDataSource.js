import { DataSource } from './DataSource.js';

export class MockDataSource extends DataSource {
  constructor() {
    super();
    this.players = new Map();
    this.scores = [];
    this.scoreId = 1;
  }

  async createPlayer(player) {
    if (this.players.has(player.id)) {
      throw new Error('Player already exists');
    }
    this.players.set(player.id, player);
    return player;
  }

  async addScore(score) {
    if (!this.players.has(score.playerId)) {
      throw new Error('Player not found');
    }
    const newScore = {
      id: this.scoreId++,
      ...score,
      createdAt: new Date().toISOString()
    };
    this.scores.push(newScore);
    return newScore;
  }

  async getLeaderboard() {
    const leaderboard = [];
    this.players.forEach((player) => {
      const playerScores = this.scores.filter(s => s.playerId === player.id);
      const highScore = playerScores.length > 0 
        ? Math.max(...playerScores.map(s => s.score))
        : 0;
      leaderboard.push({
        playerId: player.id,
        playerName: player.name,
        highScore
      });
    });
    return leaderboard.sort((a, b) => b.highScore - a.highScore);
  }

  async getPlayerScores(playerId) {
    if (!this.players.has(playerId)) {
      throw new Error('Player not found');
    }
    return this.scores
      .filter(score => score.playerId === playerId)
      .sort((a, b) => b.score - a.score);
  }
}