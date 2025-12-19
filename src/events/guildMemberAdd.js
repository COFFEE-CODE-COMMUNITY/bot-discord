import {Events} from "discord.js";
import {welcome} from "./guild-member-add/welcome.js";
import {inviteTracker} from "./guild-member-add/inviteTracker.js";

export default {
  name: Events.GuildMemberAdd,
  async execute(member) {
    if (!member) return;

    await welcome({member});
    await inviteTracker({member});
  }
};


