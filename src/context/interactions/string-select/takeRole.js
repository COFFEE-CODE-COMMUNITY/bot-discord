import {ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle} from "discord.js";
import {deleteEmbedById, findEmbedById} from "../../../database/repository/takeRole.js";
import {client} from "../../../client/client.js";

const handleTakeRoleSelect = async (interaction) => {
  if (!interaction.isRoleSelectMenu()) return;

  const [prefix, action] = interaction.customId.split(":");
  if (prefix !== "take-role-select") return;
  if (action !== "roles") return;

  const roles = interaction.values;
  if (!roles || roles.length === 0) {
    return interaction.reply({
      content: "Minimal pilih 1 role",
      ephemeral: true,
    });
  }

  const modal = new ModalBuilder()
    .setCustomId(`take-role-modal:embed`)
    .setTitle("Konfigurasi Embed Take Role");

  modal.addComponents(
    new ActionRowBuilder().addComponents(
      new TextInputBuilder()
        .setCustomId("interaction_type")
        .setLabel("Tipe Interaksi (1 = Select, 2 = Button)")
        .setStyle(TextInputStyle.Short)
        .setRequired(true)
        .setPlaceholder("1 atau 2")
    ),
    new ActionRowBuilder().addComponents(
      new TextInputBuilder()
        .setCustomId("title")
        .setLabel("Judul Embed")
        .setStyle(TextInputStyle.Short)
        .setRequired(true)
        .setPlaceholder("Ambil Role")
    ),
    new ActionRowBuilder().addComponents(
      new TextInputBuilder()
        .setCustomId("description")
        .setLabel("Deskripsi Embed (Opsional)")
        .setStyle(TextInputStyle.Paragraph)
        .setRequired(false)
        .setPlaceholder("Pilih role yang ingin kamu ambil")
    ),
    new ActionRowBuilder().addComponents(
      new TextInputBuilder()
        .setCustomId("color")
        .setLabel("Warna Embed (hex)")
        .setStyle(TextInputStyle.Short)
        .setRequired(false)
        .setPlaceholder("#5865F2")
    ),
    new ActionRowBuilder().addComponents(
      new TextInputBuilder()
        .setCustomId("footer")
        .setLabel("Footer Embed (Opsional)")
        .setStyle(TextInputStyle.Short)
        .setRequired(false)
        .setPlaceholder("Klik untuk mengambil role")
    )
  );

  await interaction.showModal(modal);
};

const handleTakeRoleDeleteSelect = async (interaction) => {
  if (!interaction.isStringSelectMenu()) return;
  if (interaction.customId !== "take-role-delete:select") return;

  const embedId = interaction.values[0];

  const embed = await findEmbedById({ id: embedId });
  if (!embed) {
    return interaction.reply({
      content: "Embed tidak ditemukan di database.",
      ephemeral: true,
    });
  }

  try {
    const guild = await client.guilds.fetch(embed.guild_id);
    const channel = await guild.channels.fetch(embed.channel_id);

    if (channel?.isTextBased() && embed.message_id) {
      const message = await channel.messages.fetch(embed.message_id);
      await message.delete();
    }
  } catch {}

  await deleteEmbedById({ id: embed.id });

  await interaction.reply({
    content: "Take role embed berhasil dihapus.",
    ephemeral: true,
  });
};

export {
  handleTakeRoleDeleteSelect,
  handleTakeRoleSelect
};
