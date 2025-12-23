import {ChannelType, PermissionFlagsBits, SlashCommandBuilder} from "discord.js";
import {deleteInvite, setupInvite, statusInvite} from "../services/inviteTracker.js";

export default {
  data: new SlashCommandBuilder()
    .setName("invite-tracker")
    .setDescription("Setup invite tracker")
    .addSubcommand(sub =>
      sub
        .setName("status")
        .setDescription("Check status invite tracker")
    )
    .addSubcommand(sub =>
      sub
        .setName("turn-on")
        .setDescription("Set where channel to sent")
        .addChannelOption(option =>
          option
          .setName("channel")
          .setDescription("Set the channel to invite tracker")
          .addChannelTypes(ChannelType.GuildText)
          .setRequired(true)
        )
    )
    .addSubcommand(sub =>
      sub
        .setName("turn-off")
        .setDescription("Turn off invite tracker feature")
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
      case "turn-on":
        await interaction.deferReply({
          content: "Permintaan Sedang Diproses...",
          ephemeral: true,
        });

        const targetChannel = interaction.options.getChannel("channel");
        const status = true;
        const channelId = targetChannel.id;

        await setupInvite({guildId, channelId, status});

        return interaction.editReply({
          content: `Setup telah dibuat di channel ${targetChannel.name}`,
          ephemeral: true,
        });
      case "turn-off":
        await interaction.deferReply({
          content: "Permintaan Sedang Diproses...",
          ephemeral: true,
        });

        await deleteInvite({guildId});

        return interaction.editReply({
          content: `Setup Telah Dihapus`,
          ephemeral: true,
        });
      case "status":
        const result = await statusInvite({guildId});

        return interaction.reply({
          content: `Fitur Invite Tracker Sedang ${result? "Aktif": "Tidak Aktif"}`,
          ephemeral: true,
        });
    }
  },
};