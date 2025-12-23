import { handleFeedbackSelect } from "./feedback.js";

const handleSelect = async (interaction) => {
    const [domain] = interaction.customId.split(':');

    switch(domain) {
        case 'feedback-select':
            return handleFeedbackSelect(interaction);

        default:
            await interaction.reply({
                content: 'Select tidak dikenali',
                ephemeral: true
            });
    }
};

export {
    handleSelect
};