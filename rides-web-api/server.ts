/**
 * @module server
 *
 * Fabrix framework.
 * @see {@link http://fabrix.app}
 */

import { FabrixApp } from '@fabrix/fabrix'
import * as App from './'
import * as Boom from 'boom';

/*
*/
process.on('unhandledRejection', (reason, p) => {
  console.error(reason, 'Unhandled Rejection at Promise', p);
});

process.on('uncaughtException', err => {
  console.error(err, 'Uncaught Exception thrown');
  process.exit(1);
});

const server = new FabrixApp(App)

// server.ext('onPreResponse', (request, reply) => {
//   // Transform only server errors 
//   if (request.response.isBoom && request.response.isServer) {
//     reply(Boom.badImplementation(request.response))
//   } else {
//     // Otherwise just continue with previous response
//     reply.continue()
//   }
// })
server.start().then(x => {
debugger;

console.log(server);

})
  .catch((err: any) => server.stop(err))