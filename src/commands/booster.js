import { PermissionFlagsBits, SlashCommandBuilder } from "discord.js";
import { handleBoosterSetup } from "../context/interactions/slash/booster.js";
import { handleBooster } from "../context/memberUpdate/booster.js";

export default {
  data: new SlashCommandBuilder()
    .setName("booster")
    .setDescription('setup booster')
    .addSubcommand((sub) =>
      sub
        .setName("setup")
        .setDescription('setup')
        .addChannelOption((option) =>
          option
            .setName("channel")
            .setDescription("Chanel untuk pesan booster")
            .setRequired(true)
        )
    )
    .addSubcommand((sub) =>
      sub.setName("test").setDescription("Test embed booster")
    )
    .addSubcommand((sub) =>
      sub.setName("status").setDescription("Lihat konfigurasi booster")
    ),
  permissions: PermissionFlagsBits.Administrator,
  async execute(interaction) {
    if (!interaction.inGuild()) {
      return interaction.reply({
        content: "Command ini hanya bisa digunakan di server",
        ephemeral: true,
      });
    }

    if (!interaction.memberPermissions.has(PermissionFlagsBits.Administrator)) {
      return interaction.reply({
        content: "Command ini hanya bisa digunakan oleh **Administrator**.",
        ephemeral: true,
      });
    }

    const sub = interaction.options.getSubcommand();

    switch (sub) {
      case "setup":
        return handleBoosterSetup(interaction);
      case "test":
        await interaction.deferReply({
            ephemeral: true,
        });
        await handleBooster(interaction.member, interaction.member);

        return interaction.editReply({
            content: "succes test booster",
            ephemeral: true,
        });
      default:
        return await interaction.reply({
          content: "command tidak valid",
          ephemeral: true,
        });
    }
  },
};
