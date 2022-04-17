const path = require('path');
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const planetsRouter = require('./routes/planets/planets.router');
const launchesRouter = require('./routes/launches/launches.router');
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

app.use(planetsRouter);
app.use(launchesRouter);
// Usually client is responsible for routing between views but if the pages are being loaded by the server then the server will attempt to find matching view routes that do not exist (in the server side public folder / build files), use the * to match any endpoint that is not matched from the above lines of code ie: planetsRouter, launchesRouter etc. It will pass it on to the client in our index.html so whatever the frontend is (our case react) can handle the front end. Server just sends the html
// For more info you can look at the docs in Node for client router specifications
app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});
module.exports = app;