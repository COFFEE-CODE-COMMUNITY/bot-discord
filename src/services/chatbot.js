import {
  getConfigChatbotRepository,
  removeChatbotRepository,
  upsertConfigChatbotRepository,
} from "../database/repository/chatbot.js";
import {
  CTHREEBOT_RULES_PROMPT,
  CTHREEBOT_CONTEXT_PROMPT,
} from "../utils/chatbotPrompt.js";
import { openai } from "../utils/openai.js";
import { needsC3Context } from "../utils/chatbotContext.js";

const upsertConfigChatbotService = async (guildId, channelId) => {
  await upsertConfigChatbotRepository(guildId, channelId);
};
const removeChatbotService = async (guildId) => {
  await removeChatbotRepository(guildId);
};
const getConfigChatbotService = async (guildId) => {
  return getConfigChatbotRepository(guildId);
};

const generateReply = async (message) => {
  try {
    const messages = [
      {
        role: "system",
        content: CTHREEBOT_RULES_PROMPT,
      },
    ];

    // ⛽ inject context hanya kalau perlu
    if (needsC3Context(message)) {
      messages.push({
        role: "system",
        content: CTHREEBOT_CONTEXT_PROMPT,
      });
    }

    messages.push({
      role: "user",
      content: message,
    });

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages,
      max_tokens: 200,
      temperature: 0.7,
    });

    return response.choices[0].message.content;
  } catch (err) {
    console.error("Chatbot error:", err);
    return "⚠️ Maaf, cthreebot sedang mengalami gangguan.";
  }
};

export {
  upsertConfigChatbotService,
  removeChatbotService,
  getConfigChatbotService,
  generateReply,
};
