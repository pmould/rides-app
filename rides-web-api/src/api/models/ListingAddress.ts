import {FabrixModel as Model} from '@fabrix/fabrix/dist/common'
import {SequelizeResolver} from '@fabrix/spool-sequelize'

/**
 * @module ListingAddress
 * @description ListingAddress model
 */
export class ListingAddress extends Model {
  static schema (app, Sequelize) {
    return {
      id: {
          type: Sequelize.INTEGER,
          field: 'id',
          allowNull: false,
          primaryKey: true
      },
      listingId: {
          type: Sequelize.INTEGER,
          field: 'listing_id',
          allowNull: false
      },
      addressLine1: {
          type: Sequelize.STRING,
          field: 'address_line_1',
          allowNull: false
      },
      addressLine2: {
          type: Sequelize.STRING,
          field: 'address_line_2',
          allowNull: true
      },
      addressLine3: {
          type: Sequelize.STRING,
          field: 'address_line_3',
          allowNull: true
      },
      ghPostalCode: {
          type: Sequelize.INTEGER,
          field: 'gh_postal_code',
          allowNull: true
      },
      directions: {
          type: Sequelize.STRING(500),
          field: 'directions',
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
        tableName: 'listing_address'
      }
    }
  }

  static get resolver() {
    return SequelizeResolver
  }

  static associate(models) {
    const {ListingAddress, Listing, ListingStatusType, ListingPhoto, Account, AccountType,
      Vehicle, VehicleMake, VehicleModel, VehicleTracker} = models

    ListingAddress.hasMany(Listing, {
      as: 'listings',
      foreignKey: 'listingAddressId',
      onDelete: 'NO ACTION',
      onUpdate: 'NO ACTION'
    })

    ListingAddress.belongsToMany(Account, {
        as: 'Account',
        through: Listing,
        foreignKey: 'listingAddressId',
        otherKey: 'hostId',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    })

    ListingAddress.belongsToMany(AccountType, {
        as: 'hostTypes',
        through: Listing,
        foreignKey: 'listingAddressId',
        otherKey: 'hostTypeId',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    })

    ListingAddress.belongsToMany(ListingStatusType, {
        as: 'listingStatusTypes',
        through: Listing,
        foreignKey: 'listingAddressId',
        otherKey: 'statusTypeId',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    })

    ListingAddress.belongsToMany(Vehicle, {
      as: 'vehicles',
      through: Listing,
      foreignKey: 'listing_address_id',
      otherKey: 'vehicle_id',
      onDelete: 'NO ACTION',
      onUpdate: 'NO ACTION'
    })

    ListingAddress.belongsToMany(VehicleTracker, {
      as: 'vehicleTrackers',
      through: Listing,
      foreignKey: 'listing_address_id',
      otherKey: 'vehicle_tracker_id',
      onDelete: 'NO ACTION',
      onUpdate: 'NO ACTION'
    })
  }
}
