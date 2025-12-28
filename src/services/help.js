import {getAllCommands, getDocsByCommandId, getHelpCommandById} from "../database/repository/help.js";
import {AppError} from "../error/appError.js";

const getAll = async () => {
  return await getAllCommands();
};

const getCommandById = async ({ commandId }) => {
  if (!commandId) {
    throw new AppError(`Command dengan id ${commandId} tidak ditemukan.`);
  }

  return await getHelpCommandById({ commandId });
};

const getDocs = async ({ commandId }) => {
  if (!commandId) {
    throw new AppError(`Command dengan id ${commandId} tidak ditemukan.`);
  }

  return await getDocsByCommandId({ commandId });
};

export {
  getAll,
  getCommandById,
  getDocs,
};