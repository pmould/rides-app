import {FabrixModel as Model} from '@fabrix/fabrix/dist/common'
import {SequelizeResolver} from '@fabrix/spool-sequelize'

/**
 * @module GhPostCodeRegion
 * @description TODO document Model
 */
export class GhPostCodeRegion extends Model {
  static schema(app, Sequelize) {
    return {
      id: {
        type: Sequelize.INTEGER,
        field: 'id',
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      regionCode: {
        type: Sequelize.CHAR(1),
        field: 'region_code',
        allowNull: false
      },
      region: {
        type: Sequelize.STRING,
        field: 'region',
        allowNull: false
      }
    }
  }

  static config() {
    return {
      store: 'postgresSequelize',
      options: {
        schema: 'public',
        tableName: 'gh_post_code_region',
        timestamps: false
      }
    }
  }

  static get resolver() {
    return SequelizeResolver
  }
  static associate(models) {
    const {GhPostCodeRegion, GhPostCodeDistrict} = models
    GhPostCodeRegion.hasMany(GhPostCodeDistrict, {
      as: 'ghPostCodeDistricts',
      foreignKey: 'ghPostCodeRegionId',
      onDelete: 'NO ACTION',
      onUpdate: 'NO ACTION'
    })
  }
}
