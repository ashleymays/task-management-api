import express from 'express';
import { attachRoutes } from './routes';

const app = express();

app.use(express.json());

attachRoutes(app);

app.listen(8080, () => {
  console.log('Started server');
});
