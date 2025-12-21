import { getBoosterChannelRepository, setupBoosterRepository } from "../database/repository/booster.js";

const setupBoosterService = async (guildId, channelId) => {
    await setupBoosterRepository(guildId, channelId);
};

const getBoosterChannelService = async (guildId) => {
    return getBoosterChannelRepository(guildId);
};

export {
    setupBoosterService,
    getBoosterChannelService
};