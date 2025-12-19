import { Events } from "discord.js";
import { registerCommands } from "../services/registerCommand.js";
import { initInvite } from "../utils/inviteCache.js";
import { client } from "../client/client.js";

export default {
    name: Events.ClientReady,
    once: true,
    async execute() {
        console.log(`Ready! Logged in as ${client.user.tag}`);
        await registerCommands();
        await initInvite();
    },
};