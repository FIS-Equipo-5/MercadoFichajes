const Transfer = require('../models/transfer.model.js');

//==========================================GET===============================================//

module.exports.getAllTransfers= function(request, response){
    console.log(Date() + " -GET /transfers")
    Transfer.find({}, (err, transfers) => {
        if (err) {
            console.log(Date() + " ERROR: -GET /transfers , Some error occurred while retrieving transfers")
            response.status(500).send({
            message: err.message || "Some error occurred while retrieving transfers."
            });
        } else {
            console.log(Date() + " SUCCESS: -GET /transfers")
            response.send(transfers.map((transfers) => {
                return transfers.cleanup();
            }));
        }
    });
}


module.exports.getTransferById= function(request, response){
    console.log(Date() + ` -GET /transfer/${request.params.transfer_id}`)

    Transfer.findById(request.params.transfer_id, (err, transfer) => {
        if(err) {
            if(err.kind === 'ObjectId') {
                console.log(Date() + ` ERROR: -GET /transfer/${request.params.transfer_id} - Not found transfer with id: ${request.params.transfer_id}`)
                return response.status(404).send({
                    message: "Transfer not found with id " + request.params.transfer_id
                });                
            }
            console.log(Date() + ` ERROR: -GET /transfers/${request.params.transfer_id} - Some error occurred while retrieving transfer with id: ${request.params.transfer_id}`)
            return response.status(500).send({
                message: "Error retrieving transfer with id " + request.params.transfer_id
            });
        }else{
            if(!transfer) {
                console.log(Date() + ` ERROR: -GET /transfer/${request.params.transfer_id} - Not found transfer with id: ${request.params.transfer_id}`);
                return response.status(404).send({
                    message: "Transfer not found with id " + request.params.transfer_id
                });            
            }
            console.log(Date() + ` SUCCESS: -GET /transfer/${request.params.transfer_id}`)
            response.send(transfer.cleanup());
        }
    });
}

module.exports.getAllTransfersByPlayerId= function(request, response){
    console.log(Date() + ` -GET transfers/player/${request.params.player_id}`)
    
    Transfer.find({player_id: request.params.player_id}, (err, transfers) => {
        if(err) {
            console.log(Date() + ` ERROR: -GET /transfer/player/${request.params.player_id} , Some error occurred while retrieving transfers`)
            response.status(500).send({
                message: err.message || "Some error occurred while retrieving transfers."
            });
        }else{
            console.log(Date() + ` SUCCESS: -GET  /transfer/player/${request.params.player_id}`)
            response.send(transfers.map((transfers) => {
                return transfers.cleanup();
            }));
        }
    });
}

module.exports.getAllTransfersByTeamId= function(request, response){
    console.log(Date() + ` -GET transfers/team/${request.params.destiny_team_id}`)
    
    Transfer.find({destiny_team_id: request.params.destiny_team_id}, (err, transfers) => {
        if(err) {
            console.log(Date() + ` ERROR: -GET /transfer/team/${request.params.destiny_team_id} , Some error occurred while retrieving transfers`)
            response.status(500).send({
                message: err.message || "Some error occurred while retrieving transfers."
            });
        }else{
            console.log(Date() + ` SUCCESS: -GET  /transfer/team/${request.params.player_id}`)
            response.send(transfers.map((transfers) => {
                return transfers.cleanup();
            }));
        }
    });
}

//==========================================POST==========================================//

module.exports.postTransfer= function(request, response){
    console.log(Date() + " -POST /transfer")
    // Validate request
    if(!checkTransfer(request.body)) {
        console.log(Date() + ` ERROR: -POST /transfer - The transfer not match with the expected input ` + JSON.stringify(request.body));
        return response.status(400).send({
            message: "Transfer not match with the expected input"
        });
    }

    var transfer = request.body;

    // Save Transfer in the database
    Transfer.create(transfer, (err, new_transfer) => {
        if(err){
            console.log(Date() + ` ERROR: -POST /transfer - Error registering new transfer`);
            response.status(500).send({
                message: err.message || "Some error occurred while creating the Transfer."
            });
        }else{
            console.log(Date() + ` SUCCESS: -POST /transfer`)
            response.status(201).send(new_transfer.cleanup());
        }
    });
}

//==========================================PUT==========================================//

module.exports.updateTransfer= function(request, response){
    console.log(Date() + ` -PUT /transfer/${request.params.transfer_id}`)

    var transfer = request.body
    // Validate request
    if(!checkTransfer(transfer)) {
        console.log(Date() + ` ERROR: -PUT /transfer/${request.params.transfer_id} - The transfer not match with the expected input ` + JSON.stringify(request.body));
        return response.status(400).send({
            message: "Transfer not match with the expected input"
        });
    }

    // Find Transfer and update it with the request body
    Transfer.findByIdAndUpdate(request.params.transfer_id, {
        origin_team_id: request.body.origin_team_id, 
        destiny_team_id: request.body.destiny_team_id,
        transfer_date: request.body.transfer_date, 
        contract_years: request.body.contract_years, 
        cost: request.body.cost, 
        player_id: request.body.player_id, 
    }, {new: true}, (err, transfer) => {

        if(err) {
            if(err.kind === 'ObjectId') {
                console.log(Date() + ` ERROR: -PUT /transfer/${request.params.transfer_id} - Not found transfer with id: ${request.params.transfer_id}`);
                return response.status(404).send({
                    message: "Transfer not found with id " + request.params.transfer_id
                });                  
            }
                console.log(Date() + ` ERROR: -PUT /transfer/${request.params.transfer_id} - Error updating transfer with id: ${request.params.transfer_id}`);
                return response.status(500).send({
                    message: "Error updating transfer with id " + request.params.transfer_id
                });
        }else{
            if(!transfer) {
                console.log(Date() + ` ERROR: -PUT /transfer/${request.params.transfer_id} - Not found transfer with id: ${request.params.transfer_id}`);
                return response.status(404).send({
                    message: "Transfer not found with id " + request.params.transfer_id
                });            
            }
            console.log(Date() + ` SUCCESS: -PUT /transfer/${request.params.transfer_id}`)
            response.send(transfer.cleanup());
        }
    });
}

//==========================================DELETE==========================================//

module.exports.deleteTransferById= function(request, response){
    console.log(Date() + ` -DELETE /transfer/${request.params.transfer_id}`);

    Transfer.findByIdAndRemove(request.params.transfer_id, (err, transfer) => {
        if(err) {
            if(err.kind === 'ObjectId' || err.name === 'NotFound') {
                console.log(Date() + ` ERROR: -DELETE /transfer/${request.params.transfer_id} - Not found transfer with id: ${request.params.transfer_id}`);
                return response.status(404).send({
                    message: "Transfer not found with id " + request.params.transfer_id
                });              
            }
            console.log(Date() + ` ERROR: -DELETE /transfer/${request.params.transfer_id} - Error deleting transfer with id: ${request.params.transfer_id}`);
            return response.status(500).send({
                message: "Could not delete transfer with id " + request.params.transfer_id
            });
               
        }else{
            if(!transfer) {
                console.log(Date() + ` ERROR: -DELETE /transfer/${request.params.transfer_id} - Not found transfer with id: ${request.params.transfer_id}`);
                return response.status(404).send({
                    message: "Transfer not found with id " + request.params.transfer_id
                });         
            }
            console.log(Date() + ` SUCCESS: -DELETE /transfer/${request.params.transfer_id} - Delete transfer with id: ${request.params.transfer_id} `);
            response.status(204).send({message: "Transfer deleted successfully!"});
        }
    });
}


module.exports.deleteAllTransfers= function(request, response){
    console.log(Date() + " -DELETE /transfers");
    Transfer.deleteMany((err) => {
        if (err){
            console.log(Date() + ` ERROR: -DELETE /transfers - Error deleting all transfers`);
            return response.status(500).send({message: " Could not delete all transfers"});
        }else{
            console.log(Date() + ` SUCCESS: -DELETE /transfers`);
            return response.send({message: "Transfers deleted successfully!"});
        }
    });
}


function checkTransfer(transfer) {
    //Una transferencia es válida si contiene todos sus atributos
    return transfer.destiny_team_id!=null 
        && transfer.origin_team_id!=null 
        && transfer.transfer_date!=null 
        && transfer.cost!=null 
        && transfer.player_id!=null;
}