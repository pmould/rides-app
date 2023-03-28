import {FabrixController as Controller} from '@fabrix/fabrix/dist/common'
import {odometerOptions, tripStatusCode} from '../constants/Enums';

import * as Boom from 'boom';

import {Op, Sequelize} from 'sequelize';

import {asyncWrap} from '../utils';

import * as moment from 'moment';

import * as jsonPatch from 'fast-json-patch';
import { TripPhoto } from 'api/models';

/**
 * @module ReservationController
 * @description Reservation Controller.
 */
export class ReservationController extends Controller {
  async getById(request, h) {
    const {params: {reservationId}} = request;
    const {Reservation} = this.app.models
    
    return Reservation.findByIdDefault(reservationId);
  }

  async create(request, h) {
    const {auth: {credentials: {userId, accountId: driverId}}, query: {sessionId: socketSessionId}} = request
    const {initialMessage, ...reservation} = request.payload
    const {Reservation} = this.app.models
    const {NotificationService} = this.app.services;

    let redisClient = this.app.redisClient

    const {error, data: reservationData} = await asyncWrap(Reservation.create({...reservation, statusCodeId: 0}));
    const reservationPayload = await Reservation.findByIdDefault(reservationData.id);
    const {id: reservationId, listing: {hostId: recipientAccountId}} = reservationPayload;

    const room = `trip-${reservationId}-host-account-${reservation.hostId}-driver-account-${driverId}`
    const payload = { // store each message as a JSON object
      message: initialMessage,
      id: new Date().getTime(),
      createdByAccountId: driverId,
      createdByUserId: userId
    };

    await redisClient.rpushAsync(room, JSON.stringify(payload));

  
    const messageNotificationRoom = `${recipientAccountId}-message-notification`;
    const socket = this.app.io.sockets.sockets[socketSessionId];
    if (!socket) {
      // TODO: Error Handling
    }

    let messageData = {
      unReadMessageGroupsCount: 0,
      unReadMessageDriverGroupsCount: 0,
      unReadMessageHostGroupsCount: 0,
      messageGroups: []
    };
    const newMessageNotificationGroup = {
      messageGroupId: `${room}-${new Date().getTime()}`,
      room,
      messageType: 'host',
      read: false,
      reservationId,
      messages: [{...payload, read: false}]
    }
    // Send Trip Message Notification
    const messageDataJSON = await redisClient.hgetAsync('message-notifications', recipientAccountId);

    // Find the trip's notifications object for the recepient
    // If found append the new notification to the trips notifications, 
    // Else create new trip notifications list including new notification
    let foundUnReadRoom = false;
    if (messageDataJSON) {
      messageData = JSON.parse(messageDataJSON);
      messageData.messageGroups = messageData.messageGroups || [];
      var messageGroup = messageData.messageGroups.find(x => x.room === room);
      if (messageGroup) {
        messageGroup.messages.unshift({...payload, read: false});
        foundUnReadRoom = true;
      }
      else {
        messageData.messageGroups.unshift(newMessageNotificationGroup);
      }
    }
    else {
      messageData.messageGroups.unshift(newMessageNotificationGroup);
    }

    if (!foundUnReadRoom) {
      messageData.unReadMessageGroupsCount = messageData.messageGroups.length;
      messageData.unReadMessageDriverGroupsCount = messageData.messageGroups
        .filter(messageGroup => messageGroup.messageType === 'driver')
        .length;
      messageData.unReadMessageHostGroupsCount = messageData.messageGroups
        .filter(messageGroup => messageGroup.messageType === 'host')
        .length;
    }


    redisClient.hsetAsync('message-notifications', recipientAccountId, JSON.stringify(messageData));
    socket.to(messageNotificationRoom).emit('message-notification-room', messageData);


    // Send Dashboard Notification
    await NotificationService.sendTripStatusNotification(reservationPayload, socketSessionId, driverId);
    // let notificationsDataJSON = await redisClient.hgetAsync('notifications', recipientAccountId);
    // let notificationsData = notificationsDataJSON && JSON.parse(notificationsDataJSON) || {
    //   unNotifiedNotificationsCount: 0,
    //   notifications: []
    // };
    
    // notificationsData.unNotifiedNotificationsCount++;
    // notificationsData.notifications.push({
    //   message: 'Your trip has been booked',
    //   reservationId: reservationId,
    //   read: false, 
    //   type: 'trip-notification',
    //   id: new Date().getTime()
    // });

    // redisClient.hset('notifications', recipientAccountId, JSON.stringify(notificationsData));
    // socket.to(`notifications-${recipientAccountId}`).emit('notification-room', notificationsData);


    if (error) {
      console.log(error)
      return Boom.badImplementation()
    }

    return reservationPayload;
  }

  async getAllHost(request, h) {
    const {auth: {credentials: {accountId: hostId}}, query: {limit = 10, offset = 0}} = request
    const {Reservation} = this.app.models;
    
    const where = {hostId};
    const {error, data: reservations} = await asyncWrap(Reservation.findAndCountDefault({
      offset,
      limit
    }));

    if (error) {
      console.log(error);
      return Boom.badImplementation();
    }

    request.totalCount = reservations.count;
    return reservations;
  }
  async getAllDriver(request, h) {
    const {auth: {credentials: {accountId: driverId}}, query: {limit = 10, offset = 0}} = request;

    const {} = request;

    const {Reservation} = this.app.models;
    
    const where = {driverId};
    const reservations = await Reservation.findAndCountDefault({
      where,
      offset,
      limit
    })

    request.totalCount = reservations.count;
    return reservations.rows;
  }

  async getMessages(request, h) {
    const {auth: {credentials: {accountId, userId}}, query: {limit = 10, page = 1}, params: {profileType}} = request;

    if (profileType !== 'driver' && profileType !== 'host')
    {
      return Boom.badImplementation(`Incorrect profileType, '${profileType}' specified in URL Path`)
    }
    
    const {Reservation} = this.app.models;
    const redisClient = this.app.redisClient;
    const conversations = await redisClient.scanAsync(0, "MATCH", `*${profileType}-account-${accountId}*`, "COUNT", "100");

    const data = await Promise.all(conversations[1].map(async (room) => {
      const roomParts = room.split('-');
      const reservationId = Number(roomParts[1]);
      var obj = {room, read: false, reservationId};
      const messages = await redisClient.lrangeAsync(room, 0, -1);
      const parsedMessages = messages.map(msg => JSON.parse(msg));

      // Reading First Message
      if (parsedMessages.filter(x => x.createdByAccountId == accountId).length === parsedMessages.length) {
        obj.read = true;
      }
      // Check if message was read by recipeient - TODO: review
      const messageDataJSON = await redisClient.hgetAsync('message-notifications', accountId);
      if (messageDataJSON) {
        const messageData = JSON.parse(messageDataJSON);
        const messageGroupIndex = messageData.messageGroups && messageData.messageGroups
          .findIndex(msgRoom => msgRoom.room === room);
        const messageGroup = messageGroupIndex !== -1 && messageData.messageGroups[messageGroupIndex];

        obj['read'] = !(messageGroup && messageGroup.messageType == profileType);
      }
      
      // set messages and last messages for trip
      obj['messages'] = parsedMessages;
      const latestMessage = parsedMessages.reduce((latestMessage, item) => {
        return item.id > latestMessage.id
          ? item
          : latestMessage;
      }, {message: '', id: 0})


      obj['latestMessage'] = latestMessage;
      return obj;
    }));

    const count = conversations[1].length;
    const offset = limit * (page - 1);
    const end = offset + limit;
    const sortedData = data.sort((a: {latestMessage}, b: {latestMessage}) => b.latestMessage.id - a.latestMessage.id) || [];

    const filteredData = sortedData.slice(offset, end);

    const allIds = filteredData
      .map((x: {room}) => {
        let arr = x.room.split('-');
        const reservationId = arr[1];
        return reservationId;
      });
    
    const reservations = await Reservation.findAllDefault({
      where: {
        id: {
          [Op.in]: allIds
        }
      },
      order: [
        ['id', 'DESC']
      ]
    });

    const messages = filteredData.map((msgGroup, index) => {
      return {...msgGroup, reservation: reservations.find(x => x.id === msgGroup['reservationId'])};
    });

    return h.paginate({messages}, count, {key: 'messages'});
  }

  async getTripFeed(request, h) {
    const {auth: {credentials}, query: {limit = 10, page = 0}} = request;
    const {ReservationService} = this.app.services;

    const offset = limit * (page - 1);

    const {count: countInProgress, results: tripsInProgress}: {count: number, results: Array<Object>} =
    await ReservationService.getInProgressReservations(credentials, limit, offset);

    let trips = [];
    let count = countInProgress;

    const remainingOffset = Math.max(0, offset - countInProgress);
    const remainingLimit = limit - tripsInProgress.length;
    //    if ( countInProgress <= offset) {
    if (!countInProgress) {
      const {count: countUpComing, results: tripsUpcoming}: {count: number, results: Array<Object>} =
      await ReservationService.getUpcomingReservations(credentials, remainingLimit, remainingOffset);

      count += countUpComing;
      trips = tripsUpcoming;
    }
    else if (countInProgress < limit) {
      const {count: countUpComing, results: tripsUpcoming}: {count: number, results: Array<Object>} =
      await ReservationService.getUpcomingReservations(credentials, remainingLimit, remainingOffset);
    
      count += countUpComing;
      trips = tripsUpcoming.concat(tripsInProgress);
    }
    else {
      const {count: countUpComing, results: tripsUpcoming}: {count: number, results: Array<Object>} =
      await ReservationService.getUpcomingReservations(credentials, 0, 0);
      
      count += countUpComing;
      trips = tripsInProgress;
    }

    trips.sort((tripFirst, tripSecond) => {
      const timeFirst = (tripFirst['statusCodeId'] === tripStatusCode.INPROGRSS)
        ? tripFirst['startTime']
        : tripFirst['endTime'];
      
      const timeSecond = (tripSecond['statusCodeId'] === tripStatusCode.INPROGRSS)
        ? tripSecond['startTime']
        : tripSecond['endTime'];
       
      return moment(timeFirst).diff(moment(timeSecond));
    });

    return h.paginate({trips}, count, {key: 'trips'});
  }

  async getPastTrips(request, h) {
    const {auth: {credentials}, query: {limit = 10, page=1}} = request;
    const {ReservationService} = this.app.services;

    const offset = limit * (page - 1);

    const {count, results: trips}: {count: number, results: Array<Object>} = await ReservationService.getPastReservations(credentials, limit, offset);

    return h.paginate({trips}, count, {key: 'trips'});
  }

  async saveTripPhoto(request, h) {
    const {params: {reservationId}, auth: {credentials: {accountId}}} = request

    const {file = {}} = request.payload || {}
    const {TripPhotoService} = this.app.services
  
    const filesResponse = await TripPhotoService.save(file, reservationId, accountId)

   return filesResponse
  }

  async patch(request, h) {
    const {params: {reservationId}, payload: patches, query: {sessionId: socketSessionId},
     auth: {credentials: {accountId}}} = request;

    const {Reservation, TripPhoto} = this.app.models;
    const {NotificationService, TripPhotoService} = this.app.services;
    const {data: reservation, error} = await asyncWrap(Reservation.findByIdDefaultDAO(reservationId));

    let reservationUpdates;
    try {
      reservationUpdates = jsonPatch.applyPatch(jsonPatch.deepClone(reservation), patches).newDocument;
    }
    catch(error) {
      console.log(error)
      return Boom.badRequest("Invalid Patch operation");
    }

    const prevStatusCodeId = reservation.statusCodeId;

    await asyncWrap(reservation.update(reservationUpdates))

    if (reservation.statusCodeId !== prevStatusCodeId) {
      await NotificationService.sendTripStatusNotification(reservationUpdates, socketSessionId, accountId);
    }

    return Reservation.findByIdDefaultDAO(reservationId);
  }
};