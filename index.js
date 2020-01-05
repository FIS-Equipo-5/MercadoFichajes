const app = require('./server.js');
const dbConnect = require('./db');
const applicationConfig = require('./config/application.config.js');

var port = (process.env.PORT || 3000);

console.log("Starting API server at " + "3000");

dbConnect().then(
    () => {
        app.listen(port);
        console.log("Server ready!");
        /*Documentación Swagger*/
        const expressSwagger = require('express-swagger-generator')(app);
        let options = {
            swaggerDefinition: {
                info: {
                    description: 'FIS Group 5 Transfers API',
                    title: 'Transfers API',
                    version: '1.0.0',
                },
                host: 'localhost:3000',
                basePath: '/api/v1',
                produces: [
                    "application/json"
                ],
                schemes: ['http', 'https'],
                securityDefinitions: {
                   /*
                    JWT: {
                        type: 'apiKey',
                        in: 'header',
                        name: 'Authorization',
                        description: "",
                    }
                    */
                }
            },
            basedir: __dirname, //app absolute path
            files: ['./docs/swagger/*.js'] //Path to the API handle folder
        };
        expressSwagger(options)
    },
    err => {
        console.log("Connection error: " + err);
        process.exit();
    }
);