import {FabrixService as Service} from '@fabrix/fabrix/dist/common'

/**
 * @module GhMajorCityService
 * @description TODO document Service
 */
export class GhMajorCityService extends Service {
  async getAll() {
    const {GhMajorCity} = this.app.models

    return GhMajorCity.findAll()
  }
}

