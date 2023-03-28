/**
 * Fabrix Configuration Manifest
 * @see {@link http://fabrix.app/docs/config/manifest}
 */
import * as env from './env'
import { i18n } from './i18n'
import { log } from './log'
import { main } from './main'
import { models } from './models'
import { routes } from './routes'
import { stores } from './stores'
import { web } from './web'
import { router } from './router'
import {envConfig} from './envConfig'

export {
  env,
  i18n,
  log,
  main,
  models,
  routes,
  stores,
  web,
  router,
  envConfig
}
