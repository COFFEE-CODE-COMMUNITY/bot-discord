import {
  ActionRowBuilder,
  ButtonStyle,
  ChannelType,
  EmbedBuilder,
  PermissionFlagsBits,
  SlashCommandBuilder, StringSelectMenuBuilder
} from "discord.js";
import {statData} from "../context/memberUpdate/statsServer.js";
import {getCategoryByGuildId} from "../services/statsServer.js";

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

    switch (options) {
      case "create":
        statData.set(interaction.user.id, {
          guildId: guildId,
          roles: [],
          categoryName: "",
          discordCategoryId: null,
          channels: []
        });

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
          components: [listRoles],
          ephemeral: true,
        });
      case "delete": {
        const categories = await getCategoryByGuildId({guildId});

        if (!categories.length) {
          return interaction.reply({
            content: "Tidak ada stats category yang bisa dihapus",
            ephemeral: true,
          });
        }

        const options = categories
          .map(catId => {
            const channel = interaction.guild.channels.cache.get(catId);
            if (!channel) return null;

            return {
              label: channel.name,
              value: channel.id,
              description: `Category ID: ${channel.id}`,
            };
          })
          .filter(Boolean);

        const row = new ActionRowBuilder().addComponents(
          new StringSelectMenuBuilder()
            .setCustomId("stats-server-delete:category")
            .setPlaceholder("Pilih category stats")
            .addOptions(options)
        );

        const embed = new EmbedBuilder()
          .setTitle("Delete Stats Server")
          .setDescription("Pilih category stats yang ingin dihapus")
          .setColor(0xED4245);

        return interaction.reply({
          embeds: [embed],
          components: [row],
          ephemeral: true,
        });
      }
    }
  }
};

