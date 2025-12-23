import { Events } from "discord.js";
import { handleSlash } from "../context/interactions/slash/slashHandler.js";
import { handleModal } from "../context/interactions/modal/index.js";
import { handleButton } from "../context/interactions/button/index.js";
import { AppError } from "../error/appError.js";
import { handleSelect } from "../context/interactions/select/index.js";
import {handleStringSelect} from "../context/interactions/string-select/index.js";

export default {
    name : Events.InteractionCreate,
    async execute (interaction) {
        try {
            if(interaction.isChatInputCommand()) {
                await handleSlash(interaction);
            }
            if (interaction.isButton()) {
                await handleButton(interaction);
            }
    
            if (interaction.isModalSubmit()) {
                await handleModal(interaction);
            }

            if (interaction.isUserSelectMenu()) {
                await handleSelect(interaction);
            }

            if (interaction.isStringSelectMenu()) {
                await handleStringSelect(interaction);
            }
            
        } catch (error) {
            console.error(error);
            if (error instanceof AppError) {
                return interaction.reply({
                content: error.message,
                ephemeral: true
            });
            }
            return interaction.reply({
                content: 'Terjadi kesalahan internal, coba lagi nanti',
                ephemeral: true
            });
        }
    }
};