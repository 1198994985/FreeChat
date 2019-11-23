const { errorHandle } = require('./errorHandle')
const { cors } = require('./cors')
const { authVerify } = require('./verify')

module.exports = {
  errorHandle,
  cors,
  authVerify
}
