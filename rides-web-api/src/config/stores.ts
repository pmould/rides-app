/**
 * Datastores Configuration
 * (app.config.stores)
 *
 * Configure the ORM layer, connections, etc.
 *
 * @see {@link http://fabrix.app/docs/config/stores}
 */

export const stores = {
  postgresSequelize: {
    orm: 'sequelize',
    database: 'relayridesgh',
    host: 'relayridesgh.cf3w7n2kxlkf.us-west-2.rds.amazonaws.com',
    username: 'relayridesgh',
    password: 'turogh2018',
    dialect: 'postgres',
    migrate: 'alter'
  }
}
