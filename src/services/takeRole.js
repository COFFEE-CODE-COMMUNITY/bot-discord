import {
  createEmbed,
  createManyItem,
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
  const embedResult = await createEmbed({
    guildId,
    channelId,
    interactionType,
    ...embed,
  });

  const mappedItems = [...items.values()].map((role, index) => ({
    embedId: embedResult.id,
    roleId: role.id,
    label: role.name,
    emoji: null,
    style: null,
    value: role.id,
    customId: `take-role-item:${embedResult.id}:${role.id}`,
    position: index,
  }));

  await createManyItem({ items: mappedItems });

  return embedResult;
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
          value: item.role_id,
          emoji: item.emoji ?? undefined,
        }))
      )
      .setMinValues(0)
      .setMaxValues(items.length);

    components.push(
      new ActionRowBuilder().addComponents(select)
    );
  }

  if (interactionType === "button") {
    const row = new ActionRowBuilder();

    for (const item of items) {
      const button = new ButtonBuilder()
        .setCustomId(item.custom_id)
        .setLabel(item.label ?? "Role")
        .setStyle(item.style ?? ButtonStyle.Secondary);

      if (item.emoji) button.setEmoji(item.emoji);

      row.addComponents(button);
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
  const allowedRoleIds = new Set(items.map(i => i.role_id));

  for (const roleId of interaction.values) {
    if (!allowedRoleIds.has(roleId)) continue;

    if (member.roles.cache.has(roleId)) {
      await member.roles.remove(roleId);
      await interaction.reply({
        content: "Role berhasil dihapus.",
        ephemeral: true,
      });
    } else {
      await member.roles.add(roleId);
      await interaction.reply({
        content: "Role berhasil ditambahkan.",
        ephemeral: true,
      });
    }
  }
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
  takeRoleState,
  buildTakeRoleMessage,
  sendTakeRoleEmbed,
  handleTakeRoleSelectMenu,
  handleTakeRoleButton,
};