import 'dotenv/config';
import express from 'express';
import { attachRoutes } from './routes';

export const app = express();

const errorHandler = (error, req, res, next) => {
  res.status(error.statusCode || 500).json(error);
};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

attachRoutes(app);

app.use(errorHandler);

app.listen(process.env.PORT || 3000);
