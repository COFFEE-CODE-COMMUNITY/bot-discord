import {Events} from "discord.js";
import {welcome} from "../context/guildMembers/welcome.js";
import {inviteTracker} from "../context/guildMembers/inviteTracker.js";

export default {
  name: Events.GuildMemberAdd,
  async execute(member) {
    if (!member) return;

    try {
      await welcome({member});
    } catch (e) {
      console.error(e);
    }
    await inviteTracker({member});
  }
};


