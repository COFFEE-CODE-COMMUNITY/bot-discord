import {getCache} from "../../utils/inviteCache.js";
import {getAll} from "../../database/repository/inviteTracker.js";
import {EmbedBuilder} from "discord.js";

const inviteTracker = async ({ member }) => {
  const guild = member.guild;
  if (!guild) return;

  const data = await getAll();
  if (!data) return;

  const channel = guild.channels.cache.get(data.channel_id);
  const invite = await getCache({guild});

  const unknownEmbed = new EmbedBuilder()
    .setTitle("Invite Tracker")
    .setDescription(
      `**Member Baru Bergabung**\n\n` +
      `• User : ${member.user}\n` +
      `• Invite : **Tidak diketahui**\n\n` +
      `Kemungkinan menggunakan **Vanity URL** atau invite sudah dihapus.`
    )
    .setColor(1752220)
    .setFooter({
      text:"Coffee Code Community"
    });

  if (!invite || !invite.inviter) {
    channel.send({
      embeds: [unknownEmbed]
    });
  }

  const invitedUser = member.user;
  const inviter = invite.inviter;
  const totalInvites = invite.uses ?? 0;

  const embed = new EmbedBuilder()
    .setTitle("Invite Tracker")
    .setDescription(
      `**Member Baru Bergabung**\n\n` +
      `• User : ${invitedUser}\n` +
      `• Diundang oleh : ${inviter}\n` +
      `• Total invite : **${totalInvites}**`
    )
    .setColor(1752220)
    .setFooter({
      text:"Coffee Code Community"
    });

  await channel.send({
    embeds: [embed]
  });
};

export {
  inviteTracker
};