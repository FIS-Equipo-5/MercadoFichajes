const app = require('./server.js');
const dbConnect = require('./db');
const applicationConfig = require('./config/application.config.js');


console.log("Starting API server at "+applicationConfig.applicationPort);

dbConnect().then(
    () => {
        app.listen(applicationConfig.applicationPort);
        console.log("Server is listening on port " + applicationConfig.applicationPort);
    },
    err => {
        console.log("Connection error: "+err);
    }
)