import {ChannelType, PermissionFlagsBits, SlashCommandBuilder} from "discord.js";
import {deleteWelcome, setupWelcome, statusWelcome} from "../services/welcome.js";

export default {
  data: new SlashCommandBuilder()
    .setName("welcome")
    .setDescription("Setup Welcome")
    .addSubcommand(sub =>
      sub
        .setName("status")
        .setDescription("Check Status Welcome")
    )
    .addSubcommand(sub =>
      sub
        .setName("turn-on")
        .setDescription("Set Where Channel To Sent")
        .addChannelOption(option =>
          option
            .setName("channel")
            .setDescription("Set The Channel For Welcome")
            .addChannelTypes(ChannelType.GuildText)
            .setRequired(true)
        )
    )
    .addSubcommand(sub =>
      sub
        .setName("turn-off")
        .setDescription("Turn off welcome feature")
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

        await setupWelcome({guildId, channelId, status});

        return interaction.editReply({
          content: `Setup Telah Dibuat Di Channel ${targetChannel.name}`,
          ephemeral: true,
        });
      case "turn-off":
        await interaction.deferReply({
          content: "Permintaan Sedang Diproses...",
          ephemeral: true,
        });

        await deleteWelcome({guildId});

        return interaction.editReply({
          content: `Setup Telah Dihapus`,
          ephemeral: true,
        });
      case "status":
        const result = await statusWelcome({guildId});

        return interaction.reply({
          content: `Fitur Welcome Sedang ${result? "Aktif": "Tidak Aktif"}`,
          ephemeral: true,
        });
    }



  },
};