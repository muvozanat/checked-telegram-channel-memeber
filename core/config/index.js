require('dotenv').config()

const token = process.env.TOKEN
const admin = process.env.ADMIN

module.exports = { token, admin}