import {FabrixModel as Model} from '@fabrix/fabrix/dist/common'
import {SequelizeResolver} from '@fabrix/spool-sequelize'

/**
 * @module ListingStatusType
 * @description ListingStatusType model
 */
export class ListingStatusType extends Model {
  static schema(app, Sequelize) {
    return {
      id: {
        type: Sequelize.INTEGER,
        field: 'id',
        allowNull: false,
        primaryKey: true
      },
      listingStatusType: {
        type: Sequelize.STRING,
        field: 'listing_status_type',
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

  static config() {
    return {
      store: 'postgresSequelize',
      options: {
        schema: 'public',
        tableName: 'listing_status_type'
      }
    }
  }

  static get resolver() {
    return SequelizeResolver
  }

  static associate(models) {
    const {ListingStatusType, Listing, Account, AccountType, ListingAddress, ListingPhoto,
      Vehicle, VehicleMake, VehicleModel, VehicleTracker} = models

    ListingStatusType.hasMany(Listing, {
      as: 'listings',
      foreignKey: 'statusTypeId',
      onDelete: 'NO ACTION',
      onUpdate: 'NO ACTION'
    })

    ListingStatusType.belongsToMany(Account, {
      as: 'listingHosts',
      through: Listing,
      foreignKey: 'statusTypeId',
      otherKey: 'hostId',
      onDelete: 'NO ACTION',
      onUpdate: 'NO ACTION'
    })

    ListingStatusType.belongsToMany(AccountType, {
      as: 'listingHostTypes',
      through: Listing,
      foreignKey: 'statusTypeId',
      otherKey: 'hostTypeId',
      onDelete: 'NO ACTION',
      onUpdate: 'NO ACTION'
    })

    ListingStatusType.belongsToMany(ListingAddress, {
      as: 'listingAddresses',
      through: Listing,
      foreignKey: 'statusTypeId',
      otherKey: 'listingAddressId',
      onDelete: 'NO ACTION',
      onUpdate: 'NO ACTION'
    })

    ListingStatusType.belongsToMany(Vehicle, {
      as: 'vehicles',
      through: Listing,
      foreignKey: 'status_type_id',
      otherKey: 'vehicle_id',
      onDelete: 'NO ACTION',
      onUpdate: 'NO ACTION'
    })

    ListingStatusType.belongsToMany(VehicleTracker, {
      as: 'vehicleTrackers',
      through: Listing,
      foreignKey: 'status_type_id',
      otherKey: 'vehicle_tracker_id',
      onDelete: 'NO ACTION',
      onUpdate: 'NO ACTION'
    })
  }
}
