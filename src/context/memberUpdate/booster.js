import { EmbedBuilder } from "discord.js";
import { getBoosterChannelService } from "../../services/booster.js";

const handleBooster = async (oldMember, newMember) => {

    const {channel_id: channelId} = await getBoosterChannelService(newMember.guild.id);

    const channel = await newMember.guild.channels.fetch(channelId);

    const embed = new EmbedBuilder()
        .setColor(0xF47FFF)
        .setAuthor({
            name: `🎉🎉 BOOSTER PARTY 🎉🎉`,
            iconURL: 'https://cdn.discordapp.com/emojis/1285275825117073473.gif',
        })
        .setDescription(
            `${newMember} **Just boosted our server!** Thank you so much for supporting our community! We are now have total ${newMember.guild.premiumSubscriptionCount} boosts on our server. \n \n Please DM our discord mod for <@&1342397104592781333>.`
        )
        .setThumbnail(newMember.user.displayAvatarURL())
        .setFooter({ text: `Thanks you for boosting!!・Server level ${newMember.guild.premiumTier}`})
        .setTimestamp();

    channel.send({embeds: [embed]});
};

export {
    handleBooster
};