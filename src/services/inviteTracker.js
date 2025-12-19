import { AppError } from "../error/appError.js";
import { saveConfig, turnOff } from "../database/repository/inviteTracker.js";
import {getAll} from "../database/repository/welcome.js";

const setupInvite = async ({
  guildId,
  channelId,
  status,
}) => {
  if (!guildId || !channelId) {
    throw new AppError('Wajib mengisi channel tujuan');
  }

  await saveConfig({guildId, channelId, status});
};

const statusInvite = async ({ guildId }) => {
  if (!guildId) {
    throw new AppError('Server tidak terdaftar');
  }

  const result = await getAll();
  return result.status ?? false;
};

const deleteInvite = async ({ guildId }) => {
  if (!guildId) {
    throw new AppError('Server tidak terdaftar atau setup belum dibuat');
  }

  await turnOff({guildId});
};

export {
  setupInvite,
  deleteInvite,
  statusInvite,
};