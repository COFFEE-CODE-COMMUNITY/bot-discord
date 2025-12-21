import { handleFeedbackButton } from "./feedback.js";
import {handleStatsServerButton} from "./statsServer.js";

const handleButton = async (interaction) => {
    const [domain] = interaction.customId.split(':');

    switch(domain) {
        case 'feedback-btn':
            return handleFeedbackButton(interaction);
        case 'stats-server-btn':
            return handleStatsServerButton(interaction);
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