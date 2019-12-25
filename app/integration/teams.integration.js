
const applicationConfig = require('../../config/application.config');
const request = require("request-promise");

module.exports.getTeams = function getTeams() {
  
  let uri = applicationConfig.teamsPlayersAPI+'teams'
  console.log(Date() + " -GET "+ uri)

  let options = {
    uri: uri,
    method: 'GET',
    json: true
  }

  return request(options)
    .then((response) => {
        console.log(Date() + "SUCCESS: -GET "+ uri)
        console.log(response)
        return response
    }).catch((err) => {
        console.log(Date() + "ERROR: -GET "+ uri)
        console.error(err)
        return Error(err)
  })
}

module.exports.getTeamByName = function getTeamByName(teamName) {
  
  let uri = applicationConfig.teamsPlayersAPI+'teams/'+teamName
  console.log(Date() + " -GET "+ uri)

  let options = {
    uri: uri,
    method: 'GET',
    json: true
  }

  return request(options)
    .then((response) => {
        console.log(Date() + "SUCCESS: -GET "+ uri)
        console.log(response)
        return response
    }).catch((err) => {
        console.log(Date() + "ERROR: -GET "+ uri)
        console.error(err)
        return Error(err)
  })
}