module.exports = (app) => {
    
    const transferController = require('../controllers/transfer.controller.js');
    const BASE_API_PATH = "/api/v1"

    app.get('/',(request, response) => response.send('Welcome to API tranfers!'));
    app.get(BASE_API_PATH+"/transfers",transferController.getAllTransfers);
    app.get(BASE_API_PATH+"/transfer/:transfer_id",transferController.getTransferById);
    app.get(BASE_API_PATH+"/transfers/player/:player_id",transferController.getAllTransfersByPlayerId);
    app.get(BASE_API_PATH+"/transfers/team/:destiny_team_id",transferController.getAllTransfersByTeamId);
    app.post(BASE_API_PATH+"/transfer",transferController.postTransfer);
    app.put(BASE_API_PATH+"/transfer/:transfer_id",transferController.updateTransfer);
    app.delete(BASE_API_PATH+"/transfer/:transfer_id",transferController.deleteTransferById);
    app.delete(BASE_API_PATH+"/transfers",transferController.deleteAllTransfers);
}