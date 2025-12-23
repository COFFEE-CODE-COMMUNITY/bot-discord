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
  pgm.createTable('invite_config', {
    guild_id: { type: 'VARCHAR(255)', primaryKey: true, notNull: true },
    channel_id: { type: 'VARCHAR(255)', notNull: true },
    status: { type: 'BOOLEAN', notNull: true, default: false },
  })
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */

export const down = (pgm) => {
  pgm.dropTable('invite_config')
};
