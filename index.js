const express = require('express');
const bodyParser = require('body-parser')
const transfersCtl=require("./app/transferCtl.js");
const app = express();
const port = (process.env.PORT || 3000);
const BASE_API_PATH = "/api/v1"

app.listen(port, () => console.log(`Transfers API listen on port ${port}!`));
app.use(bodyParser.json())

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