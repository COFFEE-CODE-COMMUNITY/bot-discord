import {ActionRowBuilder, ButtonStyle, EmbedBuilder, ModalBuilder, TextInputBuilder, TextInputStyle} from "discord.js";
import {ButtonBuilder} from "@discordjs/builders";

const handleStatsServerButton = async (interaction) => {
  const action = interaction.customId.split(":")[1];
  let modal;
  if (action === "next") {
    modal = new ModalBuilder()
      .setCustomId("stats-server-modal:category")
      .setTitle("Input Nama Category");

    const input = new TextInputBuilder()
      .setCustomId('content')
      .setLabel('Masukkan nama category')
      .setStyle(TextInputStyle.Paragraph)
      .setRequired(true)
      .setPlaceholder('Nama category yang akan dibuat...');

    modal.addComponents(
      new ActionRowBuilder().addComponents(input)
    );
  } else if (action === "cancel") {
    const cancelEmbed = new EmbedBuilder()
      .setTitle("Permintaan Berhasil Di Batalkan!")
      .setDescription("Permintaan untuk setup stats server telah kamu batalkan")
      .setColor(15548997)
      .setFooter({
        text: "Coffee Code Community"
      });

    return await interaction.reply({
      embeds: [cancelEmbed],
      ephemeral: true
    });
  }

  if (!modal) {
    return interaction.reply({
      content: 'Aksi stats server tidak dikenali',
      ephemeral: true
    });
  }

  await interaction.showModal(modal);
};

export {
  handleStatsServerButton,
};