import { Events } from "discord.js";
import { isChannelAutoThreadService } from "../services/autoThread.js";
import { handleAutoThread } from "../context/message/autoThread.js";

export default {
    name: Events.MessageCreate,
    async execute(message) {
        if (message.author.bot) return;
        const isAutoThread = await isChannelAutoThreadService(message.channelId);
        if(isAutoThread) {
            return handleAutoThread(message);
        }
    },
};