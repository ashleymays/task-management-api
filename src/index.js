import 'dotenv/config';
import express from 'express';
import { attachRoutes } from './routes';

export const app = express();

const errorHandler = (error, req, res, next) => {
  res.status(error.statusCode).json(error);
};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

attachRoutes(app);

app.use(errorHandler);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`started server on port ${PORT}`);
});
