import { handleFeedbackModal } from "./feedback.js";

const handleModal = async (interaction) => {
    const [domain] = interaction.customId.split(':');

    switch (domain){
        case 'feedback-modal':
            return handleFeedbackModal(interaction);
        default:
            await interaction.reply({
                content: 'Modal tidak dikenali',
                ephemeral: true
            });
    }
};

export {
    handleModal
};