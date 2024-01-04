const express = require('express');
const attachRoutes = require('./routes');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

attachRoutes(app);

app.listen(process.env.PORT || 5000);
