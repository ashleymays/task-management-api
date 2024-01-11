const express = require('express');
const { attachPublicRoutes } = require('./routes');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

attachPublicRoutes(app);

app.listen(process.env.PORT || 5000);
