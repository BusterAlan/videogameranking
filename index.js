import express from 'express';
import dotenv from 'dotenv';
import apiRoutes from './src/routes/api.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/', apiRoutes);

app.listen(port, () => {
  console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${port}`);
});
