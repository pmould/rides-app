import { FabrixController as Controller } from '@fabrix/fabrix/dist/common'

/**
 * @module DefaultController
 *
 * @description Default Controller included with a new Trails app
 * @see {@link http://trailsjs.io/doc/api/controllers}
 * @this TrailsApp
 */
export class DefaultController extends Controller {

  /**
   * Return some info about this application
   */
  info (request, h) {
    return this.app.services.DefaultService.getApplicationInfo()
  }
}
