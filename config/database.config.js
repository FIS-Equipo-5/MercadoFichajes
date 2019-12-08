require('dotenv').config();

module.exports = {
    //We take MongoDB url and server's port from .env file
    url: process.env.DB_URL,
    port: process.env.PORT
}