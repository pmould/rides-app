import {FabrixController as Controller} from '@fabrix/fabrix/dist/common'
const Sequelize = require('sequelize')
/**
 * @module VehicleMakeController
 * @description TODO document Controller.
 */
export class VehicleMakeController extends Controller {
  async getMakes(request, h) {
    const {year} = request.query

        const {VehicleModelYear, VehicleMake, VehicleModel} = this.app.models
        const sequelize = VehicleModelYear.sequelize
        const makes = await sequelize.query(`
SELECT DISTINCT vma.id, vma.make
FROM "public"."vehicle_model_year" AS vmy
INNER JOIN "public"."vehicle_model" AS vmo
  ON vmy."model_id" = vmo."id"
INNER JOIN "public"."vehicle_make" AS vma
  ON vmo."make_id" = vma."id"
WHERE vmy."year" = '2006'
ORDER BY vma.make ASC
`, {type: Sequelize.QueryTypes.SELECT})

  return makes
  }
}

