import { generateReply } from "../../services/chatbot.js";

const handleChatbotMessage = async (message) => {
    await message.channel.sendTyping();

    const reply = await generateReply(message.content);

    await message.reply(reply);
};

export {
    handleChatbotMessage
};