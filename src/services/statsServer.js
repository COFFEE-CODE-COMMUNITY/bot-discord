import {
  insertStat,
  getByCategory,
  deleteByCategory, getCategoriesByGuild,
} from "../database/repository/statsServer.js";
import {AppError} from "../error/appError.js";

const saveStatsServer = async ({guildId, discordCategoryId, channels}) => {
  for (const ch of channels) {
    await insertStat({
      guildId,
      roleId: ch.roleId,
      channelId: ch.channelId,
      discordCategory: discordCategoryId,
    });
  }
};

const deleteStatsServerByCategory = async ({guild, discordCategoryId}) => {
  const stats = await getByCategory({
    guildId: guild.id,
    discordCategory: discordCategoryId,
  });

  for (const stat of stats) {
    const channel = guild.channels.cache.get(stat.channel_id);
    if (channel) {
      await channel.delete("Delete stats server channel");
    }
  }

  const category = guild.channels.cache.get(discordCategoryId);
  if (category) {
    await category.delete("Delete stats server category");
  }

  await deleteByCategory({
    guildId: guild.id,
    discordCategory: discordCategoryId,
  });
};

const getCategoryByGuildId = async ({guildId}) => {
  if (!guildId) {
    throw new AppError("Guild ID tidak ditemukan atau hilang");
  }
  return await getCategoriesByGuild(guildId);
};

export {
  saveStatsServer,
  deleteStatsServerByCategory,
  getCategoryByGuildId,
};
