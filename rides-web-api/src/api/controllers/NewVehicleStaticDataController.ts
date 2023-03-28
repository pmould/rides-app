import {FabrixController as Controller} from '@fabrix/fabrix/dist/common'
const {marketValues, odometerOptions, vehicleTypes} = require('../vehicleDropDownLists')

const sequilize = require('sequelize')
/**
 * @module NewVehicleStaticDataController
 * @description static data for adding a new vehicle.
 */
export class NewVehicleStaticDataController extends Controller {
  async getData(request, h) {
    const {VehicleMake, VehicleYear, State} = this.app.models

    const years = (await VehicleYear.findAll({
      order: [['year', 'DESC']]
    })).map(yearModel => yearModel.year)

    const stagesData = await State.findAll({where: {stateTypeId: 1}});

    const firstState = stagesData.find(state => {
      return !stagesData.find(x => x.nextStateId === state.id);
    });

    const stages = [firstState];
    let nextStateId = firstState.nextStateId;
    while(stages.length !== stagesData.length) {
      const nextStage = stagesData.find(x => x.id === nextStateId);
      stages.push(nextStage);
      nextStateId = nextStage.nextStateId;
    }

    const registerListingStages = stages.map((x, i) => ({...x.toJSON(), order: i}));

    return {
      marketValues,
      odometerOptions,
      vehicleTypes,
      years,
      registerListingStages
    }
  }
}

