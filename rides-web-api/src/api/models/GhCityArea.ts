import {FabrixModel as Model} from '@fabrix/fabrix/dist/common'
import {SequelizeResolver} from '@fabrix/spool-sequelize'

  
export class GhCityAreaResolver extends SequelizeResolver {
  resolve() {
    
  }
}

/**
 * @module GhCityArea
 * @description TODO document Model
 */
export class GhCityArea extends Model {
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
      },
      majorCityId: {
          type: Sequelize.INTEGER,
          field: 'major_city_id',
          allowNull: true,
          references: {
              model: 'gh_major_city',
              key: 'id'
          },
          onUpdate: 'NO ACTION',
          onDelete: 'NO ACTION'
      }
    }
  }

  static config () {
    return {
      store: 'postgresSequelize',
      options: {
        schema: 'public',
        tableName: 'gh_city_area',
        timestamps: false
      }
    }
  }
  
  static get resolver() {
    return GhCityAreaResolver
  }
  
  static associate(models) {
    const {GhCityArea, GhMajorCity, GhPostCodeDistrict, GhPostCodeRegion} = models

    GhCityArea.belongsTo(GhMajorCity, {
      as: 'ghMajorCity',
      foreignKey: 'majorCityId',
      onDelete: 'NO ACTION',
      onUpdate: 'NO ACTION'
    })

    GhCityArea.belongsTo(GhPostCodeDistrict, {
      as: 'ghPostCodeDistrict',
      foreignKey: 'ghPostCodeDistrictId',
      onDelete: 'NO ACTION',
      onUpdate: 'NO ACTION'
    })

    GhCityArea.belongsTo(GhPostCodeRegion, {
      as: 'ghPostCodeRegion',
      foreignKey: 'ghPostCodeRegionId',
      onDelete: 'NO ACTION',
      onUpdate: 'NO ACTION'
    })
  }
}
