import {FabrixModel as Model} from '@fabrix/fabrix/dist/common'
import {SequelizeResolver} from '@fabrix/spool-sequelize'

/**
 * @module VehicleRegistration
 * @description VehicleRegistration model
 */
export class VehicleRegistration extends Model {

  static schema (app, Sequelize) {
    return {
      id: {
          type: Sequelize.INTEGER,
          field: 'id',
          allowNull: false,
          primaryKey: true,
          autoIncrement: true
      },
      licensePlate: {
          type: Sequelize.STRING,
          field: 'license_plate',
          allowNull: false
      },
      regionCode: {
          type: Sequelize.STRING,
          field: 'region_code',
          allowNull: true
      },
      createdAt: {
          type: Sequelize.DATE,
          field: 'created_at',
          allowNull: true
      },
      updatedAt: {
          type: Sequelize.DATE,
          field: 'updated_at',
          allowNull: true
      }
    }
  }

  static config () {
    return {
      store: 'postgresSequelize',
      options: {
        schema: 'public',
        tableName: 'vehicle_registration'
      }
    }
  }

  static get resolver() {
    return SequelizeResolver
  }

  static associate(models) {
    const {VehicleRegistration, Vehicle, VehicleMake, VehicleModel} = models

      VehicleRegistration.hasMany(Vehicle, {
        as: 'vehicles',
        foreignKey: 'vehicleRegistrationId',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    })

    VehicleRegistration.belongsToMany(VehicleMake, {
        as: 'vehicleMakes',
        through: Vehicle,
        foreignKey: 'vehicleRegistrationId',
        otherKey: 'makeId',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    })

    VehicleRegistration.belongsToMany(VehicleModel, {
        as: 'vehicleModels',
        through: Vehicle,
        foreignKey: 'vehicleRegistrationId',
        otherKey: 'model_id',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    })
  }
}
