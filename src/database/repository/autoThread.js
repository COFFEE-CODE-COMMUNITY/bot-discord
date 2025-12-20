import { pool } from "../index.js";
import { v4 as uuid } from "uuid";

const addChannelAutoThreadRepository = async (guildId, channelId) => {

    const query = {
        text: `INSERT INTO auto_threads (id, guild_id, channel_id) VALUES ($1, $2, $3)`,
        values : [uuid(), guildId, channelId]
    };

    await pool.query(query);

};

const isChannelAutoThreadRepository = async (channelId) => {
    const query = {
        text: `SELECT channel_id FROM auto_threads WHERE channel_id = $1`,
        values: [channelId]
    };

    const result = await pool.query(query);
    return result.rowCount >= 1;
};

const removeChannelAutoThreadRepository = async (chanelId) => {
    const query = {
        text: `DELETE FROM auto_threads WHERE channel_id = $1`,
        values: [chanelId]
    };

    await pool.query(query);
}; 

const listChannelAutoThreadRepository = async (guildId) => {
    const query = {
        text: `SELECT channel_id FROM auto_threads WHERE guild_id = $1`,
        values: [guildId]
    };

    const result = await pool.query(query);
    console.log(result.rows.map(r => r.channel_id));
    console.log(result.rows);
    return result.rows.map(r => r.channel_id);
};

export {
    addChannelAutoThreadRepository,
    isChannelAutoThreadRepository,
    removeChannelAutoThreadRepository,
    listChannelAutoThreadRepository
};
