import express from 'express';
import { attachPublicRoutes } from '#routes';

const app = express();

app.use(express.json());

attachPublicRoutes(app);

app.listen(process.env.PORT || 5000);
