const { PermissionsBitField, SlashCommandBuilder, EmbedBuilder, Embed } = require('discord.js');
const starboard = require('../../schemas/starboardschema');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('starboard')
    .setDescription('Starboard System')
    .addSubcommand(command => command.setName('setup').setDescription('Setup the starboard system (stil on development)').addChannelOption(option => option.setName('channel').setDescription('The channel to send the starred message into').setRequired(true)).addIntegerOption(option => option.setName('star-count').setDescription('The least number of stars a message needs to be added')))
    .addSubcommand(command => command.setName('disable').setDescription('Disable the Starboard System (still on development)'))
    .addSubcommand(command => command.setName('check').setDescription('Check the current starboard system status (still on development)')),
    async execute (interaction) {

        if (!interaction.member.permissions.has(PermissionsBitField.Flags.ManageGuild)) return await interaction.reply({ content: `You need the \`manage Guild\` Permission to run this command!`, ephemeral: true })

        const { options } = interaction;
        const sub = options.getSubcommand();

        async function sendMessage (message) {
            const embed = new EmbedBuilder()
            .setColor('Blurple')
            .setDescription(message);

            await interaction.reply({ embeds: [embed], ephemeral: true })
        }

        var Data = await starboard.findOne({ Guild: interaction.guild.id});
        switch (sub) {
            case 'setup':
                if (Data) {
                    return await sendMessage(`Looks Like the starboard system is already setup. once a message get \`${Data.Count}\` star's, it will be sent in <#${Data.Channel}>`);
                } else {
                    var channel = options.getChannel('channel')
                    var count = options.getInteger('star-count') || 3;

                    await starboard.create({
                        Guild: interaction.guild.id,
                        Channel: channel.id,
                        Count: count
                    });

                    await sendMessage(`I Have setup the starboard system. Once a message gets \`${count}\` Star's, it will be sent in ${channel}`);
                }
            break;
            case 'disable':
                if (!Data) {
                    return await sendMessage(`Looks like there is no Starboard system setup`);
                } else {
                    await starboard.deleteOne({ Guild: interaction.guild.id })
                    await sendMessage(`I have disabled your starboard system`);
                }
            break;
            case 'check':
                if (!Data) {
                    return await sendMessage(`Looks like there is no starboard setup.`);
                } else {
                    var string = `**Star Channel:** <#${Data.Channel}> \n**Required Stars:** \`${Data.Count}\``;
                    await sendMessage(`**Your Starboard System:** \n\n${string}`)
                }
        }
    }
}