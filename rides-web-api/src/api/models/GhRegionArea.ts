import {FabrixModel as Model} from '@fabrix/fabrix/dist/common'
import {SequelizeResolver} from '@fabrix/spool-sequelize'

/**
 * @module GhRegionArea
 * @description TODO document Model
 */
export class GhRegionArea extends Model {
  static schema (app, Sequelize) {
    return {
      id: {
          type: Sequelize.INTEGER,
          field: 'id',
          allowNull: false,
          primaryKey: true,
          autoIncrement: true
      },
      area: {
          type: Sequelize.STRING,
          field: 'area',
          allowNull: false
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
      ghPostCodeDistrictId: {
          type: Sequelize.INTEGER,
          field: 'gh_post_code_district_id',
          allowNull: true,
          references: {
              model: 'gh_post_code_district',
              key: 'id'
          },
          onUpdate: 'NO ACTION',
          onDelete: 'NO ACTION'
      },
      popular: {
          type: Sequelize.BOOLEAN,
          field: 'popular',
          allowNull: true
      },
      isDistrict: {
          type: Sequelize.BOOLEAN,
          field: 'is_district',
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
        tableName: 'gh_region_area',
        timestamps: false
      }
    }
  }
  
  static get resolver() {
    return SequelizeResolver
  }

  static associate (models) {
    const {GhRegionArea, GhPostCodeDistrict, GhPostCodeRegion} = models

    GhRegionArea.belongsTo(GhPostCodeDistrict, {
      as: 'ghPostCodeDistrict',
      foreignKey: 'ghPostCodeDistrictId',
      onDelete: 'NO ACTION',
      onUpdate: 'NO ACTION'
    })

    GhRegionArea.belongsTo(GhPostCodeRegion, {
      as: 'ghPostCodeRegion',
      foreignKey: 'ghPostCodeRegionId',
      onDelete: 'NO ACTION',
      onUpdate: 'NO ACTION'
    })
  }
}
