const app = require('../server.js');
const Transfer = require('../app/models/transfer.model');
const playersApi = require('../app/integration/players.integration.js');
const teamsApi = require('../app/integration/teams.integration.js');
const request = require('supertest');
const jwt = require('jsonwebtoken');

const BASE_API_PATH = "/api/v1"

describe("Transfer API", () => {

    describe("GET /transfers", () => {

        let transfers_temp = [
            new Transfer({"origin_team_id": 1, "destiny_team_id": 2, "transfer_date": "2012-08-23", "contract_years": 3, "cost": 29000000.32, "player_id": 1}),
            new Transfer({"origin_team_id": 2, "destiny_team_id": 3, "transfer_date": "2015-07-28", "contract_years": 4, "cost": 75055060.32, "player_id": 2})
        ];

        beforeAll(() => {
            dbFind = jest.spyOn(Transfer, "find");
            token = jest.spyOn(jwt, "verify");
            
        });

        it('Should return all transfers', async () => {
            
            dbFind.mockImplementation((query, callback) => {
                callback(null, transfers_temp);
            });

            token.mockImplementation((token, secretOrPublicKey, callback) => {
                callback(false, "id");
            });

            return request(app).get(BASE_API_PATH + "/transfers").then((response) => {
                expect(response.statusCode).toBe(200);
                expect(response.body.length).toBe(transfers_temp.length);
                expect(dbFind).toBeCalledWith({}, expect.any(Function));
            });
        });

        it('Should return an Error Object', async () => {
            dbFind.mockImplementation((query, callback) => {
                callback({}, null);
            });

            return request(app).get(BASE_API_PATH+"/transfers").then((response) => {
                expect(response.statusCode).toBe(500);
                expect(dbFind).toBeCalledWith({}, expect.any(Function));
            });
        });
    });

    describe("GET /transfer/:transfer_id", () => {

        let transfer = new Transfer({"origin_team_id": 8, "destiny_team_id": 5, "transfer_date": "2019-08-23",
            "contract_years": 2, "cost": 100044, "player_id": 6});

        beforeAll(() => {            
            dbFind = jest.spyOn(Transfer, "findById");
        });

        it('Should return  a transfer by Id', async () => {
            dbFind.mockImplementation((query, callback) => {
                callback(null, transfer);
            });

            let id = transfer._id

            return request(app).get(BASE_API_PATH+"/transfer/"+id).then((response) => {
                expect(response.statusCode).toBe(200);
                expect(response.body.origin_team_id).toBe(8);
                expect(response.body.transfer_date).toBe("2019-08-23");
                expect(response.body.contract_years).toBe(2);
                expect(response.body.cost).toBe(100044);
                expect(response.body.player_id).toBe("6");
                expect(dbFind).toBeCalledWith(id.toString(), expect.any(Function));
            });
        });

        it('Should return a null Transfer', async () => {
            dbFind.mockImplementation((query, callback) => {
                callback(null, null);
            });

            return request(app).get(BASE_API_PATH+"/transfer/id").then((response) => {
                expect(response.statusCode).toBe(404);
                expect(dbFind).toBeCalledWith("id", expect.any(Function));
            });
        });

        it('Should return an Error Object of kind ObjectId', async () => {
            dbFind.mockImplementation((query, callback) => {
                callback({kind: 'ObjectId'}, null);
            });

            return request(app).get(BASE_API_PATH+"/transfer/id").then((response) => {
                expect(response.statusCode).toBe(404);
                expect(dbFind).toBeCalledWith("id", expect.any(Function));
            });
        });

        it('Should return an Error Object', async () => {
            dbFind.mockImplementation((query, callback) => {
                callback({}, null);
            });

            return request(app).get(BASE_API_PATH+"/transfer/id").then((response) => {
                expect(response.statusCode).toBe(500);
                expect(dbFind).toBeCalledWith("id", expect.any(Function));
            });
        });

    });

    describe("GET /transfers/player/:player_id", () => {

        let transfers_player = [
            new Transfer({"origin_team_id": 1, "destiny_team_id": 2, "transfer_date": "2012-08-23", "contract_years": 3, "cost": 2000000, "player_id": 6}),
            new Transfer({"origin_team_id": 2, "destiny_team_id": 3, "transfer_date": "2015-08-23", "contract_years": 4, "cost": 15000000, "player_id": 6}),
            new Transfer({"origin_team_id": 3, "destiny_team_id": 4, "transfer_date": "2019-08-23", "contract_years": 4, "cost": 53000000, "player_id": 6})
        ];

        beforeAll(() => {            
            dbFind = jest.spyOn(Transfer, "find");
        });

        it('Should return all transfers of a player', async () => {
            dbFind.mockImplementation((query, callback) => {
                callback(null, transfers_player);
            });

            return request(app).get(BASE_API_PATH + "/transfers/player/6").then((response) => {
                expect(response.statusCode).toBe(200);
                expect(response.body.length).toBe(transfers_player.length);
                expect(dbFind).toBeCalledWith({player_id: "6"}, expect.any(Function));
            });
        });

        it('Should return an Error Object', async () => {
            dbFind.mockImplementation((query, callback) => {
                callback({}, null);
            });

            return request(app).get(BASE_API_PATH+"/transfers/player/6").then((response) => {
                expect(response.statusCode).toBe(500);
                expect(dbFind).toBeCalledWith({}, expect.any(Function));
            });
        });
    });

    describe("GET /transfers/team/:destiny_team_id", () => {

        let team_transfers = [
            new Transfer({"origin_team_id": 1, "destiny_team_id": 8, "transfer_date": "2012-08-23", "contract_years": 3, "cost": 2000000, "player_id": 1}),
            new Transfer({"origin_team_id": 2, "destiny_team_id": 8, "transfer_date": "2015-08-23", "contract_years": 4, "cost": 15000000, "player_id": 2}),
            new Transfer({"origin_team_id": 3, "destiny_team_id": 8, "transfer_date": "2018-08-23", "contract_years": 4, "cost": 53000000, "player_id": 3})
        ];

        beforeAll(() => {
            dbFind = jest.spyOn(Transfer, "find");
        });

        it('Should return all transfers of a player', async () => {
            dbFind.mockImplementation((query, callback) => {
                callback(null, team_transfers);
            });

            return request(app).get(BASE_API_PATH + "/transfers/team/8").then((response) => {
                expect(response.statusCode).toBe(200);
                expect(response.body.length).toBe(team_transfers.length);
                expect(dbFind).toBeCalledWith({destiny_team_id: "8"}, expect.any(Function));
            });
        });

        it('Should return an Error Object', async () => {
            dbFind.mockImplementation((query, callback) => {
                callback({}, null);
            });

            return request(app).get(BASE_API_PATH+"/transfers/team/8").then((response) => {
                expect(response.statusCode).toBe(500);
                expect(dbFind).toBeCalledWith({}, expect.any(Function));
            });
        });
    });

    describe('POST /transfer', () => {
        let transfer_post ={"origin_team_id": 1, "destiny_team_id": 8, "transfer_date": "2019-08-23", "contract_years": 3, "cost": 2000000, "player_id": 1};
        let player = [{"goals":{"total":2,"assists":4},"cards":{"yellow":4,"red":4},"_id":"5e03b8ac777eb50658815fd3","player_name":"Diego Carlos","firstname":"Diego","lastname":"Carlos","position":"Deffender","nationality":"Brazil","value":15000000,"team_id":4}];
        let team = {"team_id": 354345435345, "name": "Sevilla FC", "code": 123, "logo": "https://media.api-football.com/teams/541.png", "country": "Spain", "founded": 1902, "venue_name": "Estadio Ramón Sánchez-Pizjuán", "venue_surface": "grass", "venue_address": "Calle Sevilla FC s/n", "venue_city": "Sevilla", "venue_capacity": 42500, "budget": 85000000, "value": 250000000};

        beforeEach(() => {
            dbInsert = jest.spyOn(Transfer, "create");
        });

        it('Should add a new transfer if everything is fine', async () => {
            dbInsert.mockImplementation((c, callback) => {
                callback(false, new Transfer(transfer_post));
            });


            getPlayer = jest.spyOn(playersApi, "getPlayerById");
            updatePlayer = jest.spyOn(playersApi, "updatePlayer");

            getTeam = jest.spyOn(teamsApi, "getTeamById");
            updateTeam = jest.spyOn(teamsApi, "updateTeam");


            getPlayer.mockImplementation((id) => {
                return player;
            });

            updatePlayer.mockImplementation((obj) => {
                return true;
            });

            getTeam.mockImplementation((id) => {
                return team;
            });

            updateTeam.mockImplementation((obj) => {
                return true;
            });

            return request(app).post(BASE_API_PATH + '/transfer').send(transfer_post).then((response) => {
                console.log(response)
                expect(response.statusCode).toBe(201);
                expect(dbInsert).toBeCalledWith(transfer_post, expect.any(Function));
            });
        });

        it('Should return a 400 Bad Rquest for the input Transfer', async () => {
            transfer_temp = {"origin_team_id": 1, "destiny_team_id": 8, "transfer_date": "2012-08-23"}
            return request(app).post(BASE_API_PATH + '/transfer').send(transfer_temp).then((response) => {
                expect(response.statusCode).toBe(400);
            });
        });

        it('Should return 500 if there is a problem with the DB', async() => {
            dbInsert.mockImplementation((c, callback) => {
                callback(true);
            });

            return request(app).post(BASE_API_PATH + '/transfer').send(transfer_post).then((response) => {
                expect(response.statusCode).toBe(500);
            });
        });
    });

    describe('PUT /transfer/:transfer_id', () => {
        
        let transfer_put = new Transfer({"origin_team_id": 2, "destiny_team_id": 1, "transfer_date": "2013-08-23", "contract_years": 1, "cost": 1000000, "player_id": 1});
        let transfer_old = new Transfer({"origin_team_id": 2, "destiny_team_id": 1, "transfer_date": "2013-08-23", "contract_years": 1, "cost": 500, "player_id": 1});
        let team = {"team_id": 354345435345, "name": "Sevilla FC", "code": 123, "logo": "https://media.api-football.com/teams/541.png", "country": "Spain", "founded": 1902, "venue_name": "Estadio Ramón Sánchez-Pizjuán", "venue_surface": "grass", "venue_address": "Calle Sevilla FC s/n", "venue_city": "Sevilla", "venue_capacity": 42500, "budget": 85000000, "value": 250000000};
        let id = transfer_put._id
        let expected_transfer = {origin_team_id: transfer_put.origin_team_id, 
            destiny_team_id: transfer_put.destiny_team_id, 
            transfer_date: transfer_put.transfer_date, 
            contract_years: transfer_put.contract_years, 
            cost: transfer_put.cost, 
            player_id: transfer_put.player_id}

        beforeEach(() => {
            dbUpdate = jest.spyOn(Transfer, "findByIdAndUpdate");
            getTeam = jest.spyOn(teamsApi, "getTeamById");
            updateTeam = jest.spyOn(teamsApi, "updateTeam");
            getTransferById = jest.spyOn(Transfer, "findById");
        });

        it('Should update a transfer if everything is fine', async () => {

            dbUpdate.mockImplementation((a,b,c, callback) => {
                callback(false, transfer_put);
            });

            getTeam.mockImplementation((id) => {
                return team;
            });

            updateTeam.mockImplementation((obj) => {
                return true;
            });

            getTransferById.mockImplementation((id) => {
                return team;
            });
            
            return request(app).put(BASE_API_PATH + '/transfer/'+id).send(transfer_put).then((response) => {
                expect(response.statusCode).toBe(200);
                expect(dbUpdate).toBeCalledWith(id.toString(), expected_transfer, {new: true}, expect.any(Function));
            });
        });

        it('Should return a null Transfer', async () => {
            dbUpdate.mockImplementation((a,b,c, callback) => {
                callback(false, null);
            });

            return request(app).put(BASE_API_PATH + '/transfer/'+id).send(transfer_put).then((response) => {
                expect(response.statusCode).toBe(404);
                expect(dbUpdate).toBeCalledWith(id.toString(), expected_transfer, {new: true}, expect.any(Function));
            });
        });

        it('Should return an Error Object of kind ObjectId ', async () => {
            dbUpdate.mockImplementation((a,b,c, callback) => {
                callback({kind: 'ObjectId'}, null);
            });
            
            return request(app).put(BASE_API_PATH + '/transfer/9999').send(transfer_put).then((response) => {
                expect(response.statusCode).toBe(404);
            });
        });

        it('Should return an Error Object', async () => {
            dbUpdate.mockImplementation((a,b,c, callback) => {
                callback(true, null);
            });
            
            return request(app).put(BASE_API_PATH + '/transfer/9999').send(transfer_put).then((response) => {
                expect(response.statusCode).toBe(500);
            });
        });

    });

    describe("DELETE /transfer/:transfer_id", () => {

        let transfer_delete = new Transfer({"origin_team_id": 8, "destiny_team_id": 5, "transfer_date": "2019-08-23",
            "contract_years": 2, "cost": 100044, "player_id": 6});

        let id = transfer_delete._id

        beforeAll(() => {            
            dbDelete = jest.spyOn(Transfer, "findByIdAndRemove");
        });

        it('Should delete  a transfer by Id', async () => {
            dbDelete.mockImplementation((query, callback) => {
                callback(false, transfer_delete);
            });

            return request(app).delete(BASE_API_PATH+"/transfer/"+id).then((response) => {
                expect(response.statusCode).toBe(204);
                expect(dbDelete).toBeCalledWith(id.toString(), expect.any(Function));
            });
        });

        it('Should return a null Transfer', async () => {
            dbDelete.mockImplementation((query, callback) => {
                callback(false, null);
            });

            return request(app).delete(BASE_API_PATH+"/transfer/"+id).then((response) => {
                expect(response.statusCode).toBe(404);
                expect(dbDelete).toBeCalledWith(id.toString(), expect.any(Function));
            });
        });

        it('Should return an Error Object of kind ObjectId', async () => {
            dbDelete.mockImplementation((query, callback) => {
                callback({kind: 'ObjectId'}, null);
            });

            return request(app).delete(BASE_API_PATH+"/transfer/9999").then((response) => {
                expect(response.statusCode).toBe(404);
                expect(dbDelete).toBeCalledWith("9999", expect.any(Function));
            });
        });

        it('Should return an Error Object', async () => {
            dbDelete.mockImplementation((query, callback) => {
                callback({}, null);
            });

            return request(app).delete(BASE_API_PATH+"/transfer/9999").then((response) => {
                expect(response.statusCode).toBe(500);
                expect(dbDelete).toBeCalledWith("9999", expect.any(Function));
            });
        });
    });

    describe("DELETE /transfers", () => {

        beforeAll(() => {
            dbDeleteMany = jest.spyOn(Transfer, "deleteMany");
            
        });

        it('Should delete all transfers', async () => {
            dbDeleteMany.mockImplementation((callback) => {
                callback(false);
            });
            return request(app).delete(BASE_API_PATH+"/transfers").then((response) => {
                expect(response.statusCode).toBe(200);
                expect(dbDeleteMany).toBeCalledWith(expect.any(Function));
            });
        });

        it('Should return an Error Object', async () => {
            dbDeleteMany.mockImplementation((callback) => {
                callback(true);
            });
            return request(app).delete(BASE_API_PATH+"/transfers").then((response) => {
                expect(response.statusCode).toBe(500);
                expect(dbDeleteMany).toBeCalledWith(expect.any(Function));
            });
        });
    });

});
