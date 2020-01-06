const express = require('express');
const bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');

// create express app
const app = express();

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json())

app.set('secretKey', 'authServiceApi'); // jwt secret token

//jwt token is checked for all our routes
app.use('/api', validateUser);

//Function that validates jwt token
function validateUser(req, res, next) {
    jwt.verify(req.headers['x-access-token'], req.app.get('secretKey'), function(err, decoded) {
      if (err) {
        res.json({status:"error", message: err.message, data:null});
      }else{
        // add user id to request
        req.body.userId = decoded.id;
        next();
      }
    });
    
  }

// Require Transfer routes
require('./app/routes/transfer.routes.js')(app);

module.exports = app;