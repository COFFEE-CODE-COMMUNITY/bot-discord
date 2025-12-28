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
  pgm.createTable('take_role_item_config', {
    id: 'id',
    embed_id: { type: 'INTEGER', notNull: true, references: 'take_role_embed_config(id)', onDelete: 'CASCADE' },
    role_id: { type: 'VARCHAR(255)', notNull: true },
    label: { type: 'VARCHAR(255)', notNull: true },
    emoji: { type: 'VARCHAR(255)', nullable: true },
    // button only
    style: { type: 'INTEGER', nullable: true },
    // select menu only
    value: { type: 'VARCHAR(255)', nullable: true },
    custom_id: { type: 'VARCHAR(255)', notNull: true },
    position: { type: 'INTEGER', default: 0 },
  });

  pgm.createIndex('take_role_item_config', 'embed_id');
  pgm.createIndex('take_role_item_config', 'custom_id');
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = (pgm) => {
  pgm.dropTable('take_role_item_config');
};
