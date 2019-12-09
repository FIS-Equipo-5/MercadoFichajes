const Transfer = require('../models/transfer.model.js');

//==========================================GET===============================================//

module.exports.getAllTransfers= function(request, response){
    console.log(Date() + " -GET /transfers")
    
    Transfer.find()
    .then(transfers => {
        console.log(Date() + " SUCCESS: -GET /transfers")
        response.send(transfers);
    }).catch(err => {
        console.log(Date() + " ERROR: -GET /transfers , Some error occurred while retrieving transfers")
        response.status(500).send({
            message: err.message || "Some error occurred while retrieving transfers."
        });
    })
};


module.exports.getTransferById= function(request, response){
    console.log(Date() + ` -GET /transfer/${request.params.transfer_id}`)

    Transfer.findById(request.params.transfer_id)
    .then(transfer => {
        if(!transfer) {
            console.log(Date() + ` ERROR: -GET /transfer/${request.params.transfer_id} - Not found transfer with id: ${request.params.transfer_id}`);
            return response.status(404).send({
                message: "Transfer not found with id " + request.params.transfer_id
            });            
        }
        console.log(Date() + ` SUCCESS: -GET /transfer/${request.params.transfer_id}`)
        response.send(transfer);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            console.log(Date() + ` ERROR: -GET /transfer/${request.params.transfer_id} - Not found transfer with id: ${request.params.transfer_id}`)
            return response.status(404).send({
                message: "Transfer not found with id " + request.params.transfer_id
            });                
        }
        console.log(Date() + ` ERROR: -GET /transfers/${request.params.transfer_id} - Not found transfer with id: ${request.params.transfer_id}`)
        return response.status(500).send({
            message: "Error retrieving transfer with id " + request.params.transfer_id
        });
    });
    
};

module.exports.getAllTransfersByPlayerId= function(request, response){
    console.log(Date() + ` -GET transfers/player/${request.params.player_id}`)
    
    Transfer.find({player_id: request.params.player_id})
    .then(transfers => {
        console.log(Date() + " SUCCESS: -GET /transfers")
        response.send(transfers);
    }).catch(err => {
        console.log(Date() + " ERROR: -GET /transfers , Some error occurred while retrieving transfers")
        response.status(500).send({
            message: err.message || "Some error occurred while retrieving transfers."
        });
    })
}

module.exports.getAllTransfersByTeamId= function(request, response){
    console.log(Date() + ` -GET transfers/team/${request.params.destiny_team_id}`)
    
    Transfer.find({destiny_team_id: request.params.destiny_team_id})
    .then(transfers => {
        console.log(Date() + " SUCCESS: -GET /transfers")
        response.send(transfers);
    }).catch(err => {
        console.log(Date() + " ERROR: -GET /transfers , Some error occurred while retrieving transfers")
        response.status(500).send({
            message: err.message || "Some error occurred while retrieving transfers."
        });
    })
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

    // Create a Transfer
    const transfer = new Transfer({
        origin_team_id: request.body.origin_team_id, 
        destiny_team_id: request.body.destiny_team_id,
        transfer_date: request.body.transfer_date, 
        contract_years: request.body.contract_years, 
        cost: request.body.cost, 
        player_id: request.body.player_id, 
    });

    // Save Transfer in the database
    transfer.save()
    .then(data => {
        console.log(Date() + ` SUCCESS: -POST /transfer`)
        response.status(201).send(data);
    }).catch(err => {
        console.log(Date() + ` ERROR: -POST /transfer - Error saving transfer with id: ${request.params.transfer_id}`);
        response.status(500).send({
            message: err.message || "Some error occurred while creating the Transfer."
        });
    });
};

//==========================================PUT==========================================//

module.exports.updateTransfer= function(request, response){
    console.log(Date() + ` -PUT /transfer/${request.params.transfer_id}`)

    // Validate request
    if(!checkTransfer(request.body)) {
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
    }, {new: true})
    .then(transfer => {
        if(!transfer) {
            console.log(Date() + ` ERROR: -PUT /transfer/${request.params.transfer_id} - Not found transfer with id: ${request.params.transfer_id}`);
            return response.status(404).send({
                message: "Transfer not found with id " + request.params.transfer_id
            });
        }
        console.log(Date() + ` SUCCESS: -PUT /transfer/${request.params.transfer_id}`)
        response.send(transfer);
    }).catch(err => {
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
    });
};

//==========================================DELETE==========================================//

module.exports.deleteTransferById= function(request, response){
    console.log(Date() + ` -DELETE /transfer/${request.params.transfer_id}`);

    Transfer.findByIdAndRemove(request.params.transfer_id)
    .then(transfer => {
        if(!transfer) {
            console.log(Date() + ` ERROR: -DELETE /transfer/${request.params.transfer_id} - Not found transfer with id: ${request.params.transfer_id}`);
            return response.status(404).send({
                message: "Transfer not found with id " + request.params.transfer_id
            });
        }
        console.log(Date() + ` SUCCESS: -DELETE /transfer/${request.params.transfer_id} - Delete transfer with id: ${request.params.transfer_id} `);
        response.status(204).send({message: "Transfer deleted successfully!"});
    }).catch(err => {
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
    });
};


module.exports.deleteAllTransfers= function(request, response){
    console.log(Date() + " -DELETE /transfers");
    Transfer.deleteMany()
    .then(any => {
        console.log(Date() + ` SUCCESS: -DELETE /transfers`);
        return response.send({message: "Transfers deleted successfully!"});
    }).catch(err => {
        console.log(Date() + ` ERROR: -DELETE /transfers - Error deleting all transfers`);
        return response.status(500).send({message: " Could not delete all transfers"});
    });
};


function checkTransfer(transfer) {
    //Una transferencia es válida si contiene todos sus atributos
    return transfer.destiny_team_id!=null 
        && transfer.origin_team_id!=null 
        && transfer.transfer_date!=null 
        && transfer.cost!=null 
        && transfer.player_id!=null;
}