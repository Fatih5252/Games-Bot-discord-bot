const { Emojify } = require('discord-gamecord');
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('emojify')
    .setDescription('Emojify your text!')
    .addStringOption(option => option.setName('text').setDescription('The text you want to emojify').setRequired(true)),
    async execute (interaction) {

        const Text = interaction.options.getString('text');

        await interaction.reply(await Emojify(Text));
    }
}