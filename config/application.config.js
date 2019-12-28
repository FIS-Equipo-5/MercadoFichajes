require('dotenv').config();

module.exports = {
    //We take MongoDB url and server's port from .env file
    databaseUrl: process.env.DB_URL,
    applicationPort: process.env.PORT,
    teamsPlayersAPI: process.env.TEAM_PLAYERS_API
}