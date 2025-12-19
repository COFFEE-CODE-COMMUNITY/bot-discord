import {getAll} from "../../database/repository/welcome.js";
import {TextChannel} from "discord.js";
import {welcomeEmbed} from "../../utils/welcomeEmbed.js";

const welcome = async ({ member }) => {
  const guild = member.guild;

  const data = await getAll();
  if (!data) return;

  const channel = guild.channels.cache.get(data.channel_id);
  if (!channel || !(channel instanceof TextChannel)) return;

  const { embed, attachment } = await welcomeEmbed({member});

  await channel.send({
    embeds: [embed],
    files: [attachment],
  });
};

export {
  welcome,
};