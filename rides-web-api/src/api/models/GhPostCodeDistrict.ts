import {FabrixModel as Model} from '@fabrix/fabrix/dist/common'
import {SequelizeResolver} from '@fabrix/spool-sequelize'

/**
 * @module GhPostCodeDistrict
 * @description TODO document Model
 */
export class GhPostCodeDistrict extends Model {
  static schema(app, Sequelize) {
    return {
      id: {
        type: Sequelize.INTEGER,
        field: 'id',
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      ghPostCodeRegionId: {
        type: Sequelize.INTEGER,
        field: 'gh_post_code_region_id',
        allowNull: false,
        references: {
          model: 'gh_post_code_region',
          key: 'id'
        },
        onUpdate: 'NO ACTION',
        onDelete: 'NO ACTION'
      },
      districtCode: {
        type: Sequelize.CHAR(1),
        field: 'district_code',
        allowNull: false
      },
      district: {
        type: Sequelize.STRING,
        field: 'district',
        allowNull: false
      }
    }
  }

  static config() {
    return {
      store: 'postgresSequelize',
      options: {
        schema: 'public',
        tableName: 'gh_post_code_district',
        timestamps: false
      }
    }
  }

  static get resolver() {
    return SequelizeResolver
  }

  static associate(models) {
    const {GhPostCodeDistrict, GhPostCodeRegion} = models

    GhPostCodeDistrict.belongsTo(GhPostCodeRegion, {
      as: 'ghPostCodeRegion',
      foreignKey: 'ghPostCodeRegionId',
      onDelete: 'NO ACTION',
      onUpdate: 'NO ACTION'
    })
  }
}
