import {pool} from "../index.js";

const createEmbed = async ({
  guildId,
  channelId,
  interactionType,
  title,
  description,
  color,
  footer,
  image,
  thumbnail,
}) => {
  const query = {
      text: `
          INSERT INTO take_role_embed_config (
              guild_id, channel_id, interaction_type, title, description, color, footer, image, thumbnail
          ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING *
      `,
      values: [
        guildId,
        channelId,
        interactionType,
        title ?? null,
        description ?? null,
        color ?? null,
        footer ?? null,
        image ?? null,
        thumbnail ?? null,
      ]
  };
  const { rows } = await pool.query(query);

  return rows[0];
};

const updateEmbedMessageId = async ({ id, messageId }) => {
  const query = {
      text: `UPDATE take_role_embed_config SET message_id = $1 WHERE id = $2`,
      values: [messageId, id]
  };

  await pool.query(query);
};

const deleteEmbedById= async ({ id }) => {
  const query = {
    text: `DELETE FROM take_role_embed_config WHERE id = $1`,
    values: [id]
  };
  await pool.query(query);
};

const createManyItem = async ({ items }) => {
  const queries = items.map((item) =>
    pool.query(
      `
        INSERT INTO take_role_item_config (
          embed_id,
          role_id,
          label,
          emoji,
          style,
          value,
          custom_id,
          position
        ) VALUES (
          $1,$2,$3,$4,$5,$6,$7,$8
        )
        `,
      [
        item.embedId,
        item.roleId,
        item.label,
        item.emoji ?? null,
        item.style ?? null,
        item.value ?? null,
        item.customId,
        item.position ?? 0,
      ]
    )
  );

  await Promise.all(queries);
};

const findEmbedById = async ({ embedId }) => {
  const query = {
    text: `SELECT * FROM take_role_item_config WHERE embed_id = $1 ORDER BY position ASC`,
    values: [embedId]
  };
  const { rows } = await pool.query(query);

  return rows;
};

const findAllById = async ({ embedId }) => {
  const query = {
    text: `
      SELECT 
        e.id AS embed_id, e.guild_id, e.channel_id, e.message_id, e.title, e.description, e.color, e.footer,
        i.id AS item_id, i.role_id, i.label, i.emoji, i.style, i.value, i.custom_id, i.position
      FROM take_role_embed_config e
      LEFT JOIN take_role_item_config i ON e.id = i.embed_id WHERE e.id = $1 ORDER BY i.position ASC
    `,
    values: [embedId]
  };

  const { rows } = await pool.query(query);

  if (rows.length === 0) return null;

  const { embed_id, guild_id, channel_id, message_id, title, description, color, footer } = rows[0];
  const items = rows.map(r => ({
    id: r.item_id,
    role_id: r.role_id,
    label: r.label,
    emoji: r.emoji,
    style: r.style,
    value: r.value,
    custom_id: r.custom_id,
    position: r.position,
  }));

  return {
    id: embed_id,
    guild_id,
    channel_id,
    message_id,
    title,
    description,
    color,
    footer,
    items,
  };
};


const findAllEmbedByGuildId = async ({ guildId }) => {
  const query = {
    text: `SELECT id, title, channel_id, message_id FROM take_role_embed_config WHERE guild_id = $1 ORDER BY id DESC`,
    values: [guildId],
  };

  const { rows } = await pool.query(query);
  return rows;
};

export {
  createEmbed,
  deleteEmbedById,
  updateEmbedMessageId,
  findEmbedById,
  createManyItem,
  findAllEmbedByGuildId,
  findAllById,
};