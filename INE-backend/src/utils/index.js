const createUserPayload = require('./create-user-payload')
const { attachCookiesToResponse } = require('./jwt');


module.exports = {
    createUserPayload,
    attachCookiesToResponse
}