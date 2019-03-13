const Discord = require('discord.js');
const sql = require('sqlite');
sql.open('./guildsettings.sqlite');
const rc = require('randomcolor')({
    alpha: 10
});
const funcs = require('../funcs.js');

module.exports = (bot, message) => {
    const guild = message.guild;
    const me = guild.me;
    const author = message.author;
    const member = message.member;
    if (!me.hasPermission(`VIEW_CHANNEL`)) return;
    if (author.bot) return;
    if (message.channel.type == 'text') {
        const prefix = "/";
        const args = message.content.slice(prefix.length).trim().split(" ");
        const command = args.shift().toLowerCase();
        let cmd = bot.commands.get(command);
        if (!cmd) {
            let cmd1 = bot.commands.get(bot.alias.get(command));
            if (!cmd1) return;
            return cmd1.run(bot, message, args, funcs);
        }
        cmd.run(bot, message, args, funcs);
    } else {

    }
};