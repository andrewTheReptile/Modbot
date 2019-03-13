const Discord = require('discord.js');
const rc = require('randomcolor')({
    alpha: 10
});
const ms = require('ms');

module.exports = {
    //Normal Functions
    checkPosition: (who, who1, guild) => {
        if (who.highestRole.position >= who1.highestRole.position && who.id !== guild.owner.id) {
            return true;
        } else {
            return false;
        };
    },
    checkRolePos: (role, who) => {
        if (role.position >= who.highestRole.position && who.id !== guild.owner.id) {
            return true;
        } else {
            return false;
        };
    },
    checkPerms: (who, perm) => {
        if (!who.hasPermission(perm, false, true, true)) {
            return true;
        } else {
            return false;
        };
    },
    send: (message, mess) => {
        const embed = new Discord.RichEmbed()
            .setDescription(`**${mess}**`)
            .setColor(rc);
        message.channel.send(embed);
    },
    //Other
    ping: async (channel, message, bot) => {
        try {
            const date = Date.now();
            let msg = await channel.send(`***Ping?***`);
            const embed = new Discord.RichEmbed()
                .setTitle("Pong!")
                .setColor(rc)
                .addField(`:timer: Latency`, Math.round(msg.createdTimestamp - message.createdTimestamp) + "ms")
                .addField(`:clipboard: API Latency`, Math.round(bot.ping) + "ms")
                .addField(`:robot: Bot uptime:`, ms(bot.uptime))
                .addField(`:watch: Time took to respond:`, ms(Date.now() - date));
            msg.delete();
            channel.send(embed);
        } catch (e) {
            console.error;
            channel.send(`***Error: ${e.message}***`);
        }
    }
}