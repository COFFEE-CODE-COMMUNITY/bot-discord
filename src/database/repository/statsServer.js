import { pool } from "../index.js";

const insertStat = async ({guildId, roleId, channelId, discordCategory }) => {
  const query = {
    text: `
      INSERT INTO stats_config (guild_id, role_id, channel_id, discord_category)VALUES ($1, $2, $3, $4) 
          ON CONFLICT (guild_id, role_id) DO UPDATE SET channel_id = EXCLUDED.channel_id, discord_category = EXCLUDED.discord_category
    `,
    values: [guildId, roleId, channelId, discordCategory],
  };

  await pool.query(query);
};

const getByCategory = async ({guildId, discordCategory}) => {
  const query = {
    text: `SELECT role_id, channel_id FROM stats_config WHERE guild_id = $1 AND discord_category = $2`,
    values: [guildId, discordCategory],
  };

  const result = await pool.query(query);
  return result.rows;
};

const deleteByCategory = async ({guildId, discordCategory,}) => {
  const query = {
    text: `DELETE FROM stats_config WHERE guild_id = $1 AND discord_category = $2`,
    values: [guildId, discordCategory],
  };

  await pool.query(query);
};

const getAllStats = async () => {
  const query = {
    text: `SELECT guild_id, role_id, channel_id FROM stats_config`,
  };

  const result = await pool.query(query);
  return result.rows;
};

const getCategoriesByGuild = async (guildId) => {
  const query = {
    text: `SELECT DISTINCT discord_category FROM stats_config WHERE guild_id = $1`,
    values: [guildId],
  };

  const result = await pool.query(query);
  return result.rows.map(r => r.discord_category);
};


export {
  insertStat,
  getByCategory,
  deleteByCategory,
  getAllStats,
  getCategoriesByGuild,
};
