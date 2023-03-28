import {FabrixModel as Model} from '@fabrix/fabrix/dist/common'
import {SequelizeResolver} from '@fabrix/spool-sequelize'

/**
 * @module VehicleTracker
 * @description VehicleTracker model
 */
export class VehicleTracker extends Model {
  static schema (app, Sequelize) {
    return {
      id: {
          type: Sequelize.INTEGER,
          field: 'id',
          allowNull: false,
          primaryKey: true
      },
      typeId: {
          type: Sequelize.INTEGER,
          field: 'type_id',
          allowNull: false
      },
      name: {
          type: Sequelize.STRING,
          field: 'name',
          allowNull: true
      },
      description: {
          type: Sequelize.STRING,
          field: 'description',
          allowNull: true
      },
      make: {
          type: Sequelize.STRING,
          field: 'make',
          allowNull: true
      },
      model: {
          type: Sequelize.STRING,
          field: 'model',
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
        tableName: 'vehicle_tracker'
      }
    }
  }

     
  static get resolver() {
    return SequelizeResolver
  }
 
  static associate(models) {
    const {VehicleTracker, ListingVehicleTrackerMap, Listing} = models

    VehicleTracker.hasMany(ListingVehicleTrackerMap, {
      as: 'listingVehicleTrackerMaps',
      foreignKey: 'vehicleTrackerId',
      onDelete: 'NO ACTION',
      onUpdate: 'NO ACTION'
    })


    //TODO: Error: Cyclic dependency found. public.listing is dependent of itself.
    //Dependency chain: public.listing -> public.vehicle_tracker => public.listing

    // VehicleTracker.belongsToMany(Listing, {
    //     as: 'listings',
    //     through: ListingVehicleTrackerMap,
    //     foreignKey: 'vehicleTrackerId',
    //     otherKey: 'listingId',
    //     onDelete: 'NO ACTION',
    //     onUpdate: 'NO ACTION'
    // })

  }
}
