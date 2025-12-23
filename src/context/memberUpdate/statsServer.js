import { client } from "../../client/client.js";
import { getAllStats } from "../../database/repository/statsServer.js";

let statData = new Map();

const lastStatsCount = new Map();
const SIX_MINUTES = 6 * 60 * 1000;

const rename = async () => {
  const stats = await getAllStats();
  if (!stats.length) return;

  const grouped = new Map();
  for (const stat of stats) {
    if (!grouped.has(stat.guild_id)) {
      grouped.set(stat.guild_id, []);
    }
    grouped.get(stat.guild_id).push(stat);
  }

  for (const [guildId, guildStats] of grouped.entries()) {
    const guild = client.guilds.cache.get(guildId);
    if (!guild) continue;

    await guild.members.fetch();

    for (const stat of guildStats) {
      const role = guild.roles.cache.get(stat.role_id);
      const channel = guild.channels.cache.get(stat.channel_id);
      if (!role || !channel) continue;

      const total = guild.members.cache.filter(m =>
        m.roles.cache.has(stat.role_id)
      ).size;

      const key = `${guildId}:${stat.role_id}`;
      if (lastStatsCount.get(key) === total) continue;

      await channel.setName(`${role.name}: ${total}`);
      lastStatsCount.set(key, total);
    }
  }
};

const statsScheduler = () => {
  setInterval(async () => {
    try {
      await rename();
    } catch (err) {
      console.error("Stats rename error:", err);
    }
  }, SIX_MINUTES);
};

export {
  statData,
  statsScheduler,
};