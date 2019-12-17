const assert = require('assert');
const Transfer = require('../app/models/transfer.model'); //imports the Transfer model.
describe('Creating document', () => {
    it('creates a transfer', async () => {
        
        
        const transfer =  await new Transfer({ origin_team_id: '1',destiny_team_id: '2',transfer_date: new Date(),contract_years: 3, cost: 5000000,player_id : 1 });
        transfer.save() //takes some time and returns a promise
            .then(() => {
                assert(!transfer.isNew); //if transfer is saved to db it is not new
                done();
            
                
            });
    });
});