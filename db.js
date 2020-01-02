// Configuring the database
const mongoose = require('mongoose');
const applicationConfig = require('./config/application.config.js');

mongoose.Promise = global.Promise;

const dbConnect = function() {
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error: '));
    // Connecting to the database
    return mongoose.connect(applicationConfig.databaseUrl, {
        useNewUrlParser: true
    }).then(() => {
        console.log("Successfully connected to the database");    
    }).catch(err => {
        console.log('Could not connect to the database. Exiting now...', err);
        process.exit();
    });
}

module.exports = dbConnect;