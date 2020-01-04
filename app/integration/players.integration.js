
const applicationConfig = require('../../config/application.config');
const request = require("request-promise");

module.exports.getPlayers = async function getPlayers(token) {
  
    let uri = applicationConfig.teamsPlayersAPI+'players'
    console.log(Date() + " -GET "+ uri)

    let options = {
      uri: uri,
      method: 'GET',
      json: true,
      headers: {
        'x-access-token': token,
      }
    }

    try {
      const response = await request(options);
      console.log(Date() + "SUCCESS: -GET " + uri);
      console.log(response);
      if(response.status=='error'){
        throw new Error(response.message);
      }
      return response;
    }catch (err) {
      console.log(Date() + "ERROR: -GET " + uri);
      console.error(err);
      throw err;
    }
}

module.exports.getPlayerById = async function getPlayerById(playerId, token) {
  
    let uri = applicationConfig.teamsPlayersAPI+'player/'+playerId
    console.log(Date() + " -GET "+ uri)

    let options = {
      uri: uri,
      method: 'GET',
      json: true,
      headers: {
        'x-access-token': token,
      }
    }

    try {
      const response = await request(options);
      console.log(Date() + "SUCCESS: -GET " + uri);
      console.log(response);
      if(response.status=='error'){
        throw new Error(response.message);
      }
      return response;
    }catch (error) {
      console.log(Date() + "ERROR: -GET " + uri);
      console.error(error);
      throw error;
    }
}

module.exports.updatePlayer = async function updatePlayer(updatePlayer, token) {
  
    let uri = applicationConfig.teamsPlayersAPI+'player'
    console.log(Date() + " -PUT "+ uri)

    let options = {
      uri: uri,
      json: true,
      body: updatePlayer,
      method: 'PUT',
      headers: {
        'x-access-token': token,
      }
    }

    try {
      const response = await request(options);
      console.log(Date() + "SUCCESS: -PUT " + uri);
      console.log(response);
      if(response.status=='error'){
        throw new Error(response.message);
      }
      return response;
    }catch (error) {
      console.log(Date() + "ERROR: -PUT " + uri);
      console.error(error);
      return Error(error);
  }
}