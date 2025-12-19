import {client} from "../client/client.js";

const inviteCache = new Map();

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
  inviteCache,
  getCache,
  initInvite
};