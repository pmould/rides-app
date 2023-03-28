import { FabrixModel as Model } from '@fabrix/fabrix/dist/common'
import { SequelizeResolver } from '@fabrix/spool-sequelize'

export class User extends Model {
  static schema (app, Sequelize) {
    return {
      id: {
        type: Sequelize.INTEGER,
        field: 'id',
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      accountTypeId: {
          type: Sequelize.INTEGER,
          field: 'account_type_id',
          allowNull: false,
          references: {
              model: 'account_type',
              key: 'id'
          },
          onUpdate: 'NO ACTION',
          onDelete: 'NO ACTION'
      },
      accountRefNumber: {
          type: Sequelize.STRING,
          field: 'account_ref_number',
          allowNull: true
      },
      firstName: {
          type: Sequelize.STRING,
          field: 'first_name',
          allowNull: true
      },
      lastName: {
          type: Sequelize.STRING,
          field: 'last_name',
          allowNull: true
      },
      name: {
          type: Sequelize.STRING,
          field: 'name',
          allowNull: true
      },
      dob: {
          type: Sequelize.DATEONLY,
          field: 'dob',
          allowNull: true
      },
      businessRegistrationNumber: {
          type: Sequelize.STRING,
          field: 'business_registration_number',
          allowNull: true
      },
      taxIndentificationNumber: {
          type: Sequelize.STRING,
          field: 'tax_indentification_number',
          allowNull: true
      },
      inuranceProvider: {
          type: Sequelize.STRING,
          field: 'inurance_provider',
          allowNull: true
      },
      inusrancePolicyNumber: {
          type: Sequelize.STRING,
          field: 'inusrance_policy_number',
          allowNull: true
      },
      website: {
          type: Sequelize.STRING,
          field: 'website',
          allowNull: true
      },
      address: {
          type: Sequelize.STRING,
          field: 'address',
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
      active: {
        type: Sequelize.BOOLEAN,
        field: 'active',
        allowNull: true
      },
      telephone: {
        type: Sequelize.STRING,
        field: 'telephone',
        allowNull: true
      },
      email: {
        type: Sequelize.STRING,
        field: 'email',
        allowNull: true
      },
      address: {
        type: Sequelize.STRING,
        field: 'address',
        allowNull: true
      }
    }
  }

  static config (app, Sequelize) {
    return {
       store: 'postgresSequelize'
     }
  }
  
  static get resolver () {
    return SequelizeResolver
  }
  
  static associate(models) {
    const {Account, AccountType, Company, Listing, ListingAddress, ListingPhoto, ListingStatusType, User, VehicleTracker} = models;

    Account.hasMany(Listing, {
        as: 'accountListing',
        foreignKey: 'hostId',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Account.hasMany(User, {
        as: 'accountUser',
        foreignKey: 'accountId',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Account.belongsTo(AccountType, {
        as: 'AccountType',
        foreignKey: 'accountTypeId',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Account.belongsToMany(ListingAddress, {
        as: 'listingListingAddresses',
        through: Listing,
        foreignKey: 'hostId',
        otherKey: 'listingAddressId',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Account.belongsToMany(ListingStatusType, {
        as: 'listingStatusTypes',
        through: Listing,
        foreignKey: 'hostId',
        otherKey: 'statusTypeId',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Account.belongsToMany(VehicleTracker, {
        as: 'VehicleTracker',
        through: Listing,
        foreignKey: 'hostId',
        otherKey: 'vehicleTrackerId',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Account.belongsToMany(AccountType, {
        as: 'acountTypes',
        through: User,
        foreignKey: 'accountId',
        otherKey: 'accountTypeId',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });
  }
}