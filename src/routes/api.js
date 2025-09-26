import express from 'express';
import { playerSchema, scoreSchema } from '../models/schemas.js';
import { DataSourceFactory } from '../data/DataSourceFactory.js';

const router = express.Router();
const dataSource = DataSourceFactory.getDataSource();

// Register a player
router.post('/players', async (req, res) => {
  try {
    const { error, value } = playerSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const player = await dataSource.createPlayer(value);
    res.status(201).json(player);
  } catch (err) {
    console.error('Error creating player:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Submit a score
router.post('/scores', async (req, res) => {
  try {
    const { error, value } = scoreSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const score = await dataSource.addScore(value);
    res.status(201).json(score);
  } catch (err) {
    console.error('Error adding score:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get global leaderboard
router.get('/leaderboard', async (req, res) => {
  try {
    const leaderboard = await dataSource.getLeaderboard();
    res.json(leaderboard);
  } catch (err) {
    console.error('Error getting leaderboard:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get player's score history
router.get('/leaderboard/:player', async (req, res) => {
  try {
    const scores = await dataSource.getPlayerScores(req.params.player);
    res.json(scores);
  } catch (err) {
    console.error('Error getting player scores:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;