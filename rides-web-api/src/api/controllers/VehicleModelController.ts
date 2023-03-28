import {FabrixController as Controller} from '@fabrix/fabrix/dist/common'
import {VehicleModelYear as VehicleModelYearQuery} from '../utils/queryDefaults/VehicleModelYear';
/**
 * @module VehicleModelController
 * @description TODO document Controller.
 */
export class VehicleModelController extends Controller {
  async getModels(request, h) {
    const {year, makeId} = request.query

    const {VehicleModelYear, VehicleModel} = this.app.models

    const modelList = await VehicleModelYear.findAll(
      VehicleModelYearQuery.default(this.app, makeId, year)
    )

    const models = modelList.map(item => ({id: item.vehicleModel.id, model: item.vehicleModel.model}))

    return models
  }
}

