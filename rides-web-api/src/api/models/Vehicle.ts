import {FabrixModel as Model} from '@fabrix/fabrix/dist/common'
import {SequelizeResolver} from '@fabrix/spool-sequelize'

/**
 * @module Vehicle
 * @description TODO document Model
 */
export class Vehicle extends Model {
  static schema (app, Sequelize) {
    return {
      id: {
          type: Sequelize.INTEGER,
          field: 'id',
          allowNull: false,
          primaryKey: true,
          autoIncrement: true
      },
      modelYear: {
          type: Sequelize.INTEGER,
          field: 'model_year',
          allowNull: false
      },
      makeId: {
          type: Sequelize.INTEGER,
          field: 'make_id',
          allowNull: false,
          references: {
              model: 'vehicle_make',
              key: 'id'
          },
          onUpdate: 'NO ACTION',
          onDelete: 'NO ACTION'
      },
      modelId: {
          type: Sequelize.INTEGER,
          field: 'model_id',
          allowNull: false,
          references: {
              model: 'vehicle_model',
              key: 'id'
          },
          onUpdate: 'NO ACTION',
          onDelete: 'NO ACTION'
      },
      vehicleTypeId: {
          type: Sequelize.INTEGER,
          field: 'vehicle_type_Id',
          allowNull: true
      },
      odometerReadingEstimate: {
          type: Sequelize.STRING,
          field: 'odometer_reading_estimate',
          allowNull: true
      },
      marketValueEstimate: {
          type: Sequelize.INTEGER,
          field: 'marketValue_estimate',
          allowNull: true
      },
      manual: {
          type: Sequelize.BOOLEAN,
          field: 'manual',
          allowNull: true
      },
      vehicleRegistrationId: {
          type: Sequelize.INTEGER,
          field: 'vehicle_registration_id',
          allowNull: true,
          references: {
              model: 'vehicle_registration',
              key: 'id'
          },
          onUpdate: 'NO ACTION',
          onDelete: 'NO ACTION'
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
        tableName: 'vehicle'
      }
    }
  }

  static get resolver() {
    return SequelizeResolver
  }
  
  static associate(models) {
    const {Vehicle, VehicleMake, VehicleModel, VehicleRegistration} = models

    Vehicle.belongsTo(VehicleMake, {
        as: 'make',
        foreignKey: 'make_id',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    })

    Vehicle.belongsTo(VehicleModel, {
        as: 'model',
        foreignKey: 'model_id',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    })

    Vehicle.belongsTo(VehicleRegistration, {
        as: 'vehicleRegistration',
        foreignKey: 'vehicleRegistrationId',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    })

  }
}
