import { addChannelAutoThreadRepository, isChannelAutoThreadRepository, listChannelAutoThreadRepository, removeChannelAutoThreadRepository } from "../database/repository/autoThread.js";
import { AppError } from "../error/appError.js";

const addChannelAutoThreadService = async (guildId, channelId) => {
    if(await isChannelAutoThreadRepository(channelId)) {
        throw new AppError('Channel sudah di registrasikan');
    }

    await addChannelAutoThreadRepository(guildId, channelId);

};
const isChannelAutoThreadService = async (channelId) => {
    return isChannelAutoThreadRepository(channelId);
};
const removeChannelAutoThreadService = async (channelId) => {
    if(await isChannelAutoThreadRepository(channelId) == false) {
        throw new AppError('Channel yang dihapus tidak ada atau terdaftar');
    }
    await removeChannelAutoThreadRepository(channelId);
};
const listChannelAutoThreadService = async (guildId) => {
    return listChannelAutoThreadRepository(guildId);
};

export {
    addChannelAutoThreadService,
    removeChannelAutoThreadService,
    listChannelAutoThreadService,
    isChannelAutoThreadService
};