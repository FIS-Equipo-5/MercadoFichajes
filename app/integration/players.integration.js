
const applicationConfig = require('../../config/application.config');
const request = require("request-promise");

module.exports.getPlayers = function getPlayers() {
  
  let uri = applicationConfig.teamsPlayersAPI+'players'
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

module.exports.getPlayerById = function getPlayerById(playerId) {
  
  let uri = applicationConfig.teamsPlayersAPI+'player?_id='+playerId
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
    }).catch((error) => {
        console.log(Date() + "ERROR: -GET "+ uri)
        console.error(error)
        return Error(error)
  })
}

module.exports.updatePlayer = function updatePlayer(updatePlayer) {
  
  let uri = applicationConfig.teamsPlayersAPI+'player'
  console.log(Date() + " -PUT "+ uri)
  console.log(Date() + " updatePlayer "+ updatePlayer)

  let options = {
    uri: uri,
    json: true,
    body: updatePlayer,
    method: 'PUT'
  }

  return request(options)
    .then((response) => {
        console.log(Date() + "SUCCESS: -PUT "+ uri)
        console.log(response)
        return response
    }).catch((error) => {
        console.log(Date() + "ERROR: -PUT "+ uri)
        console.error(error)
        return Error(error)
  })
}