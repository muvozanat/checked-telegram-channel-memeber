const express = require('express')
const app = express()
const {bot} = require('./core/bot')
const { Scenes, session } = require('telegraf')
const {startScene } = require('./action/start')
const stage = new Scenes.Stage([startScene])
bot.use(session());
bot.use(stage.middleware())

bot.start((ctx)=>{
    ctx.scene.enter('startSc')
})
app.get('/', (req, res)=>{
    res.send("ishalmoqda")
})



process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))
app.listen(process.env.PORT||3000, ()=>{
    console.log("Port ishlamoqda")
})