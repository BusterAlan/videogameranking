import sqlite3 from 'sqlite3';
import { DataSource } from './DataSource.js';

export class SQLiteDataSource extends DataSource {
  constructor() {
    super();
    this.db = new sqlite3.Database(':memory:', (err) => {
      if (err) {
        console.error('Error opening database:', err);
      } else {
        this.initializeDatabase();
      }
    });
  }

  async initializeDatabase() {
    const createTables = `
      CREATE TABLE IF NOT EXISTS players (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );
      CREATE TABLE IF NOT EXISTS scores (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        player_id TEXT,
        score INTEGER NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY(player_id) REFERENCES players(id)
      );
    `;

    return new Promise((resolve, reject) => {
      this.db.exec(createTables, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }

  async createPlayer(player) {
    return new Promise((resolve, reject) => {
      const stmt = this.db.prepare('INSERT INTO players (id, name) VALUES (?, ?)');
      stmt.run(player.id, player.name, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve(player);
        }
      });
    });
  }

  async addScore(score) {
    return new Promise((resolve, reject) => {
      const stmt = this.db.prepare('INSERT INTO scores (player_id, score) VALUES (?, ?)');
      stmt.run(score.playerId, score.score, function(err) {
        if (err) {
          reject(err);
        } else {
          resolve({ id: this.lastID, ...score });
        }
      });
    });
  }

  async getLeaderboard() {
    return new Promise((resolve, reject) => {
      const query = `
        SELECT 
          p.id as playerId,
          p.name as playerName,
          MAX(s.score) as highScore
        FROM players p
        LEFT JOIN scores s ON p.id = s.player_id
        GROUP BY p.id
        ORDER BY highScore DESC
      `;
      
      this.db.all(query, [], (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  }

  async getPlayerScores(playerId) {
    return new Promise((resolve, reject) => {
      const query = `
        SELECT 
          s.id,
          s.score,
          s.created_at as createdAt
        FROM scores s
        WHERE s.player_id = ?
        ORDER BY s.score DESC
      `;
      
      this.db.all(query, [playerId], (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  }
}