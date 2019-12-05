//==========================================Ejercicio 1 y 2==========================================//
const express = require('express');
const app = express();
const port = 3000;
const BASE_API_PATH = "/api/v1"

app.get('/',(request, response) => response.send('Hello world!'));
app.listen(port, () => console.log(`Example app listen on port ${port}!`));


//==========================================Ejercicio 3.1: GET===============================================//
const transfers= 
    [
        {"transfer_id": 1, "team_origin_id": 1, "team_destiny_id": 2, "transfer_date": "2012-04-23T18:25:43.511Z", "years_contract": 3, "cost": 29000000.32, "player_id": 1},
        {"transfer_id": 2, "team_origin_id": 2, "team_destiny_id": 3, "transfer_date": "2015-04-23T18:25:43.511Z", "years_contract": 4, "cost": 75055060.32, "player_id": 2},
        {"transfer_id": 3, "team_origin_id": 4, "team_destiny_id": 5, "transfer_date": "2016-08-23T18:25:43.511Z", "years_contract": 2, "cost": 12057450.32, "player_id": 3},
        {"transfer_id": 4, "team_origin_id": 4, "team_destiny_id": 6, "transfer_date": "2018-09-23T18:25:43.511Z", "years_contract": 1, "cost": 3204123.32, "player_id": 4}
    ];

app.get(BASE_API_PATH + "/transfers", (request, response) => {
    console.log(Date() + " -GET /transfers")
    response.send(transfers)
});

app.get(BASE_API_PATH + "/transfer/:transfer_id", (request, response) => {
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
    
});

//==========================================Ejercicio 3.2: POST==========================================//
const bodyParser = require('body-parser')
app.use(bodyParser.json())

app.post(BASE_API_PATH + "/transfer", (request, response) => {
    console.log(Date() + " -POST /transfers")
    var transfer = request.body;
    var nextId = calculateNextId();
    transfer.id=nextId;
    transfers.push(transfer);
    console.log(Date() + `-POST /transfers - New transfer with id: ${nextId} ` + JSON.stringify(transfer))
    response.sendStatus(201);
});

//==========================================Ejercicio 4: Persistencia con nedb==========================================//

//==========================================Ejercicio 5.1: PUT==========================================//
app.put(BASE_API_PATH + "/contact/:id", (request, response) => {
    console.log(Date() + ` -PUT /contact/${request.params.id}`)
    var updateContact = request.body;
    var id = request.params.id;
    var oldContact = contacts.find(element => element.id==id);

    if(oldContact==null){
        console.log(Date() + ` -PUT /contacts - Not found contact with id: ${id}`);
        response.sendStatus(404);
    }else{
        oldContact.name = updateContact.name;
        oldContact.phone = updateContact.phone;
        console.log(Date() + ` -PUT /contact/${request.params.id} - Update contact: `+ JSON.stringify(oldContact));
        response.sendStatus(202)
    }
});

//==========================================Ejercicio 5.2: DELETE==========================================//
app.delete(BASE_API_PATH + "/contact/:id", (request, response) => {
    console.log(Date() + ` -DELETE /contact/${request.params.id}`);
    var id = request.params.id;
    var index = contacts.findIndex(element => element.id==id);
    
    if(index==-1){
        console.log(Date() + ` -DELETE /contact/${request.params.id} - Not found contact with id: ${id}`);
        response.sendStatus(404);
    }else{
        contacts.splice(index,1);
        console.log(Date() + ` -DELETE /contact/${request.params.id} - Delete contact with id: ${id} `);
        response.sendStatus(200);
    }
});

app.delete(BASE_API_PATH + "/contacts", (request, response) => {
    console.log(Date() + " -DELETE /contacts");
    contacts.length=0;
    response.sendStatus(200);
})

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