const { Client, GatewayIntentBits, EmbedBuilder, PermissionsBitField, Permissions, MessageManager, Embed, Collection, Events } = require(`discord.js`);
const fs = require('fs');
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] }); 

client.commands = new Collection();

require('dotenv').config();

client.on('ready', () => {
    client.user.setPresence({ activities: [{ name: '/commands'}], status: 'dnd' })
})

const functions = fs.readdirSync("./src/functions").filter(file => file.endsWith(".js"));
const eventFiles = fs.readdirSync("./src/events").filter(file => file.endsWith(".js"));
const commandFolders = fs.readdirSync("./src/commands");

(async () => {
    for (file of functions) {
        require(`./functions/${file}`)(client);
    }
    client.handleEvents(eventFiles, "./src/events");
    client.handleCommands(commandFolders, "./src/commands");
    client.login(process.env.token)
})();
const counting = require('./schemas/countingschema');
client.on(Events.MessageCreate, async message => {
    if (!message.guild) return;
    if (message.author.bot) return;

    const data = await counting.findOne({ Guild: message.guild.id });
    if (!data) return
    else {

        if (message.channel.id !== data.Channel) return;

        const number = Number(message.content);
        
        if (number !== data.Number) {
            return message.react('❌');
        } else if (data.LastUser === message.author.id) {
            message.react('❌')
            await message.reply(`❌ Someone else has to count that number!`);
        } else {
            await message.react('✅');

            data.LastUser = message.author.id;
            data.Number++
            await data.save()
        }
    }
})
