import { PermissionFlagsBits, SlashCommandBuilder } from "discord.js";
import { handleListChannelAutoThread, handleRemoveAutoThread, handleSetupAutoThread } from "../context/interactions/slash/autoThread.js";

export default {
  data: new SlashCommandBuilder()
    .setName("auto-thread")
    .setDescription("auto thread feature")
    .addSubcommand((sub) =>
      sub
        .setName("setup")
        .setDescription("setup")
        .addChannelOption((option) =>
          option
            .setName("channel")
            .setDescription("Chanel untuk auto thread")
            .setRequired(true)
        )
    )
    .addSubcommand((sub) =>
      sub
        .setName("remove")
        .setDescription("remove")
        .addChannelOption((option) =>
          option
            .setName("channel")
            .setDescription("Chanel untuk diremove")
            .setRequired(true)
        )
    )
    .addSubcommand((sub) =>
      sub.setName("list").setDescription("list channel yang auto threads")
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
        return handleSetupAutoThread(interaction);
      case "remove":
        return handleRemoveAutoThread(interaction);
      case "list":
        return handleListChannelAutoThread(interaction);
      default:
        return await interaction.reply({
          content: "command tidak valid",
          ephemeral: true,
        });
    }
  },
};
