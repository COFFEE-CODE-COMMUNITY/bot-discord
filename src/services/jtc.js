import {
  createJtcRepository,
  findByTriggerChannelJtcRepository,
  isCategoryJtcRepository,
  isJtcChannelRepository,
  listCategoryJtcRepository,
  removeByCategoryIdJtcRepository,
  removeJtcChannelRepository,
  saveJtcChannelRepository,
} from "../database/repository/jtc.js";
import { AppError } from "../error/appError.js";

const createJtcService = async (guildId, triggerChannelId, categoryId) => {
  if (await isCategoryJtcRepository(categoryId)) {
    throw new AppError("Category sudah diregistrasikan");
  }

  await createJtcRepository(guildId, triggerChannelId, categoryId);
};
const isCategoryJtcService = async (categoryId) => {
  return isCategoryJtcRepository(categoryId);
};

const removeByCategoryIdJtcService = async (categoryId) => {
  if (isCategoryJtcRepository(categoryId) == false) {
    throw new AppError("Channel yang dihapus tidak ada atau terdaftar");
  }

  return removeByCategoryIdJtcRepository(categoryId);
};

const listCategoryJtcService = async (guildId) => {
  return listCategoryJtcRepository(guildId);
};

const findByTriggerChannelJtcService = async (triggerChannelId) => {
    return findByTriggerChannelJtcRepository(triggerChannelId);
};

const saveJtcChannelService = async (channelId, guildId, ownerId) => {
    await saveJtcChannelRepository(channelId, guildId, ownerId);
};

const isJtcChannelService = async (channelId) => {
    return isJtcChannelRepository(channelId);
};

const removeJtcChannelService = async (channelId) => {
    await removeJtcChannelRepository(channelId);
};


export {
  createJtcService,
  isCategoryJtcService,
  removeByCategoryIdJtcService,
  listCategoryJtcService,
  findByTriggerChannelJtcService,
  saveJtcChannelService,
  removeJtcChannelService,
  isJtcChannelService
};
