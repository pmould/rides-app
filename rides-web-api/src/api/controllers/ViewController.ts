import {FabrixController as Controller} from '@fabrix/fabrix/dist/common'

/**
 * @module TestController
 *
 * @description Default Controller included with a new Fabrix app
 * @see {@link http://fabrix.app/doc/api/controllers}
 * @this FabrixApp
 */
export class ViewController extends Controller {
  helloWorld(request, h) {
    return '<h1>Hello Fabrix</h1>'
  }
  /**
   * Return some info about this application
   */
  info (request) {
    return this.app.services.DefaultService.getApplicationInfo()
  }
}
