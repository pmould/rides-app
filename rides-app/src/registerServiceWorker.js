import { ActionSheet } from "antd-mobile";
import {ridesWebApi, isAuthenticated} from './utils/api';
import * as api from './api';
// This optional code is used to register a service worker.
// register() is not called by default.

// This lets the app load faster on subsequent visits in production, and gives
// it offline capabilities. However, it also means that developers (and users)
// will only see deployed updates on subsequent visits to a page, after all the
// existing tabs open on the page have been closed, since previously cached
// resources are updated in the background.

// To learn more about the benefits of this model and instructions on how to
// opt-in, read https://bit.ly/CRA-PWA

const isLocalhost = Boolean(
  window.location.hostname === 'localhost' ||
    // [::1] is the IPv6 localhost address.
    window.location.hostname === '[::1]' ||
    // 127.0.0.1/8 is considered localhost for IPv4.
    window.location.hostname.match(
      /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
    )
);

export let actions;

export let swRegistration = null;
export let isSubscribed = false;

const applicationServerPublicKey = 'BKAYBjgl8clDoLOsLC8u_HbF5U1UGCY877QOLMu8VT0LgZIGdK_pHgzMAoXvbTiO07twlrMdzEf8pPWCWYANilI';

export async function registerAndUpdateSubscription() {
  if (false && !(process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator)) {
    return;
  }

  const swUrl = `${process.env.PUBLIC_URL}/sw.js`;

  if (isLocalhost) {
    // This is running on localhost. Let's check if a service worker still exists or not.
    await checkValidServiceWorker(swUrl);
  }

  else {
    registerValidSW(swUrl);
  }

  return  swRegistration
    ? swRegistration.pushManager.getSubscription()
      .then(subscription => {
        isSubscribed = (subscription !== null);
        if (isAuthenticated() && isSubscribed) {
          console.log('subscription', JSON.stringify(subscription));
          return updateSubscriptionOnServer(subscription);
        }

        return {noSubscription: true};
    })
    : isAuthenticated() && updateSubscriptionOnServer();
}

function registerValidSW(swUrl) {
  return navigator.serviceWorker
    .register(swUrl)
    .then(registration => {
      swRegistration = registration;
      registration.onupdatefound = () => {
        const installingWorker = registration.installing;
        if (installingWorker == null) {
          return;
        }
        installingWorker.onstatechange = () => {
          if (installingWorker.state === 'installed') {
            if (navigator.serviceWorker.controller) {
              // At this point, the updated precached content has been fetched,
              // but the previous service worker will still serve the older
              // content until all client tabs are closed.
              console.log(
                'New content is available and will be used when all ' +
                  'tabs for this page are closed. See https://bit.ly/CRA-PWA.'
              );

              // Execute callback
              //config.onUpdate(registration);
            } else {
              // At this point, everything has been precached.
              // It's the perfect time to display a
              // "Content is cached for offline use." message.
              console.log('Content is cached for offline use.');

              // Execute callback
              //config.onSuccess(registration);
            }
          }
        };

      return;
      };
    })
    .catch(error => {
      console.error('Error during service worker registration:', error);
    });
}

export function updateSubscriptionOnServer(subscription) {
  return ridesWebApi('webNotificationActivation', {
    method: 'PUT',
    body: subscription
  })
    .then(res => res.json());
}

export function askPermission() {
  return 'serviceWorker' in navigator
    ? new Promise(function(resolve, reject) {
        const permissionResult = Notification.requestPermission(function(result) {
          resolve(result);
        });

        actions.toggleAppOverlay();

        if (permissionResult) {
          permissionResult.then(resolve, reject);
        }
      })
      .then(function(permissionResult) {
        actions.toggleAppOverlay();
        if (permissionResult !== 'granted') {
          throw new Error('We weren\'t granted permission.');
        }

        return subscribeUser();
      })
    : isAuthenticated() && updateSubscriptionOnServer();
}

function subscribeUser() {
  console.log('\n subscribeUser START \n', applicationServerPublicKey);
  console.log('swRegistration: ', swRegistration);
  const applicationServerKey = urlB64ToUint8Array(applicationServerPublicKey);
  return swRegistration
    ? swRegistration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: applicationServerKey
      })
      .then(subscription => {
        console.log('User is subscribed:', subscription);
        isSubscribed = true;
        return updateSubscriptionOnServer(subscription);
      })
      .catch(err => {
        if (Notification.permission === 'denied') {
          console.warn('Permission for notifications was denied');
        } else {
          console.error('Failed to subscribe the user: ', err);
        }
      })
    : updateSubscriptionOnServer();

      console.log('\n subscribeUser END \n');
}

export async function unsubscribe() {
  return swRegistration && swRegistration.pushManager.getSubscription().then(async (subscription) => {
    subscription.unsubscribe().then(function(successful) {
      // You've successfully unsubscribed
    return api.deactivateWebNotificationApi();
    }).catch(function(e) {
      // Unsubscription failed
    })
  })  
}

function urlB64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, '+')
    .replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

export function unregister() {
  swRegistration = null;
  isSubscribed = false;

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready.then(registration => {
      registration.unregister();
    });
  }
}

export function setServiceWorkerInit(reduxActions) {
  actions = reduxActions;
}
function checkValidServiceWorker(swUrl) {
  // Check if the service worker can be found. If it can't reload the page.
  return fetch(swUrl)
    .then(response => {
      // Ensure service worker exists, and that we really are getting a JS file.
      const contentType = response.headers.get('content-type');
      if (
        response.status === 404 ||
        (contentType != null && contentType.indexOf('javascript') === -1)
      ) {
        // No service worker found. Probably a different app. Reload the page.
        navigator.serviceWorker.ready.then(registration => {
          swRegistration = registration.unregister().then(() => {
            window.location.reload();
          });
        });
      } else {
        // Service worker found. Proceed as normal.
        return registerValidSW(swUrl);
      }
    })
    .catch(() => {
      console.log(
        'No internet connection found. App is running in offline mode.'
      );
    });
}


//export function register(config) {
//   if (true || process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
//     // The URL constructor is available in all browsers that support SW.
//     const publicUrl = new URL(process.env.PUBLIC_URL, window.location.href);
//     if (publicUrl.origin !== window.location.origin) {
//       // Our service worker won't work if PUBLIC_URL is on a different origin
//       // from what our page is served on. This might happen if a CDN is used to
//       // serve assets; see https://github.com/facebook/create-react-app/issues/2374
//       return;
//     }

//     window.addEventListener('load', () => {
//       //const swUrl = `${process.env.PUBLIC_URL}/service-worker.js`;
//       const swUrl = `${process.env.PUBLIC_URL}/sw.js`;
//       registerValidSW(swUrl, config);
//       // if (isLocalhost) {
//       //   // This is running on localhost. Let's check if a service worker still exists or not.
//       //   checkValidServiceWorker(swUrl, config);

//       //   // Add some additional logging to localhost, pointing developers to the
//       //   // service worker/PWA documentation.
//       //   navigator.serviceWorker.ready.then(() => {
//       //     console.log(
//       //       'This web app is being served cache-first by a service ' +
//       //         'worker. To learn more, visit https://bit.ly/CRA-PWA'
//       //     );
//       //   });
//       // } else {
//       //   // Is not localhost. Just register service worker
//       //   registerValidSW(swUrl, config);
//       // }
//     });
//   }
// }