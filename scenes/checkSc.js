const { Markup } = require('telegraf')
const { checkSc } = require('./startSc')
const { allScenes } = require('../core/allScenes')
const { Scenes: { BaseScene: Scene }} = require('telegraf')
const adversitSc = new Scene('adversitSc')
let buttons = ["💵 Pul ishlash", "☎️ Reklama", "💳 Hisob", "📬 Referal", "⚙️ Sozlamalar", "📄 Bot haqida"]

allScenes()
checkSc.enter(async (ctx) => {
    ctx.reply("Assalomu alayekum", {
        reply_markup: {
            keyboard: [
                [
                    { text: buttons[0] },
                    { text: buttons[1] }
                ], [
                    { text: buttons[2] },
                    { text: buttons[3] }

                ],
                [
                    { text: buttons[4] },
                    { text: buttons[5] }
                ]
            ],
            resize_keyboard: true
        }
    })
})

checkSc.on('text', async (ctx) => {
    switch (ctx.message.text) {
        case buttons[0]:
            msg = `
💰 Siz <b>Taklif havolingiz</b>ni do'stlaringizga yuborib va botga taklif qilib  pul ishlashingiz mumkin, 

🎁 <b>Taklif havolangiz</b> ⤵️
t.me/vercell_demo_bot?start=${ctx.session.userId}`
            msg_share = `
Assalomu alaykum qadrdonim  men sizni ushbu botga taklif qilaman
🎁Taklif havolangiz ⤵️
t.me/vercell_demo_bot?start=2098028949`
            await ctx.replyWithHTML(msg, Markup.inlineKeyboard([
                [{ text: "Xavolani yuborish", url: `https://t.me/share/url?url=t.me/${ctx.botInfo.username}&text=referal_{}` }]
            ]))
            break;

        case buttons[1]:
            msg = `
   Siz ushbu bot orqali kanalingiz uchun kanal a'zolarini topishingiz mumkin
   `
            await ctx.replyWithHTML(msg, Markup.keyboard(
                [["Kanal", "Prosmotr"]]
            ).resize().oneTime())
            break;


        case buttons[2]:
            ctx.session.balance = 0.00
            msg = `
<b>💰 Hisobingizda: </b><code>${ctx.session.balance}</code> so'm bor
   `
            await ctx.replyWithHTML(msg,Markup.inlineKeyboard(
                       [{text: "Yechib olish", callback_data:'yechish'}, {text:"To'ldirish", callback_data:'toldirish'}]
                   ).resize().oneTime()
            )
            break;

        case 'Kanal':
            ctx.reply("Salom")
            break;
        default:
            break;
    }
})
checkSc.hears('Kanal', async (ctx)=>{
    ctx.reply("Salom")
})
// checkSc.on('inline_query', (ctx) => [
//     ctx.answerInlineQuery()
// ])
checkSc.leave((ctx) => {
    ctx.scene.enter("hello")
})

module.exports = { adversitSc }