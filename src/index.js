import 'dotenv/config';
import express from 'express';
import { attachRoutes } from './routes';

const app = express();

const errorHandler = (error, req, res) => {
    console.log('here')
    res.status(error.statusCode).json(error);
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

attachRoutes(app);

app.listen(process.env.PORT || 3000);

app.use(errorHandler);