import {FabrixModel as Model} from '@fabrix/fabrix/dist/common'
import {SequelizeResolver} from '@fabrix/spool-sequelize'

/**
 * @module VehicleMake
 * @description VehicleMake model
 */
  export class ListingListingFeatureMap extends Model {
  static schema (app, Sequelize) {
    return {
      id: {
          type: Sequelize.INTEGER,
          field: 'id',
          allowNull: false,
          primaryKey: true,
          autoIncrement: true
      },
      listingId: {
          type: Sequelize.INTEGER,
          field: 'listingId',
          allowNull: false,
          references: {
              model: 'listing',
              key: 'id'
          },
          onUpdate: 'NO ACTION',
          onDelete: 'NO ACTION'
      },
      listingFeatureId: {
          type: Sequelize.INTEGER,
          field: 'listingFeatureId',
          allowNull: false,
          references: {
              model: 'listingFeature',
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
        tableName: 'listing_listing_feature_map'
      }
    }
  }

  static get resolver() {
    return SequelizeResolver
  }
  
  static associate(models) {
    const {ListingListingFeatureMap, ListingFeature, Listing} = models

    ListingListingFeatureMap.belongsTo(ListingFeature, {
      as: 'listingFeature',
      foreignKey: 'listingFeatureId',
      onDelete: 'NO ACTION',
      onUpdate: 'NO ACTION'
    })

    ListingListingFeatureMap.belongsTo(Listing, {
        as: 'listingListingFeatureMapListing',
        foreignKey: 'listingId',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    })

  }
}
