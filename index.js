//==========================================Ejercicio 1 y 2==========================================//
const express = require('express');
const app = express();
const port = 3000;
const BASE_API_PATH = "/api/v1"

app.get('/',(request, response) => response.send('Hello world!'));
app.listen(port, () => console.log(`Example app listen on port ${port}!`));


//==========================================Ejercicio 3.1: GET===============================================//
const contacts = [
    {"id":1, "name":"peter", "phone":12345},
    {"id":2, "name":"frank", "phone":456123},
    {"id":3, "name":"joseph","phone":749456}
];

app.get(BASE_API_PATH + "/contacts", (request, response) => {
    console.log(Date() + " -GET /contacts")
    response.send(contacts)
});

app.get(BASE_API_PATH + "/contact/:id", (request, response) => {
    console.log(Date() + ` -GET /contact/${request.params.id}`)
    var id = request.params.id;
    var contacto = null;
    const found = contacts.find(element => element.id==id);
    
    if (found==null){
        console.log(Date() + ` -GET /contact/${request.params.id} - Not found contact with id: ${id}`);
        response.sendStatus(404);
    }else{
        console.log(Date() + ` -GET /contact/${request.params.id} - Found contact id: ${id} :`+ JSON.stringify(found));
        response.send(found);
    }
    
});

//==========================================Ejercicio 3.2: POST==========================================//
const bodyParser = require('body-parser')
app.use(bodyParser.json())

app.post(BASE_API_PATH + "/contacts", (request, response) => {
    console.log(Date() + " -POST /contacs")
    var contact = request.body;
    var nextId = calculateNextId();
    contact.id=nextId;
    contacts.push(contact);
    console.log(Date() + ` -POST /contacs - New contact with id: ${nextId} ` + JSON.stringify(contact))
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
    for(i = 0; i < contacts.length; i++){
        array.push(contacts[i].id);
    }

    array.sort(sortNumber)
    return array[array.length-1]+1;
}

function sortNumber(a, b) {
    return a - b;
  }