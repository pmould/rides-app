import {FabrixModel as Model} from '@fabrix/fabrix/dist/common'
import {SequelizeResolver} from '@fabrix/spool-sequelize'

/**
 * @module ListingFeature
 * @description ListingFeature model
 */
  export class ListingFeature extends Model {
  static schema (app, Sequelize) {
    return {
      id: {
          type: Sequelize.INTEGER,
          field: 'id',
          allowNull: false,
          primaryKey: true,
          autoIncrement: true
      },
      name: {
          type: Sequelize.STRING,
          field: 'name',
          allowNull: false
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
        tableName: 'listing_feature'
      }
    }
  }

  static get resolver() {
    return SequelizeResolver
  }

  static associate(models) {
    const {ListingFeature, ListingListingFeatureMap, Listing} = models

    ListingFeature.hasMany(ListingListingFeatureMap, {
      as: 'listingListingFeatureMaps',
      foreignKey: 'listingFeatureId',
      onDelete: 'NO ACTION',
      onUpdate: 'NO ACTION'
    })

    ListingFeature.belongsToMany(Listing, {
      as: 'listingFeatureListing',
      through: ListingListingFeatureMap,
      foreignKey: 'listingFeatureId',
      otherKey: 'listingId',
      onDelete: 'NO ACTION',
      onUpdate: 'NO ACTION'
    })
  }
}
