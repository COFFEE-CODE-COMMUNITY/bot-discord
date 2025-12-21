import { ChannelType } from "discord.js";
import { createJtcService, isCategoryJtcService, listCategoryJtcService, removeByCategoryIdJtcService } from "../../../services/jtc.js";


const handleJtcSetup = async (interaction) => {
    const category = interaction.options.getChannel('category');

    const channel = await interaction.guild.channels.create({
        name: `Create To Join`,
        type: ChannelType.GuildVoice,
        parent: category.id
    });

    console.log('jALAN');

    await createJtcService(interaction.guildId, channel.id, category.id);

    return interaction.reply({
      content: `Join to Create berhasil dibuat di **${category.name}**`,
      ephemeral: true,
    });

};

const handleJtcRemove = async (interaction) => {
    const category = interaction.options.getChannel('category');

    const channelId = await removeByCategoryIdJtcService(category.id);

    const channel = interaction.guild.channels.cache.get(channelId);

    await channel.delete();

    return interaction.reply({
        content: `Berhasil menghapus category <#${category.id}> dari jtc`,
        ephemeral: true
    });
};

const handleJtcList = async (interaction) => {
    const result = await listCategoryJtcService(interaction.guildId);

    if (result.length === 0) {
        return interaction.reply({
        content: '⚠️ Belum ada category jtc yang terdaftar.',
        ephemeral: true,
        });
    }

    const listCategory = result.map((id, i) => `${i+1}. <#${id}>`).join('\n');

    return interaction.reply({
        content: `**Create to Join Categories :**\n${listCategory}`,
        ephemeral: true
    });
};


export {
    handleJtcList,
    handleJtcRemove,
    handleJtcSetup
};