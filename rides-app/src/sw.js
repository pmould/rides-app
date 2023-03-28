

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


self.addEventListener('notificationclose', event => {
  const notification = event.notification;
  const id = notification.data.id;

  console.log('Closed notification: ' + id);
});

self.addEventListener('notificationclick', event => {
  const notification = event.notification || {};
  const {reservationId} = notification.data;
  const navigateToUrl = reservationId && `/reservation/${reservationId}`;

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
  let notification;

  if (event.data) {
    notification = event.data.json();
  } else {
    notification = {
      message: 'Gh Rides Notification'
    }
  }
  const {message = 'Gh Rides Notification'} = notification;

  const options = {
    body: message,
    icon: 'images/notification-flat.png',
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
  
  event.waitUntil(
    clients.matchAll().then(c => {
      console.log(c);
      if (c.length === 0) {
        // Show notification
        self.registration.showNotification('GH Rides', options);
      } else {
        // Send a message to the page to update the UI
        console.log('Application is already open!');
      }
    })
  );
});


