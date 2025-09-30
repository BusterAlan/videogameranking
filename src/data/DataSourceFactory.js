import { SQLiteDataSource } from './SQLiteDataSource.js';
import { MockDataSource } from './MockDataSource.js';
import { FirebaseDataSource } from './FirebaseDataSource.js';

export class DataSourceFactory {
  static getDataSource() {
    const env = process.env.NODE_ENV || 'development';
    const dbType = process.env.DB_TYPE || 'sqlite';

    console.log('\x1b[36m%s\x1b[0m', '🔌 Conectando a la fuente de datos:');
    console.log('\x1b[33m%s\x1b[0m', `   • Ambiente: ${env}`);
    console.log('\x1b[33m%s\x1b[0m', `   • Tipo de BD: ${dbType}`);

    let dataSource;
    switch (env) {
      case 'test':
        dataSource = new MockDataSource();
        console.log('\x1b[32m%s\x1b[0m', '✅ Usando Mock Data Source para pruebas');
        break;
      case 'development':
        if (dbType === 'sqlite') {
          dataSource = new SQLiteDataSource();
          console.log('\x1b[32m%s\x1b[0m', '✅ Usando SQLite en memoria para desarrollo');
        } else {
          dataSource = new FirebaseDataSource();
        }
        break;
      case 'production':
        throw new Error('Base de datos de producción no implementada');
      default:
        throw new Error('Ambiente desconocido');
    }

    return dataSource;
  }
}