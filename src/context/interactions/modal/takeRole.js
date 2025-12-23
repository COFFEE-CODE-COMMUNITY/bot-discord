import {createTakeRole, sendTakeRoleEmbed, takeRoleState} from "../../../services/takeRole.js";
import {client} from "../../../client/client.js";

const handleTakeRoleModal = async (interaction) => {
  if (!interaction.isModalSubmit()) return;
  if (interaction.customId !== "take-role-modal:embed") return;

  const state = takeRoleState.get(interaction.user.id);
  if (!state) {
    return interaction.reply({
      content: "Data role tidak ditemukan. Silakan ulangi proses.",
      ephemeral: true,
    });
  }

  const interactionTypeRaw =
    interaction.fields.getTextInputValue("interaction_type");

  const interactionType =
    interactionTypeRaw === "1" ? "select" :
      interactionTypeRaw === "2" ? "button" :
        null;

  if (!interactionType) {
    return interaction.reply({
      content: "Tipe interaksi tidak valid. Gunakan 1 atau 2.",
      ephemeral: true,
    });
  }

  const embed = {
    title: interaction.fields.getTextInputValue("title"),
    description:
      interaction.fields.getTextInputValue("description") || null,
    color:
      interaction.fields.getTextInputValue("color") || null,
    footer:
      interaction.fields.getTextInputValue("footer") || null,
  };

  try {
    const embedConfig = await createTakeRole({
      guildId: state.guildId,
      channelId: state.channelId,
      interactionType,
      embed,
      items: state.roles,
    });

    await sendTakeRoleEmbed(client, embedConfig);

    takeRoleState.delete(interaction.user.id);

    await interaction.reply({
      content: "Take role berhasil dibuat dan disimpan.",
      ephemeral: true,
    });

  } catch (err) {
    console.error(err);

    await interaction.reply({
      content: "Gagal membuat take role.",
      ephemeral: true,
    });
  }
};

export {
  handleTakeRoleModal,
};
