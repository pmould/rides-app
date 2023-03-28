import {FabrixModel as Model} from '@fabrix/fabrix/dist/common'
import {SequelizeResolver} from '@fabrix/spool-sequelize'


/**
 * @module VehiclModel
 * @description VehiclModel model
 */
export class VehicleModel extends Model {
  static schema(app, Sequelize) {
    return {
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
      model: {
        type: Sequelize.STRING(25),
        field: 'model',
        allowNull: false
      },
      id: {
        type: Sequelize.INTEGER,
        field: 'id',
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      }
    }
  }

  static config() {
    return {
      store: 'postgresSequelize',
      options: {
        schema: 'public',
        tableName: 'vehicle_model',
        timestamps: false
      }
    }
  }

  static get resolver() {
    return SequelizeResolver
  }

  static associate(models) {
    const {VehicleMake, VehicleModel, VehicleModelYear} = models

    VehicleModel.hasMany(VehicleModelYear, {
      as: 'vehicleModelYears',
      foreignKey: 'modelId',
      onDelete: 'NO ACTION',
      onUpdate: 'NO ACTION'
    })

    VehicleModel.belongsTo(VehicleMake, {
      as: 'vehicleMake',
      foreignKey: 'makeId',
      onDelete: 'NO ACTION',
      onUpdate: 'NO ACTION'
    })
  }  
}

