import 'dotenv/config';
import express from 'express';
import { attachRoutes } from './routes';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

attachRoutes(app);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`started server at port ${PORT}`);
});
