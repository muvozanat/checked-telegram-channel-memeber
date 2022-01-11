const { Scenes: { BaseScene: Scene }, Composer } = require('telegraf')
const startSc = new Scene('startSc')
const {allScenes} = require('../core/allScenes')
const checkSc = new Scene('checkSc')

// const fun1 = new Composer()
// fun1.start((ctx)=>{
//     ctx.reply("Salom")
// })
startSc.enter(async (ctx) => {
    ctx.session.lang
    
    ctx.session.userId = ctx.from.id
    if (ctx.message.text.length == 6) {
        ctx.session.userRefId = false
    } else {
        ctx.session.userRefId = ctx.message.text.split(' ')[1]
    }

    (ctx.session.userRefId) ? (ctx.replyWithMarkdownV2(`ℹ️ Siz [user](tg://user?id=${ctx.session.userId}) inson botga taklif qildi`)) : false
    switch (ctx.session.lang) {
        case 'uz':
            tekshiruv(ctx)
            break;
        case 'en':
            tekshiruv(ctx)
            break;
        case 'ru':
            tekshiruv(ctx)
            break;

        default:
            await ctx.reply(`↘️ Iltimos tilni tanlang`, {
                reply_markup: {
                    inline_keyboard: [
                        [
                            { text: `🇺🇿 O'zbekcha`, callback_data: "uz" }
                        ],
                        [
                            { text: `🇬🇧 English`, callback_data: "en" },
                            { text: `🇷🇺 Руский`, callback_data: "ru" },
                        ]
                    ]
                }
            })
            break;
    }






})

startSc.action(/[a-z]/, async (ctx) => {
    switch (ctx.match['input']) {
        case 'uz':
            ctx.session.lang = ctx?.match['input']
            ctx.deleteMessage()
            break;
        case 'ru':
            ctx.session.lang = ctx?.match['input']
            ctx.deleteMessage()
            break;
        case 'en':
            ctx.session.lang = ctx?.match['input']
            ctx.deleteMessage()
            break;
        case 'check':
            tekshiruv(ctx)
            break;
        default:
            break;
    }
    if (ctx.match['input'] != 'check') return tekshiruv(ctx)
})

async function tekshiruv(ctx) {

    ctx.telegram.getChatMember('-1001506702150', ctx.session.userId)
        .then(r => {
            switch (r.status) {
                case `left`:
                    ctx.reply("siz kanalga azo emassiz , kanalga a'zo bo'lgach tekshrib ko'ring", {
                        reply_markup: {
                            inline_keyboard: [
                                [
                                    { text: "1️⃣ NPM RUN DEV", url: 'https://t.me/+3R8p2EpcoY85YmQy' }
                                ], [
                                    { text: `✅ Tekshrib ko'rish`, callback_data: 'check' }
                                ]
                            ]
                        }
                    })
                    break;

                default:
                    allScenes()
                    ctx.scene.enter("checkSc")
                    break;
            }
        })
}
startSc.hears(/[a-z]/, async (ctx) => {
    switch (ctx.match['input']) {
        case 'd':
            await ctx.reply("Bu buyrug'dan foydalanib bo'ldiz ")
            await ctx.scene.leave("startSc")
            ctx.scene.enter('checkSc')
            break;
        case '/start':
            (ctx.session.lang) ? tekshiruv(ctx) : ctx.scene.enter("startSc")
            break;

        default:
            break;
    }

})

startSc.leave((ctx) => {
    if (ctx.from?.first_name) {
        if (ctx.from?.last_name) {
            ctx.session.fullname = `${ctx.from.first_name} ${ctx.from.last_name}`
        } else {
            ctx.session.fullname = ctx.from.first_name
        }
    } else {
        ctx.session.fullname = ctx.from.first_name
    }

})




module.exports = { startSc, checkSc }