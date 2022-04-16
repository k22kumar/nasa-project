const http = require('http');

const app = require('./app');
// app handles all the requests
const PORT = process.env.PORT || 8000;
// creates express http server
// we can seperate server functions from express code
const server = http.createServer(app);

server.listen(PORT, () => {
    console.log(PORT);
});
