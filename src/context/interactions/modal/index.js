import { handleFeedbackModal } from "./feedback.js";
import {handleStatModal} from "./statsServer.js";
import {handleTakeRoleModal} from "./takeRole.js";

const handleModal = async (interaction) => {
    const [domain] = interaction.customId.split(':');

    switch (domain){
        case 'feedback-modal':
            return handleFeedbackModal(interaction);
        case 'stats-server-modal':
            return handleStatModal(interaction);
        case 'take-role-modal':
            return handleTakeRoleModal(interaction);
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