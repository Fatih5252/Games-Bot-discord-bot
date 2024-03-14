const {
    Events,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
    ComponentType,
    EmbedBuilder,
  } = require("discord.js");
  
  module.exports = {
    name: Events.InteractionCreate,
    async execute(interaction, client) {
      if (!interaction.commandName) return;
  
      var sendGuild = await client.guilds.fetch(`1170114856859488307`);
      var sendChannel = await sendGuild.channels.fetch(`1170114857857732685`);
  
      var command = interaction.commandName;
      var guild = interaction.guild;
      var user = interaction.user;
      var channel = interaction.channel;
  
      const embed = new EmbedBuilder()
        .setColor(`Green`)
        .setTitle(`Commmand Used`)
        .setDescription(`An interaction command has been used.`)
        .addFields({ name: `Command`, value: `\`${command}\`` })
        .addFields({
          name: `Guild of use`,
          value: `\`${guild.name}\` (${guild.id})`,
        })
        .addFields({
          name: `Channel of use`,
          value: `\`${channel.name}\` (${channel.id})`,
        })
        .addFields({
          name: `Command User`,
          value: `\`${user.username}\` (${user.id})`,
        })
        .setFooter({ text: `Interaction Use Logger` })
        .setTimestamp();
  
      const button = new ButtonBuilder()
        .setStyle(ButtonStyle.Secondary)
        .setCustomId(`genInvLog`)
        .setLabel(`Generate Server Invite`)
        .setDisabled(false);
  
      const buttons = new ActionRowBuilder().addComponents(button);
  
      var msg = await sendChannel.send({
        embeds: [embed],
        components: [buttons],
      });
  
      var time = 300000;
      const collector = await msg.createMessageComponentCollector({
        componentType: ComponentType.Button,
        time,
      });
  
      collector.on("collect", async (i) => {
        if (i.customId == `genInvLog`) {
          var invite = await channel.createInvite();
          await i.reply({
            content: `Heres the invite to the guild of command use: https://discord.gg/${invite.code}`,
            ephemeral: true,
          });
        }
      });
  
      collector.on("end", async () => {
        button.setDisabled(true);
        embed.setFooter({ text: `Interaction Use Logger -- Button Expired` });
        await msg.edit({ embeds: [embed], components: [buttons] });
      });
    },
  };