const http = require('http');

const app = require('./app');
const { loadPlanetsData } = require('./model/planets.model');
// app handles all the requests
const PORT = process.env.PORT || 8000;
// creates express http server
// we can seperate server functions from express code
const server = http.createServer(app);

async function startServer() {
    // wait for the stream to finish loading
    await loadPlanetsData();
    server.listen(PORT, () => {
        console.log(`Listening on ${PORT}`);
    });
};

startServer();