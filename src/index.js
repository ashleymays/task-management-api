import 'dotenv/config';
import express from 'express';
import { attachRoutes } from 'api/routes';
import { globalErrorHandler } from 'api/middleware/error-handler';

export const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

attachRoutes(app);

app.use(globalErrorHandler);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Running server on port ${PORT}`);
});
