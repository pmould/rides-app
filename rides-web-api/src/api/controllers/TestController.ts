import { FabrixController as Controller } from '@fabrix/fabrix/dist/common'

/**
 * @module DefaultController
 *
 * @description Default Controller included with a new Fabrix app
 * @see {@link http://fabrix.app/doc/api/controllers}
 * @this FabrixApp
 */
export class TestController extends Controller {
  hello(request, h) {
    return '<h1>Hello Fabrix</h1>'
  }
  /**
   * Return some info about this application
   */
  info (request) {
    return this.app.services.DefaultService.getApplicationInfo()
  }
}
