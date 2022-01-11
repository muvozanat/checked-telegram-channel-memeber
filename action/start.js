const { Composer, Scenes, Markup } = require("telegraf")
const { lang } = require('../message/lang')
const starter = new Composer;
let language = [];
starter.start(async (ctx) => {
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
            await ctx.reply(`${lang[0].uz.chooseLang} \n${lang[0].en.chooseLang} \n${lang[0].ru.chooseLang}`, {
                reply_markup: {
                    inline_keyboard: [
                        [
                            { text: `${lang[0].uz.langName}`, callback_data: "uz" }
                        ],
                        [
                            { text: `${lang[0].en.langName}`, callback_data: "en" },
                            { text: `${lang[0].ru.langName}`, callback_data: "ru" },
                        ]
                    ]
                }
            })
            break;
    }
})

starter.action(/[a-z]/, async (ctx) => {
    switch (ctx.match['input']) {
        case 'uz':
            ctx.session.lang = ctx.match['input']
            lang.map(langs => language.push(langs[ctx.session.lang]))
            ctx.deleteMessage()
            break;
        case 'ru':
            ctx.session.lang = ctx.match['input']
            lang.map(langs => language.push(langs[ctx.session.lang]))
            ctx.deleteMessage()
            break;
        case 'en':
            ctx.session.lang = ctx.match['input']
            lang.map(langs => language.push(langs[ctx.session.lang]))
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

starter.hears(/[a-z]/, async (ctx) => {
    switch (ctx.match['input']) {
        case '/start':
            (ctx.session.lang) ? tekshiruv(ctx) : ctx.wizard.next()
            break;
        default:
            break;
    }
})

async function tekshiruv(ctx) {
    ctx.telegram.getChatMember('-1001506702150', ctx.session.userId)
        .then(r => {
            switch (r.status) {
                case `left`:
                    ctx.session.status = false
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
                    ctx.session.status = true
                    ctx.wizard.next()
                    ctx.reply(language[0].hi, {
                        reply_markup: {
                            keyboard: [
                                [
                                    { text: language[0].buttons[0] },
                                    { text: language[0].buttons[1] }
                                ], [
                                    { text: language[0].buttons[2] },
                                    { text: language[0].buttons[3] }

                                ],
                                [
                                    { text: language[0].buttons[4] },
                                    { text: language[0].buttons[5] }
                                ]
                            ],
                            resize_keyboard: true
                        }
                    })
                    break;
            }
        })
}

const main = new Composer()
main.on('text', async function (ctx) {
   let share_botLink = `\nt.me/${ctx.botInfo.username}?start=${ctx.session.userId}`
    switch (ctx.message.text) {
        case language[0].buttons[0]:
            await ctx.replyWithHTML(language[0].msg_01 + share_botLink, Markup.inlineKeyboard([
                [{ text: `${language[0].shareToFriends}`, url: `https://t.me/share/url?url=${share_botLink}&text=${language[0].msg_02}` }]
            ]))
            break;
        case language[0].buttons[4]:
            ctx.reply("sallom")
            break;
        default:
            ctx.scene.leave('startSc')
            ctx.scene.enter('startSc')
            break
    }
    // lang.map(langs =>language.push(langs[ctx.session.lang]))

})

const startScene = new Scenes.WizardScene('startSc', starter, main)
module.exports = { startScene }
