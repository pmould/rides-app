import {FabrixModel as Model} from '@fabrix/fabrix/dist/common'
import {SequelizeResolver} from '@fabrix/spool-sequelize'

/**
 * @module GhMajorCity
 * @description TODO document Model
 */
export class GhMajorCity extends Model {
  
  static schema (app, Sequelize) {
    return {
      id: {
        type: Sequelize.INTEGER,
        field: 'id',
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      city: {
          type: Sequelize.STRING,
          field: 'city',
          allowNull: true
      },
      ghPostCodeRegionId: {
          type: Sequelize.INTEGER,
          field: 'gh_post_code_region_id',
          allowNull: true,
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
        tableName: 'gh_major_city',
        timestamps: false
      }
    }
  }

  static get resolver() {
    return SequelizeResolver
  }
  
  static associate(models) {
    const {GhMajorCity, GhCityArea, GhPostCodeDistrict, GhPostCodeRegion} = models

    GhMajorCity.hasMany(GhCityArea, {
      as: 'ghCityAreas',
      foreignKey: 'majorCityId',
      onDelete: 'NO ACTION',
      onUpdate: 'NO ACTION'
    })

    GhMajorCity.belongsTo(GhPostCodeDistrict, {
      as: 'gHPostCodeDistrict',
      foreignKey: 'ghPostCodeDistrictId',
      onDelete: 'NO ACTION',
      onUpdate: 'NO ACTION'
    })

    GhMajorCity.belongsTo(GhPostCodeRegion, {
      as: 'ghPostCodeRegion',
      foreignKey: 'ghPostCodeRegionId',
      onDelete: 'NO ACTION',
      onUpdate: 'NO ACTION'
    })

    GhMajorCity.belongsToMany(GhPostCodeDistrict, {
      as: 'ghPostCodeDistricts',
      through: GhCityArea,
      foreignKey: 'majorCityId',
      otherKey: 'ghPostCodeDistrictId',
      onDelete: 'NO ACTION',
      onUpdate: 'NO ACTION'
    })

    GhMajorCity.belongsToMany(GhPostCodeRegion, {
      as: 'ghPostCodeRegions',
      through: GhCityArea,
      foreignKey: 'majorCityId',
      otherKey: 'ghPostCodeRegionId',
      onDelete: 'NO ACTION',
      onUpdate: 'NO ACTION'
    })
  }
}
