import { SQLiteDataSource } from './SQLiteDataSource.js';
import { MockDataSource } from './MockDataSource.js';
import { FirebaseDataSource } from './FirebaseDataSource.js';

export class DataSourceFactory {
  static getDataSource() {
    const env = process.env.NODE_ENV || 'development';
    const dbType = process.env.DB_TYPE || 'sqlite';

    console.log('\x1b[36m%s\x1b[0m', 'Conectando a la fuente de datos:');
    console.log('\x1b[33m%s\x1b[0m', `   • Ambiente: ${env}`);
    console.log('\x1b[33m%s\x1b[0m', `   • Tipo de BD: ${dbType}`);

    let dataSource;

    // Primero verificar si es ambiente de test
    if (env === 'test') {
      dataSource = new MockDataSource();
      console.log('\x1b[32m%s\x1b[0m', '✅ Usando Mock Data Source para pruebas');
      return dataSource;
    }

    // Para development y production, usar DB_TYPE
    switch (dbType) {
      case 'sqlite':
        dataSource = new SQLiteDataSource();
        console.log('\x1b[32m%s\x1b[0m', '✅ Usando SQLite en memoria');
        break;
      case 'firebase':
        dataSource = new FirebaseDataSource();
        console.log('\x1b[32m%s\x1b[0m', '✅ Usando Firebase Firestore');
        break;
      case 'mock':
        dataSource = new MockDataSource();
        console.log('\x1b[32m%s\x1b[0m', '✅ Usando Mock Data Source');
        break;
      default:
        throw new Error(`Tipo de base de datos desconocido: ${dbType}`);
    }

    return dataSource;
  }
}