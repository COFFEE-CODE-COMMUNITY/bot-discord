import { createClient } from "./config/client.js";
import dotenv from "dotenv"
dotenv.config()

const client = createClient();

client.login(process.env.BOT_DISCORD_TOKEN)