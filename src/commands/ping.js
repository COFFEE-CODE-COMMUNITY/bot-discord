import { SlashCommandBuilder } from "discord.js";

export default {
    data: new SlashCommandBuilder().setName('ping').setDescription('Cek Bot Latency'),
    async execute(interaction) {
        await interaction.reply('pong');
    }
};