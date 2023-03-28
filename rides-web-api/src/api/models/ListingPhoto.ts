import {FabrixModel as Model} from '@fabrix/fabrix/dist/common'
import {SequelizeResolver} from '@fabrix/spool-sequelize'

/**
 * @module VehicleMake
 * @description VehicleMake model
 */
export class ListingPhoto extends Model {
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
          field: 'listing_id',
          allowNull: false,
          references: {
              model: 'listing',
              key: 'id'
          },
          onUpdate: 'NO ACTION',
          onDelete: 'NO ACTION'
      },
      photo: {
          type: Sequelize.STRING,
          field: 'photo',
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
        tableName: 'listing_photo'
      }
    }
  }

  static get resolver() {
    return SequelizeResolver
  }

  static associate(models) {
    const {ListingPhoto, Listing} = models

    ListingPhoto.belongsTo(Listing, {
      as: 'ListingPhotoListing',
      foreignKey: 'listingId',
      onDelete: 'NO ACTION',
      onUpdate: 'NO ACTION'
    })
  }
}
