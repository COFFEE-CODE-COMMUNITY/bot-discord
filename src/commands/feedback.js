import { ActionRowBuilder, ButtonBuilder, EmbedBuilder } from "@discordjs/builders";
import { ButtonStyle, ChannelType, PermissionFlagsBits, SlashCommandBuilder } from "discord.js";
import { setupFeedback } from "../services/feedback.js";

export default {
    data: new SlashCommandBuilder()
        .setName('feedback')
        .setDescription('Setup panel feedback untuk server')
        .addSubcommand(sub => 
            sub
            .setName('setup')
            .setDescription('kirim chanel feedback ke chanel ini')
            .addChannelOption(option =>
                option
                .setName('panel')
                .setDescription('Tempat panel dikirim')
                .addChannelTypes(ChannelType.GuildText)
                .setRequired(true)
            )
            .addChannelOption(option =>
                option
                .setName('suggestion')
                .setDescription('Chanel output saran')
                .addChannelTypes(ChannelType.GuildText)
                .setRequired(true)
            )
            .addChannelOption(option =>
                option
                .setName('report')
                .setDescription('Chanel output report')
                .addChannelTypes(ChannelType.GuildText)
                .setRequired(true)
            )
            .addChannelOption(option =>
                option
                .setName('bug')
                .setDescription('Chanel output bug')
                .addChannelTypes(ChannelType.GuildText)
                .setRequired(true)
            )
        ),
    permissions: PermissionFlagsBits.Administrator,
    async execute (interaction) {
        if(!interaction.inGuild()) {
            return interaction.reply({
                content: 'Command ini hanya bisa digunakan di server',
                ephemeral: true
            });
        }

        const panelChannel = interaction.options.getChannel('panel');
        const suggestionChannel = interaction.options.getChannel('suggestion');
        const reportChannel = interaction.options.getChannel('report');
        const bugChannel = interaction.options.getChannel('bug');


        await setupFeedback({guildId: interaction.guildId, panelChannelId: panelChannel.id, suggestionChannelId: suggestionChannel.id, reportChannelId:reportChannel.id, bugChannelId: bugChannel.id });


        if(!panelChannel.isTextBased()) {
            return interaction.reply({
                content: 'Channel yang dipilih harus text channel',
                ephemeral: true
            });
        }

        const embed = new EmbedBuilder()
            .setTitle('Feedback Center')
            .setDescription(
                'Kami terbuka untuk semua **masukan, laporan, dan bug** demi kenyamanan server.\n\n' +
                'Silakan pilih jenis pesan yang ingin kamu kirim dengan tombol di bawah.'
            )
            .setColor(0x5865f2)
            .setFooter({
                text: 'Pesan bersifat private & hanya dilihat admin'
            });

            const row = new ActionRowBuilder().addComponents(
                new ButtonBuilder()
                    .setCustomId('feedback-btn:suggestion')
                    .setLabel('Saran')
                    .setStyle(ButtonStyle.Primary)
                ,
                new ButtonBuilder()
                    .setCustomId('feedback-btn:report')
                    .setLabel('Report')
                    .setStyle(ButtonStyle.Danger)
                ,
                new ButtonBuilder()
                    .setCustomId('feedback-btn:bug')
                    .setLabel('Bug')
                    .setStyle(ButtonStyle.Secondary)
            );

            await panelChannel.send({
                embeds: [embed],
                components: [row]
            });

            await interaction.reply({
                content: 
                    'Feedback system berhasil disetup:\n' +
                    `• Panel  → ${panelChannel} \n` +
                    `• Saran  → ${suggestionChannel} \n` +
                    `• Report → ${reportChannel} \n` +
                    `• Bug    → ${bugChannel} \n`,
                ephemeral: true
            });
    }
};