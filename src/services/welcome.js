import { AppError } from "../error/appError.js";
import { getAll, saveConfig, turnOff } from "../database/repository/welcome.js";

const setupWelcome = async ({
  guildId,
  channelId,
  status,
}) => {
  if (!guildId || !channelId) {
    throw new AppError('Wajib mengisi channel tujuan');
  }

  await saveConfig({guildId, channelId, status});
};

const statusWelcome = async ({ guildId }) => {
  if (!guildId) {
    throw new AppError('Server tidak terdaftar');
  }

  const result = await getAll();
  return result.status ?? false;
};

const deleteWelcome = async ({ guildId }) => {
  if (!guildId) {
    throw new AppError('Server tidak terdaftar atau setup belum dibuat');
  }

  await turnOff({guildId});
};

export {
  setupWelcome,
  statusWelcome,
  deleteWelcome,
};