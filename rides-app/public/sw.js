
const isProd = false;
const isProdDomain = false;

const urlRoot = isProdDomain ?  'https://ghanarides.com' : 'localhost:3000';

if (isProd) {
  importScripts('./workbox-v4.3.0/workbox-sw.js')

  workbox.setConfig({
    modulePathPrefix: './workbox-v4.3.0/'
  });

  // Note: Ignore the error that Glitch raises about workbox being undefined.
  workbox.core.skipWaiting();
  workbox.core.clientsClaim();

  workbox.precaching.precacheAndRoute([]);

  workbox.routing.registerRoute(/.*ghLocationSearchTaxonomy/, new workbox.strategies.StaleWhileRevalidate())
  workbox.routing.registerRoute(/.*searchListings/, new workbox.strategies.StaleWhileRevalidate())
  workbox.routing.registerRoute(/profiles\/\w/, new workbox.strategies.StaleWhileRevalidate())
}

self.addEventListener('install', function(event) {
  // The promise that skipWaiting() returns can be safely ignored.
  self.skipWaiting();

  // Perform any other actions required for your
  // service worker to install, potentially inside
  // of event.waitUntil();
});

self.addEventListener('activate', event => {
  event.waitUntil(clients.claim());
});


self.addEventListener('notificationclose', event => {
  const notification = event.notification;
  const {id} = notification.data && notification.data.notification;

  console.log('Closed notification: ' + id);
});

self.addEventListener('notificationclick', event => {
  const notification = event.notification || {};
  const {reservationId, statusCodeId, isHost} = notification.data && notification.data.notification;
  const pendingReservation = [0,1].indexOf(statusCodeId) !== -1;
  const urlPath = pendingReservation
    ?  `/${isHost ? 'host' : 'driver'}/messages/reservation/${reservationId}`
    : `/trips/${reservationId}`

  if (pendingReservation) {

  }
  const navigateToUrl = reservationId && `${urlRoot}${urlPath}`;

  const action = event.action;

  if (action === 'close') {
    notification.close();
  } else {
    event.waitUntil(
      clients.matchAll().then(clis => {
        const client = clis.find(c => {
          return c.visibilityState === 'visible';
        });
        if (client !== undefined) {
          if(navigateToUrl) {
            client.navigate(navigateToUrl);
            client.focus();
          }

        } else {
          // there are no visible windows. Open one.
          clients.openWindow(navigateToUrl);
          notification.close();
        }
      })
    );
  }

  self.registration.getNotifications().then(notifications => {
    notifications.forEach(notification => {
      notification.close();
    });
  });
});

self.addEventListener('push', event => {
  console.log('\1: \n');
  let notification;

  if (event.data) {
      console.log('\2: \n');
    notification = event.data.json();
      console.log('\3: \n');
  } else {
    notification = {
      message: 'Gh Rides Notification'
    }
  }
    console.log('\4: \n');
  const {message = 'Gh Rides Notification'} = notification;

  const options = {
    body: message,
    requireInteraction: true,
    icon: 'car-black-white-yellow-icon.png',
    image: 'car-black-white-yellow-icon.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      notification
    },
    actions: [
      {action: 'explore', title: 'Go to the site',
        icon: '/checkmark.png'},
      {action: 'close', title: 'Close the notification',
        icon: '/xmark.png'},
    ]
  };
  console.log('\5: \n');
  event.waitUntil(
    clients.matchAll().then(c => {
      console.log(c);
       console.log('\6: \n');
      if (true || c.length === 0) {
        console.log('\7: \n');
        // Show notification
        self.registration.showNotification('GH Rides', options);
      } else {
        // Send a message to the page to update the UI
        console.log('Application is already open!');
      }
    })
  );
});

