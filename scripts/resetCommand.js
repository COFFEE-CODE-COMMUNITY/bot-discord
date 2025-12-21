import 'dotenv/config';
import { REST, Routes } from 'discord.js';

const rest = new REST({ version: '10' }).setToken(process.env.BOT_DISCORD_TOKEN);

const CLIENT_ID = process.env.CLIENT_ID;
const GUILD_ID = process.env.CLIENT_GUILD;

(async () => {
  try {
    console.log('🧹 RESET ALL COMMANDS STARTED');

    // ===============================
    // 1️⃣ RESET GUILD COMMANDS
    // ===============================
    if (GUILD_ID) {
      console.log('➡️ Clearing GUILD commands...');
      await rest.put(
        Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID),
        { body: [] }
      );
      console.log('✅ Guild commands cleared');
    }

    // ===============================
    // 2️⃣ RESET GLOBAL COMMANDS
    // ===============================
    console.log('➡️ Clearing GLOBAL commands...');
    await rest.put(
      Routes.applicationCommands(CLIENT_ID),
      { body: [] }
    );
    console.log('✅ Global commands cleared');

    console.log('🎉 ALL COMMANDS RESET — BOT IS CLEAN (0)');
  } catch (error) {
    console.error('❌ RESET FAILED:', error);
  }
})();
