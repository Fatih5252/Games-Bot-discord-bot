const { Events, EmbedBuilder } = require('discord.js');
const starboard = require('../schemas/starboardschema');

module.exports = {
    name: Events.MessageReactionAdd,
    async execute (reaction, user, client) {

        if (!reaction.message.guildId) return;

        var data = await starboard.findOne({ Guild: reaction.message.guildId });
        if (!data) return;
        else {
            if (reaction._emoji.name !== '⭐') return;

            var guild = await client.guilds.cache.get(reaction.message.guildId);
            var sendChannel = await guild.channel.fetch(data.Channel);
            var channel = await guild.channel.fetch(reaction.message.channelId);
            var message = await channel.messages.fetch(reaction.message.id);

            if (message.author.id == client.user.id) return;

            var newReation = await message.reactions.cache.find(reaction => reaction.emoji.id === reaction._emoji.id);

            if (newReation.count >= data.Count) {
                var msg = message.content || 'No Content available';

                const embed = new EmbedBuilder()
                .setColor('Blurple')
                .setAuthor({ name: `${message.author.username}`, iconURL: message.author.avatarURL() })
                .setDescription(`${msg} \n\n**[Click to jump to message!](https://discord.com/channels/${message.guild.id}/${message.channel.id}/${message.id})**`)
                .setTimestamp()
                
                await sendChannel.send({ content: `**⭐ ${newReation.count} | ${channel}**`, embeds: [embed] }).then(async m => {
                    await m.react('⭐').catch(err => {
                        console.log(err)
                    });
                });
            }
        }
    }
}