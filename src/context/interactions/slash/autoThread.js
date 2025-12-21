import { addChannelAutoThreadService, listChannelAutoThreadService, removeChannelAutoThreadService } from "../../../services/autoThread.js";

const handleSetupAutoThread = async (interaction) => {

    const channel = interaction.options.getChannel('channel');

    if(!channel.isTextBased()) {
        return interaction.reply({
            content: 'Channel harus berupa text channel',
            ephemeral: true
        });
    }

    await addChannelAutoThreadService(interaction.guildId, channel.id);

    return interaction.reply({
        content: `Auto-Threads sudah di setup ke ${channel}`,
        ephemeral: true
    });
};

const handleRemoveAutoThread = async (interaction) => {
    const channel = interaction.options.getChannel('channel');
    if(!channel.isTextBased()) {
        return interaction.reply({
            content: 'Channel harus berupa text channel',
            ephemeral: true
        });
    }

    await removeChannelAutoThreadService(channel.id);

    return interaction.reply({
        content: `Berhasil menghapus channel <#${channel.id}> dari auto thread`,
        ephemeral: true
    });
};

const handleListChannelAutoThread = async (interaction) => {
    const result = await listChannelAutoThreadService(interaction.guildId);

    if (result.length === 0) {
        return interaction.reply({
        content: '⚠️ Belum ada channel auto-thread yang terdaftar.',
        ephemeral: true,
        });
    }

    const listChannel = result.map((id, i) => `${i+1}. <#${id}>`).join('\n');

    return interaction.reply({
        content: `**Auto Thread Channels:**\n${listChannel}`,
        ephemeral: true
    });
};

export {
    handleSetupAutoThread,
    handleRemoveAutoThread,
    handleListChannelAutoThread
};