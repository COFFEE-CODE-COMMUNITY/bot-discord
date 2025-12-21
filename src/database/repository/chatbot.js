import { pool } from "../index.js";

const upsertConfigChatbotRepository = async (guildId, channelId) => {
    const query = {
            text: `INSERT INTO chatbot_config (guild_id, channel_id) VALUES ($1, $2) ON CONFLICT (guild_id) DO UPDATE SET channel_id = EXCLUDED.channel_id`,
            values: [guildId, channelId]
        };

    await pool.query(query);
};

const removeChatbotRepository = async (guildId) => {
    const query = {
            text: `DELETE FROM chatbot_config WHERE guild_id = $1`,
            values: [guildId]
        };

    await pool.query(query);
};

const getConfigChatbotRepository = async (guildId) => {
    const query = {
            text: `SELECT guild_id, channel_id FROM chatbot_config WHERE guild_id = $1`,
            values: [guildId]
        };
    
    const result = await pool.query(query);
    return result.rows[0];
};

export {
    upsertConfigChatbotRepository,
    removeChatbotRepository,
    getConfigChatbotRepository
};
