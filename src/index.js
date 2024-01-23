import express from 'express';
import { sequelize } from './database.js';

const app = express();
app.use(express.json());

sequelize
  .authenticate()
  .then(() => console.log('done'))
  .catch((error) => console.error(error));

app.listen(process.env.PORT || 8080, () => {
  console.log('Started server');
});
