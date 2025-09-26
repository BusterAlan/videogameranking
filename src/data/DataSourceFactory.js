import { SQLiteDataSource } from './SQLiteDataSource.js';
import { MockDataSource } from './MockDataSource.js';

export class DataSourceFactory {
  static getDataSource() {
    const env = process.env.NODE_ENV || 'development';
    const dbType = process.env.DB_TYPE || 'sqlite';

    switch (env) {
      case 'test':
        return new MockDataSource();
      case 'development':
        if (dbType === 'sqlite') {
          return new SQLiteDataSource();
        }
        throw new Error('Unsupported database type for development');
      case 'production':
        // For production, you'll need to implement a real database connection
        throw new Error('Production database not implemented');
      default:
        throw new Error('Unknown environment');
    }
  }
}