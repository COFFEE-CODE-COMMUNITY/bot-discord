import dotenv from "dotenv";
dotenv.config();

export const config = {
    NODE_ENV: process.env.NODE_ENV,
    BOT_DISCORD_TOKEN: process.env.BOT_DISCORD_TOKEN,
    CLIENT_GUILD: process.env.CLIENT_GUILD,
    CLIENT_ID: process.env.CLIENT_ID,
    DATABASE_URL: process.env.DATABASE_URL,
    SUMO_API_KEY: process.env.SUMO_API_KEY,
    SUMO_BASE_URL: process.env.SUMO_BASE_URL
};