const express = require("express");
const { attachRoutes } = require('./routes');

const app = express();

app.use(express.json());

attachRoutes(app);

app.listen(process.env.PORT || 8080);