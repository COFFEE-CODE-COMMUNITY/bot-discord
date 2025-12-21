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
    pgm.createTable('join_to_create', {
        id: {type: 'VARCHAR(255)', primaryKey: true, notNull: true},
        guild_id: { type: 'VARCHAR(255)', notNull: true },
        trigger_channel_id : { type: 'VARCHAR(255)', notNull: true, unique: true },
        category_id: { type: 'VARCHAR(255)', notNull: true, unique: true },
    })

    pgm.createTable('jtc_channels', {
        channel_id: {type: 'VARCHAR(255)', primaryKey: true, notNull: true},
        guild_id: { type: 'VARCHAR(255)', notNull: true },
        owner_id : { type: 'VARCHAR(255)', notNull: true},
    })
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = (pgm) => {
    pgm.dropTable('join_to_create');
    pgm.dropTable('jtc_channels')
};
