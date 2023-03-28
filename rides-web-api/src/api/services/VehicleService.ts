import {FabrixService as Service} from '@fabrix/fabrix/dist/common'

/**
 * @module VehicleService
 * @description TODO document Service
 */
export class VehicleService extends Service {
  async save(vehicle) {
    const {Vehicle} = this.app.models

    const {id} = vehicle
    if(id) {
      const [count, updatedVehicle] = await Vehicle.update(vehicle, {
        where: {id},
        returning: true
      })

      return updatedVehicle.length && updatedVehicle[0]
    }
    else {
      return await Vehicle.create(vehicle)
    }
  }
}

