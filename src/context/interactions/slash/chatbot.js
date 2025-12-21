import { upsertConfigChatbotService } from "../../../services/chatbot.js";

const handleChatbot = async (interaction) => {
    const channel = interaction.options.getChannel('channel');

    await upsertConfigChatbotService(interaction.guildId, channel.id);

    return interaction.reply({
        content: `Chatbot channel berhasil diset ke ${channel}`,
        ephemeral: true,
      });
};


export {
    handleChatbot
};