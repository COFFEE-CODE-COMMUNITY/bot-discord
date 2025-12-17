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
    pgm.createTable('feedback_config', {
        guild_id: { type: 'VARCHAR(255)', primaryKey: true, notNull: true },
        panel: { type: 'VARCHAR(255)', notNull: true },
        suggestion: { type: 'VARCHAR(255)', notNull: true },
        report: { type: 'VARCHAR(255)', notNull: true },
        bug: { type: 'VARCHAR(255)', notNull: true }
    })
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */

export const down = (pgm) => {
    pgm.dropTable('feedback_config')
};
