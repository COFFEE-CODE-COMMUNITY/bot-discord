/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
export const shorthands = undefined;

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */

export const up = (pgm) => {
  pgm.createTable('take_role_embed_config', {
    id: 'id',
    guild_id: { type: 'VARCHAR(255)', notNull: true },
    message_id: { type: 'VARCHAR(255)', nullable: true },
    channel_id: { type: 'VARCHAR(255)', notNull: true },
    interaction_type: { type: 'VARCHAR(255)', notNull: true },
    title: { type: 'VARCHAR(255)', nullable: true },
    description: { type: 'TEXT', nullable: true },
    color: { type: 'INTEGER', nullable: true },
    footer: { type: 'VARCHAR(255)', nullable: true },
    image: { type: 'VARCHAR(255)', nullable: true },
    thumbnail: { type: 'VARCHAR(255)', nullable: true },
  });

  pgm.addConstraint(
    'take_role_embed_config',
    'take_role_embed_interaction_type_check',
    {
      check: `interaction_type IN ('button', 'select')`,
    }
  );

  pgm.createIndex('take_role_embed_config', 'guild_id');
  pgm.createIndex('take_role_embed_config', 'message_id');
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */

export const down = (pgm) => {
  pgm.dropTable('take_role_embed_config')
};
