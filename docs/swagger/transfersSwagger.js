/**
 * @typedef Transfer
 * @property {string} transfer_id.required - transfer id - eg: 5dee74accf9a95284ba5b323
 * @property {string} transfer_date.required - tranfer date - eg: 2019-08-31’T’23:59:08Z
 * @property {number} contract_years.required - contract years - eg: 3
 * @property {number} origin_team_id.required - player's original team id - eg: 213
 * @property {number} destiny_team_id.required - player's destiny team id - eg: 212
 * @property {number} cost.required - player cost eg: 234230
 * @property {number} player_id.required - player id eg: 20
 */

/**
 * This function comment is parsed by doctrine
 * @route GET /transfers
 * @group Transfers - Operations about Transfers
 * @returns {Array.<Transfers>} 200 - An array of transfers info
 * @returns {Error}  500 - Unexpected error 
 */

 /**
 * This function comment is parsed by doctrine
 * @route POST /transfers
 * @group Transfers - Operations about Transfers
 * @operationId createNewTransfer
 * @produces application/json
 * @consumes application/json
 * @returns {Transfer.model} 201 - The transnfer created
 * @returns {Error}  400 - Bad Request
 * @returns {Error}  500 - Unexpected error
 */
/*
 * @headers {integer} 200.X-Rate-Limit - calls per hour allowed by the user
 * @headers {string} 200.X-Expires-After - 	date in UTC when token expires
 * @security JWT
 */


 /**
 * This function comment is parsed by doctrine
 * @route DELETE /transfers
 * @group Transfers - Operations about Transfers
 * @returns {object} 204 - No content
 * @returns {Error}  500 - Unexpected error
 */

 /**
 * This function comment is parsed by doctrine
 * @route GET /transfers/{destiny_team_id}
 * @group Transfers - Operations about Transfers
 * @param {string} destiny_team_id.path.required - destiny team id - eg: 232
 * @returns {Transfer.model} 200 - Requested transfer
 * @returns {object} 404 - Not Found
 * @returns {Error}  500 - Unexpected error
 */

 /**
 * This function comment is parsed by doctrine
 * @route PUT /transfers/{transfer_id}
 * @param {Transfer.model} transfer.body.required - the new transfer
 * @group Transfers - Operations about Transfers
 * @param {string} transfer_id.path.required - transfer id eg: 5dee74accf9a95284ba5b323
 * @returns {object} 200 - Succesfully updated
 * @returns {Error}  404 - Not Found
 * @returns {Error}  400 - Bad Request
 * @returns {Error}  500 - Unexpected error
 */

 /**
 * This function comment is parsed by doctrine
 * @route DELETE /transfers/{transfer_id}
 * @group Transfers - Operations about Transfers
 * @param {string} transfer_id.path.required - transfer id eg: 5dee74accf9a95284ba5b323
 * @returns {object} 204 - No content
 * @returns {Error}  404 - Not Found
 * @returns {Error}  500 - Unexpected error
 */

 /**
 * This function comment is parsed by doctrine
 * @route GET /transfers/transfer/{transfer_id}
 * @group Transfers - Operations about Transfers
 * @param {string} transfer_id.path.required - transfer id eg: 5dee74accf9a95284ba5b323
 * @returns {Transfer.model} 200 - Requested transfer
 * @returns {Error}  404 - Not Found
 * @returns {Error}  500 - Unexpected error
 */

 /**
 * This function comment is parsed by doctrine
 * @route GET /transfers/{player_id}
 * @group Transfers - Operations about Transfers
 * @param {string} player_id.path.required - player id - eg: 23
 * @returns {Transfer.model} 200 - Requested Transfer
 * @returns {object} 404 - Not Found
 * @returns {Error}  500 - Unexpected error
 */


exports.foo = function() {}
