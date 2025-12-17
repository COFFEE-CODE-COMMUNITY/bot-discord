import { ModalBuilder, TextInputStyle, ActionRowBuilder, TextInputBuilder, UserSelectMenuBuilder } from "discord.js";

const handleFeedbackButton = async (interaction) => {

    const action = interaction.customId.split(':')[1];

    let modal;

    if(action === 'suggestion'){
        modal = new ModalBuilder()
            .setCustomId('feedback-modal:suggestion')
            .setTitle('Kirim saran');

        const input = new TextInputBuilder()
            .setCustomId('content')
            .setLabel('Saran atau masukkan kamu')
            .setStyle(TextInputStyle.Paragraph)
            .setRequired(true)
            .setPlaceholder('Tulis saran kamu untuk server ini...');

        modal.addComponents(
            new ActionRowBuilder().addComponents(input)
        );
    }

    if(action === 'report') {
        const row = new ActionRowBuilder()
            .addComponents(
                new UserSelectMenuBuilder()
                    .setCustomId('feedback-select:user')
                    .setPlaceholder('Pilih user yang ingin dilaporkan')
                    .setMinValues(1)
                    .setMaxValues(1)
            );

            return interaction.reply({
                content: 'Pilih user yang ingin kamu laporkan:',
                components: [row],
                ephemeral: true
            });
    }

    if(action === 'bug') {
        modal = new ModalBuilder()
            .setCustomId('feedback-modal:bug')
            .setTitle('Laporkan Bug');

        const input = new TextInputBuilder()
            .setCustomId('content')
            .setLabel('Bug yang ditemukan')
            .setStyle(TextInputStyle.Paragraph)
            .setRequired(true)
            .setPlaceholder('Tulis bug yang ditermukan...');

        modal.addComponents(
            new ActionRowBuilder().addComponents(input)
        );
    }

    if (!modal) {
        return interaction.reply({
            content: 'Aksi feedback tidak dikenali',
            ephemeral: true
        });
    }

    await interaction.showModal(modal);
};

export {
    handleFeedbackButton
};