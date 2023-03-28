import {FabrixModel as Model} from '@fabrix/fabrix/dist/common'
import {SequelizeResolver} from '@fabrix/spool-sequelize'
import {Reservation as ReservationQuery} from '../utils/queryDefaults/Reservation'

import {tripStatusCodeString} from '../constants/Enums'

export class ReservationResolver extends SequelizeResolver {
  defaultMap = (model) => {    
      // const host = model.host;
      // const {createdAt = '', updatedAt = '', id = 0,  ...userDisplayProps} = host && host.accountUser && host.accountUser[0] || {}
      // model.host = {...model.host, ...userDisplayProps}
      // delete model.host.accountUser;
     

      const driver = model.driver;
      const {createdAt: x = '', updatedAt: y = '', id: resId = 0, ...driverUserDisplayProps} = driver && driver.accountUser && driver.accountUser[0] || {}
      model.driver = {...model.driver, ...driverUserDisplayProps}
      delete model.driver.accountUser;
   return model;
  };
  async findByIdDefault(id, options = {}) {
    options = this.app.services.SequelizeService.mergeOptionDefaults(
      ReservationQuery.default(this.app),
       options
    )
    
    const result = await this.findById(id, options);
    
    return this.defaultMap(result.toJSON());
  }
  async findByIdDefaultDAO(id, options = {}) {
    options = this.app.services.SequelizeService.mergeOptionDefaults(
      ReservationQuery.default(this.app),
       options
    )
    
    const result = await this.findById(id, options);
    
    return result;
  }

  async findAllDefault(options = {}) {
    options = this.app.services.SequelizeService.mergeOptionDefaults(
      ReservationQuery.default(this.app),
       options
    )
    
    const result = await this.findAll(options);
    
    return result;
  }

  /*
  * @param options
  * @returns {Promise.<{count: Integer, rows: Model[]}>}
  */
 async findAndCountDefault (options = {}) {
   options = this.app.services.SequelizeService.mergeOptionDefaults(
    ReservationQuery.default(this.app),
     options
   )
   const {count, rows: results} = await this.findAndCountAll(options);
   const rows = results.map((x) => this.defaultMap(x.toJSON));

   return ({count, results});
 }
}

/**
 * @module Reservation
 * @description TODO document Model
 */
export class Reservation extends Model {
  static schema(app, Sequelize) {
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
      // hostId: {
      //   type: Sequelize.INTEGER,
      //   field: 'host_id',
      //   allowNull: false,
      //   references: {
      //     model: 'account',
      //     key: 'id'
      //   },
      //   onUpdate: 'NO ACTION',
      //   onDelete: 'NO ACTION'
      // },
      driverId: {
        type: Sequelize.INTEGER,
        field: 'driver_id',
        allowNull: false,
        references: {
          model: 'account',
          key: 'id'
        },
        onUpdate: 'NO ACTION',
        onDelete: 'NO ACTION'
      },
      vehicleId: {
        type: Sequelize.INTEGER,
        field: 'vehicle_id',
        allowNull: false,
        references: {
          model: 'vehicle',
          key: 'id'
        },
        onUpdate: 'NO ACTION',
        onDelete: 'NO ACTION'
      },
      startDate: {
        type: Sequelize.DATE,
        field: 'start_date',
        allowNull: false
      },
      endDate: {
        type: Sequelize.DATE,
        field: 'end_date',
        allowNull: false
      },
      dailyRate: {
        type: Sequelize.INTEGER,
        field: 'daily_rate',
        allowNull: false
      },
      tax: {
        type: Sequelize.INTEGER,
        field: 'tax',
        allowNull: true
      },
      subTotal: {
        type: Sequelize.INTEGER,
        field: 'sub_total',
        allowNull: true
      },
      total: {
        type: Sequelize.INTEGER,
        field: 'total',
        allowNull: false
      },
      updatedAt: {
        type: Sequelize.DATE,
        field: 'updated_at',
        allowNull: true
      },
      createdAt: {
        type: Sequelize.DATE,
        field: 'created_at',
        allowNull: true
      },
      statusCodeId: {
        type: Sequelize.INTEGER,
        field: 'status_code_id',
        allowNull: true
      }
    }
  }

  static config(app, Sequelize) {
    return {
      store: 'postgresSequelize',
      options: {
        schema: 'public',
        tableName: 'reservation',
        hooks: {
          beforeUpdate: app.services.ReservationService.onBeforeUpdate
        }
      }
    }
  }
  
  static get resolver() {
    return ReservationResolver
  }

  static associate(models) {
    const {Reservation, Account, Listing, TripPhoto, Vehicle} = models

    Reservation.belongsTo(Account, {
      as: 'reservationDriver',
      foreignKey: 'driver_id',
      onDelete: 'NO ACTION',
      onUpdate: 'NO ACTION'
    })

    // Reservation.belongsTo(Account, {
    //   as: 'reservationHost',
    //   foreignKey: 'host_id',
    //   onDelete: 'NO ACTION',
    //   onUpdate: 'NO ACTION'
    // })

    Reservation.belongsTo(Vehicle, {
      as: 'reservationVehicle',
      foreignKey: 'vehicle_id',
      onDelete: 'NO ACTION',
      onUpdate: 'NO ACTION'
    })

    Reservation.belongsTo(Listing, {
      as: 'reservationListing',
      foreignKey: 'listing_id',
      onDelete: 'NO ACTION',
      onUpdate: 'NO ACTION'
    })

    Reservation.hasMany(TripPhoto, {
        as: 'tripPhotos',
        foreignKey: 'reservationId',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    })
  }
}

Reservation.prototype.toJSON = function () {
var model = Object.assign({}, this.get());

if (model.statusCodeId !== undefined) 
model.statusCode = tripStatusCodeString[model.statusCodeId];

// model.reservationHost;
// model.host = model.reservationHost;
// delete model.reservationHost;

const {accountUser, ...driver} = model.reservationDriver.dataValues;
const {createdAt: x = '', updatedAt: y = '', id: resId = 0, ...driverUser} = driver && accountUser && accountUser[0].dataValues || {}
model.driver = {...driver, ...driverUser}
delete model.reservationDriver;

model.reservationListing;
model.listing = model.reservationListing;
delete model.reservationListing;

model.reservationVehicle;
model.vehicle = model.reservationVehicle;
delete model.reservationVehicle;

return JSON.parse(JSON.stringify(model))
}
