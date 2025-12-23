import { Events } from "discord.js";
import { handleBooster } from "../context/memberUpdate/booster.js";
import {updateStat} from "../context/memberUpdate/statsServer.js";

export default {
    name: Events.GuildMemberUpdate,
    async execute (oldMember, newMember) {
      await updateStat(oldMember, newMember);
        if(oldMember.premiumSince || newMember.premiumSince) {
            return handleBooster(oldMember, newMember);
        }
    }
};