import {FabrixService as Service} from '@fabrix/fabrix/dist/common'

/**
 * @module GhRegionAreaService
 * @description TODO document Service
 */
export class GhRegionAreaService extends Service {
  async getAll() {
    const {GhRegionArea} = this.app.models

    return GhRegionArea.findAll({
      include: [
        {
          association: GhRegionArea.instance.associations.ghPostCodeRegion
        }
      ]
    })
  }
}

