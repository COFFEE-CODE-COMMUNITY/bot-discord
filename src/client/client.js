import { Client, Events, GatewayIntentBits } from "discord.js";

const createClient = () => {
  const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildVoiceStates],
  });

  return client;
};

const client = createClient();

export {
    client
};
