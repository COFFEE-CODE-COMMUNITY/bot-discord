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
  pgm.createTable('help_commands', {
    id: 'id',
    command: { type: 'VARCHAR(100)', notNull: true },
    description: { type: 'TEXT', notNull: true },
    sub_commands: { type: 'JSONB', notNull: true, default: pgm.func(`'[]'::jsonb`) },
  });
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = (pgm) => {
  pgm.dropTable('help_commands');
};
