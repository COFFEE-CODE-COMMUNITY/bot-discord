import {
  ActionRowBuilder,
  ChannelType, EmbedBuilder,
  PermissionFlagsBits,
  SlashCommandBuilder,
  StringSelectMenuBuilder
} from "discord.js";
import {takeRoleState} from "../services/takeRole.js";
import {findAllEmbedByGuildId} from "../database/repository/takeRole.js";

export default {
  data: new SlashCommandBuilder()
    .setName("take-role")
    .setDescription("Embed for take roles in server")
    .addSubcommand( sub =>
      sub
        .setName("create")
        .setDescription("Create new custom embed role")
    )
    .addSubcommand( sub =>
      sub
        .setName("delete")
        .setDescription("Delete selected embed role")
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
        const roles = interaction.guild.roles.cache.filter(role => role.name.includes("C3"));

        const listRoles = new ActionRowBuilder().addComponents(
          new StringSelectMenuBuilder()
            .setCustomId("take-role-select:roles")
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
          .setTitle("Take Role")
          .setDescription("Silahkan Masukkan Role...")
          .setColor(3447003);

        takeRoleState.set(interaction.user.id, {
          roles,
          createdAt: Date.now(),
        });

        return await interaction.reply({
          embeds: [embed],
          components: [listRoles],
          ephemeral: true,
        });
      case "delete":
        const embeds = await findAllEmbedByGuildId({ guildId });

        if (!embeds || embeds.length === 0) {
          return interaction.reply({
            content: "Belum ada take role embed yang dibuat.",
            ephemeral: true,
          });
        }

        const select = new StringSelectMenuBuilder()
          .setCustomId("take-role-delete:select")
          .setPlaceholder("Pilih embed yang akan dihapus")
          .setMinValues(1)
          .setMaxValues(1)
          .addOptions(
            embeds.map(embed => ({
              label: embed.title || `Embed #${embed.id}`,
              description: `Channel ID: ${embed.channel_id}`,
              value: embed.id,
            }))
          );

        const row = new ActionRowBuilder().addComponents(select);

        const embedInfo = new EmbedBuilder()
          .setTitle("Hapus Take Role")
          .setDescription("Pilih embed take role yang ingin dihapus.")
          .setColor(0xed4245);

        return interaction.reply({
          embeds: [embedInfo],
          components: [row],
          ephemeral: true,
        });
    }
  }
};