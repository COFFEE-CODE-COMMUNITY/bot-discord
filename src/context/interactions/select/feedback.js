import { ModalBuilder, ActionRowBuilder, TextInputBuilder, TextInputStyle } from "discord.js";

const handleFeedbackSelect = async (interaction) => {

    const action = interaction.customId.split(':')[1];

    let modal;
    
    const reportedUserId = interaction.values[0];

    if(action === 'user'){
        modal = new ModalBuilder()
            .setCustomId(`feedback-modal:report:${reportedUserId}`)
            .setTitle('Laporan pelanggaran');


        const description = new TextInputBuilder()
            .setCustomId('content')
            .setLabel('Deskripsi pelanggaran')
            .setStyle(TextInputStyle.Paragraph)
            .setRequired(true)
            .setPlaceholder('Jelaskan apa yang dilakukan user tersebut...');

        modal.addComponents(
            new ActionRowBuilder().addComponents(description)
        );

    }
    await interaction.showModal(modal);
};


export {
    handleFeedbackSelect
};