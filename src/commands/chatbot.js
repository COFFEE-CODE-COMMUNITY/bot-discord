import { PermissionFlagsBits, SlashCommandBuilder } from "discord.js";
import { handleChatbot } from "../context/interactions/slash/chatbot.js";

export default {
  data: new SlashCommandBuilder()
    .setName("chatbot")
    .setDescription('setup chatbot')
    .addSubcommand((sub) =>
      sub
        .setName("setup")
        .setDescription('setup')
        .addChannelOption((option) =>
          option
            .setName("channel")
            .setDescription("Chanel untuk chatbot")
            .setRequired(true)
        )
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
        return handleChatbot(interaction);
      default:
        return await interaction.reply({
          content: "command tidak valid",
          ephemeral: true,
        });
    }
  },
};
