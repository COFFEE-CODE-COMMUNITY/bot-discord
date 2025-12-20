import { handleFeedbackButton } from "./feedback.js";

const handleButton = async (interaction) => {
    const [domain] = interaction.customId.split(':');

    switch(domain) {
        case 'feedback-btn':
            return handleFeedbackButton(interaction);
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