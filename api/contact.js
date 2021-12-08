const { Telegraf } = require('telegraf');

function contact(req, res) {
    const bot = new Telegraf(process.env.BOT_TOKEN || '1959747391:AAFc2VIq9dNSD_3lZg6mpa64VqA1Fqp0Gmk');
    bot.telegram.sendMessage(-514797698, `Name • ${req.body.name}\nEmail • ${req.body.address}\nMessage • ${req.body.message}`);
    res.send({ message: 'Message sent' });
}

module.exports = contact;