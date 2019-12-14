const assert = require('assert');
const Transfer = require('../app/models/transfer.model'); //imports the Transfer model.

let transferDummy;

beforeEach( async () => {
    transferDummy = await new Transfer({ origin_team_id: '1',destiny_team_id: '2',transfer_date: new Date(),contract_years: 3, cost: 5000000,player_id : 1 });
    transferDummy.save()
      .then(() => done());
  });

describe('Updating a document', () => {
    it('updates a transfer using its instance', async () => {
        transferDummy.update()
          .then(() => Transfer.findOne(transferDummy))
          .then((transfer) => {
            assert(transfer === null);
            done();
          });
      });
    });

    