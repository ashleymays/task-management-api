const express = require("express");
const { queryParser } = require("express-query-parser");
const attachRoutes = require("./routes");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  queryParser({
    parseNull: true,
    parseUndefined: true,
    parseBoolean: true,
    parseNumber: true,
  }),
);

attachRoutes(app);

app.listen(process.env.PORT || 5000);
