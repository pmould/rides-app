import {FabrixService as Service} from '@fabrix/fabrix/dist/common'

import {odometerOptions, tripStatusCode} from '../constants/Enums';

import * as Boom from 'boom';

import {Op, Sequelize} from 'sequelize';

import {asyncWrap} from '../utils';

/*
 * @module ReservationService
 * @description Reservation Service
 */
export class ReservationService extends Service {
  async onBeforeUpdate(reservation, options) {
    const {Reservation}  = this.app.models;

    const {model = {}} = options;

    if (model.statusCodeId ! == undefined && model.statusCodeId !== reservation.statusCodeId) {
      // Send Notification
      console.log("Send Notification");
    }
  }

  async getInProgressReservations(credentials, limit, offset) {
    const {accountId} = credentials;
    const {Reservation} = this.app.models;

    return Reservation.findAndCountDefault({
      limit,
      offset,
      where: {
        [Op.and]: [
          {
            endDate: {
              [Op.gt]: new Date()
            }
          }, {
            [Op.or]: [
              {driverId: accountId},
              {'$reservationListing.host_id$': accountId},
            ],
          },
          {
            statusCodeId: {
              [Op.in]: [tripStatusCode.INPROGRSS, tripStatusCode.DRIVER_END_TRIP]
            }
          }
        ]
      },
      order: [['endDate', 'DESC']]
    });
  }

  async getUpcomingReservations(crendetials, limit, offset) {
    const {accountId} = crendetials;
    const {Reservation} = this.app.models;

    return Reservation.findAndCountDefault({
      limit,
      offset,
      where: {
        [Op.and]: [
          {
            endDate: {
              [Op.gt]: new Date()
            }
          }, {
            [Op.or]: [
              {driverId: accountId},
              {'$reservationListing.host_id$': accountId},
            ],
          },
          {
            statusCodeId: {
              [Op.in]: [tripStatusCode.APPROVED, tripStatusCode.AUTHORIZED]
            }
          }
        ]
      },
      order: [['startDate', 'DESC']]
    });
  }

  async getPastReservations(credentials, limit, offset) {
    const {accountId} = credentials;
    const {Reservation} = this.app.models;

    return Reservation.findAndCountDefault({
      limit,
      offset,
      where: {
        [Op.and]: [
          {
            [Op.or]: [
              {driverId: accountId},
              {'$reservationListing.host_id$': accountId},
            ],
          },
          {
            statusCodeId: {
              [Op.in]: [tripStatusCode.COMPLETED]
            }
          }
        ]
      },
      order: [['endDate', 'DESC']]
    });
  }
}