import { statData } from "../../memberUpdate/statsServer.js";
import { ChannelType } from "discord.js";
import { saveStatsServer } from "../../../services/statsServer.js";

const handleStatModal = async (interaction) => {
  if (interaction.customId.split(":")[0] !== "stats-server-modal") return;

  const data = statData.get(interaction.user.id);
  if (!data) return;

  await interaction.deferReply({
    content: "Permintaan sedang diproses...",
    ephemeral: true,
  });

  data.categoryName = interaction.fields.getTextInputValue("content");

  const category = await interaction.guild.channels.create({
    name: data.categoryName,
    type: ChannelType.GuildCategory,
  });

  await interaction.guild.members.fetch();

  data.discordCategoryId = category.id;

  for (const roleId of data.roles) {
    const role = interaction.guild.roles.cache.get(roleId);
    if (!role) continue;

    const total = interaction.guild.members.cache.filter(member =>
      member.roles.cache.has(roleId)
    ).size;

    const channel = await interaction.guild.channels.create({
      name: `${role.name}: ${total}`,
      type: ChannelType.GuildVoice,
      parent: data.discordCategoryId,
      permissionOverwrites: [
        {
          id: interaction.guild.roles.everyone.id,
          deny: ["Connect"],
        },
      ],
    });

    data.channels.push({
      roleId,
      channelId: channel.id,
    });
  }

  await saveStatsServer({
    guildId: interaction.guild.id,
    discordCategoryId: data.discordCategoryId,
    channels: data.channels,
  });

  statData.delete(interaction.user.id);

  return await interaction.editReply({
    content: "Permintaan sukses diproses!",
    ephemeral: true,
  });
};

export {
  handleStatModal,
};
