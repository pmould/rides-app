import {FabrixModel as Model} from '@fabrix/fabrix/dist/common'
import {SequelizeResolver} from '@fabrix/spool-sequelize'


/**
 * @module VehicleMake
 * @description VehicleMake model
 */
export class VehicleMake extends Model {
  static schema(app, Sequelize) {
    return {
      id: {
        type: Sequelize.INTEGER,
        field: 'id',
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      make: {
        type: Sequelize.STRING,
        field: 'make',
        allowNull: false
      }
    }
  }

  static config() {
    return {
      store: 'postgresSequelize',
      options: {
        schema: 'public',
        tableName: 'vehicle_make',
        timestamps: false
      }
    }
  }

  static get resolver() {
    return SequelizeResolver
  }

  static associate(models) {
    const {VehicleMake, VehicleModel} = models

    VehicleMake.hasMany(VehicleModel, {
      as: 'vehicleModels',
      foreignKey: 'makeId',
      onDelete: 'NO ACTION',
      onUpdate: 'NO ACTION'
    })
  }
}
