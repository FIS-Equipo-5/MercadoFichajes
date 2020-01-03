
const applicationConfig = require('../../config/application.config');
const request = require("request-promise");

module.exports.getTeams = async function getTeams(token) {
  
    let uri = applicationConfig.teamsPlayersAPI+'teams'
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

module.exports.getTeamById = async function getTeamById(teamId, token) {
  
    let uri = applicationConfig.teamsPlayersAPI+'teams/team/'+teamId
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

module.exports.getTeamByName = async function getTeamByName(teamName, token) {
  
    let uri = applicationConfig.teamsPlayersAPI+'teams/'+teamName
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

module.exports.updateTeam = async function updateTeam(updateTeam, token) {
  
    let uri = applicationConfig.teamsPlayersAPI+'teams/'+updateTeam.name
    console.log(Date() + " -PUT "+ uri)

    let options = {
      uri: uri,
      json: true,
      body: updateTeam,
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
      throw error;
    }
}