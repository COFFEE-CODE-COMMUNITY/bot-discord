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

    const guildId = interaction.guildId;
    const options = interaction.options.getSubcommand();

    switch (options) {
      case "turn-on":
        const targetChannel = interaction.options.getChannel("channel");
        const status = true;

        await setupInvite({guildId, targetChannel, status});

        return interaction.reply({
          content: `Setup telah dibuat di channel ${targetChannel.name}`,
          ephemeral: true,
        });
      case "turn-off":
        await deleteInvite({guildId});

        return interaction.reply({
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