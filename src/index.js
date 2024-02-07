import 'dotenv/config';
import express from 'express';
import { attachRoutes } from 'api/routes';
import { errorHandler } from 'api/middleware/error-handler';

export const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

attachRoutes(app);

app.use(errorHandler);

app.listen(process.env.PORT || 3000);
