import { ChannelType, Events } from "discord.js";
import { findByTriggerChannelJtcService, isJtcChannelService, removeJtcChannelService, saveJtcChannelService } from "../services/jtc.js";

export default {
    name : Events.VoiceStateUpdate,
    async execute(oldState, newState) {
        if(newState.channelId) {
            const config = await findByTriggerChannelJtcService(newState.channelId);
            if(!config) return;

            const channel = await newState.guild.channels.create({
                name: `${newState.member.user.username} room`,
                type: ChannelType.GuildVoice,
                parent: config.categoryId,
            });

            await saveJtcChannelService(channel.id, newState.member.id, newState.guild.id);

            await newState.member.voice.setChannel(channel);
            return;
        }
        if(oldState.channelId) {
            const channel = oldState.channel;
            if (!channel || channel.type !== ChannelType.GuildVoice) return;

            const jtc = await isJtcChannelService(channel.id);
            if(!jtc) return;

            if (channel.members.size === 0) {
                await removeJtcChannelService(channel.id);
                await channel.delete();
            }
        }
    }
};