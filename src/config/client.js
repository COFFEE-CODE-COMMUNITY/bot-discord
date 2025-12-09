import { Client, Events, GatewayIntentBits } from "discord.js";

const createClient = () => {
    const client = new Client({intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages]})


    client.once(Events.ClientReady, (readyClient) => {
	    console.log(`Ready! Logged in as ${readyClient.user.tag}`);
    });


    return client
}

export {
    createClient
}