import { setupBoosterRepository } from "../database/repository/booster.js";

const setupBoosterService = async (guildId, channelId) => {
    await setupBoosterRepository(guildId, channelId);
};

export {
    setupBoosterService
};