import { Events } from "discord.js";
import { handleBooster } from "../context/memberUpdate/booster.js";

export default {
    name: Events.GuildMemberUpdate,
    async execute (oldMember, newMember) {
        if(oldMember.premiumSince || newMember.premiumSince) {
            return handleBooster(oldMember, newMember);
        }
    }
};