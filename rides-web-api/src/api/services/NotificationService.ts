import {FabrixService as Service} from '@fabrix/fabrix/dist/common'
import {tripStatusCode} from '../constants/Enums';
import * as webPush from 'web-push';
import {Op, Sequelize} from 'sequelize';
import {vapidPublicKey, vapidPrivateKey} from '../constants';

/**
 * @module NotificationService
 * @description Notificaion Service.
 */
export class NotificationService extends Service {
  async sendTripStatusNotification(reservation, socketSessionId, accountId) {
    const {id: reservationId, listing: {host: {id: hostId}}, driverId, driver: {firstName}, statusCodeId} = reservation;

    const isHost = accountId === hostId;

    let message = '';
    switch(statusCodeId) {
      case tripStatusCode.PENDING: {
        message = `Your vehicle has been booked by ${firstName}`;
        break;
      }

      case tripStatusCode.APPROVED: {
        message = 'Your trip has been approved your host';
        break;
      }
      case tripStatusCode.AUTHORIZED: {
        message = 'Your trip has been authorized by your host';
        break;
      }
      case tripStatusCode.INPROGRSS: {
        message = `Trip has been started by ${firstName}`;
        break;
      }
      case tripStatusCode.DRIVER_END_TRIP: {
        message = `Trip has been ended by ${firstName}`;
        break;
      }
      case tripStatusCode.COMPLETED: {
        message = 'Your trip has been completed by your host';
        break;
      }
    }

    const notification = {
      message,
      statusCodeId: statusCodeId,
      reservationId: reservationId,
      isHost,
      read: false, 
      type: 'trip-notification',
      id: new Date().getTime()
    };

    if (statusCodeId === tripStatusCode.DECLINED || statusCodeId === tripStatusCode.APPROVED || statusCodeId === tripStatusCode.AUTHORIZED || statusCodeId === tripStatusCode.COMPLETED) {
      this.sendNotification(notification, driverId, socketSessionId)
      this.sendWebPushNotification(notification, driverId)
    }
    else if (statusCodeId === tripStatusCode.PENDING || statusCodeId === tripStatusCode.INPROGRSS || tripStatusCode.DRIVER_END_TRIP) {
      this.sendNotification(notification, hostId, socketSessionId)
      this.sendWebPushNotification(notification, hostId)
    }
  }

  async sendNotification(notification, recipientAccountId, socketSessionId) {
    const redisClient = this.app.redisClient;

    let notificationsDataJSON = await redisClient.hgetAsync('notifications', recipientAccountId);
    let notificationsData = notificationsDataJSON && JSON.parse(notificationsDataJSON) || {
      unNotifiedNotificationsCount: 0,
      notifications: []
    };
    
    notificationsData.unNotifiedNotificationsCount++;
    notificationsData.notifications.push(notification);

    redisClient.hset('notifications', recipientAccountId, JSON.stringify(notificationsData));
    const socket = this.app.io.sockets.sockets[socketSessionId];
    if (!socket) {
      // TODO: Error Handling
    }

    // Set last notification as pending
    notificationsData.notifications[notificationsData.notifications.length - 1].pendingAlert = true;
    socket.to(`notifications-${recipientAccountId}`).emit('notification-room', notificationsData);
  }

  async sendWebPushNotification(notification, recipientAccountId) {
    const {User, WebPushSubscription} = this.app.models

    const users = await User.findAll({
      where: {
        accountId: recipientAccountId
      },
      include: [
        {
          association: User.instance.associations.webPushSubscriptions,
          where: {
            [Op.and]: [
              {
                subscription: {
                  [Op.ne]: null
                }
              },
              {
                isActive: true
              }]

          }
        }
      ]
    });
  
    const options = {
      TTL: 60,
      vapidDetails: {
        subject: 'mailto:paul.mould1@gmail.com',
        publicKey: vapidPublicKey,
        privateKey: vapidPrivateKey
      }
    };

    users.flatMap(x => x.webPushSubscriptions || [])
      .filter(x => x.subscription)
      .map(x => JSON.parse(x.subscription))
      .forEach(subscription => {
        webPush.sendNotification(
          subscription,
          JSON.stringify(notification),
          options,
        );
      });
  }
}