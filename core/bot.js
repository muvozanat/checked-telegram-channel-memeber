const { Telegraf } = require("telegraf");
const { token, admin } = require('./config')
const bot = new Telegraf(token)

bot.launch({
    polling: true
})
module.exports = { bot }