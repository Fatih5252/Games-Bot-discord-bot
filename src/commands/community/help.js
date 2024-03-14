const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('help')
    .setDescription('Shows you all commands!'),
    async execute (interaction, client) {

        const embed0 = new EmbedBuilder()
        .setColor("Blue")
        .setTitle("Help & Commands")
        .setDescription("Here are all the commands!")
        .addFields({ name: "Page 1", value: "welcome (button 1)" })
        .addFields({ name: "Page 2", value: "Game commands (button 2)" })
        .addFields({ name: "Page 3", value: "Help commands (button 3)" })

        const embed1 = new EmbedBuilder()
        .setColor("Blue")
        .setTitle("thanks for inviting me!")
        .setDescription("i am the games bot discord bot! you can see all my commands by clicking the buttons below!")
        .setFooter({ text: "welcome" })
        .setTimestamp()

        const embed2 = new EmbedBuilder()
        .setColor("Blue")
        .setTitle("Game commands")
        .setDescription("Here are all the game commands!")
        .setFields({ name: "/2048", value: "Play 2048!" })
        .setFields({ name: "/connect4", value: "Play connect4!" })
        .setFields({ name: "/emojify", value: "Emojify your text!" })
        .setFields({ name: "/fasttype", value: "Play fasttype!" })
        .setFields({ name: "/findemoji", value: "Play findemoji!" })
        .addFields({ name: "/flood", value: "Play flood!" })
        .addFields({ name: "/guessthepokemon", value: "Play guessthepokemon!" })
        .addFields({ name: "/hangman", value: "Play hangman!" })
        .addFields({ name: "/matchpairs", value: "Play matchpairs!" })
        .addFields({ name: "/minesweeper", value: "Play minesweeper!" })
        .addFields({ name: "/rockpaperscissors", value: "Play rockpaperscissors!" })
        .addFields({ name: "/slots", value: "Play slots!" })
        .addFields({ name: "/slots", value: "Play slots!" })
        .addFields({ name: "/snake", value: "Play snake!" })
        .addFields({ name: "/tictactoe", value: "Play tictactoe!" })
        .addFields({ name: "/trivia", value: "Play trivia!" })
        .addFields({ name: "/wordle", value: "Play wordle!" })
        .addFields({ name: "/would-you-rather", value: "Play wouldyourather!" })
        .setFooter({ text: "Game commands" })
        .setTimestamp()

        const embed3 = new EmbedBuilder()
        .setColor("Blue")
        .setTitle("Help commands")
        .setDescription("here are the help commands!")
        .addFields({ name: "/help", value: "Shows you all commands" })
        .setFooter({ text: "Help commands" })
        .setTimestamp()

        const button = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
            .setCustomId('seite0')
            .setLabel('Page 0')
            .setStyle(ButtonStyle.Success),

            new ButtonBuilder()
            .setCustomId('seite1')
            .setLabel('Page 1')
            .setStyle(ButtonStyle.Success),

            new ButtonBuilder()
            .setCustomId('seite2')
            .setLabel('Page 2')
            .setStyle(ButtonStyle.Success),

            new ButtonBuilder()
            .setCustomId('seite3')
            .setLabel('Page 3')
            .setStyle(ButtonStyle.Success),
            
            new ButtonBuilder()
            .setCustomId('buttons')
            .setLabel(`${interaction.user.username}'s buttons`)
            .setStyle(ButtonStyle.Secondary)
            .setDisabled(true)
        )

        const message = await interaction.reply({ embeds: [embed0], components: [button] });
        const collector = message.createMessageComponentCollector();

        collector.on('collect', async i => {

            if (i.customId === 'seite0') {

                if (i.user.id !== interaction.user.id) {
                    return i.reply({ content: `Only ${interaction.user} can use the buttons!`, ephemeral: true });
                }

                await i.update({ embeds: [embed0], components: [button] });
            }

            if (i.customId === 'seite1') {

                if (i.user.id !== interaction.user.id) {
                    return i.reply({ content: `Only ${interaction.user} can use the buttons!`, ephemeral: true });
                }

                await i.update({ embeds: [embed1], components: [button] });
            }

            if (i.customId === 'seite2') {

                if (i.user.id !== interaction.user.id) {
                    return i.reply({ content: `Only ${interaction.user} can use the buttons!`, ephemeral: true });
                }

                await i.update({ embeds: [embed2], components: [button] });
            }

            if (i.customId === 'seite3') {

                if (i.user.id !== interaction.user.id) {
                    return i.reply({ content: `Only ${interaction.user} can use the buttons!`, ephemeral: true });
                }

                await i.update({ embeds: [embed3], components: [button] });
            }
        })
    }
}