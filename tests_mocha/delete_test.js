const assert = require('assert');
const Transfer = require('../app/models/transfer.model'); //imports the Transfer model.

let transferDummy;

beforeEach( async () => {
    transferDummy = await new Transfer({ origin_team_id: '1',destiny_team_id: '2',transfer_date: new Date(),contract_years: 3, cost: 5000000,player_id : 1 });
    transferDummy.save()
      .then(() => done());
  });

describe('Deleting documents', () => {
    it('removes a transfer using its instance', async () => {
        Transfer.remove()
          .then(() => Transfer.findOne(transferDummy))
          .then((transfer) => {
            assert(transfer === null);
            done();
          });
      });
    
      it('removes a transfer using its id', async () => {
        Transfer.remove()
          .then(() => Transfer.findOne(transferDummy))
          .then(() => Transfer.findByIdAndRemove(transfer._objectId)
          .then((transferById) => {
            assert(transferById === null);
            done();
          }));
      });

      it('removes all transfers', async () => {
        Transfer.deleteMany()
          .then((error) => {
            assert(!error);
            done();
          });
      });

    });

