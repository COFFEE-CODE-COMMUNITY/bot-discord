import {ActionRowBuilder, ButtonStyle, ModalBuilder, TextInputBuilder, TextInputStyle} from "discord.js";
import {statData} from "../../memberUpdate/statsServer.js";
import {deleteStatsServerByCategory} from "../../../services/statsServer.js";

const handleStatsServerSelect = async (interaction) => {
  if (interaction.customId.split(":")[0] !== "stats-server-select") return;

  const data = statData.get(interaction.user.id);
  if (!data) return;

  const action = interaction.customId.split(":")[1];

  let modal;
  if (action === "roles") {
    data.roles = interaction.values;
    statData.set(interaction.user.id, data);

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
  } else {
    return interaction.reply({
      content: 'Aksi stats server tidak dikenali',
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

const handleStatsServerDelete = async (interaction) => {
  if (!interaction.customId.startsWith("stats-server-delete")) return;

  const categoryId = interaction.values[0];

  await interaction.deferReply({ ephemeral: true });

  await deleteStatsServerByCategory({
    guild: interaction.guild,
    discordCategoryId: categoryId,
  });

  return interaction.editReply({
    content: "Stats server berhasil dihapus",
  });
};

export {
  handleStatsServerSelect,
  handleStatsServerDelete,
};