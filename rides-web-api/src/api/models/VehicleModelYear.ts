import {FabrixModel as Model} from '@fabrix/fabrix/dist/common'
import {SequelizeResolver} from '@fabrix/spool-sequelize'

/**
 * @module VehicleModelYear
 * @description VehicleModelYear model
 */
export class VehicleModelYear extends Model {
  static schema (app, Sequelize) {
    return {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      modelId: {
        type: Sequelize.INTEGER,
        field: 'model_id',
        allowNull: true,
        references: {
            model: 'vehicle_model',
            key: 'id'
        },
        onUpdate: 'NO ACTION',
        onDelete: 'NO ACTION'
      },
      year: {
        type: Sequelize.INTEGER,
        allowNull: true
      }
    }
  }

  static config () {
    return {
      store: 'postgresSequelize',
      options: {
        schema: 'public',
        tableName: 'vehicle_model_year',
        timestamps: false
      }
    }
  }

  static get resolver() {
    return SequelizeResolver
  }

  static associate(models) {
    const {VehicleModel, VehicleModelYear} = models

    VehicleModelYear.belongsTo(VehicleModel, {
        as: 'vehicleModel',
        foreignKey: 'modelId',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    })
  }
}
