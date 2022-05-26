const path = require('path');
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const api = require('./routes/api');

const app = express();
// the cors package allows the server to accept cross-origin requests from localhost at port 3000 
app.use(cors({
    origin: 'http://localhost:3000'
}));
// logging
app.use(morgan('combined'));

// requests come in, gets checked for json type, goes through express router
// parse any incoming json
app.use(express.json());
// serve static files
app.use(express.static(path.join(__dirname, '..', 'public')));
// NOW this mounts ALL of our routs in api.js under /v1
// basically adds /v1 at the front of the path
// if we want to support more versions we just add a new router and mount to 'v insert watever number you want'
app.use('/v1', api);

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

module.exports = app;