import {
  ActionRowBuilder,
  EmbedBuilder,
  PermissionFlagsBits,
  SlashCommandBuilder,
  StringSelectMenuBuilder
} from "discord.js";
import {getAll} from "../services/help.js";

export default {
  data: new SlashCommandBuilder()
    .setName("help")
    .setDescription('see feature documentation'),
  permissions: PermissionFlagsBits.ADMINISTRATOR,
  async execute(interaction) {
    await interaction.deferReply({
      ephemeral: true,
    });
    const data = await getAll();

    const listFeatures = new ActionRowBuilder().addComponents(
      new StringSelectMenuBuilder()
        .setCustomId("help-select:feature")
        .setPlaceholder("List feature documentation")
        .setMinValues(1)
        .setMaxValues(data.size)
        .setOptions(
          data.map(feat => ({
            label: feat.command,
            value: feat.id
          }))
        )
    );

    const embed = new EmbedBuilder()
      .setTitle("📘 Feature Documentation")
      .setDescription(
        [
          "Berikut adalah daftar dokumentasi fitur yang tersedia.",
          "",
          "🔹 Gunakan menu di bawah",
          "🔹 Pilih fitur untuk melihat penjelasan lengkap",
        ].join("\n")
      )
      .setColor(0x3498db)
      .setFooter({
        text: "Coffee Code Community",
      })
      .setTimestamp();


    return await interaction.editReply({
      embeds: [embed],
      components: [listFeatures],
      ephemeral: true,
    });
  },
};
