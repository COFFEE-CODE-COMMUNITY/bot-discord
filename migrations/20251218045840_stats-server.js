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
  pgm.createTable('stats_config', {
    id: 'id',
    guild_id: { type: 'VARCHAR(255)', notNull: true },
    role_id: { type: 'VARCHAR(255)', notNull: true },
    channel_id: { type: 'VARCHAR(255)', notNull: true, unique: true },
    discord_category: { type: 'VARCHAR(255)', notNull: true },
  });

  pgm.addConstraint('stats_config', 'unique_guild_role', {
    unique: ['guild_id', 'role_id'],
  });

};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */

export const down = (pgm) => {
  pgm.dropTable('stats_config')
};
