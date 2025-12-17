async function handleSlash(interaction) {
    console.log(interaction.client.commands);
    const command = interaction.client.commands.get(interaction.commandName);

    if(!command) {
        return interaction.replay({
            content: 'Command Tidak Ditemukan',
            ephemeral: true
        });
    }

    if(command.permission) {
        const hasPermission = interaction.member.every(perm => interaction.member.has(perm));

        if(!hasPermission) {
            return interaction.reply({
                content: 'Kamu tidak punya izin untuk command ini',
                ephemeral: true
            });
        }
    }

    await command.execute(interaction);   
}

export {
    handleSlash
};