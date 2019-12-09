const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

// create express app
const app = express();

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json())

// Configuring the database
const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');

//API controllers
const BASE_API_PATH = "/api/v1"
const transfersCtl=require("./app/controllers/transferCtl.js");

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

// listen for requests
app.listen(dbConfig.port, () => {
    console.log("Server is listening on port " + dbConfig.port);
});

//==========================================API TRANFERS==========================================//
app.get('/',(request, response) => response.send('Welcome to API tranfers!'));
app.get(BASE_API_PATH+"/transfers",transfersCtl.getAllTransfers);
app.get(BASE_API_PATH+"/transfer/:transfer_id",transfersCtl.getTransferById);
app.get(BASE_API_PATH+"/transfers/player/:player_id",transfersCtl.getAllTransfersByPlayerId);
app.get(BASE_API_PATH+"/transfers/team/:team_destiny_id",transfersCtl.getAllTransfersByTeamId);
app.post(BASE_API_PATH+"/transfer",transfersCtl.postTransfer);
app.put(BASE_API_PATH+"/transfer/:transfer_id",transfersCtl.updateTransfer);
app.delete(BASE_API_PATH+"/transfer/:transfer_id",transfersCtl.deleteTransferById);
app.delete(BASE_API_PATH+"/transfers",transfersCtl.deleteAllTransfers);