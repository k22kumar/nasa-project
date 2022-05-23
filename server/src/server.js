const http = require('http');
const mongoose = require('mongoose');

const app = require('./app');
const { loadPlanetsData } = require('./model/planets.model');
// app handles all the requests
const PORT = process.env.PORT || 8000;

const MONGO_URL = `mongodb+srv://nasa-api:3T734l0ISkngasqV@nasacluster.fzkqq.mongodb.net/nasa?retryWrites=true&w=majority`

// creates express http server
// we can seperate server functions from express code
const server = http.createServer(app);

mongoose.connection.on('open', () => {
    console.log('MongoDB connection ready!')
});

mongoose.connection.on('error', (err) => {
    console.error(err);
});

async function startServer() {
    // connect to mongo
    // Only necessary for versions of Mongoose below 6
    // await mongoose.connect(MONGO_URL, {
    //     // How mongoose parses that connection string
    //     useNewUrlParser: true,
    //     // disables outdated way of updating mongoose data
    //     useFindAndModify: false,
    //     // enable new create index function
    //     useCreateIndex: true,
    //     // use updated way of talking to clusters in MongoDB
    //     useUnifiedTopology: true
    // });

    // All versions of Mongoose 6 and over have those options on by default
    await mongoose.connect(MONGO_URL);

    // wait for the stream to finish loading
    await loadPlanetsData();
    server.listen(PORT, () => {
        console.log(`Listening on ${PORT}`);
    });
};

startServer();