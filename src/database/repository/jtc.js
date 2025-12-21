import { pool } from "../index.js";
import { v4 as uuid } from "uuid";

const createJtcRepository = async (guildId, channelTriggerId, categoryId) => {
    const query = {
        text: `INSERT INTO join_to_create (id, guild_id, trigger_channel_id, category_id) VALUES ($1, $2, $3, $4)`,
        values: [uuid(), guildId, channelTriggerId, categoryId]
    };

    await pool.query(query);
};

const isCategoryJtcRepository = async (categoryId) => {
    const query = {
        text: `SELECT category_id FROM join_to_create WHERE category_id = $1 `,
        values: [categoryId]
    };

    const result = await pool.query(query);
    console.log(result.rowCount);
    return result.rowCount >= 1;
};

const removeByCategoryIdJtcRepository = async (categoryId) => {
    const query = {
        text: `DELETE FROM join_to_create WHERE category_id = $1 RETURNING trigger_channel_id`,
        values: [categoryId]
    };

    const result = await pool.query(query);
    return result.rows[0].trigger_channel_id;
};

const listCategoryJtcRepository= async (guildId) => {
    const query = {
        text: `SELECT category_id FROM join_to_create WHERE guild_id = $1`,
        values: [guildId]
    };

    const result = await pool.query(query);
    return result.rows.map(r => r.category_id);
};

const findByTriggerChannelJtcRepository = async (triggerChannelId) => {
    const query = {
        text: `SELECT trigger_channel_id, category_id FROM join_to_create WHERE trigger_channel_id = $1`,
        values: [triggerChannelId]
    };

    const result = await pool.query(query);
    return result.rows.map(r => ({triggerChannelId: r.trigger_channel_id, categoryId: r.category_id}))[0] ?? null;
};

const saveJtcChannelRepository = async (channelId, guildId, ownerId) => {
    const query = {
        text: `INSERT INTO jtc_channels (channel_id, guild_id, owner_id) VALUES ($1, $2, $3)`,
        values: [channelId, guildId, ownerId]
    };

    await pool.query(query);
};

const isJtcChannelRepository = async (channelId) => {
    const query = {
        text: `SELECT channel_id FROM jtc_channels WHERE channel_id = $1`,
        values: [channelId]
    };

    const result = await pool.query(query);
    console.log(result.rows.map(r => r.channel_id));
    return result.rows.map(r => r.channel_id)[0];
}; 

const removeJtcChannelRepository = async (channelId) => {
    const query = {
        text: `DELETE FROM jtc_channels WHERE channel_id = $1`,
        values: [channelId]
    };

    await pool.query(query);
};


export {
    createJtcRepository,
    isCategoryJtcRepository,
    removeByCategoryIdJtcRepository,
    listCategoryJtcRepository,
    findByTriggerChannelJtcRepository,
    saveJtcChannelRepository,
    isJtcChannelRepository,
    removeJtcChannelRepository
};