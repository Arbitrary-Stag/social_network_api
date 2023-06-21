const express = require('express');
const db = require('./config/connection');
const routes = require('./routes');

const app = express();
const PORT = 3001;

// Built in Express function that parses incoming requests to JSON
app.use(express.json());
app.use(express.urlencoded({ extened: true }));
app.use(routes);

db.once('open', () => {
  // start up express server
  app.listen(PORT, () => {
    console.log(`API server for social network running on port ${PORT}!`);
  });
});