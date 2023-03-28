import {FabrixModel as Model} from '@fabrix/fabrix/dist/common'
import {SequelizeResolver} from '@fabrix/spool-sequelize'

/**
 * @module VehicleYear
 * @description VehicleYear model
 */
export class VehicleYear extends Model {
  static schema (app, Sequelize) {
    return {
      id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true
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
        tableName: 'vehicle_year',
        timestamps: false
      }
    }
  }

  static get resolver() {
    return SequelizeResolver
  }
}
