require('dotenv').config()
// eslint-disable-next-line no-undef
const MONGO_URI = process.env.MONGO_URI
const PORT = 3003

module.exports = { MONGO_URI, PORT }