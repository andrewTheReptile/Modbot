const Discord = require('discord.js');
const bot = new Discord.Client({disableEveryone: true});
const sql = require('sqlite');
sql.open(`./guildsettings.sqlite`);
const fs = require('fs');
bot.commands = new Discord.Collection();
bot.usage = new Discord.Collection();
bot.alias = new Discord.Collection();
var n = 0;

fs.readdir(`./cmds`, function(err, files) {
  if (err) return console.log(err);
  files.forEach(file => {
    let f = require(`./cmds/${file}`);
    bot.commands.set(f, f.help.name);
    bot.usage.set(f.help.name, f.conf.usage);
    bot.alias.set(f.help.name, f.conf.usage);
    n += 1;
  });
  console.log(`Loaded ${n} files.`);
  n = 0;
});
