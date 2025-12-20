import fs from 'fs';
import path from 'path';
import { REST, Routes } from 'discord.js';
import { fileURLToPath, pathToFileURL } from 'url';
import { config } from '../config/config.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const registerCommands = async () => {
    const commands = [];
    const commandPath = path.join(__dirname, '../commands');
    const commandFiles = fs.readdirSync(commandPath).filter(f => f.endsWith('.js'));
    for (const file of commandFiles) {
        const filePath = path.join(commandPath, file);
        const fileUrl = pathToFileURL(filePath).href;
        const command = (await import(fileUrl)).default;
        commands.push(command.data.toJSON());
    }

    const rest = new REST({version: '10'}).setToken(config.BOT_DISCORD_TOKEN);

    try {
        console.log(`🔁 Registering slash commands (${config.NODE_ENV})...`);

        if(config.NODE_ENV == 'production') {
            await rest.put(
                Routes.applicationCommands(config.CLIENT_ID),
                {body : commands}
            );
        } else {
            await rest.put(
                Routes.applicationGuildCommands(
                    config.CLIENT_ID,
                    config.CLIENT_GUILD
                ),
                {body: commands}
            );
        }

        console.log('Command Registered');
    } catch (error) {
        console.error(error);
    }
};

export {
    registerCommands
};