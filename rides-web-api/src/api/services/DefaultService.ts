import {FabrixService as Service} from '@fabrix/fabrix/dist/common'

/**
 * @module DefaultService
 *
 * @description Default Service included with a new Trails app
 * @see {@link http://trailsjs.io/doc/api/services}
 * @this TrailsApp
 */
export class DefaultService extends Service {

  /**
   * Return some info about this application
   */
  getApplicationInfo() {
    const trailpacks = []
    Object.keys(this.app.packs).forEach(packName => {
      if (packName != 'inspect') {
        const pack = this.app.packs[packName]
        trailpacks.push({
          name: pack.name,
          version: pack.pkg.version
        })
      }
    })
    return {
      app: this.app.pkg.version,
      node: process.version,
      libs: process.versions,
      trailpacks: trailpacks
    }
  }
}
