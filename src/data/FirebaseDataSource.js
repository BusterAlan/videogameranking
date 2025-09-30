import { DataSource } from './DataSource.js';
import admin from 'firebase-admin';
import serviceAccount from '../../firebaseServiceAccount.json' assert { type: 'json' };

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
}
const db = admin.firestore();

export class FirebaseDataSource extends DataSource {
  async createPlayer(player) {
    await db.collection('players').doc(player.id).set(player);
    return player;
  }
  async addScore(score) {
    const ref = await db.collection('scores').add(score);
    return { id: ref.id, ...score };
  }
  async getLeaderboard() {
    // Implementa lógica para ranking global usando Firestore queries
  }
  async getPlayerScores(playerId) {
    // Implementa lógica para historial de puntajes
  }
}