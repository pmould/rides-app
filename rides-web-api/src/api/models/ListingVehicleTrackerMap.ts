import {FabrixModel as Model} from '@fabrix/fabrix/dist/common'
import {SequelizeResolver} from '@fabrix/spool-sequelize'

/**
 * @module ListingVehicleTrackerMap
 * @description ListingVehicleTrackerMap model
 */
export class ListingVehicleTrackerMap extends Model {
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
          allowNull: false,
          references: {
              model: 'listing',
              key: 'id'
          },
          onUpdate: 'NO ACTION',
          onDelete: 'NO ACTION'
      },
      vehicleTrackerId: {
          type: Sequelize.INTEGER,
          field: 'vehicle_tracker_id',
          allowNull: false,
          references: {
              model: 'vehicle_tracker',
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
        tableName: 'vehicle_tracker'
      }
    }
  }

  static get resolver() {
    return SequelizeResolver
  }

  static associate(models) {
    const {ListingVehicleTrackerMap, Listing, VehicleTracker} = models

    ListingVehicleTrackerMap.belongsTo(Listing, {
      as: 'ListingVehicleTrackerMapListing',
      foreignKey: 'listingId',
      onDelete: 'NO ACTION',
      onUpdate: 'NO ACTION'
    })

    ListingVehicleTrackerMap.belongsTo(VehicleTracker, {
        as: 'vehicleTracker',
        foreignKey: 'vehicleTrackerId',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    })
  }
}
