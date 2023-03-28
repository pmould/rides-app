import {FabrixModel as Model} from '@fabrix/fabrix/dist/common'
import {SequelizeResolver} from '@fabrix/spool-sequelize'

export class AccountType extends Model {
  static schema(app, Sequelize) {
    return {
      id: {
        type: Sequelize.INTEGER,
        field: 'id',
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      accountType: {
        type: Sequelize.STRING(25),
        field: 'account_type',
        allowNull: true
      }
    }
  }

  static config(app, Sequelize) {
    return {
      store: 'postgresSequelize',
      options: {
        schema: 'public',
        tableName: 'account_type',
        timestamps: false
      }
    }
  }

  static get resolver() {
    return SequelizeResolver
  }

  static associate(models) {
    const {AccountType, Account, Listing, ListingPhoto, ListingAddress, ListingStatusType,
      User, Vehicle, VehicleTracker, VehicleModel} = models

    AccountType.hasMany(Account, {
      as: 'accountTypeAccounts',
      foreignKey: 'account_type_id',
      onDelete: 'NO ACTION',
      onUpdate: 'NO ACTION'
    })

    AccountType.hasMany(Listing, {
      as: 'listings',
      foreignKey: 'host_type_id',
      onDelete: 'NO ACTION',
      onUpdate: 'NO ACTION'
    })

    AccountType.hasMany(User, {
      as: 'AccountTypeUsers',
      foreignKey: 'account_type_id',
      onDelete: 'NO ACTION',
      onUpdate: 'NO ACTION'
    })

    AccountType.belongsToMany(Account, {
      as: 'AccountTypeAccounts',
      through: Listing,
      foreignKey: 'host_type_id',
      otherKey: 'host_id',
      onDelete: 'NO ACTION',
      onUpdate: 'NO ACTION'
    })

    AccountType.belongsToMany(ListingAddress, {
      as: 'listingAddresses',
      through: Listing,
      foreignKey: 'host_type_id',
      otherKey: 'listing_address_id',
      onDelete: 'NO ACTION',
      onUpdate: 'NO ACTION'
    })

    AccountType.belongsToMany(ListingStatusType, {
      as: 'listingStatusTypes',
      through: Listing,
      foreignKey: 'host_type_id',
      otherKey: 'status_type_id',
      onDelete: 'NO ACTION',
      onUpdate: 'NO ACTION'
    })

    AccountType.belongsToMany(Vehicle, {
      as: 'vehicles',
      through: Listing,
      foreignKey: 'host_type_id',
      otherKey: 'vehicle_id',
      onDelete: 'NO ACTION',
      onUpdate: 'NO ACTION'
    })

    AccountType.belongsToMany(VehicleTracker, {
      as: 'vehicleTrackers',
      through: Listing,
      foreignKey: 'host_type_id',
      otherKey: 'vehicle_tracker_id',
      onDelete: 'NO ACTION',
      onUpdate: 'NO ACTION'
    })

    AccountType.belongsToMany(Account, {
      as: 'accounts',
      through: User,
      foreignKey: 'account_type_id',
      otherKey: 'account_id',
      onDelete: 'NO ACTION',
      onUpdate: 'NO ACTION'
    })
  }
}