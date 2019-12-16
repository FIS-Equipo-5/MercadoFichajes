const app = require('./server.js');
const dbConnect = require('./db');
const dbConfig = require('./config/database.config.js');


console.log("Starting API server at "+dbConfig.port);

dbConnect().then(
    () => {
        app.listen(dbConfig.port);
        console.log("Server is listening on port " + dbConfig.port);
    },
    err => {
        console.log("Connection error: "+err);
    }
)