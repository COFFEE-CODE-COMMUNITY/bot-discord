import { handleFeedbackButton } from "./feedback.js";
import {handleTakeRoleButton} from "../../../services/takeRole.js";

const handleButton = async (interaction) => {
    const [domain] = interaction.customId.split(':');

    switch(domain) {
        case 'feedback-btn':
            return handleFeedbackButton(interaction);
        case "take-role-item":
            return handleTakeRoleButton(interaction);
        default:
            await interaction.reply({
                content: 'Button tidak dikenali',
                ephemeral: true
            });
    }
};

export {
    handleButton
};