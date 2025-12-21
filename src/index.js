import { client } from "./client/client.js";
import { config } from "./config/config.js";
import './handlers/eventHandler.js';
import './handlers/commandHandler.js';

// setInterval(() => {
//   const used = process.memoryUsage();
//   console.log({
//     rss: `${(used.rss / 1024 / 1024).toFixed(2)} MB`,
//     heapTotal: `${(used.heapTotal / 1024 / 1024).toFixed(2)} MB`,
//     heapUsed: `${(used.heapUsed / 1024 / 1024).toFixed(2)} MB`
//   });
// }, 5000);

client.login(config.BOT_DISCORD_TOKEN);