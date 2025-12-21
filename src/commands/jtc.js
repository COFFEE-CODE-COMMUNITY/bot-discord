import { ChannelType, PermissionFlagsBits, SlashCommandBuilder } from "discord.js";
import { handleJtcList, handleJtcRemove, handleJtcSetup } from "../context/interactions/slash/jtc.js";

export default {
  data: new SlashCommandBuilder()
    .setName("jtc")
    .setDescription("join to create feature")
    .addSubcommand((sub) =>
      sub
        .setName("setup")
        .setDescription("setup")
        .addChannelOption((option) =>
          option
            .setName("category")
            .setDescription("Category untuk join to create")
            .addChannelTypes(ChannelType.GuildCategory)
            .setRequired(true)
        )
    )
    .addSubcommand((sub) =>
      sub
        .setName("remove")
        .setDescription("remove")
        .addChannelOption((option) =>
          option
            .setName("category")
            .addChannelTypes(ChannelType.GuildCategory)
            .setDescription("Category untuk diremove")
            .setRequired(true)
        )
    )
    .addSubcommand((sub) =>
      sub.setName("list").setDescription("list category yang jtc")
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
        case 'setup':
            return handleJtcSetup(interaction);
        case 'remove':
            return handleJtcRemove(interaction);
        case 'list':
            return handleJtcList(interaction);
        default:
        return await interaction.reply({
          content: "command tidak valid",
          ephemeral: true,
        });
    }
  },
};
