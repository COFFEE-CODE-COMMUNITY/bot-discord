import {ButtonStyle, EmbedBuilder, TextInputStyle} from "discord.js";
import {getCommandById, getDocs} from "../../../services/help.js";

const handleHelpSelect = async (interaction) => {
  if (interaction.customId.split(":")[0] !== "help-select") return;

  const [commandId] = interaction.values;
  const command = await getCommandById({ commandId });
  const docs = getDocs({ commandId });

  const embed = new EmbedBuilder()
    .setTitle(`📘 ${command.command}`)
    .setDescription(command.description ?? "Tidak ada deskripsi")
    .setColor(0x3498db)
    .setFooter({ text: "Feature Documentation" })
    .setTimestamp();

  command.sub_commands.forEach((sub) => {
    const doc = docs.find(d => d.title === sub);

    embed.addFields({
      name: `/${command.command} ${sub}`,
      value: doc
        ? doc.content
        : "_Dokumentasi belum tersedia_",
      inline: false,
    });
  });

  await interaction.update({
    embeds: [embed],
    components: [],
  });
};

export {
  handleHelpSelect,
};