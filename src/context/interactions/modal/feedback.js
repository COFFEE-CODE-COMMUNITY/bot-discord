import { EmbedBuilder } from "discord.js";
import { getTargetChannelFeedback } from "../../../services/feedback.js";

const handleFeedbackModal = async (interaction) => {
    await interaction.deferReply({
        ephemeral: true,
    });
    console.log(interaction.customId);

    const action = interaction.customId.split(':')[1];
    const createdAt = Math.floor(Date.now() / 1000);

    if (action === 'suggestion') {
        const content = interaction.fields.getTextInputValue('content');

        const targetChannelId = await getTargetChannelFeedback(interaction.guildId, 'suggestion');

        const targetChannel = await interaction.guild.channels.fetch(targetChannelId);

        const embed = new EmbedBuilder()
            .setTitle('New Suggestion')
            .addFields(
                {name: 'Pengirim', value: `${interaction.user}`},
                {name: 'Saran', value : content},
                {
                    name: '⏰ Waktu',
                    value: `<t:${createdAt}:R>\n<t:${createdAt}:f>`,
                    inline: true
                }
            )
            .setThumbnail(
                interaction.user.displayAvatarURL({ dynamic: true, size: 256 })
            )
            .setColor(0x3ba55d)
            .setTimestamp();

            await targetChannel.send({embeds : [embed]});

            await interaction.editReply({
                content: 'Saran kamu berhasil dikirim ke admin.',
                ephemeral: true,
            });
    }

    if (action === 'report') {
        console.log('jalan kah');
        
        const content = interaction.fields.getTextInputValue('content');

        const targetChannelId = await getTargetChannelFeedback(interaction.guildId, 'report');

        const targetChannel = await interaction.guild.channels.fetch(targetChannelId);
        const report = await interaction.guild.members.fetch(interaction.customId.split(':')[2]);

        const embed = new EmbedBuilder()
            .setTitle('User Report')
            .setThumbnail(
                interaction.user.displayAvatarURL({ dynamic: true, size: 256 })
            )
            .addFields(
                {
                    name: 'Pelapor',
                    value: `User : ${interaction.user}\n Id : ${interaction.user.id}`,
                },
                {
                    name: 'Terlapor',
                    value: `User : ${report}\n Id : ${report.id}`,
                },

                { name: 'Isi Laporan', value : content},
                {
                    name: '⏰ Waktu',
                    value: `<t:${createdAt}:R>\n<t:${createdAt}:f>`,
                    inline: true
                }
            )
            .setColor(0xed4245)
            .setTimestamp();

            await targetChannel.send({embeds : [embed]});

            await interaction.editReply({
                content: 'Laporan kamu berhasil dikirim ke admin.',
                ephemeral: true,
            });
    }

    if (action === 'bug') {
        const content = interaction.fields.getTextInputValue('content');

        const targetChannelId = await getTargetChannelFeedback(interaction.guildId, 'bug');

        const targetChannel = await interaction.guild.channels.fetch(targetChannelId);

        const embed = new EmbedBuilder()
            .setTitle('New Bug')
            .addFields(
                {name: 'Pengirim', value: `${interaction.user}`},
                {name: 'Isi Bug', value : content},
                {
                    name: '⏰ Waktu',
                    value: `<t:${createdAt}:R>\n<t:${createdAt}:f>`,
                    inline: true
                }
            )
            .setThumbnail(
                interaction.user.displayAvatarURL({ dynamic: true, size: 256 })
            )
            .setColor(0xfee75c)
            .setTimestamp();

            await targetChannel.send({embeds : [embed]});

            await interaction.editReply({
                content: 'Bug kamu berhasil dikirim ke admin.',
                ephemeral: true,
            });
    }


};

export {
    handleFeedbackModal
};