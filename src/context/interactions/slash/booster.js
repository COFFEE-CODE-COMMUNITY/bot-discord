import { setupBoosterService } from "../../../services/booster.js";

const handleBoosterSetup = async (interaction) => {
    const channel = interaction.options.getChannel('channel');

    if(!channel.isTextBased()) {
        return interaction.reply({
            content: 'Channel harus berupa text channel',
            ephemeral: true
        });
    }

    await setupBoosterService(interaction.guildId, channel.id);

    return interaction.reply({
        content: `Booster sudah di setup ke ${channel}`,
        ephemeral: true
    });

};

const handleBoosterReset = async () => {

};

export {
    handleBoosterSetup,
    handleBoosterReset
};