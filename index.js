import express from 'express';
import dotenv from 'dotenv';
import apiRoutes from './src/routes/api.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/', apiRoutes);

app.listen(port, () => {
  console.log('\nServidor iniciado:');
  console.log('\x1b[33m%s\x1b[0m', `   • Puerto: ${port}`);
  console.log('\x1b[33m%s\x1b[0m', `   • Ambiente: ${process.env.NODE_ENV || 'development'}`);
  console.log('\x1b[33m%s\x1b[0m', `   • Base de datos: ${process.env.DB_TYPE || 'sqlite'}\n`);
});
