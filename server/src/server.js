const http = require('http');

const app = require('./app');
const { mongoConnect } = require('./services/mongo');
const { loadPlanetsData } = require('./model/planets.model');
// app handles all the requests
const PORT = process.env.PORT || 8000;



// creates express http server
// we can seperate server functions from express code
const server = http.createServer(app);


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

    await mongoConnect();
    
    // wait for the stream to finish loading
    await loadPlanetsData();
    server.listen(PORT, () => {
        console.log(`Listening on ${PORT}`);
    });
};

startServer();