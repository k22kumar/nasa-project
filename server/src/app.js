const express = require('express');

const app = express();
// parse any incoming json
app.use(express.json());

module.exports = app;