import {
  createEmbed,
  createManyItem,
  deleteEmbedById,
  findEmbedById,
  updateEmbedMessageId
} from "../database/repository/takeRole.js";
import {ActionRowBuilder, ButtonStyle, EmbedBuilder, StringSelectMenuBuilder} from "discord.js";
import {ButtonBuilder} from "@discordjs/builders";

const takeRoleState = new Map();

const createTakeRole = async ({
  guildId,
  channelId,
  interactionType,
  embed,
  items,
}) => {
  if (!items || items.length === 0) {
    throw new Error('Take role harus memiliki minimal 1 role');
  }

  const embedConfig = await createEmbed({
    guildId,
    channelId,
    interactionType,
    ...embed,
  });

  const itemPayload = items.map((item, index) => ({
    embedId: embedConfig.id,
    roleId: item.roleId,
    label: item.label,
    emoji: item.emoji,
    style: interactionType === 'button' ? item.style : null,
    value:
      interactionType === 'select'
        ? `take-role-item:${embedConfig.id}:${index}`
        : null,
    customId: `take-role-item:${embedConfig.id}:${index}`,
    position: index,
  }));

  await createManyItem(itemPayload);

  return embedConfig;
};

const deleteTakeRoleById = async (embedId) => {
  await deleteEmbedById(embedId);
};

const buildTakeRoleMessage = ({ embed, items, interactionType }) => {
  const embedBuilder = new EmbedBuilder()
    .setTitle(embed.title)
    .setDescription(embed.description ?? null);

  if (embed.color) embedBuilder.setColor(embed.color);
  if (embed.footer) embedBuilder.setFooter({ text: embed.footer });

  const components = [];

  if (interactionType === "select") {
    const select = new StringSelectMenuBuilder()
      .setCustomId(`take-role:${embed.id}`)
      .setPlaceholder("Pilih role")
      .addOptions(
        items.map(item => ({
          label: item.label ?? "Role",
          value: item.custom_id,
          emoji: item.emoji ?? undefined,
        }))
      );

    components.push(
      new ActionRowBuilder().addComponents(select)
    );
  }

  if (interactionType === "button") {
    const row = new ActionRowBuilder();

    for (const item of items) {
      row.addComponents(
        new ButtonBuilder()
          .setCustomId(item.custom_id)
          .setLabel(item.label ?? "Role")
          .setStyle(item.style ?? ButtonStyle.Secondary)
          .setEmoji(item.emoji ?? undefined)
      );
    }

    components.push(row);
  }

  return {
    embeds: [embedBuilder],
    components,
  };
};

const sendTakeRoleEmbed = async (client, embedConfig) => {
  const guild = await client.guilds.fetch(embedConfig.guild_id);
  const channel = await guild.channels.fetch(embedConfig.channel_id);

  if (!channel || !channel.isTextBased()) {
    throw new Error("Channel tidak valid");
  }

  const items = await findEmbedById({ embedId: embedConfig.id });

  if (!items || items.length === 0) {
    throw new Error("Item take role tidak ditemukan");
  }

  const payload = buildTakeRoleMessage({
    embed: embedConfig,
    items,
    interactionType: embedConfig.interaction_type,
  });

  const message = await channel.send(payload);

  await updateEmbedMessageId({
    id: embedConfig.id,
    messageId: message.id,
  });
};

const handleTakeRoleSelectMenu = async (interaction) => {
  if (!interaction.isStringSelectMenu()) return;
  if (!interaction.customId.startsWith("take-role:")) return;

  const embedId = interaction.customId.split(":")[1];
  const member = interaction.member;

  const items = await findEmbedById({ embedId });

  for (const item of items) {
    const hasRole = member.roles.cache.has(item.role_id);
    const selected = interaction.values.includes(item.custom_id);

    if (selected && !hasRole) {
      await member.roles.add(item.role_id);
    }

    if (!selected && hasRole) {
      await member.roles.remove(item.role_id);
    }
  }

  await interaction.reply({
    content: "Role kamu berhasil diperbarui.",
    ephemeral: true,
  });
};

const handleTakeRoleButton = async (interaction) => {
  if (!interaction.isButton()) return;
  if (!interaction.customId.startsWith("take-role-item:")) return;

  const [, embedId] = interaction.customId.split(":");
  const member = interaction.member;

  const items = await findEmbedById({ embedId });
  const item = items.find(i => i.custom_id === interaction.customId);

  if (!item) return;

  if (member.roles.cache.has(item.role_id)) {
    await member.roles.remove(item.role_id);
    await interaction.reply({
      content: "Role berhasil dilepas.",
      ephemeral: true,
    });
  } else {
    await member.roles.add(item.role_id);
    await interaction.reply({
      content: "Role berhasil ditambahkan.",
      ephemeral: true,
    });
  }
};

export {
  createTakeRole,
  deleteTakeRoleById,
  takeRoleState,
  buildTakeRoleMessage,
  sendTakeRoleEmbed,
  handleTakeRoleSelectMenu,
  handleTakeRoleButton,
};