import {FabrixModel as Model} from '@fabrix/fabrix/dist/common'
import {SequelizeResolver} from '@fabrix/spool-sequelize'

/**
 * @module ListingLocation
 * @description TODO document Model
 */
export class ListingLocation extends Model {
  static schema (app, Sequelize) {
    return {
      id: {
        type: Sequelize.INTEGER,
        field: 'id',
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      ghCityAreaId: {
          type: Sequelize.INTEGER,
          field: 'gh_city_area_id',
          allowNull: true,
          references: {
              model: 'gh_city_area',
              key: 'id'
          },
          onUpdate: 'NO ACTION',
          onDelete: 'NO ACTION'
      },
      ghRegionAreaId: {
          type: Sequelize.INTEGER,
          field: 'gh_region_area_id',
          allowNull: true,
          references: {
              model: 'gh_region_area',
              key: 'id'
          },
          onUpdate: 'NO ACTION',
          onDelete: 'NO ACTION'
      },
      ghCityId: {
          type: Sequelize.INTEGER,
          field: 'gh_city_id',
          allowNull: true,
          references: {
              model: 'gh_major_city',
              key: 'id'
          },
          onUpdate: 'NO ACTION',
          onDelete: 'NO ACTION'
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
      }
    }
  }

  static config () {
    return {
      store: 'postgresSequelize',
      options: {
        schema: 'public',
        tableName: 'listing_location',
        timestamps: false
      }
    }
  }

  static get resolver() {
    return SequelizeResolver
  }
  
  static associate(models) {

    const {ListingLocation, Listing, GhCityArea, GhMajorCity, GhPostCodeRegion, GhRegionArea} = models

    ListingLocation.hasMany(Listing, {
      as: 'listings',
      foreignKey: 'listingLocationId',
      onDelete: 'NO ACTION',
      onUpdate: 'NO ACTION'
    })

    ListingLocation.belongsTo(GhCityArea, {
        as: 'ghCityArea',
        foreignKey: 'ghCityAreaId',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    })

    ListingLocation.belongsTo(GhMajorCity, {
        as: 'ghMajorCity',
        foreignKey: 'ghCityId',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    })

    ListingLocation.belongsTo(GhPostCodeRegion, {
        as: 'ghPostCodeRegion',
        foreignKey: 'ghPostCodeRegionId',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    })

    ListingLocation.belongsTo(GhRegionArea, {
        as: 'ghRegionArea',
        foreignKey: 'ghRegionAreaId',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    })
  }
}
