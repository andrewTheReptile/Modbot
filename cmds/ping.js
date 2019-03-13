const Discord = require('discord.js');
const sql = require('sqlite');
sql.open(`./guildsettings.sqlite`);

module.exports.run = (bot, message, args, funcs) => {
  funcs.ping(message.channel);
};

module.exports.help = {
  name: "ping"
};

module.exports.conf = {
  alias: "pong",
  usage: "This command gets the status of the bot."
};
