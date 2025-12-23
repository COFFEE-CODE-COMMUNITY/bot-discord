import {Events} from "discord.js";
import {renameChannel} from "../context/memberUpdate/statsServer.js";

export default {
  name: Events.GuildMemberRemove,
  async execute(member) {
    if (!member) return;

    try {
      await renameChannel({member});
    } catch (e) {
      console.error(e);
    }
  }
};


