const transfers= 
    [
        {"transfer_id": 1, "team_origin_id": 1, "team_destiny_id": 2, "transfer_date": "2012-04-23T18:25:43.511Z", "years_contract": 3, "cost": 29000000.32, "player_id": 1},
        {"transfer_id": 2, "team_origin_id": 2, "team_destiny_id": 3, "transfer_date": "2015-04-23T18:25:43.511Z", "years_contract": 4, "cost": 75055060.32, "player_id": 2},
        {"transfer_id": 3, "team_origin_id": 4, "team_destiny_id": 5, "transfer_date": "2016-08-23T18:25:43.511Z", "years_contract": 2, "cost": 12057450.32, "player_id": 3},
        {"transfer_id": 4, "team_origin_id": 4, "team_destiny_id": 6, "transfer_date": "2018-09-23T18:25:43.511Z", "years_contract": 1, "cost": 3204123.32, "player_id": 4}
    ];

//==========================================GET===============================================//
module.exports.getAllTransfers= function(request, response){
    console.log(Date() + " -GET /transfers")
    response.send(transfers)
};

module.exports.getTransferById= function(request, response){
    console.log(Date() + ` -GET /transfer/${request.params.transfer_id}`)
    var id = request.params.transfer_id;
    const found = transfers.find(element => element.transfer_id==id);
    
    if (found==null){
        console.log(Date() + ` -GET /transfer/${request.params.transfer_id} - Not found transfer with id: ${id}`);
        response.sendStatus(404);
    }else{
        console.log(Date() + ` -GET /transfer/${request.params.transfer_id} - Found transfer id: ${id} :`+ JSON.stringify(found));
        response.send(found);
    }
    
};

module.exports.getAllTransfersByPlayerId= function(request, response){
    console.log(Date() + ` -GET /transfer/player/${request.params.player_id}`)
    var id = request.params.player_id;
    const found = transfers.filter(element => element.player_id==id);
    console.log(Date() + ` -GET /transfer/player/${request.params.player_id} - Found transfers for player with id: ${id} :`+ JSON.stringify(found));
    response.send(found);
};

module.exports.getAllTransfersByTeamId= function(request, response){
    console.log(Date() + ` -GET /transfer/team/team_destiny_id/${request.params.team_destiny_id}`)
    var id = request.params.team_destiny_id;
    const found = transfers.filter(element => element.team_destiny_id==id);
    console.log(Date() + ` -GET /transfer/team/${request.params.team_destiny_id} - Found transfers for team with id: ${id} :`+ JSON.stringify(found));
    response.send(found);
};

//==========================================POST==========================================//

module.exports.postTransfer= function(request, response){
    console.log(Date() + " -POST /transfer")
    var transfer = request.body;
    
    if(!checkTransfer(transfer) || transfer.transfer_id!=null){
        console.log(Date() + ` -POST /transfer - The transfer not match with the expected input ` + JSON.stringify(transfer));
        response.sendStatus(400);
        
    }else{
        var nextId = calculateNextId();
        transfer.transfer_id=nextId;
        transfers.push(transfer);
        console.log(Date() + `-POST /transfer - New transfer with id: ${nextId} ` + JSON.stringify(transfer))
        response.sendStatus(201);
    }
};

//==========================================PUT==========================================//
module.exports.updateTransfer= function(request, response){
    console.log(Date() + ` -PUT /transfer/${request.params.transfer_id}`)
    var updateTransfer = request.body;
    var id = request.params.transfer_id;

    if(!checkTransfer(updateTransfer)){
        console.log(Date() + ` -PUT /transfer/${request.params.transfer_id} - The transfer not match with the expected input ` + JSON.stringify(updateTransfer));
        response.sendStatus(400);
    
    }else{
        var oldTransfer = transfers.find(element => element.transfer_id==id);
        if(oldTransfer==null){
            console.log(Date() + ` -PUT /transfer/${request.params.transfer_id} - Not found transfer with id: ${id}`);
            response.sendStatus(404);
        
        }else{
            oldTransfer.team_origin_id = updateTransfer.team_origin_id;
            oldTransfer.team_destiny_id = updateTransfer.team_destiny_id;
            oldTransfer.transfer_date = updateTransfer.transfer_date;
            oldTransfer.years_contract = updateTransfer.years_contract;
            oldTransfer.cost = updateTransfer.cost;
            oldTransfer.player_id = updateTransfer.player_id;
            console.log(Date() + ` -PUT /transfer/${request.params.transfer_id} - Update transfer: `+ JSON.stringify(oldTransfer));
            response.sendStatus(200)
        }
    }
};

//==========================================DELETE==========================================//
module.exports.deleteTransferById= function(request, response){
    console.log(Date() + ` -DELETE /transfer/${request.params.transfer_id}`);
    var id = request.params.transfer_id;
    var index = transfers.findIndex(element => element.transfer_id==id);
    
    if(index==-1){
        console.log(Date() + ` -DELETE /transfer/${request.params.transfer_id} - Not found transfer with id: ${id}`);
        response.sendStatus(404);
    }else{
        transfers.splice(index,1);
        console.log(Date() + ` -DELETE /transfer/${request.params.transfer_id} - Delete transfer with id: ${id} `);
        response.sendStatus(204);
    }
};

module.exports.deleteAllTransfers= function(request, response){
    console.log(Date() + " -DELETE /transfers");
    transfers.length=0;
    response.sendStatus(204);
};

//=============================FUNCIONALIDAD EXTRA=============================//
function calculateNextId(){
    var array = [];
    for(i = 0; i < transfers.length; i++){
        array.push(transfers[i].transfer_id);
    }

    array.sort(sortNumber)
    return array[array.length-1]+1;
}

function sortNumber(a, b) {
    return a - b;
  }

function checkTransfer(transfer) {
    //Una transferencia es válida si contiene team_destiny_id, transfer_date, cost y player_id
    return transfer.team_destiny_id!=null && transfer.transfer_date!=null && transfer.cost!=null && transfer.player_id!=null;
}