import { Events } from "discord.js";
import { registerCommands } from "../services/registerCommand.js";
import { initInvite } from "../context/guildMembers/inviteTracker.js";
import { client } from "../client/client.js";
import { statsScheduler } from "../context/memberUpdate/statsServer.js";

export default {
    name: Events.ClientReady,
    once: true,
    async execute() {
        console.log(`Ready! Logged in as ${client.user.tag}`);
        await registerCommands();
        await initInvite();
        await statsScheduler();
    },
};