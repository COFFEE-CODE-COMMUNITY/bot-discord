import { Events } from "discord.js";
import { isChannelAutoThreadService } from "../services/autoThread.js";
import { handleAutoThread } from "../context/message/autoThread.js";
import { getConfigChatbotService } from "../services/chatbot.js";
import { handleChatbotMessage } from "../context/message/chatbot.js";

export default {
    name: Events.MessageCreate,
    async execute(message) {
        if (message.author.bot) return;
        const isAutoThread = await isChannelAutoThreadService(message.channelId);
        if(isAutoThread) {
            return handleAutoThread(message);
        }
        const configChatbot = await getConfigChatbotService(message.guildId);
        if(configChatbot && message.channelId == configChatbot.channel_id) {
            return handleChatbotMessage(message);
        }
    },
};