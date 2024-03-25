const { SlashCommandBuilder } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
    .setName('emojify')
    .setDescription('change text to emojis')
    .addStringOption(option => option.setName('text').setDescription('The text to convert').setRequired(true))
    .addStringOption(option => option.setName('hidden').setDescription('Hide this message?').addChoices({ name: 'Hidden', value: 'true' }, { name: 'Not Hidden', value: 'false' }).setRequired(true)),
    async execute (interaction) {

        const { options } = interaction;
        const text = options.getString('text');
        var hidden = options.getString('hidden') || false;

        if (hidden === 'true') hidden = true;
        else if (hidden === 'false') hidden = false;

        var emojiText = text
        .toLowerCase()
        .split('')
        .map((letter) => {
            if (letter == ' ') return ' ';
            else return `:regional_indicator_${letter}:`
        })
        .join('');

        if (emojiText.length >= 2000) emojiText = `I cant emojify this text, It's too long!`;

        await interaction.reply({ content: emojiText, ephemeral: hidden })
    }
}
