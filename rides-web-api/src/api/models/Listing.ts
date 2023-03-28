import {FabrixModel as Model} from '@fabrix/fabrix/dist/common'
import {SequelizeResolver} from '@fabrix/spool-sequelize'
import {Listing as ListingQuery} from '../utils/queryDefaults/Listing'
import {GhPostCodeRegion, GhMajorCity} from '.'
export class ListingResolver extends SequelizeResolver {
  async findByIdDefault(id, options = {}) {
    options = this.app.services.SequelizeService.mergeOptionDefaults(
      ListingQuery.default(this.app)
    )
    const listing = await this.findById(id, options);

    return listing;
    // TODO: figure out redacting user private data
    // const model = listing.toJSON();

    // const host = model.host;
    // const {createdAt = '', updatedAt = '', ...userDisplayProps} = host && host.accountUser && host.accountUser[0] || {}
    // model.host = {...model.host, ...userDisplayProps}
    // delete model.host.accountUser;

    // return model;
  }

  async findAllDefault (options = {}) {
    options = this.app.services.SequelizeService.mergeOptionDefaults(
      ListingQuery.default(this.app),
      options || {},
      {distinct: true}
    )
    return this.findAll(options)
  }
}

/**
 * @module Listing
 * @description Listing Model
 */
export class Listing extends Model {
  static schema (app, Sequelize) {
    return {
      id: {
          type: Sequelize.INTEGER,
          field: 'id',
          allowNull: false,
          primaryKey: true,
          autoIncrement: true
      },
      listingAddressId: {
          type: Sequelize.INTEGER,
          field: 'listing_address_id',
          allowNull: true,
          references: {
              model: 'listing_address',
              key: 'id'
          },
          onUpdate: 'NO ACTION',
          onDelete: 'NO ACTION'
      },
      vehicleId: {
          type: Sequelize.INTEGER,
          field: 'vehicle_id',
      },
      advanceTime: {
          type: Sequelize.STRING,
          field: 'advance_time',
          allowNull: true
      },
      tripMinDuration: {
          type: Sequelize.STRING,
          field: 'trip_min_duration',
          allowNull: true
      },
      tripMaxDuration: {
          type: Sequelize.STRING,
          field: 'trip_max_duration',
          allowNull: true
      },
      published: {
          type: Sequelize.BOOLEAN,
          field: 'published',
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
      statusTypeId: {
          type: Sequelize.INTEGER,
          field: 'status_type_id',
          allowNull: true,
          references: {
              model: 'listing_status_type',
              key: 'id'
          },
          onUpdate: 'NO ACTION',
          onDelete: 'NO ACTION'
      },
      hostId: {
          type: Sequelize.INTEGER,
          field: 'host_id',
          allowNull: true,
          references: {
              model: 'account',
              key: 'id'
          },
          onUpdate: 'NO ACTION',
          onDelete: 'NO ACTION'
      },
      hostTypeId: {
          type: Sequelize.INTEGER,
          field: 'host_type_id',
          allowNull: true,
          references: {
              model: 'account_type',
              key: 'id'
          },
          onUpdate: 'NO ACTION',
          onDelete: 'NO ACTION'
      },
      coverPhoto: {
          type: Sequelize.STRING,
          field: 'cover_photo',
          allowNull: true
      },
      description: {
          type: Sequelize.STRING,
          field: 'description',
          allowNull: true
      },
      dailyRate: {
          type: Sequelize.DECIMAL(6, 2),
          field: 'daily_rate',
          allowNull: true
      },
      vehicleTrackerId: {
          type: Sequelize.INTEGER,
          field: 'vehicle_tracker_id',
          allowNull: true,
          references: {
              model: 'vehicle_tracker',
              key: 'id'
          },
          onUpdate: 'NO ACTION',
          onDelete: 'NO ACTION'
      },
      listingLocationId: {
        type: Sequelize.INTEGER,
        field: 'listing_location_id',
        allowNull: true,
        references: {
            model: 'listing_location',
            key: 'id'
        },
        onUpdate: 'NO ACTION',
        onDelete: 'NO ACTION'
      },
      registerListingStateId: {
        type: Sequelize.INTEGER,
        field: 'register_listing_state_id',
        allowNull: true,
        references: {
            model: 'state',
            key: 'id'
        },
        onUpdate: 'NO ACTION',
        onDelete: 'NO ACTION'
      },
      isActive: {
          type: Sequelize.BOOLEAN,
          field: 'is_active',
          defaultValue: true
      },
    }
  }

  static config () {
    return {
      store: 'postgresSequelize',
      options: {
        schema: 'public',
        tableName: 'listing'
      }
    }
  }

  static get resolver() {
    return ListingResolver
  }

  static associate(models) {
    const {Listing, State, ListingPhoto, ListingAddress, ListingLocation, ListingFeature, ListingListingFeatureMap, ListingVehicleTrackerMap,
      ListingStatusType, Account, User, AccountType, Vehicle, VehicleTracker, VehicleMake, VehicleModel} = models

    Listing.belongsTo(State, {
      as: 'registerListingState',
      foreignKey: 'registerListingStateId',
      onDelete: 'NO ACTION',
      onUpdate: 'NO ACTION'
    });
    
    Listing.hasMany(ListingListingFeatureMap, {
        as: 'listingListingFeatureMaps',
        foreignKey: 'listingId',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    })

    Listing.hasMany(ListingPhoto, {
        as: 'listingPhotos',
        foreignKey: 'listingId',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    })

    Listing.hasMany(ListingVehicleTrackerMap, {
        as: 'listingVehicleTrackerMaps',
        foreignKey: 'listingId',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    })

    Listing.belongsTo(Account, {
        as: 'host',
        foreignKey: 'hostId',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    })
    
    Listing.belongsTo(ListingAddress, {
        as: 'listingAddress',
        foreignKey: 'listingAddressId',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    })

    Listing.belongsTo(ListingLocation, {
      as: 'listingLocation',
      foreignKey: 'listingLocationId',
      onDelete: 'NO ACTION',
      onUpdate: 'NO ACTION'
    })

    Listing.belongsTo(ListingStatusType, {
        as: 'statusType',
        foreignKey: 'statusTypeId',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    })

    Listing.belongsTo(VehicleTracker, {
        as: 'vehicleTracker',
        foreignKey: 'vehicleTrackerId',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    })

    Listing.belongsToMany(ListingFeature, {
        as: 'listingFeatures',
        through: ListingListingFeatureMap,
        foreignKey: 'listingId',
        otherKey: 'listingFeatureId',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    })

    Listing.belongsTo(Vehicle, {
      as: 'vehicle',
      foreignKey: 'vehicleId',
      onDelete: 'NO ACTION',
      onUpdate: 'NO ACTION'
    })

    // Error: Cyclic dependency found. public.listing is dependent of itself.
    // Dependency chain: public.listing -> public.vehicle_tracker => public.listing

    // Listing.belongsToMany(VehicleTracker, {
    //     as: 'vehicleTrackers',
    //     through: ListingVehicleTrackerMap,
    //     foreignKey: 'listingId',
    //     otherKey: 'vehicleTrackerId',
    //     onDelete: 'NO ACTION',
    //     onUpdate: 'NO ACTION'
    // })

  }
}

Listing.prototype.toJSON = function() {
  var model = Object.assign({}, this.get({
    plain: true
  }));

  if (model.vehicle && model.vehicle.vehicleRegistration) {
    model.vehicleRegistration = model.vehicle.vehicleRegistration
    delete model.vehicle.vehicleRegistration
  }

  model.photos = model.listingPhotos
  delete model.listingPhotos

  const host = model.host;
  const {createdAt = '', updatedAt = '', id:xId=0 , password = '', ...userDisplayProps} = host && host.accountUser && host.accountUser[0] || {}
  model.host = {...model.host, ...userDisplayProps}
  delete model.host.accountUser;

  if(!model.listingLocation)
  {
    model.listingLocation = {};
  }
  return JSON.parse(JSON.stringify(model));
}
