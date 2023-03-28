/**
 * Main App Configuration
 * (app.config.main)
 *
 * @see {@link http://fabrix.app/docs/config/main}
 */

import { resolve } from 'path'

/**
 * Spools: import spools
 */
import { REPLSpool } from '@fabrix/spool-repl'
import { RouterSpool } from '@fabrix/spool-router'

import { SequelizeSpool } from '@fabrix/spool-sequelize'
import {HapiSpool} from '@fabrix/spool-hapi'
import {SocketIOSpool} from 'rides-realtime-server';
import {RedisSpool} from '@fabrix/spool-redis'

export const main = {

  /**
   * Order does *not* matter. Each module is loaded according to its own
   * requirements.
   */
  spools: [
    REPLSpool,
    RouterSpool,
    HapiSpool,
    SequelizeSpool,
    SocketIOSpool,
    RedisSpool
  ],

  /**
   * Define application paths here. "root" is the only required path.
   */
  paths: {
    root: resolve(__dirname, '..'),
    temp: resolve(__dirname, '..', '.tmp')
  }
}
