import io from 'socket.io-client';
import {throttle} from 'lodash';
import { RealtimeConnected } from '../containers/Header/styled-components';

var socket;
export const rooms = {
  chatRoom: '',
  tripSharedMeetUp: ''
};
const cacheData = {
  userId: null,
  accountId: null,
  actions: null,
  reservationId: null
};

var lastMessageId = null;

export const setRealtime = (actions) => {
  socket = io('http://localhost:8000', {
    reconnectionAttempts: 10,
    reconnectionDelay: 10000
  });
  // console.log('socket', socket);

  if (actions) {
    cacheData.actions = actions;
  }
  socket.on('connect', () => {
    // console.log('connect');
    cacheData.actions.setSocketSessionId(socket.id);
  });


  socket.on('connectToRoom', () => {
    cacheData.actions.onJoinedRoom();
  });

  // socket.on('message', (message) => {
  //   lastMessageId = message.id;
  //   cacheData.actions.recievedMessage(message);
  //   if (rooms.chatRoom == message.room) {
  //     socket.emit('clear-room-message-notifications', {
  //       accountId: cacheData.accountId,
  //       room: message.room
  //     });
  //   }
  // });

  socket.on('message-notification-room-init', data => {

    cacheData.actions.receiveMessageNotifications(data, true);
  });

  socket.on('message-notification-room', (data) => {
    const room = rooms.chatRoom;

    if (data.lastMessageId != lastMessageId) {
      cacheData.actions.receiveMessageNotifications(data);
    }
  });

  socket.on('notification-room', (message) => {
    cacheData.actions.recieveAllNotifications(message, cacheData.reservationId);
  });

  socket.on('clear-message-notifications', (data) => {
    cacheData.actions.clearMessageNotifications();
  });

  socket.on('clear-notifications', (data) => {
    cacheData.actions.clearNotifications();
  });

  socket.on('reconnect', () => {
    //console.log('reconnect');
    rooms.chatRoom && joinRoom();
    joinMessageNotificationRoom();
    cacheData.actions.setRealTimeConnected(true);
  });

  socket.on('disconnect', () => {
    cacheData.actions.setRealTimeConnected(false);
  });

  socket.on('connect_timeout', () => {
    //console.log('connect_timeout');
    setRealtime(actions);
  });

  socket.on('connect_error', () => {
    //console.log('connect_error');
    // setRealtime(actions, user);
  });
}

export const clearPageCacheData = () => {
  rooms.chatRoom = '';
  cacheData.reservationId = null;
  lastMessageId = null;
}
export const clearNotifications = (accountId) => {
  socket.emit('clear-notification-room', {
    accountId
  });
}

export const joinMessageNotificationRoom = (accountId) => {
  if (accountId) {
    cacheData.accountId = accountId;
  }

  socket.emit('message-notification-room', {
    accountId: cacheData.accountId
  });
}

export const joinTripMeetupLocation = (reservationId) => {
  if (!reservationId) return;
  const room = `tripMeetUpLocation-${reservationId}`;
  rooms.tripSharedMeetUp = room;
  cacheData.reservationId = reservationId;
  socket.emit('trip-meet-up-location-room', {room});

  socket.on('trip-meet-up-location', (data) => {
    cacheData.actions.setTripMeetUpSharedLocation(data);
  });
}

export const sendTripMeetupLocation = (coords) => {
  socket.emit('trip-meet-up-location', {room: rooms.tripSharedMeetUp,
  payload: {
  longitude: coords.longitude,
  latitude: coords.latitude,
  updatedAt: Date.now()
  }});
}
export const joinRoom = (room, userId, accountId, isDriver, actions, reservationId) => {
  if (room) {
    rooms.chatRoom = room;
  };
  if (userId) {
    cacheData.userId = userId;
  }
  if (accountId) {
    cacheData.accountId = accountId;
  }
  if (reservationId) {
    cacheData.reservationId = reservationId;
  }

  if (actions) {
    cacheData.actions = actions;
  }

  socket.emit('room', {
    room: rooms.chatRoom,
    userId: cacheData.userId,
    accountId: cacheData.accountId,
    isDriver
  });

  socket.on(room, (message) => {
    if (rooms.chatRoom) {
      lastMessageId = message.id;
    }

    cacheData.actions.recievedMessage(message);
    if (rooms.chatRoom == message.room) {
      socket.emit('clear-room-message-notifications', {
        accountId: cacheData.accountId,
        room: message.room
      });
    }
  });

  socket.on('getAllMessages', (message) => {
    cacheData.actions.recieveAllMessagges(message);
  });

  socket.on('isTyping', (isTyping) => {
    cacheData.actions.updateIsTyping(isTyping);
    console.log('UPDATE IS TYPING', isTyping )
  });
};

export const sendUpdate = (room, message, userId, accountId, recipientAccountId, isDriver) => {
  socket.emit('io:message', {
    room,
    message,
    userId,
    recipientAccountId,
    isDriver
  });
  console.log('Message sent, ', room);
}

let x = 0;
export const sendIsTyping = throttle((isTyping, room, userId) => {
  console.log('sendIsTyping', x++, isTyping)
  socket.emit('io:isTyping', {
    room,
    userId,
    isTyping
  });
  console.log('Message sent, ', room);
}, 2000, {
    trailing: false 
});