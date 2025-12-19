import {pool} from "../index.js";

const saveConfig = async ({
  guildId,
  channelId,
  status,
}) => {
  const query = {
    text: `INSERT INTO invite_config (guild_id, channel_id, status)
           VALUES ($1, $2, $1) ON CONFLICT (guild_id) DO UPDATE SET channel_id = EXCLUDED.channel_id, status = EXCLUDED.status;`,
    values: [guildId, channelId, status]
  };
  await pool.query(query);
};

const getAll = async () => {
  const query = {
    text: `SELECT * FROM invite_config`,
  };
  const result = await pool.query(query);
  return result.rows[0] ?? null;
};

const turnOff = async ({guildId}) => {
  const query = {
    text: `DELETE FROM invite_config WHERE guild_id = $1`,
    values: [guildId],
  };
  await pool.query(query);
};

export {
  saveConfig,
  getAll,
  turnOff,
};