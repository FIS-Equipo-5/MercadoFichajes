const assert = require('assert');
const Transfer = require('../app/models/transfer.model'); //imports the Transfer model.

let transferDummy;

beforeEach( async () => {
    transferDummy = await new Transfer({ origin_team_id: '1',destiny_team_id: '2',transfer_date: new Date(),contract_years: 3, cost: 5000000,player_id : 1 });
    transferDummy = await new Transfer({ origin_team_id: '1',destiny_team_id: '2',transfer_date: new Date(),contract_years: 3, cost: 5000000,player_id : 5 });

    transferDummy.save()
      .then(() => done());
  });
  describe('Finding documents',() => {
    it('Finds all transfers', async () => {
            Transfer.find()
            .then((transfer) => {
                assert(transfer !== null);
                done();
        });
    });
    
    it('Finds transfer on ID', async () => {
        Transfer.findOne(transferDummy)
            .then(() => Transfer.findById(transfer._objectId)
            .then((transferById) => {
                assert(transferById === transferDummy);
                done();
            }));
    });

    it('Finds all transfers on teamID', async () => {
        transferDummy => Transfer.find(transferDummy)
            .then(() => Transfer.destiny_team_id(transferDummy))
            .then((transfer) => {
                assert(transfer === transferDummy);
                done();
        });
    });

    it('Finds transfers on playerID', async () => {
        transferDummy => Transfer.findById(transferDummy)
            .then(() => Transfer.find(transferDummy))
            .then((transfer) => {
                assert(transfer === transferDummy);
                done();
        });
    });
    
});

