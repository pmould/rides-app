import {FabrixService as Service} from '@fabrix/fabrix/dist/common'

/**
 * @module GhCityAreaService
 * @description TODO document Service
 */
export class GhCityAreaService extends Service {
  async getAll() {
    const {GhCityArea, GhMajorCity} = this.app.models

    return GhCityArea.findAll({
      include: [
        {
          association: GhCityArea.instance.associations.ghMajorCity
        }
      ]
    })
  }
}

