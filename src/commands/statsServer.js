import {
  ActionRowBuilder,
  ButtonStyle,
  ChannelType,
  EmbedBuilder,
  PermissionFlagsBits,
  SlashCommandBuilder, StringSelectMenuBuilder
} from "discord.js";
import {ButtonBuilder} from "@discordjs/builders";

export default {
  data: new SlashCommandBuilder()
    .setName("stats-server")
    .setDescription("Stats info for roles in server")
    .addSubcommand( sub =>
      sub
        .setName("create")
        .setDescription("Create new channel and category")
    )
    .addSubcommand( sub =>
      sub
        .setName("delete")
        .setDescription("Delete selected category")
        .addChannelOption(opt =>
          opt
            .setName("category")
            .setDescription("Delete this category")
            .setRequired(true)
            .addChannelTypes(ChannelType.GuildCategory)
        )
    ),
  permissions: PermissionFlagsBits.Administrator,
  async execute(interaction) {
    if (!interaction.inGuild()) {
      return interaction.reply({
        content: "Slash Command Hanya Bisa Digunakan Didalam Server",
        ephemeral: true,
      });
    }

    const guildId = interaction.guild.id;
    const options = interaction.options.getSubcommand();

    const buttonRow = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId("stats-server-btn:next")
        .setLabel("Next")
        .setStyle(ButtonStyle.Primary),
      new ButtonBuilder()
        .setCustomId("stats-server-btn:cancel")
        .setLabel("Cancel")
        .setStyle(ButtonStyle.Secondary),
    );

    switch (options) {
      case "create":
        const roles = interaction.guild.roles.cache.filter(role => role.name.includes("C3"));

        const listRoles = new ActionRowBuilder().addComponents(
          new StringSelectMenuBuilder()
            .setCustomId("stats-server-select:roles")
            .setPlaceholder("Pilih Role...")
            .setMinValues(1)
            .setMaxValues(roles.size)
            .setOptions(
              roles.map(role => ({
                label: role.name,
                value: role.id
              }))
            )
        );
        const embed = new EmbedBuilder()
          .setTitle("Stats Server")
          .setDescription("Silahkan Masukkan Role...")
          .setColor(3447003);

        return await interaction.reply({
          embeds: [embed],
          components: [listRoles, buttonRow],
          ephemeral: true,
        });
      case "delete":
        break;
    }
  }
};

