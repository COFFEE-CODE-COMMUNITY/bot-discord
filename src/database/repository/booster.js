import { pool } from "../index.js";

const setupBoosterRepository = async (guildId, channelId) => {
    const query = {
        text: `INSERT INTO booster_config(guild_id, channel_id) VALUES ($1, $2) ON CONFLICT (guild_id ) DO UPDATE SET channel_id = EXCLUDED.channel_id`,
        values: [guildId, channelId]
    };

    await pool.query(query);
};

const getBoosterChannelRepository = async (guildId) => {
    const query = {
        text: `SELECT channel_id FROM booster_config WHERE guild_id = $1`,
        values: [guildId]
    };

    const result = await pool.query(query);
    return result.rows[0];
};

export {
    setupBoosterRepository,
    getBoosterChannelRepository
};