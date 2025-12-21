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
  pgm.createTable('stats_channels', {
    id: 'id',
    guild_id: { type: 'VARCHAR(255)', notNull: true, references: 'stats_config(guild_id)', onDelete: 'CASCADE' },
    channel_id: { type: 'VARCHAR(255)', notNull: true, unique: true },
    stats_category: { type: 'VARCHAR(50)', notNull: true },
    discord_category: { type: 'VARCHAR(255)', notNull: true },
  });

  pgm.addConstraint('stats_channels', 'unique_guild_stats_category', {
    unique: ['guild_id', 'stats_category'],
  });
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */

export const down = (pgm) => {
  pgm.dropTable('stats_channel')
};
