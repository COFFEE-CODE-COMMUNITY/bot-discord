import { getAll } from "../../database/repository/inviteTracker.js";
import { EmbedBuilder } from "discord.js";
import { client } from "../../client/client.js";

const inviteCache = new Map();

const inviteTracker = async ({ member }) => {
  const guild = member.guild;
  if (!guild) return;

  const data = await getAll();
  if (!data) return;

  const channel = guild.channels.cache.get(data.channel_id);
  const invite = await getCache({guild});

  if (!invite || !invite.inviter) {
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

const cache = async ({ guild }) => {
  const invites = await guild.invites.fetch();
  const map = new Map();

  invites.forEach(invite => {
    map.set(invite.code, invite.uses ?? 0);
  });

  inviteCache.set(guild.id, map);
};

const getCache = async ({ guild }) => {
  const cachedInvites = inviteCache.get(guild.id);
  if  (!cachedInvites) return null;

  const newInvites = await guild.invites.fetch();

  const usedInvite = newInvites.find(invite => {
    const oldUses = cachedInvites.get(invite.code) ?? 0;
    return (invite.uses ?? 0) > oldUses;
  });

  await cache({guild});
  return usedInvite ?? null;
};

const initInvite = async () => {
  for (const guild of client.guilds.cache.values()) {
    try {
      await cache({guild});
    } catch (err) {
      console.error(
        `[InviteCache] Failed for guild ${guild.id}`,
        err
      );
    }
  }
};

export {
  initInvite,
  inviteTracker
};