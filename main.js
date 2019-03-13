const Discord = require('discord.js');
const bot = new Discord.Client({
  disableEveryone: true
});
const sql = require('sqlite');
sql.open(`./guildsettings.sqlite`);
const fs = require('fs');
bot.commands = new Discord.Collection();
bot.usage = new Discord.Collection();
bot.alias = new Discord.Collection();
var n = 0;
const {
  promisify
} = require('util');
const readdir = promisify(fs.readdir);

const init = async () => {

  readdir(`./cmds`, function (err, files) {
    if (err) return console.log(err);
    files.forEach(file => {
      let f = require(`./cmds/${file}`);
      bot.commands.set(f.help.name, f);
      bot.usage.set(f.help.name, f.conf.usage);
      bot.alias.set(f.help.name, f.conf.usage);
      n += 1;
    });
    console.log(`Loaded ${n} files.`);
    n = 0;
  });

  const evtFiles = await readdir("./events/");
  console.log(`Loading ${evtFiles.length} events..`);
  evtFiles.forEach(file => {
    console.log(`${file} loaded!`);
    const evtName = file.split(".")[0];
    const event = require(`./events/${file}`);
    bot.on(evtName, event.bind(null, bot));
    delete require.cache[require.resolve(`./events/${file}`)];
  })
}

init();

bot.on('warn', err => console.warn('[WARNING]', err));

bot.on('DiscordAPIError', err => console.log('[WARNING]', err));

bot.on('uncaughtException', (err) => {
  console.log(err)
});

process.on('unhandledRejection', (reason, promise) => {
  console.log('[FATAL] Possibly Unhandled Rejection at: Promise ', promise, ' reason: ', reason.message);
});

bot.on('disconnect', () => {
  console.warn('Disconnected!');
})

bot.on('reconnecting', () => console.warn('Reconnecting...'));

bot.login('TOKEN');
